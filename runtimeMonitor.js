const RuntimeStopwatch = require("./runtimeStopwatch");

class RuntimeMonitor {
    constructor() {
        this.runtimeStopwatch = new RuntimeStopwatch();
        this.timings = [];
        this.totalTiming = 0;
        this.currTiming = 0;

        this.runs = 0;
    }

    /* Called when mock associated with model is called once */
    notify(model) {
        this.currTiming += model();
    }

    handle(func) {
        this.runs++;

        this.runtimeStopwatch.start();
        func();
        this.runtimeStopwatch.stop();
        this.currTiming += this.runtimeStopwatch.read();

        this.timings.push(this.currTiming);
        this.totalTiming += this.currTiming;

        this.currTiming = 0;
        this.runtimeStopwatch.reset();
    }

    getTotalRuntime() {
        return this.totalTiming;
    }

    getMeanRuntime() {
        return this.totalTiming/this.runs;
    }

    getRuntimePercentile(percentile) {

    }

    resetMonitor() {
        this.runtimeStopwatch.reset();
        this.timings = [];
        this.totalTiming = 0;
        this.currTiming = 0;

        this.runs = 0;

        return this;
    }
}

module.exports = RuntimeMonitor;