import { createButton, createSlider } from "../../lib/ui";
import * as d3 from "d3";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { Caption } from "ag-charts-community/src/caption";
import { ScatterSeries } from "ag-charts-community/src/chart/series/cartesian/scatterSeries";
import { Circle } from "ag-charts-community/src/chart/marker/circle";
import { Square } from "ag-charts-community/src/chart/marker/square";
import { Diamond } from "ag-charts-community/src/chart/marker/diamond";
import { Cross } from "ag-charts-community/src/chart/marker/cross";
import { Plus } from "ag-charts-community/src/chart/marker/plus";
import { Triangle } from "ag-charts-community/src/chart/marker/triangle";
import { Color } from 'ag-charts-community/src/util/color';
import { makeChartResizeable } from "../../lib/chart";
import { ChartAxisPosition } from 'ag-charts-community/src/chart/chartAxis';

type Datum = {
    gender: number,
    height: number,
    weight: number,
    age: number
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
    chart.legend.markerSize = 12;
    chart.legend.strokeWidth = 2;
    chart.legend.layoutVerticalSpacing = 15;
    chart.axes = [xAxis, yAxis];

    const maleSeries = new ScatterSeries();
    const femaleSeries = new ScatterSeries();

    d3.csv("../../data/body-data.csv").then(rawData => {
        const maleData: any[] = [];
        const femaleData: any[] = [];
        rawData.forEach((rawDatum: any) => {
            const datum = {
                gender: +rawDatum.Gender,
                height: +rawDatum.Height,
                weight: +rawDatum.Weight,
                age: +rawDatum.Age
            } as Datum;

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
        maleSeries.marker.shape = Square;
        maleSeries.marker.size = 30;
        maleSeries.fill = 'rgb(227,111,106)';
        maleSeries.fillOpacity = 0.61;
        maleSeries.stroke = Color.fromString(maleSeries.fill).darker().toHexString();
        maleSeries.strokeWidth = 0.5;
        maleSeries.title = 'Male';
        maleSeries.tooltipEnabled = true;

        femaleSeries.data = femaleData;
        femaleSeries.xKey = 'height';
        femaleSeries.yKey = 'weight';
        femaleSeries.sizeKey = 'age';
        femaleSeries.marker.shape = Circle;
        femaleSeries.marker.size = 30;
        femaleSeries.fill = 'rgb(123,145,222)';
        femaleSeries.fillOpacity = 0.61;
        femaleSeries.stroke = Color.fromString(femaleSeries.fill).darker().toHexString();
        femaleSeries.title = 'Female';
        femaleSeries.tooltipEnabled = true;
        femaleSeries.strokeWidth = 0.5;

        chart.addSeries(maleSeries);
        chart.addSeries(femaleSeries);
    });

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

    createSlider('Marker size', [4, 8, 12, 16, 20, 30, 40, 50, 60, 70, 80], v => {
        maleSeries.marker.size = v;
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

    d3.csv("../../data/body-data.csv").then(rawData => {
        const maleData: any[] = [];
        const femaleData: any[] = [];
        rawData.forEach((rawDatum: any) => {
            const datum = {
                gender: +rawDatum.Gender,
                height: +rawDatum.Height,
                weight: +rawDatum.Weight,
                age: +rawDatum.Age
            } as Datum;

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
        maleSeries.tooltipEnabled = true;
        maleSeries.marker.shape = Diamond;
        maleSeries.fill = 'rgba(227,111,106,0.71)';
        maleSeries.strokeWidth = 0.5;

        const femaleSeries = new ScatterSeries();
        femaleSeries.data = femaleData;
        femaleSeries.xKey = 'age';
        femaleSeries.yKey = 'weight';
        femaleSeries.title = 'Female';
        femaleSeries.tooltipEnabled = true;
        femaleSeries.marker.shape = Cross;
        femaleSeries.fill = 'rgba(123,145,222,0.71)';
        femaleSeries.strokeWidth = 0.5;

        chart.addSeries(maleSeries);
        chart.addSeries(femaleSeries);
    });

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createHeightWeightGenderChart();
    createAgeWeightGenderChart();
});
