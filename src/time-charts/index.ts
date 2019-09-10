import { CartesianChart } from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import { TimeAxis } from "ag-grid-enterprise/src/charts/chart/axis/timeAxis";
import { data as timestampData } from './timestampData';
import { data as minuteData1 } from './minuteData1';
import { data as minuteData2 } from './minuteData2';

import { ScatterSeries } from "ag-grid-enterprise/src/charts/chart/series/scatterSeries";
import { Chart } from "ag-grid-enterprise/src/charts/chart/chart";
import year from "ag-grid-enterprise/src/charts/util/time/year";
import month from "ag-grid-enterprise/src/charts/util/time/month";
import minute from "ag-grid-enterprise/src/charts/util/time/minute";
import second from "ag-grid-enterprise/src/charts/util/time/second";
import { LineSeries } from "ag-grid-enterprise/src/charts/chart/series/lineSeries";

function makeChartResizeable(chart: Chart) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let chartSize: [number, number];
    const scene = chart.scene;

    scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        chartSize = chart.size;
        isDragging = true;
    });
    scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            chart.size = [chartSize[0] + dx, chartSize[1] + dy];
        }
    });
    scene.canvas.element.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function createTimeChart() {
    const chart = new CartesianChart({
        xAxis: new TimeAxis(),
        yAxis: new NumberAxis()
    });

    chart.xAxis.labelRotation = 45;
    chart.xAxis.tickCount = month.every(6);
    chart.xAxis.tickFormat = '%b %Y';

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;

    const scatterSeries = new ScatterSeries();
    scatterSeries.markerStrokeWidth = 0;
    scatterSeries.markerSize = 2;
    scatterSeries.data = timestampData.map(v => ({x: v[0], y: v[1]}));
    scatterSeries.xField = 'x';
    scatterSeries.yField = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createTimeChart2() {
    const chart = new CartesianChart({
        xAxis: new TimeAxis(),
        yAxis: new NumberAxis()
    });

    chart.xAxis.labelRotation = 45;
    chart.xAxis.tickCount = year.every(2);
    chart.xAxis.tickFormat = '%Y';

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;

    const scatterSeries = new ScatterSeries();
    scatterSeries.markerStrokeWidth = 0;
    scatterSeries.markerSize = 2;
    scatterSeries.data = timestampData.map(v => ({x: v[0], y: v[1]}));
    scatterSeries.xField = 'x';
    scatterSeries.yField = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createTimeChart3() {
    const chart = new CartesianChart({
        xAxis: new TimeAxis(),
        yAxis: new NumberAxis()
    });

    chart.xAxis.labelRotation = 45;
    chart.xAxis.tickCount = second.every(30);
    chart.xAxis.tickFormat = '%H:%M:%S';

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;

    const scatterSeries = new ScatterSeries();
    scatterSeries.markerStrokeWidth = 0;
    scatterSeries.markerSize = 8;
    scatterSeries.data = minuteData1;
    scatterSeries.xField = 'x';
    scatterSeries.yField = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createComboTimeChart() {
    const chart = new CartesianChart({
        xAxis: new TimeAxis(),
        yAxis: new NumberAxis()
    });

    chart.xAxis.labelRotation = 45;
    chart.xAxis.tickCount = second.every(30);
    chart.xAxis.tickFormat = '%H:%M:%S';

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;

    const scatterSeries = new ScatterSeries();
    scatterSeries.markerStrokeWidth = 0;
    scatterSeries.markerSize = 8;
    scatterSeries.data = minuteData1;
    scatterSeries.xField = 'x';
    scatterSeries.yField = 'y';

    const lineSeries = new LineSeries();
    lineSeries.fill = 'orange';
    lineSeries.stroke = 'black';
    lineSeries.markerStrokeWidth = 0;
    lineSeries.markerSize = 8;
    lineSeries.data = minuteData2;
    lineSeries.xField = 'x';
    lineSeries.yField = 'y';

    chart.addSeries(scatterSeries);
    chart.addSeries(lineSeries);

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createTimeChart();
    createTimeChart2();
    createTimeChart3();
    createComboTimeChart();
});
