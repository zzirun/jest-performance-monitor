const RuntimeStopwatch = require("./runtimeStopwatch");
const percentile = require("percentile");

class SerialRuntimeMonitor {
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
    async notify(mock, model) {
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        this.currTiming += model(run, args);
    }

    async handle(func) {
        this.runs++;

        this.runtimeStopwatch.start();
        await func();
        this.currTiming += this.runtimeStopwatch.read();

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

module.exports = SerialRuntimeMonitor;