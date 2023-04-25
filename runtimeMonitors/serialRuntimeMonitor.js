const RuntimeMonitor = require("./runtimeMonitor");

class SerialRuntimeMonitor extends RuntimeMonitor{
    constructor() {
        // all runs
        super();
    }

    /* Called when mock associated with model is called once */
    notify(mock, model) {
        const run = mock.mock.calls.length;
        const args = mock.mock.calls[run - 1];
        this.currTiming += model(run, args);
    }

    async asyncNotify(mock, model) {
        this.notify(mock, model);
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
}

module.exports = SerialRuntimeMonitor;