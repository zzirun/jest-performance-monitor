const RuntimeStopwatch = require("../runtimeContext/runtimeStopwatch");
const percentile = require("percentile");

class RuntimeMonitor {
    constructor(timeUnit) {
        // all runs
        this.runs = 0;
        this.runTimings = [];
        this.totalTiming = 0;

        // current run
        this.runtimeStopwatch = new RuntimeStopwatch(timeUnit);
        this.currTiming = 0;
        this.mockStartTimes = [];
        this.mockEndTimes = [];

        this.timelines = [];
        this.timeline = [];
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

    getTimelines() {
        return this.timelines;
    }

    resetCurrRun() {
        this.runtimeStopwatch.reset();
        this.currTiming = 0;
        this.mockStartTimes = [];
        this.mockEndTimes = [];
        this.timeline = [];

        return this;
    }

    resetMonitor() {
        this.runTimings = [];
        this.totalTiming = 0;
        this.runs = 0;

        this.resetCurrRun();
        this.timeline = [];
        this.timelines = [];
        return this;
    }
}

module.exports = RuntimeMonitor;