class RuntimeStopwatch {
    constructor() {
        this.time = 0;
        this.started = false;
    }

    start() {
        if (!this.started) {
            this.timingStart = new Date();
            this.started = true;
        }
    }

    stop() {
        if (!this.started) {
            throw new Error("Test Clock has not been started!");
        } else {
            this.time += Date.now() - this.timingStart;
            this.started = false;
        }
    }

    read() {
        return this.time;
    }

    reset() {
        this.time = 0;
        this.started = false;
    }
}

module.exports = RuntimeStopwatch;