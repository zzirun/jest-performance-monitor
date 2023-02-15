const TestClock = require("./testClock");

class RuntimeMonitor {
    constructor(mock, model) {
        this.testClock = new TestClock();
        this.mock = mock;
        this.model = model;
    }

    startMonitoring() {
        this.testClock.start();
    }

    stopMonitoring() {
        this.testClock.stop();
        const mockCalls = this.mock.mock.calls.length; 
        this.testClock.addTime(mockCalls * this.model());
    }

    getRuntime() {
        return this.testClock.read();
    }

    resetRuntime() {
        this.testClock.reset();
    }
}

module.exports = RuntimeMonitor;