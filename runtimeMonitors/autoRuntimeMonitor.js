const RuntimeMonitor = require("./runtimeMonitor");
const asyncHooks = require('async_hooks');
const fs = require('fs');
const util = require('util');

// Utility function for synchronous printing
// Since console.log is an async op, calling it causes AsyncHook callbacks to be created
// Which can create infinite recursion.
function debug(...args) {
    fs.writeFileSync(1, `${util.format(...args)}\n`, { flag: 'a' });
} 

const parents = new Map();

class AutoRuntimeMonitor extends RuntimeMonitor{
    constructor(timeUnit, assumeSerialThreshold) {
        super(timeUnit);
        this.assumeSerialThreshold = assumeSerialThreshold ? assumeSerialThreshold : 0.1;
    } 

    getRealTime(currId) {
        let time = this.runtimeStopwatch.read();
        this.realTimes.set(currId, time);
        return time;
    }

    getParentEndTime(parentId, currId, realTime, sync) {
        // Finding parent end time
        var parentEndTime = 0;
        if (this.endingTimes.size > 0) {
            if (parentId != currId) {
                var i = 0;
                // Looking for most recent parentId with recorded time
                while (!this.endingTimes.has(parentId) && i < this.maxDependencyLength * 100) {
                    parentId = parents.get(parentId);
                    i++;
                }
                if (this.visitedParentIds.has(parentId)) {
                    // parentId has been visited before
                    // find most recently visited child id 
                    let recentChildId = parentId
                    while (this.visitedParentIds.has(recentChildId)) {
                        recentChildId = this.visitedParentIds.get(recentChildId);
                    }
                    // find real time elapsed since that child id 
                    let recentChildTime = this.realTimes.get(recentChildId);
                    let timeElapsed = realTime - recentChildTime;
                    // take that child id as actual parent if threshold of time elapsed is exceeded
                    if (timeElapsed > this.assumeSerialThreshold) {
                        parentId = recentChildId;
                    }
                } 
                this.visitedParentIds.set(parentId, currId);
                parentEndTime = this.endingTimes.get(parentId) ?? 0;
            } else {
                // if parentId == currId, they are both == 0 (i.e. no stack above it)
                // thus we can leave parentEndTime as 0 if async exec
                debug("Same parent and curr id: ", parentId, currId);
                if (sync) {
                    parentEndTime = this.endingTimes.get(parentId) ?? 0; 
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

        // To be pushed into endingTimes
        const virtualEndTime = parentEndTime + virtualTime;
        return virtualEndTime;
    }

    setMaxEndTime(id, time) {
        let maxEndTime = time;
        if (this.endingTimes.has(id)) {
            maxEndTime = time > this.endingTimes.get(id) ? time : this.endingTimes.get(id);
        }
        this.endingTimes.set(id, maxEndTime);
    }

    notify(mock, model, name) {
        this.maxDependencyLength++;

        // Finding dependencies
        var parentId = asyncHooks.triggerAsyncId();
        const currId = asyncHooks.executionAsyncId();
        debug('\nParent id: ', parentId,
            '\nCurr id:', currId);

        // Finding end time
        const realTime = this.getRealTime(currId);
        const parentEndTime = this.getParentEndTime(parentId, currId, realTime, true);
        const virtualEndTime = this.getCurrEndTime(mock, model, realTime, parentEndTime, name, true);
        this.setMaxEndTime(parentId, virtualEndTime);

        debug('New End time for parentId: ', virtualEndTime,
            '\nUpdated latest End time: ', this.latestEndTime);
    }

    /* Called when mock associated with model is called once */
    async asyncNotify(mock, model, name) {
        this.maxDependencyLength++;

        // Finding dependencies
        var parentId = asyncHooks.triggerAsyncId();
        const currId = asyncHooks.executionAsyncId();
        debug('\nParent id: ', parentId,
            '\nCurr id:', currId);

        // Finding end time
        const realTime = this.getRealTime(currId);
        const parentEndTime = this.getParentEndTime(parentId, currId, realTime);
        const virtualEndTime = this.getCurrEndTime(mock, model, realTime, parentEndTime, name);
        this.setMaxEndTime(currId, virtualEndTime);

        debug('New End time for currid: ', virtualEndTime,
            '\nUpdated latest End time: ', this.latestEndTime);
    }

    async handle(func) {
        // Setup: Async hook
        function init(asyncId, type, triggerAsyncId, resource) {
            parents.set(asyncId, triggerAsyncId);
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
        this.runTimings.push(this.currTiming);
        this.totalTiming += this.currTiming;
        this.timelines.push({timing: this.currTiming, timeline: this.timeline});
        debug("Final latest End time: ", this.latestEndTime,
            "\nTiming: ", this.currTiming);

        // Cleanup
        this.resetCurrRun();
        asyncHook.disable();
        
    }
}

module.exports = AutoRuntimeMonitor;