import {PolarChart} from "ag-grid-enterprise/src/charts/chart/polarChart";
import {PieSeries} from "ag-grid-enterprise/src/charts/chart/series/pieSeries";
import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {BarSeries} from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";

function createPieChart() {
    const chart = new PolarChart(); // take parent as first argument
    const series = new PieSeries();
    series.data = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
    series.angleField = 'value';
    chart.series = [series];
}

function createBarChart() {
    const xAxis = new CategoryAxis();
    const yAxis = new NumberAxis();
    const chart = new CartesianChart(xAxis, yAxis);
    const series = new BarSeries();
    series.data = [{ x: 'Pat', y: 1 }, { x: 'Dan', y: 2 }, { x: 'Bob', y: 3 }, { x: 'Jes', y: 4 }];
    series.xField = 'x';
    series.yFields = ['y'];
    chart.series = [series];
}

function createLineChart() {
    const xAxis = new CategoryAxis();
    const yAxis = new NumberAxis();
    const chart = new CartesianChart(xAxis, yAxis);
    const series = new LineSeries();
    series.data = [{ x: 'Pat', y: 1 }, { x: 'Dan', y: 2 }, { x: 'Bob', y: 3 }, { x: 'Jes', y: 4 }];
    series.xField = 'x';
    series.yField = 'y';
    chart.series = [series];
}

document.addEventListener('DOMContentLoaded', () => {
    createPieChart();
    createBarChart();
    createLineChart();
});
