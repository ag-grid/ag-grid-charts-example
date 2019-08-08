import { CartesianChart } from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import { ScatterSeries } from "ag-grid-enterprise/src/charts/chart/series/scatterSeries";
import { Caption } from "ag-grid-enterprise/src/charts/caption";
import borneo from "ag-grid-enterprise/src/charts/chart/palettes";

import './app.css';
import { createButton } from "../../lib/ui";
import * as d3 from "d3";

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

    const chart = new CartesianChart(
        new NumberAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;
    chart.width = 1000;
    chart.height = 600;
    chart.xAxis.labelFormatter = params => params.value + ' cm';
    chart.yAxis.labelFormatter = params => params.value + ' Kg';
    chart.title = Caption.create({text: 'Height vs Weight of 507 Individuals'});
    chart.subtitle = Caption.create({
        text: 'by gender',
        fontSize: 14,
        fontFamily: 'Verdana, sans-serif',
        color: 'gray'
    });

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
        maleSeries.xField = 'height';
        maleSeries.yField = 'weight';
        maleSeries.radiusField = 'age';
        maleSeries.markerSize = 30;
        maleSeries.title = 'Male';
        maleSeries.tooltipEnabled = true;
        maleSeries.fill = 'rgba(227,111,106,0.61)';
        maleSeries.markerStrokeWidth = 0.5;

        const femaleSeries = new ScatterSeries();
        femaleSeries.data = femaleData;
        femaleSeries.xField = 'height';
        femaleSeries.yField = 'weight';
        femaleSeries.radiusField = 'age';
        femaleSeries.markerSize = 30;
        femaleSeries.title = 'Female';
        femaleSeries.tooltipEnabled = true;
        femaleSeries.fill = 'rgba(123,145,222,0.61)';
        femaleSeries.markerStrokeWidth = 0.5;

        chart.addSeries(maleSeries);
        chart.addSeries(femaleSeries);
    });

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });
}

function createAgeWeightGenderChart() {
    document.body.appendChild(document.createElement('br'));

    const chart = new CartesianChart(
        new NumberAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;
    chart.width = 1000;
    chart.height = 600;
    chart.xAxis.labelFormatter = params => params.value + ' yr';
    chart.yAxis.labelFormatter = params => params.value + ' Kg';
    chart.title = Caption.create({text: 'Age vs Weight of 507 Individuals'});
    chart.subtitle = Caption.create({
        text: 'by gender',
        fontSize: 14,
        fontFamily: 'Verdana, sans-serif',
        color: 'gray'
    });

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
        maleSeries.xField = 'age';
        maleSeries.yField = 'weight';
        maleSeries.title = 'Male';
        maleSeries.tooltipEnabled = true;
        maleSeries.fill = 'rgba(227,111,106,0.71)';
        maleSeries.markerStrokeWidth = 0.5;

        const femaleSeries = new ScatterSeries();
        femaleSeries.data = femaleData;
        femaleSeries.xField = 'age';
        femaleSeries.yField = 'weight';
        femaleSeries.title = 'Female';
        femaleSeries.tooltipEnabled = true;
        femaleSeries.fill = 'rgba(123,145,222,0.71)';
        femaleSeries.markerStrokeWidth = 0.5;

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
