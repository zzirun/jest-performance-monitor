const RuntimeMonitor = require("./runtimeMonitor");

class SerialRuntimeMonitor extends RuntimeMonitor{
    constructor(timeUnit) {
        // all runs
        super(timeUnit);
    }

    /* Called when mock associated with model is called once */
    notify(mock, model, name) {
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const virtualTime = model(run, args);
        
        const realTime = this.runtimeStopwatch.read();
        this.runtimeStopwatch.reset();
        this.runtimeStopwatch.start();

        const currStart = this.currTiming;
        const currEnd = currStart + virtualTime + realTime;
        this.currTiming = currEnd;

        const virtualEnd = currStart + virtualTime;
        this.timeline.push({name: name, start: currStart, end: virtualEnd});
        this.timeline.push({name: "real time", start: virtualEnd, end: currEnd});
    }

    async asyncNotify(mock, model, name) {
        this.notify(mock, model, name);
    }

    async handle(func) {
        this.runs++;

        this.runtimeStopwatch.start();
        await func();
        this.currTiming += this.runtimeStopwatch.read();

        console.log("Timing: " + this.currTiming);

        this.runTimings.push(this.currTiming);
        this.totalTiming += this.currTiming;
        this.timelines.push({timing: this.currTiming, timeline: this.timeline});
        this.resetCurrRun();
    }
}

module.exports = SerialRuntimeMonitor;