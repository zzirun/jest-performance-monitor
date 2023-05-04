const { timelinesProcessor } = require("./runtimeDisplay/timelinesProcessor.js");

class RuntimeContext {
    constructor(asyncMode) {
        this.monitoring = false;
        this.monitor = asyncMode.monitor();
    }

    // Set up mocks

    mockImpWithModel(mock, name, implementation, model) {
        const implementationWithNotif = () => {
            if (this.monitoring) {
                this.monitor.notify(mock, model, name);
            }
            return implementation();
        };
        mock.mockImplementation(implementationWithNotif);
    }

    mockWithModel(mock, name, model) {
        this.mockImpWithModel(mock, name, () => {}, model);
    }

    mockImpWithModelAsync(mock, name, implementation, model) {
        const implementationWithNotif = async () => {
            if (this.monitoring) {
                await this.monitor.asyncNotify(mock, model, name);
            } 
            return implementation();
        };
        mock.mockImplementation(implementationWithNotif);
    }

    mockWithModelAsync(mock, name, model) {
        this.mockImpWithModelAsync(mock, name, () => {}, model);
    }

    // Run tests

    async repeat(runs, func, desc) {
        //todo: use asynclocalstorage to set up one monitor per run
        this.monitoring = true;
        for (let i = 0; i < runs; i++) {
            await this.monitor.handle(func); 
        }

        if (desc) {
            timelinesProcessor.loadTimelines(desc, this.monitor.getTimelines());
        }
        return this;
    }

    // async repeatConcurrently(runs, func) {
    //     //set up monitors for runs
    //     promises = []
    //     for (let i = 0; i < runs; i++) {
    //         promises.push(this.monitor.handle(func)); 
    //     }
    //     return Promise.all(promises);
    // }

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