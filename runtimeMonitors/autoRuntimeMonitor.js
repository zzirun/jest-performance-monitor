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

    getCurrEndTime(mock, model, parentEndTime) {
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const virtualTime = model(run, args);
        
        const realTime = this.runtimeStopwatch.read();
        this.runtimeStopwatch.reset();
        this.runtimeStopwatch.start();
        const currEndTime = parentEndTime + virtualTime + realTime;

        debug('Parent End Time: ', parentEndTime,
            '\nTime generated: ', virtualTime,
            '\nReal time elapsed: ', realTime);
            
        return currEndTime;
    }

    notify(mock, model) {
        this.maxDependencyLength++;

        // Finding dependencies
        var parentId = asyncHooks.triggerAsyncId();
        const currId = asyncHooks.executionAsyncId();
        debug('\nParent id: ', parentId,
            '\nCurr id:', currId);

        // Finding end time
        const parentEndTime = this.getParentEndTime(parentId, currId);
        const currEndTime = this.getCurrEndTime(mock, model, parentEndTime);

        this.endingTimes.set(parentId, currEndTime);
        this.latestEndTime = (currEndTime>this.latestEndTime) ? currEndTime : this.latestEndTime;
        
        debug('New End time for parentid: ', currEndTime,
            '\nUpdated latest End time: ', this.latestEndTime);
    }

    /* Called when mock associated with model is called once */
    async asyncNotify(mock, model) {
        this.maxDependencyLength++;

        // Finding dependencies
        var parentId = asyncHooks.triggerAsyncId();
        const currId = asyncHooks.executionAsyncId();
        debug('\nParent id: ', parentId,
            '\nCurr id:', currId);

        // Finding end time
        const parentEndTime = this.getParentEndTime(parentId, currId);
        const currEndTime = this.getCurrEndTime(mock, model, parentEndTime);

        this.endingTimes.set(currId, currEndTime);
        this.latestEndTime = (currEndTime>this.latestEndTime) ? currEndTime : this.latestEndTime;
        
        debug('New End time for currid: ', currEndTime,
            '\nUpdated latest End time: ', this.latestEndTime);
    }

    async handle(func) {
        // Setup: Async hook
        function init(asyncId, type, triggerAsyncId, resource) {
            // debug(asyncId, type, triggerAsyncId);
            // debug('init', asyncId, asyncHooks.executionAsyncId(), triggerAsyncId);
            parents.set(asyncId, triggerAsyncId);
        }
        function before(asyncId) { 
            // debug('before', asyncId, asyncHooks.executionAsyncId());
        }
        function after(asyncId) { 
            // debug('after', asyncId, asyncHooks.executionAsyncId());
        }
        function promiseResolve(asyncId) { 
            // debug('promise resolve', asyncId, asyncHooks.executionAsyncId());
        }

        var asyncHook = asyncHooks.createHook({init, before, after, promiseResolve});
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