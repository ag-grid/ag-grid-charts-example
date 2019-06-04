import {PolarChart} from "ag-grid-enterprise/src/charts/chart/polarChart";
import {PieSeries} from "ag-grid-enterprise/src/charts/chart/series/pieSeries";
import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {BarSeries} from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";

function createPieChart() {
    const chart = new PolarChart();
    chart.parent = document.body;

    const series = new PieSeries();
    series.data = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
    series.angleField = 'value';
    chart.series = [series];
}

function createBarChart() {
    const chart = new CartesianChart(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;

    const series = new BarSeries();
    series.data = [{ x: 'Pat', y: 1 }, { x: 'Dan', y: 2 }, { x: 'Bob', y: 3 }, { x: 'Jes', y: 4 }];
    series.xField = 'x';
    series.yFields = ['y'];
    chart.series = [series];
}

function createLineChart() {
    const chart = new CartesianChart(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;

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
