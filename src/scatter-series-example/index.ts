import { CartesianChart } from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import { ScatterSeries } from "ag-grid-enterprise/src/charts/chart/series/scatterSeries";
import { Caption } from "ag-grid-enterprise/src/charts/chart/caption";
import borneo from "ag-grid-enterprise/src/charts/chart/palettes";

import './app.css';
import { createButton } from "../../lib/ui";
import * as d3 from "d3";

// === Description ===
// Gender : Male / Female
// Height : Number (cm)
// Weight : Number (Kg)
// Index :
//     0 - Extremely Weak
//     1 - Weak
//     2 - Normal
//     3 - Overweight
//     4 - Obesity
//     5 - Extreme Obesity

type Datum = {
    gender: string,
    height: number,
    weight: number,
    index: number
};

function createNumericLineChart() {
    document.body.appendChild(document.createElement('br'));

    const chart = new CartesianChart(
        new NumberAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;
    chart.width = 1000;
    chart.height = 600;
    chart.xAxis.labelFormatter = label => label + ' cm';
    chart.yAxis.labelFormatter = label => label + ' Kg';
    chart.title = Caption.create({text: 'Height vs Weight of 500 Individuals'});
    chart.subtitle = Caption.create({text: 'by gender', font: '14px Verdana, sans-serif', color: 'gray'});

    d3.csv("../../data/height-weight.csv").then(rawData => {
        const maleData: Datum[] = [];
        const femaleData: Datum[] = [];
        rawData.forEach((rawDatum: any) => {
            const datum = {
                gender: rawDatum.Gender as string,
                height: +rawDatum.Height,
                weight: +rawDatum.Weight,
                index: +rawDatum.Index
            } as Datum;
            if (datum.gender === 'Male') {
                maleData.push(datum);
            } else {
                femaleData.push(datum);
            }
        });

        const maleSeries = new ScatterSeries();
        maleSeries.data = maleData;
        maleSeries.xField = 'height';
        maleSeries.yField = 'weight';
        maleSeries.title = 'Male';
        maleSeries.tooltipEnabled = true;
        maleSeries.fill = 'rgba(227,111,106,0.71)';
        maleSeries.markerStrokeWidth = 0.5;

        const femaleSeries = new ScatterSeries();
        femaleSeries.data = femaleData;
        femaleSeries.xField = 'height';
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
        chart.scene.download({fileName: 'chart'});
    });

}

document.addEventListener('DOMContentLoaded', () => {
    createNumericLineChart();
});
