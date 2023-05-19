const fs = require('fs');

class TimelinesProcessor {
    constructor() {
        // List of tests with corresponding timelines
        this.testsTimelines = [];
    }

    loadTimelines(desc, timelines, timeUnit) {
        this.testsTimelines.push({desc: desc, timelines: timelines, timeUnit: timeUnit.toString()});
    }

    writeResultsToFile() {
        console.log("Writing results to file timelineData");
        console.log(this.testsTimelines);
        let record = JSON.stringify(this.testsTimelines);
        fs.writeFileSync("../timelineData.txt", record);
    }
}

const timelinesProcessor = new TimelinesProcessor();

module.exports = { timelinesProcessor }