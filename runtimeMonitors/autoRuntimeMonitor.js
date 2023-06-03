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

    /*  Checks if id should be parent or if too much time has elapsed 
        and its most recent descendant should be parent */
    checkDescendantsForParent(pId, currId, realTime) {
        let parentId = pId;
        // check if parentId has had children before
        if (this.visitedParentIds.has(parentId)) {
            // find most recent descendant of parent id
            let recentChildId = parentId;
            while (this.visitedParentIds.has(recentChildId)) {
                let id = this.visitedParentIds.get(recentChildId);
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
            // take that child id as actual parent if threshold of time elapsed is exceeded
            if (timeElapsed > this.assumeSerialThreshold) {
                debug("Time elapsed since recent child exceeds threshold.", 
                    "\nNew parent id: ", recentChildId)
                parentId = recentChildId;
            }
        } 
        return parentId;
    }

    getParentEndTime(triggerId, currId, realTime, sync) {
        // Finding parent end time
        var parentEndTime = 0;
        if (this.endingTimes.size > 0) {
            if (triggerId != currId) {
                var i = 0;
                // Looking for most recent triggerId with recorded time
                while (!this.endingTimes.has(triggerId) && i < this.maxDependencyLength * 100) {
                    triggerId = triggers.get(triggerId);
                    i++;
                }
                parentId = this.checkDescendantsForParent(triggerId, currId, realTime)
                this.visitedParentIds.set(parentId, currId);
                parentEndTime = this.endingTimes.get(parentId) ?? 0;
            } else {
                // if triggerId == currId, they are both == 0 (i.e. no stack above it)
                // thus we can leave triggerEndTime as 0 if async exec
                debug("Same trigger and curr id: ", triggerId, currId);
                if (sync) {
                    parentEndTime = this.endingTimes.get(triggerId) ?? 0; 
                }
            }
        } 
        return parentEndTime;
    }

    getCurrEndTime(mock, model, realTime, parentEndTime, name, sync) {
        //Calculating timings
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const virtualTime = model(run, args);

        debug('Parent End Time: ', parentEndTime,
            '\nTime generated: ', virtualTime,
            '\nReal time elapsed: ', realTime);

        const virtualStartTime = parentEndTime + realTime;
        const currEndTime = parentEndTime + virtualTime + realTime;

        // Updating timeline
        if (sync && this.latestEndTime <= parentEndTime || !sync) {
            this.timeline.push({name: "real time", start: parentEndTime, end: virtualStartTime});
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
        const parentEndTime = this.getParentEndTime(triggerId, currId, realTime, true);
        const virtualEndTime = this.getCurrEndTime(mock, model, realTime, parentEndTime, name, true);
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
        const parentEndTime = this.getParentEndTime(triggerId, currId, realTime);
        const virtualEndTime = this.getCurrEndTime(mock, model, realTime, parentEndTime, name);
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
        this.visitedParentIds = new Map();
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