const TimeUnit = require("../runtimeContext/timeUnits")

class RuntimeStopwatch {
    constructor(timeUnit) {
        this.started = false;
        this.time = 0;
        this.timeUnit = timeUnit ? timeUnit : TimeUnit.nanosecond;
    }

    start() {
        if (!this.started) {
            this.timingStart = process.hrtime.bigint();
            this.started = true;
        }
    }

    convertToUnit(input) {
        return Number(input) / this.timeUnit.convertFromNano();
    }

    prevRead() {
        return this.convertToUnit(this.time);
    }

    read() {
        if (!this.started) {
            throw new Error("Test Clock has not been started!");
        } else {
            this.time = process.hrtime.bigint() - this.timingStart;
            return this.convertToUnit(this.time);
        }
    }

    reset() {
        this.started = false;
        this.time = 0;
    }
}

module.exports = RuntimeStopwatch;