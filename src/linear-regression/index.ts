import { CartesianChart } from "@ag-grid-enterprise/grid-charts/src/charts/chart/cartesianChart";
import { NumberAxis } from "@ag-grid-enterprise/grid-charts/src/charts/chart/axis/numberAxis";
import { LineSeries } from "@ag-grid-enterprise/grid-charts/src/charts/chart/series/lineSeries";
import { Caption } from "@ag-grid-enterprise/grid-charts/src/charts/caption";
import borneo from "@ag-grid-enterprise/grid-charts/src/charts/chart/palettes";
import { linearRegression } from "@ag-grid-enterprise/grid-charts/src/charts/util/stat";
import { data as timeData } from './data';

import { createButton } from "../../lib/ui";
import * as d3 from 'd3';
import { ScatterSeries } from "@ag-grid-enterprise/grid-charts/src/charts/chart/series/scatterSeries";

type Datum = {
    x: number,
    y: number
};

function createChart(data: Datum[]) {
    const chart = new CartesianChart({
        xAxis: new NumberAxis(),
        yAxis: new NumberAxis()
    });

    chart.xAxis.label.rotation = 45;
    chart.xAxis.label.formatter = params => new Date(params.value).toDateString();

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;
    // chart.padding = new Padding(20, 80, 20, 20);
    chart.title = new Caption();
    chart.title.text = 'S&P 500 weekly data (1950 to present)';

    const scatterSeries = new ScatterSeries();
    scatterSeries.title = 'Price Data';
    // scatterSeries.marker = true;
    scatterSeries.marker.strokeWidth = 0;
    // scatterSeries.showInLegend = false;
    scatterSeries.marker.size = 2;
    scatterSeries.data = data;
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    chart.addSeries(scatterSeries);

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });

    createButton('Load MSFT data', () => {
        d3.csv("../../data/MSFT.csv").then(rawData => {
            const data = rawData.map(datum => ({
                x: +new Date(datum.Date || 0),
                y: +(datum['Adj Close'] || 0)
            } as Datum));

            scatterSeries.data = data;
        });

        chart.series = chart.series.slice(0, 1);
        chart.title!.text = 'MSFT weekly data (2003 to 2013)';
    });

    createButton('Load GE data', () => {
        d3.csv("../../data/GE.csv").then(rawData => {
            const data = rawData.map(datum => ({
                x: +new Date(datum.Date || 0),
                y: +(datum['Adj Close'] || 0)
            } as Datum));

            scatterSeries.data = data;
        });

        chart.series = chart.series.slice(0, 1);
        chart.title!.text = 'GE weekly data (2009 to 2019)';
    });

    createButton('Linear Regression', () => {
        const data = scatterSeries.data;
        const X: number[] = [];
        const Y: number[] = [];
        data.forEach(datum => {
            X.push(datum.x);
            Y.push(datum.y);
        });

        const fit = linearRegression(X, Y);
        if (fit) {
            const { slope, intercept } = fit;

            const firstX = data[0].x;
            const lastX = data[data.length - 1].x;
            const firstY = slope * firstX + intercept;
            const lastY = slope * lastX + intercept;

            const slopeSeries = new LineSeries();
            slopeSeries.title = 'Linear Regression';
            slopeSeries.fill = borneo.fills[2];
            slopeSeries.stroke = borneo.strokes[2];
            slopeSeries.marker.enabled = false;
            slopeSeries.strokeWidth = 2;
            // slopeSeries.showInLegend = false;
            slopeSeries.data = [{ x: firstX, y: firstY }, { x: lastX, y: lastY }];
            slopeSeries.xKey = 'x';
            slopeSeries.yKey = 'y';

            chart.addSeries(slopeSeries);
        }
    });
}

function createTimeChart() {
    const chart = new CartesianChart({
        xAxis: new NumberAxis(),
        yAxis: new NumberAxis()
    });

    chart.title = new Caption();
    chart.title.text = 'Number axis time chart';
    chart.xAxis.label.rotation = 45;
    chart.xAxis.label.formatter = params => new Date(params.value).toDateString();

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.strokeWidth = 0;
    scatterSeries.marker.size = 2;
    scatterSeries.data = timeData.map(v => ({ x: v[0], y: v[1] }));
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    chart.addSeries(scatterSeries);
}

document.addEventListener('DOMContentLoaded', () => {
    d3.csv("../../data/sp500w.csv").then(rawData => {
        const data = rawData.map(datum => ({
            x: +new Date(datum.Date || 0),
            y: +(datum['Adj Close'] || 0)
        } as Datum));

        createChart(data);
    });

    createTimeChart();
});
