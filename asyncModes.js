const ParallelRuntimeMonitor = require("./parallelRuntimeMonitor");
const SerialRuntimeMonitor = require("./serialRuntimeMonitor");

class AsyncMode {
    static Serial = new AsyncMode('Serial');
    static Parallel = new AsyncMode('Parallel');
  
    constructor(name) {
      this.name = name;
    }

    toString() {
      return `Color.${this.name}`;
    }

    monitor() {
        if (this.name == 'Serial') {
            return new SerialRuntimeMonitor(); 
        } else if (this.name == 'Parallel') {
            return new ParallelRuntimeMonitor(); 
        }
    }
}
  
module.exports = AsyncMode;