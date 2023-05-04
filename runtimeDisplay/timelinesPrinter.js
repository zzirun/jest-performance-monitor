import Chart from "chart.js/auto";
import randomColor from "randomcolor";
let colours = new Map();

async function handleTimelines() {
    const fileList = this.files;
    const file = await fileList.item(0).text();

    const record = JSON.parse(file);
    console.log(record);

    let visualizedTimelines = document.getElementById("visualizedTimelines");
        
    for (testNum in record) {
        // Printing test description
        console.log(record[testNum]);
        let report = document.createElement("div");
        report.innerHTML = '<b>' + record[testNum].desc + '</b>';

        //Finding timings of timelines
        const data = record[testNum].timelines;
        const timings = new Map();
        for (timelineNum in data) {
            const timing = data[timelineNum].timing;
            timings.set(timing, timelineNum);
        }
        
        // Printing timelines
        let timelineTable = document.createElement("table");
        timelineTable.style.width = "100%";
        timelineTable.style.tableLayout = "fixed";
        let timelineTableRow = document.createElement("tr");
        let height = data[0].timeline.length < 5 ? 200 : 300;
        timelineTableRow.style.height = height.toString() + "px";
        
        let longTimelineCell = document.createElement("td");
        const long = longestTiming(timings);
        printTimeline("Run with longest timing: " + long.toString() + "ms", 
                        data[timings.get(long)].timeline, 
                        longTimelineCell,
                        long);

        let shortTimelineCell = document.createElement("td");
        const short = shortestTiming(timings);
        printTimeline("Run with shortest timing: " + short.toString() + "ms",
                        data[timings.get(short)].timeline, 
                        shortTimelineCell,
                        long);
        
        let medianTimelineCell = document.createElement("td");
        const median = medianTiming(timings);
        printTimeline("Run with median timing: " + median.toString() + "ms", 
                        data[timings.get(median)].timeline, 
                        medianTimelineCell,
                        long);

        //Appending printed timelines to report
        timelineTableRow.appendChild(longTimelineCell);
        timelineTableRow.appendChild(shortTimelineCell);
        timelineTableRow.appendChild(medianTimelineCell);

        timelineTable.appendChild(timelineTableRow);
        report.appendChild(timelineTable);
        visualizedTimelines.appendChild(report);
    }

    // Printing Legend
    printLegend();
}

function longestTiming(timings) {
    return maxTime = Math.max(...timings.keys());
}

function shortestTiming(timings) {
    return minTime = Math.min(...timings.keys());
}

function medianTiming(timings) {
    const times = [...timings.keys()]
    return medianTime = times.slice().sort((a, b) => a - b)[Math.floor(times.length / 2)];
}

function printTimeline (title, times, report, long) {
    console.log(times);

    // Creating element
    let chart = document.createElement("canvas");
    report.appendChild(chart);

    // Filling in data
    let datasets = []

    maxY = times.length * 1.5

    for (i in times) {
        let data = times[i]
        console.log(data)

        //Generating colour
        let randomColors = randomColor({
            count: times.length, 
            luminosity: 'bright'
        })
        if (!colours.has(data.name)) {
            colours.set(data.name, randomColors[i])
        }
        let color = colours.get(data.name)
        
        datasets.push({
            label: data.name,
            backgroundColor: color,
            borderColor: color,
            fill: false,
            borderWidth : 15,
            pointRadius : 0,
            data: [{x: data.start, y: i}, {x: data.end, y: i}]
        })
    }

    // Plotting chart from data at element
    var timeline = new Chart(chart, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'dataset',
            },
            plugins: {
                legend: {
                    display : false
                },
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            let name = 'Start: ';
                            if (context.dataIndex > 0) {
                                name = 'End: ';
                            }
                            return name + context.label + 'ms';
                        }
                    }
                }
            }, 
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'estimated duration (ms)'
                    },
                    type: 'linear',
                    position: 'bottom',
                    ticks : {
                        beginAtzero :true,
                        stepSize : 1,
                        max: long
                    }
                },
                y: {
                    display: false,
                    stepSize: 1,
                    min: -1,
                    max: maxY
                }
            }
        }
    });
    
}

function printLegend() {
    const legendContainer = document.getElementById("legend");
    legendContainer.innerHTML = '<b>Legend:</b>'
    legendContainer.style.display = 'flex';
    legendContainer.style.flexDirection = 'row';
    legendContainer.style.margin = 0;
    legendContainer.style.padding = 0;

    for (let [name, colour] of colours.entries()) {
        // Containe
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = colour;
        boxSpan.style.borderColor = colour;
        boxSpan.style.borderWidth = '3px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = 'dimgray';
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;

        const text = document.createTextNode(name);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        legendContainer.appendChild(li);
    }
}

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleTimelines, false);