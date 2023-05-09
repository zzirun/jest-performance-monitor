class TimeUnit {
    static nanosecond = new TimeUnit('ns');
    static millisecond = new TimeUnit('ms');
    static second = new TimeUnit('s');
  
    constructor(name) {
      this.name = name;
    }

    toString() {
      return this.name;
    }

    convertFromNano() {
        if (this.name == 'ns') {
            return 1; 
        } else if (this.name == 'ms') {
            return 10 ** 6; 
        } else if (this.name == 's') {
            return 10 ** 9;
        }
    }
}
  
module.exports = TimeUnit;