import { createButton, createSlider } from "../../lib/ui";
import * as d3 from "d3";
import { axisBottom } from "d3";
import { data } from "./data";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { makeChartResizeable } from "../../lib/chart";
import { ScatterSeries } from "../../charts/chart/series/cartesian/scatterSeries";
import { Caption } from "../../charts/caption";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { Square } from "../../charts/chart/marker/square";
import { Color } from "../../charts/util/color";
import { Circle } from "../../charts/chart/marker/circle";
import { Diamond } from "../../charts/chart/marker/diamond";
import { Cross } from "../../charts/chart/marker/cross";
import { Plus } from "../../charts/chart/marker/plus";
import { Triangle } from "../../charts/chart/marker/triangle";
import { AgChart } from "../../charts/chart/agChart";
import { CategoryAxis } from "../../charts/chart/axis/categoryAxis";
import { result } from "lodash";

type Datum = {
    gender: number,
    height: number,
    weight: number,
    age: number,
    name: string
};

/**

 Columns     Variable

 Skeletal Measurements:

 1 -  4   Biacromial diameter (see Fig. 2)
 6 -  9   Biiliac diameter, or "pelvic breadth" (see Fig. 2)
 11 - 14   Bitrochanteric diameter (see Fig. 2)
 16 - 19   Chest depth between spine and sternum at nipple level, mid-expiration
 21 - 24   Chest diameter at nipple level, mid-expiration
 26 - 29   Elbow diameter, sum of two elbows
 31 - 34   Wrist diameter, sum of two wrists
 36 - 39   Knee diameter, sum of two knees
 41 - 44   Ankle diameter, sum of two ankles

 Girth Measurements:

 46 - 50   Shoulder girth over deltoid muscles
 52 - 56   Chest girth, nipple line in males and just above breast
 tissue in females, mid-expiration
 58 - 62   Waist girth, narrowest part of torso below the rib cage,
 average of contracted and relaxed position
 64 - 68   Navel (or "Abdominal") girth at umbilicus and iliac crest,
 iliac crest as a landmark
 70 - 74   Hip girth at level of bitrochanteric diameter
 76 - 79   Thigh girth below gluteal fold, average of right and left
 girths
 81 - 84   Bicep girth, flexed, average of right and left girths
 86 - 89   Forearm girth, extended, palm up, average of right and
 left girths
 91 - 94   Knee girth over patella, slightly flexed position, average
 of right and left girths
 96 - 99   Calf maximum girth, average of right and left girths
 101 -104   Ankle minimum girth, average of right and left girths
 106 -109   Wrist minimum girth, average of right and left girths

 Other Measurements:

 111-114    Age (years)
 116-120    Weight (kg)
 122-126    Height (cm)
 128        Gender (1 - male, 0 - female)
 The first 21 variables are all measured in centimeters (cm).

 */

function createHeightWeightGenderChart() {
    document.body.appendChild(document.createElement('br'));

    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.formatter = params => params.value + ' cm';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;
    yAxis.label.formatter = params => params.value + ' Kg';

    const chart = new CartesianChart();
    makeChartResizeable(chart);
    chart.container = document.body;
    chart.width = 1000;
    chart.height = 600;
    chart.title = new Caption();
    chart.title.text = 'Height vs Weight of 507 Individuals';
    chart.title.fontSize = 18;
    chart.title.fontWeight = 'bold';
    chart.subtitle = new Caption();
    chart.subtitle.text = 'by gender';
    chart.subtitle.color = 'gray';
    chart.subtitle.fontSize = 14;
    chart.legend.item.marker.size = 12;
    chart.legend.item.marker.strokeWidth = 2;
    chart.legend.item.paddingY = 15;
    chart.tooltip.tracking = false;
    chart.axes = [xAxis, yAxis];

    createButton('Benchmark', () => {
        // 555 layouts in 10000 without using webworkers, 8.6% self-time for placeLabels
        console.profile();
        function changeHeight() {
            const { height } = chart;
            if (height > 600) {
                chart.height = height - 1;
            } else {
                chart.height = height + 1;
            }
        }
        let counter = 0;
        const startTime = Date.now();
        const duration = 10000;
        chart.addEventListener('layoutDone', () => {
            counter++;
            const now = Date.now();
            if (now - startTime < duration) {
                changeHeight();
            } else {
                console.profileEnd();
                console.log(`Performed ${counter} layouts in ${duration} milliseconds.`);
            }
        });
        changeHeight();
    });

    const maleSeries = new ScatterSeries();
    const femaleSeries = new ScatterSeries();

    const maleData: any[] = [];
    const femaleData: any[] = [];
    data.forEach((datum: any) => {
        if (datum.gender) {
            maleData.push(datum);
        } else {
            femaleData.push(datum);
        }
    });

    maleSeries.data = maleData;
    maleSeries.xKey = 'height';
    maleSeries.xName = 'Height';
    maleSeries.yKey = 'weight';
    maleSeries.yName = 'Weight';
    maleSeries.sizeKey = 'age';
    maleSeries.sizeName = 'Age';
    maleSeries.labelKey = 'name';
    maleSeries.marker.shape = Square;
    maleSeries.marker.maxSize = 30;
    maleSeries.label.enabled = true;
    maleSeries.fill = 'rgb(227,111,106)';
    maleSeries.fillOpacity = 0.61;
    maleSeries.stroke = Color.fromString(maleSeries.fill).darker().toHexString();
    console.log(maleSeries.stroke);
    maleSeries.strokeWidth = 0.5;
    maleSeries.title = 'Male';
    maleSeries.tooltip.enabled = true;

    femaleSeries.data = femaleData;
    femaleSeries.xKey = 'height';
    femaleSeries.yKey = 'weight';
    femaleSeries.sizeKey = 'age';
    femaleSeries.labelKey = 'name';
    femaleSeries.marker.shape = Circle;
    femaleSeries.marker.maxSize = 30;
    femaleSeries.label.enabled = true;
    femaleSeries.fill = 'rgb(123,145,222)';
    femaleSeries.fillOpacity = 0.61;
    femaleSeries.stroke = Color.fromString(femaleSeries.fill).darker().toHexString();
    console.log(femaleSeries.stroke);
    femaleSeries.title = 'Female';
    femaleSeries.tooltip.enabled = true;
    femaleSeries.strokeWidth = 0.5;

    chart.addSeries(maleSeries);
    chart.addSeries(femaleSeries);

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });

    createSlider('Marker type', [Circle, Square, Diamond, Cross, Plus, Triangle], v => {
        maleSeries.marker.shape = v;
    });

    createSlider('Marker fill', ['#57b757', '#41a9c9', '#4258c9'], v => {
        maleSeries.fill = v;
    });

    createSlider('Marker stroke', ['#3d803d', '#2d768d', '#2e3e8d'], v => {
        maleSeries.stroke = v;
    });

    createSlider('Marker stroke width', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], v => {
        maleSeries.strokeWidth = v;
    });

    maleSeries.marker.addPropertyListener('size', event => {
        console.log(`Changed 'size' from ${event.oldValue} to ${event.value}.`);
    });

    createSlider('Max marker size', [4, 8, 12, 16, 20, 30, 40, 50, 60, 70, 80], v => {
        femaleSeries.marker.maxSize = v;
        maleSeries.marker.maxSize = v;
    });

    createSlider('Label font size', [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], v => {
        femaleSeries.label.fontSize = v;
        maleSeries.label.fontSize = v;
    });

    createSlider('Marker enabled', [true, false], v => {
        maleSeries.marker.enabled = v;
    });

    createSlider('Marker fill opacity', [0, 0.2, 0.4, 0.6, 0.8, 1], v => {
        maleSeries.fillOpacity = v;
    });

    createSlider('Marker stroke opacity', [0, 0.2, 0.4, 0.6, 0.8, 1], v => {
        maleSeries.strokeOpacity = v;
    });
}

function createAgeWeightGenderChart() {
    document.body.appendChild(document.createElement('br'));

    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.formatter = params => params.value + ' yr';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;
    yAxis.label.formatter = params => params.value + ' Kg';

    const chart = new CartesianChart();
    makeChartResizeable(chart);
    chart.container = document.body;
    chart.width = 1000;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    chart.title = new Caption();
    chart.title.text = 'Age vs Weight of 507 Individuals';
    chart.title.fontSize = 18;
    chart.title.fontWeight = 'bold';
    chart.subtitle = new Caption();
    chart.subtitle.text = 'by gender';
    chart.subtitle.fontSize = 14;
    chart.subtitle.color = 'gray';

    const maleData: any[] = [];
    const femaleData: any[] = [];
    data.forEach((datum: any) => {
        if (datum.gender) {
            maleData.push(datum);
        } else {
            femaleData.push(datum);
        }
    });

    const maleSeries = new ScatterSeries();
    maleSeries.data = maleData;
    maleSeries.xKey = 'age';
    maleSeries.yKey = 'weight';
    maleSeries.title = 'Male';
    maleSeries.tooltip.enabled = true;
    maleSeries.marker.shape = Diamond;
    maleSeries.fill = 'rgba(227,111,106,0.71)';
    maleSeries.strokeWidth = 0.5;

    const femaleSeries = new ScatterSeries();
    femaleSeries.data = femaleData;
    femaleSeries.xKey = 'age';
    femaleSeries.yKey = 'weight';
    femaleSeries.title = 'Female';
    femaleSeries.tooltip.enabled = true;
    femaleSeries.marker.shape = Cross;
    femaleSeries.fill = 'rgba(123,145,222,0.71)';
    femaleSeries.strokeWidth = 0.5;

    chart.addSeries(maleSeries);
    chart.addSeries(femaleSeries);

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });
}

function createFakeScatterChart() {
    var data = [] as any;
    // y = kx + m
    var start = 1998;
    for (var x = start; x < 2013; x += 0.05) {
        var distance = Math.random() > 0.8 ? 20 : 10;
        var y = (4 + Math.random()) * (x - start) - 15 + (-distance / 2 + Math.random() * distance);
        data.push({
            time: x,
            mm: y
        });
    }
    // console.log(JSON.stringify(data, null, 4));

    var chart = AgChart.create({
        title: {
            text: 'Mean Sea Level (mm)'
        },
        container: document.body,
        data: data,
        series: [{
            type: 'scatter',
            xKey: 'time',
            yKey: 'mm'
        }],
        axes: [{
            type: 'number',
            position: 'bottom'
        }, {
            type: 'number',
            position: 'left'
        }]
    });
    makeChartResizeable(chart);
}

function createCategoryScatterChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new CategoryAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 400;
    chart.height = 300;

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.shape = Circle;
    scatterSeries.marker.enabled = true;
    chart.addSeries(scatterSeries);
    scatterSeries.tooltip.enabled = true;
    scatterSeries.data = [{
        x: 'Tea',
        y: 'John'
    }, {
        x: 'Coffee',
        y: 'Mary'
    }, {
        x: 'Milk',
        y: 'Ann'
    }];
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    document.body.appendChild(document.createElement('br'));

    createButton('Data #2', () => {
        scatterSeries.data = [{
            x: 'Tea',
            y: 'John'
        }, {
            x: 'Coffee',
            y: 'Ann'
        }, {
            x: 'Milk',
            y: 'Mary'
        }];
    });

    createButton('Data #3', () => {
        scatterSeries.data = [{
            x: 'UK',
            y: 'English'
        }, {
            x: 'US',
            y: 'English'
        }, {
            x: 'Spain',
            y: 'Spanish'
        }, {
            x: 'Singapore',
            y: 'English'
        }];
    });

    document.body.appendChild(document.createElement('br'));
}

function createLeftCategoryScatterChart() {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new CategoryAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 400;
    chart.height = 300;

    const lineSeries = new ScatterSeries();
    lineSeries.marker.shape = Circle;
    lineSeries.marker.enabled = true;
    chart.addSeries(lineSeries);
    lineSeries.tooltip.enabled = true;
    lineSeries.data = [{
        x: 5,
        y: 'John'
    }, {
        x: 3,
        y: 'Mary'
    }, {
        x: 7,
        y: 'Ann'
    }];
    lineSeries.xKey = 'x';
    lineSeries.yKey = 'y';

    document.body.appendChild(document.createElement('br'));
}

function createPunchCardChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.line.color = undefined;
    xAxis.tick.color = 'black';
    xAxis.gridStyle = [{
        stroke: '#999999',
        lineDash: [0, 5, 0]
    }];

    const yAxis = new CategoryAxis();
    yAxis.position = ChartAxisPosition.Left;
    yAxis.line.color = undefined;
    yAxis.tick.color = 'black';
    yAxis.gridStyle = [];

    const chart = new CartesianChart();
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.legend.enabled = false;
    chart.background.fill = '#f3f3f3';

    var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
    var days = ['Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

    var rawData = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
    var data = rawData.map(item => {
        return {
            hour: hours[item[1]],
            day: days[item[0]],
            size: item[2]
        };
    });

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.shape = Circle;
    scatterSeries.marker.fill = '#cc5b58dd';
    scatterSeries.marker.stroke = 'rgba(0,0,0,0)';
    scatterSeries.marker.enabled = true;
    scatterSeries.marker.size = 0;
    scatterSeries.marker.maxSize = 30;

    scatterSeries.tooltip.enabled = true;
    scatterSeries.data = data;
    scatterSeries.xKey = 'hour';
    scatterSeries.yKey = 'day';
    scatterSeries.sizeKey = 'size';
    chart.addSeries(scatterSeries);

    document.body.appendChild(document.createElement('br'));
}

document.addEventListener('DOMContentLoaded', () => {
    createHeightWeightGenderChart();
    // createAgeWeightGenderChart();
    // createFakeScatterChart();

    // createPunchCardChart();
    // createCategoryScatterChart();
    // createLeftCategoryScatterChart();
});