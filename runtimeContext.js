const RuntimeMonitor = require("./runtimeMonitor");

class RuntimeContext {
    constructor() {
        this.monitor = new RuntimeMonitor();
    }

    mockImplementationWithModel(mock, implementation, model) {
        const implementationWithNotif = () => {
            this.monitor.notify(mock, model);
            return implementation();
        };
        mock.mockImplementation(implementationWithNotif);
    }

    mockWithModel(mock, model) {
        this.mockImplementationWithModel(mock, () => {}, model);
    }

    repeat(runs, func) {
        for (let i = 0; i < runs; i++) {
            this.monitor.handle(func);
        }
        return this;
    }

    getMeanRuntime() {
        return this.monitor.getMeanRuntime();
    }

    //todo: implement expects
    //todo: implement reset

}

module.exports = RuntimeContext;