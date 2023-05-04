const RuntimeMonitor = require("./runtimeMonitor");

class ParallelRuntimeMonitor extends RuntimeMonitor{
    constructor() {
        super();
    }

    /* Called when mock associated with model is called once */
    notify(mock, model, name) {
        const startTime = this.runtimeStopwatch.read();
        this.mockStartTimes.push(startTime);

        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const time = model(run, args);

        const endTime = startTime + time;
        this.mockEndTimes.push(endTime);
        this.timeline.push({name: "real time", start: 0, end: startTime});
        this.timeline.push({name: name, start: startTime, end: endTime});
    }
    
    async asyncNotify(mock, model, name) {
        this.notify(mock, model, name);
    }

    calcTotalMockTiming() {
        console.log("Start times: " + this.mockStartTimes);
        console.log("End times: " + this.mockEndTimes);
        const earliestStartTime = Math.min(...this.mockStartTimes);
        const latestEndTime = Math.max(...this.mockEndTimes);
        return latestEndTime - earliestStartTime;
    }

    async handle(func) {
        this.runs++;

        this.runtimeStopwatch.start();
        await func();
        this.currTiming += this.runtimeStopwatch.read();
        this.currTiming += this.calcTotalMockTiming();

        console.log("Timing: " + this.currTiming);

        this.runTimings.push(this.currTiming);
        this.totalTiming += this.currTiming;
        this.timelines.push({timing: this.currTiming, timeline: this.timeline});
        this.resetCurrRun();
    }
}

module.exports = ParallelRuntimeMonitor;