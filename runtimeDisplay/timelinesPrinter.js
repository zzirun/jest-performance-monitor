import Chart from "chart.js/auto";
import randomColor from "randomcolor";
let colours = new Map();
colours.set("real time", "#b3b3b3")

async function handleTimelines() {
    addClearButton();
    const fileList = this.files;
    const file = await fileList.item(0).text();

    const record = JSON.parse(file);

    let visualizedTimelines = document.getElementById("visualizedTimelines");
        
    for (testNum in record) {
        // Printing test description
        let report = document.createElement("div");
        report.innerHTML = '<b>' + record[testNum].desc + '</b>';

        //Finding timings of timelines
        const timeUnit = record[testNum].timeUnit;
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
        let height = 200 + data[0].timeline.length * 18;
        timelineTableRow.style.height = height.toString() + "px";
        
        let longTimelineCell = document.createElement("td");
        const long = longestTiming(timings);
        printTimeline("Run with longest timing: " + long.toString() + timeUnit, 
                        data[timings.get(long)].timeline, 
                        longTimelineCell,
                        long,
                        timeUnit);

        let shortTimelineCell = document.createElement("td");
        const short = shortestTiming(timings);
        printTimeline("Run with shortest timing: " + short.toString() + timeUnit,
                        data[timings.get(short)].timeline, 
                        shortTimelineCell,
                        long,
                        timeUnit);
        
        let medianTimelineCell = document.createElement("td");
        const median = medianTiming(timings);
        printTimeline("Run with median timing: " + median.toString() + timeUnit, 
                        data[timings.get(median)].timeline, 
                        medianTimelineCell,
                        long,
                        timeUnit);

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

function printTimeline (title, times, report, long, timeUnit) {
    // Creating element
    let chart = document.createElement("canvas");
    report.appendChild(chart);

    // Filling in data
    let datasets = []

    maxY = times.length * 1.3

    for (i in times) {
        let data = times[i]

        //Generating colour
        let randomColors = randomColor({
            count: times.length, 
            luminosity: 'bright'
        })
        if (!colours.has(data.name)) {
            colours.set(data.name, randomColors[i])
        }
        let color = colours.get(data.name)
        console.log(color)
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
                        text: 'estimated duration (' + timeUnit + ')'
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

function clearTimelines() {
    document.getElementById("input").value = "";
    
    const visualizedTimelines = document.getElementById("visualizedTimelines");
    visualizedTimelines.replaceChildren();

    const legendContainer = document.getElementById("legend");
    legendContainer.replaceChildren();
    colours = new Map();

    document.getElementById("clearButton").remove();
}

function addClearButton() {
    if (!document.getElementById("clearButton")) {
        const inputPrompt = document.getElementById("inputPrompt");
        const clearButton = document.createElement('button');
        clearButton.setAttribute('id', "clearButton");
        clearButton.textContent = "Clear timelines";
        clearButton.addEventListener("click", clearTimelines);
        inputPrompt.appendChild(clearButton)
    }
}

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleTimelines, false);