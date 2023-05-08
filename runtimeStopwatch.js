class RuntimeStopwatch {
    constructor() {
        this.started = false;
        this.prev = 0;
    }

    start() {
        if (!this.started) {
            this.timingStart = new Date();
            this.started = true;
        }
    }

    prevRead() {
        return this.prev;
    }

    read() {
        if (!this.started) {
            throw new Error("Test Clock has not been started!");
        } else {
            this.prev = Date.now() - this.timingStart;
            return this.prev;
        }
    }

    reset() {
        this.started = false;
    }
}

module.exports = RuntimeStopwatch;