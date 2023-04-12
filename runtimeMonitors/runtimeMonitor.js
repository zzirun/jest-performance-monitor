const RuntimeStopwatch = require("../runtimeStopwatch");
const percentile = require("percentile");

class RuntimeMonitor {
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

    getTotalRuntime() {
        return this.totalTiming;
    }

    getMeanRuntime() {
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

module.exports = RuntimeMonitor;