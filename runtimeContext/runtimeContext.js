const { timelinesProcessor } = require("./timelinesProcessor.js");

class RuntimeContext {
    constructor(asyncMode, timeUnit, assumeSerialThreshold) {
        this.monitoring = false;
        this.timeUnit = timeUnit;
        this.monitor = asyncMode.monitor(timeUnit, assumeSerialThreshold);
    }

    // Set up mocks

    mockWithModel(mock, name, model, imp) {
        const implementationWithNotif = () => {
            if (this.monitoring) {
                this.monitor.notify(mock, model, name);
            }
            let impl = imp || (() => {});
            return impl();
        };
        mock.mockImplementation(implementationWithNotif);
    }

    mockWithModelAsync(mock, name, model, imp) {
        const implementationWithNotif = async () => {
            if (this.monitoring) {
                await this.monitor.asyncNotify(mock, model, name);
            } 
            let impl = imp || (() => {});
            return impl();
        };
        mock.mockImplementation(implementationWithNotif);
    }
    // Run tests

    async repeat(runs, func, desc) {
        this.monitoring = true;
        for (let i = 1; i < runs + 1; i++) {
            await this.monitor.handle(func); 
        }

        if (desc) {
            timelinesProcessor.loadTimelines(desc, this.monitor.getTimelines(), this.timeUnit);
        }
        return this;
    }

    clearContext() {
        this.monitor.resetMonitor();
    }

    runtimeMean() {
        return this.monitor.getMeanRuntime();
    }

    runtimePercentile(p) {
        return this.monitor.getRuntimePercentile(p);
    }

}

module.exports = RuntimeContext;