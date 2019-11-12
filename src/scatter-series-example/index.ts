import './app.css';
import { createButton, createSlider } from "../../lib/ui";
import * as d3 from "d3";
import { CartesianChart } from "@ag-grid-enterprise/charts/src/charts/chart/cartesianChart";
import { NumberAxis } from "@ag-grid-enterprise/charts/src/charts/chart/axis/numberAxis";
import { Caption } from "@ag-grid-enterprise/charts/src/charts/caption";
import { ScatterSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/scatterSeries";
import { Circle } from "@ag-grid-enterprise/charts/src/charts/chart/marker/circle";
import { Square } from "@ag-grid-enterprise/charts/src/charts/chart/marker/square";
import { Diamond } from "@ag-grid-enterprise/charts/src/charts/chart/marker/diamond";
import { Cross } from "@ag-grid-enterprise/charts/src/charts/chart/marker/cross";
import { Plus } from "@ag-grid-enterprise/charts/src/charts/chart/marker/plus";
import { Triangle } from "@ag-grid-enterprise/charts/src/charts/chart/marker/triangle";
import { Color } from '@ag-enterprise/charts/src/charts/util/color';
import { makeChartResizeable } from "../../lib/chart";

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

    const chart = new CartesianChart({
        xAxis: new NumberAxis(),
        yAxis: new NumberAxis()
    });
    makeChartResizeable(chart);
    chart.parent = document.body;
    chart.width = 1000;
    chart.height = 600;
    chart.xAxis.label.formatter = params => params.value + ' cm';
    chart.yAxis.label.formatter = params => params.value + ' Kg';
    chart.title = new Caption();
    chart.title.text = 'Height vs Weight of 507 Individuals';
    chart.title.fontSize = 18;
    chart.title.fontWeight = 'bold';
    chart.subtitle = new Caption();
    chart.subtitle.text = 'by gender';
    chart.subtitle.color = 'gray';
    chart.subtitle.fontSize = 14;
    chart.legend.markerSize = 12;
    chart.legend.markerStrokeWidth = 2;
    chart.legend.itemPaddingY = 15;

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
        maleSeries.marker.type = Square;
        maleSeries.marker.size = 30;
        maleSeries.marker.fill = 'rgb(227,111,106)';
        maleSeries.marker.fillOpacity = 0.61;
        maleSeries.marker.stroke = Color.fromString(maleSeries.marker.fill).darker().toHexString();
        maleSeries.title = 'Male';
        maleSeries.tooltipEnabled = true;
        maleSeries.marker.strokeWidth = 0.5;

        femaleSeries.data = femaleData;
        femaleSeries.xKey = 'height';
        femaleSeries.yKey = 'weight';
        femaleSeries.sizeKey = 'age';
        femaleSeries.marker.type = Circle;
        femaleSeries.marker.size = 30;
        femaleSeries.marker.fill = 'rgb(123,145,222)';
        femaleSeries.marker.fillOpacity = 0.61;
        femaleSeries.marker.stroke = Color.fromString(femaleSeries.marker.fill).darker().toHexString();
        femaleSeries.title = 'Female';
        femaleSeries.tooltipEnabled = true;
        femaleSeries.marker.strokeWidth = 0.5;

        chart.addSeries(maleSeries);
        chart.addSeries(femaleSeries);
    });

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });

    createSlider('Marker type', [Circle, Square, Diamond, Cross, Plus, Triangle], v => {
        maleSeries.marker.type = v;
    });

    createSlider('Marker fill', ['#57b757', '#41a9c9', '#4258c9'], v => {
        maleSeries.marker.fill = v;
    });

    createSlider('Marker stroke', ['#3d803d', '#2d768d', '#2e3e8d'], v => {
        maleSeries.marker.stroke = v;
    });

    createSlider('Marker stroke width', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], v => {
        maleSeries.marker.strokeWidth = v;
    });

    maleSeries.marker.addListener('size', function (marker, oldValue, value) {
        console.log(`Changed 'size' from ${oldValue} to ${value}.`);
    });

    createSlider('Marker size', [4, 8, 12, 16, 20, 30, 40, 50, 60, 70, 80], v => {
        maleSeries.marker.size = v;
    });

    createSlider('Marker enabled', [true, false], v => {
        maleSeries.marker.enabled = v;
    });

    createSlider('Marker fill opacity', [0, 0.2, 0.4, 0.6, 0.8, 1], v => {
        maleSeries.marker.fillOpacity = v;
    });

    createSlider('Marker stroke opacity', [0, 0.2, 0.4, 0.6, 0.8, 1], v => {
        maleSeries.marker.strokeOpacity = v;
    });
}

function createAgeWeightGenderChart() {
    document.body.appendChild(document.createElement('br'));

    const chart = new CartesianChart({
        xAxis: new NumberAxis(),
        yAxis: new NumberAxis()
    });
    makeChartResizeable(chart);
    chart.parent = document.body;
    chart.width = 1000;
    chart.height = 600;
    chart.xAxis.label.formatter = params => params.value + ' yr';
    chart.yAxis.label.formatter = params => params.value + ' Kg';
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
        maleSeries.marker.type = Diamond;
        maleSeries.marker.fill = 'rgba(227,111,106,0.71)';
        maleSeries.marker.strokeWidth = 0.5;

        const femaleSeries = new ScatterSeries();
        femaleSeries.data = femaleData;
        femaleSeries.xKey = 'age';
        femaleSeries.yKey = 'weight';
        femaleSeries.title = 'Female';
        femaleSeries.tooltipEnabled = true;
        femaleSeries.marker.type = Cross;
        femaleSeries.marker.fill = 'rgba(123,145,222,0.71)';
        femaleSeries.marker.strokeWidth = 0.5;

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
