class RuntimeContext {
    constructor(asyncMode) {
        this.monitoring = false;
        this.monitor = asyncMode.monitor();
    }

    // Set up mocks

    mockImpWithModel(mock, implementation, model) {
        const implementationWithNotif = () => {
            if (this.monitoring) {
                this.monitor.notify(mock, model);
            }
            return implementation();
        };
        mock.mockImplementation(implementationWithNotif);
    }

    mockWithModel(mock, model) {
        this.mockImpWithModel(mock, () => {}, model);
    }

    mockImpWithModelAsync(mock, implementation, model) {
        const implementationWithNotif = async () => {
            if (this.monitoring) {
                await this.monitor.asyncNotify(mock, model);
            }
            return implementation();
        };
        mock.mockImplementation(implementationWithNotif);
    }

    mockWithModelAsync(mock, model) {
        this.mockImpWithModelAsync(mock, () => {}, model);
    }

    // Run tests

    async repeat(runs, func) {
        //todo: use asynclocalstorage to set up one monitor per run
        this.monitoring = true;
        for (let i = 0; i < runs; i++) {
            await this.monitor.handle(func); 
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