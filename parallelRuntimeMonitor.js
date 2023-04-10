const RuntimeStopwatch = require("./runtimeStopwatch");
const percentile = require("percentile");

class ParallelRuntimeMonitor {
    constructor() {
        // all runs
        this.runs = 0;
        this.runTimings = [];
        this.totalTiming = 0;

        // current run
        this.runtimeStopwatch = new RuntimeStopwatch();
        this.currTiming = 0;
        this.mockStartTimes = [];
        this.mockEndTimes = [];
    }

    /* Called when mock associated with model is called once */
    //todo: calculate start time based on (passed in?) execution order rather than real time
    async notify(mock, model) {
        const startTime = this.runtimeStopwatch.read();
        this.mockStartTimes.push(startTime);

        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        const time = model(run, args);

        const endTime = startTime + time;
        this.mockEndTimes.push(endTime);
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

        this.resetCurrRun();
    }

    getTotalRuntime() {
        return this.totalTiming;
    }

    getMeanRuntime() {
        console.log("runs: " + this.runs);
        return this.totalTiming/this.runs;
    }

    getRuntimePercentile(p) {
        return percentile(p, this.runTimings);
    }

    resetCurrRun() {
        this.runtimeStopwatch.reset();
        this.currTiming = 0;
        this.mockStartTimes = [];
        this.mockEndTimes = [];

        return this;
    }

    resetMonitor() {
        this.runTimings = [];
        this.totalTiming = 0;
        this.runs = 0;

        this.resetCurrRun();
        return this;
    }
}

module.exports = ParallelRuntimeMonitor;