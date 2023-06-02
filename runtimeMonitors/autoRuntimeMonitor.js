const RuntimeMonitor = require("./runtimeMonitor");
const asyncHooks = require('async_hooks');
const fs = require('fs');
const util = require('util');

let verbose = false;
const triggers = new Map();

const setVerbose = () => verbose = true;
const setSilent = () => verbose = false;

// Utility function for synchronous printing
// Since console.log is an async op, calling it causes AsyncHook callbacks to be created
// Which can create infinite recursion.
function debug(...args) {
    if (verbose) {
        fs.writeFileSync(1, `${util.format(...args)}\n`, { flag: 'a' });
    }
} 

class AutoRuntimeMonitor extends RuntimeMonitor{
    constructor(timeUnit, assumeSerialThreshold) {
        super(timeUnit);
        this.assumeSerialThreshold = assumeSerialThreshold ? assumeSerialThreshold : 0.1;
    } 

    /*  Reads current time from stopwatch and sets it for id in real time map */
    getRealTime(currId) {
        let time = this.runtimeStopwatch.read();
        this.realTimes.set(currId, time);
        return time;
    }

    /*  Checks if id should be trigger or if too much time has elapsed 
        and its most recent descendant should be trigger */
    checkDescendantsForTrigger(pId, currId, realTime) {
        let triggerId = pId;
        // check if triggerId has had children before
        if (this.visitedTriggerIds.has(triggerId)) {
            // find most recent descendant of trigger id
            let recentChildId = triggerId;
            while (this.visitedTriggerIds.has(recentChildId)) {
                let id = this.visitedTriggerIds.get(recentChildId);
                if (currId != id) {
                    recentChildId = id;
                } else {
                    break;
                }
            }
            // find real time elapsed since that child id 
            let timeElapsed = realTime - this.realTimes.get(recentChildId);
            /*  if it's been too long since the child id was called,
                it's more likely that the current execution is 
                scheduled after it instead of parallel to it. */
            // take that child id as actual trigger if threshold of time elapsed is exceeded
            if (timeElapsed > this.assumeSerialThreshold) {
                debug("Time elapsed since recent child exceeds threshold.", 
                    "\nNew trigger id: ", recentChildId)
                triggerId = recentChildId;
            }
        } 
        return triggerId;
    }

    getTriggerEndTime(triggerId, currId, realTime, sync) {
        // Finding trigger end time
        var triggerEndTime = 0;
        if (this.endingTimes.size > 0) {
            if (triggerId != currId) {
                var i = 0;
                // Looking for most recent triggerId with recorded time
                while (!this.endingTimes.has(triggerId) && i < this.maxDependencyLength * 100) {
                    triggerId = triggers.get(triggerId);
                    i++;
                }
                triggerId = this.checkDescendantsForTrigger(triggerId, currId, realTime)
                this.visitedTriggerIds.set(triggerId, currId);
                triggerEndTime = this.endingTimes.get(triggerId) ?? 0;
            } else {
                // if triggerId == currId, they are both == 0 (i.e. no stack above it)
                // thus we can leave triggerEndTime as 0 if async exec
                debug("Same trigger and curr id: ", triggerId, currId);
                if (sync) {
                    triggerEndTime = this.endingTimes.get(triggerId) ?? 0; 
                }
            }
        } 
        return triggerEndTime;
    }

    getCurrEndTime(mock, model, realTime, triggerEndTime, name, sync) {
        //Calculating timings
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const virtualTime = model(run, args);

        debug('Trigger End Time: ', triggerEndTime,
            '\nTime generated: ', virtualTime,
            '\nReal time elapsed: ', realTime);

        const virtualStartTime = triggerEndTime + realTime;
        const currEndTime = triggerEndTime + virtualTime + realTime;

        // Updating timeline
        if (sync && this.latestEndTime <= triggerEndTime || !sync) {
            this.timeline.push({name: "real time", start: triggerEndTime, end: virtualStartTime});
        }
        this.timeline.push({name: name, start: virtualStartTime, end: currEndTime});
        this.latestEndTime = (currEndTime>this.latestEndTime) ? currEndTime : this.latestEndTime;

        return currEndTime;
    }

    setMaxEndTime(id, time) {
        let maxEndTime = time;
        if (this.endingTimes.has(id)) {
            maxEndTime = time > this.endingTimes.get(id) ? time : this.endingTimes.get(id);
        }
        this.endingTimes.set(id, maxEndTime);
    }

    notify(mock, model, name) {
        debug('\nMock name: ', name);
        this.maxDependencyLength++;

        // Finding dependencies
        var triggerId = asyncHooks.triggerAsyncId();
        const currId = asyncHooks.executionAsyncId();
        debug('Trigger id: ', triggerId,
            '\nCurr id:', currId);

        // Finding end time
        const realTime = this.getRealTime(currId);
        const triggerEndTime = this.getTriggerEndTime(triggerId, currId, realTime, true);
        const virtualEndTime = this.getCurrEndTime(mock, model, realTime, triggerEndTime, name, true);
        this.setMaxEndTime(triggerId, virtualEndTime);
        this.setMaxEndTime(currId, virtualEndTime);

        debug('New End time for triggerId: ', virtualEndTime,
            '\nUpdated latest End time: ', this.latestEndTime);
    }

    /* Called when mock associated with model is called once */
    async asyncNotify(mock, model, name) {
        debug('\nMock name: ', name);
        this.maxDependencyLength++;

        // Finding dependencies
        var triggerId = asyncHooks.triggerAsyncId();
        const currId = asyncHooks.executionAsyncId();
        debug('Trigger id: ', triggerId,
            '\nCurr id:', currId);

        // Finding end time
        const realTime = this.getRealTime(currId);
        const triggerEndTime = this.getTriggerEndTime(triggerId, currId, realTime);
        const virtualEndTime = this.getCurrEndTime(mock, model, realTime, triggerEndTime, name);
        this.setMaxEndTime(currId, virtualEndTime);

        debug('New End time for currid: ', virtualEndTime,
            '\nUpdated latest End time: ', this.latestEndTime);
    }

    async handle(func, verbose) {
        if(verbose) {
            setVerbose();
        }
        // Setup: Async hook
        function init(asyncId, type, triggerAsyncId, resource) {
            triggers.set(asyncId, triggerAsyncId);
        }

        var asyncHook = asyncHooks.createHook({init});
        asyncHook.enable();
        
        // Setup: Timing info
        this.endingTimes = new Map();
        this.visitedTriggerIds = new Map();
        this.realTimes = new Map();
        this.maxDependencyLength = 0;

        this.latestEndTime = 0;
        this.runs++;
        this.runtimeStopwatch.start();

        await func();

        // Recording timing
        let prevRealTime = this.runtimeStopwatch.prevRead();
        
        this.currTiming += this.runtimeStopwatch.read() - prevRealTime;
        this.currTiming += this.latestEndTime;

        this.timeline.push({name: "real time", start: this.latestEndTime, end: this.currTiming});
        
        this.runTimings.push(this.currTiming);
        this.totalTiming += this.currTiming;
        this.timelines.push({timing: this.currTiming, timeline: this.timeline});
        debug("Final latest End time: ", this.latestEndTime,
            "\nTiming: ", this.currTiming);

        // Cleanup
        this.resetCurrRun();
        asyncHook.disable();
        setSilent();
    }
}

module.exports = AutoRuntimeMonitor;