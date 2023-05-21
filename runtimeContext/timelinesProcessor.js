const fs = require('fs');

class TimelinesProcessor {
    constructor() {
        // List of tests with corresponding timelines
        this.testsTimelines = [];
    }

    loadTimelines(desc, timelines, timeUnit) {
        this.testsTimelines.push({desc: desc, timelines: timelines, timeUnit: timeUnit.toString()});
    }

    writeResultsToFile(path) {
        console.log("Writing results to file " + path);
        let record = JSON.stringify(this.testsTimelines);
        let fp = path ? path : "../timelineData.txt";
        fs.writeFileSync(fp, record);
    }
}

const timelinesProcessor = new TimelinesProcessor();

module.exports = { timelinesProcessor }