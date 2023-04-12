const RuntimeMonitor = require("./runtimeMonitor");
const asyncHooks = require('node:async_hooks');
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

    getParentEndTime(parentId, currId) {
        // Finding parent end time
        var parentEndTime = 0;
        if (this.endingTimes.size > 0) {
            if (parentId != currId) {
                var i = 0;
                while (!this.endingTimes.has(parentId) && i < this.maxDependencyLength * 100) {
                    parentId = parents.get(parentId);
                    i++;
                }
                parentEndTime = this.endingTimes.get(parentId) ?? 0;
            } else {
                // if parentId == currId, they are both == 0 (i.e. no stack above it)
                // thus we can leave parentEndTime as 0
                debug("Same parent and curr id: ", parentId, currId);
            }
        } 
        return parentEndTime;
    }

    /* Called when mock associated with model is called once */
    async notify(mock, model) {
        this.maxDependencyLength++;
        var parentId = asyncHooks.triggerAsyncId();
        const currId = asyncHooks.executionAsyncId();

        // Finding parent end time
        const parentEndTime = this.getParentEndTime(parentId, currId);
        
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const time = model(run, args);
        const currEndTime = parentEndTime + time;

        // Compare and set longest duration (esp for id = 0 case)
        const existingTime = this.endingTimes.get(currId) ?? 0;
        const longestTime = currEndTime > existingTime ? currEndTime : existingTime;
        this.endingTimes.set(currId, longestTime);

        this.latestEndTime = (longestTime>this.latestEndTime) ? longestTime : this.latestEndTime;
        
        debug('Parent id: ', parentId,
            '\nCurr id:', currId,
            '\nParent End Time: ', parentEndTime,
            '\nTime generated: ', time,
            '\nNew End time: ', currEndTime,
            '\nLongest End time: ', longestTime,
            '\nUpdated latest End time: ', this.latestEndTime);
    }

    async handle(func) {
        // Setup: Async hook
        function init(asyncId, type, triggerAsyncId, resource) {
            // debug(asyncId, type, triggerAsyncId);
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
        this.currTiming += this.runtimeStopwatch.read();
        this.currTiming += this.latestEndTime;
        this.runTimings.push(this.currTiming);
        this.totalTiming += this.currTiming;
        debug("Final latest End time: ", this.latestEndTime,
            "\nTiming: ", this.currTiming);

        // Cleanup
        this.resetCurrRun();
        asyncHook.disable();
    }
}

module.exports = AutoRuntimeMonitor;