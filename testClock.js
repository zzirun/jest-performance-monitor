class TestClock {
    constructor() {
        this.time = 0;
        this.started = false;
    }

    start() {
        if (!this.started) {
            this.start = new Date();
        }
    }

    stop() {
        if (this.started) {
            throw new Error("Test Clock has already been started!");
        } else {
            this.time += Date.now() - this.start;
        }
    }

    read() {
        return this.time;
    }

    reset() {
        this.time = 0;
    }

    addTime(time) {
        this.time += time;
    }
}

module.exports = TestClock;