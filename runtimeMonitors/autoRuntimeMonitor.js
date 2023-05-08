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
    constructor() {
        super();  
    } 

    getParentEndTime(parentId, currId, sync) {
        // Finding parent end time
        var parentEndTime = 0;
        if (this.endingTimes.size > 0) {
            if (parentId != currId) {
                var i = 0;
                while (!this.endingTimes.has(parentId) && i < this.maxDependencyLength * 100) {
                    parentId = parents.get(parentId);
                    debug(parentId)
                    i++;
                }
                if (parentId == 0) {
                    
                }
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

    getCurrEndTime(mock, model, parentEndTime, name, sync) {
        //Calculating timings
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const virtualTime = model(run, args);
        const realTime = this.runtimeStopwatch.read();

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
        const parentEndTime = this.getParentEndTime(parentId, currId, true);
        const virtualEndTime = this.getCurrEndTime(mock, model, parentEndTime, name, true);
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
        const parentEndTime = this.getParentEndTime(parentId, currId);
        const virtualEndTime = this.getCurrEndTime(mock, model, parentEndTime, name);
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