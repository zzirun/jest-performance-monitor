const AutoRuntimeMonitor = require("../runtimeMonitors/autoRuntimeMonitor");
const ParallelRuntimeMonitor = require("../runtimeMonitors/parallelRuntimeMonitor");
const SerialRuntimeMonitor = require("../runtimeMonitors/serialRuntimeMonitor");

class AsyncMode {
    static Serial = new AsyncMode('Serial');
    static Parallel = new AsyncMode('Parallel');
    static Auto = new AsyncMode('Auto');
  
    constructor(name) {
      this.name = name;
    }

    toString() {
      return `Color.${this.name}`;
    }

    monitor(timeUnit, assumeSerialThreshold) {
        if (this.name == 'Serial') {
            return new SerialRuntimeMonitor(timeUnit); 
        } else if (this.name == 'Parallel') {
            return new ParallelRuntimeMonitor(timeUnit); 
        } else if (this.name == 'Auto') {
            return new AutoRuntimeMonitor(timeUnit, assumeSerialThreshold);
        }
    }
}
  
module.exports = AsyncMode;