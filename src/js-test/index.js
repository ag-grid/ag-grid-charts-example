import { PolarChart } from "@ag-grid-enterprise/charts/src/charts/chart/polarChart";
import { PieSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/polar/pieSeries";
import { CartesianChart } from "@ag-grid-enterprise/charts/src/charts/chart/cartesianChart";
import { CategoryAxis } from "@ag-grid-enterprise/charts/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "@ag-grid-enterprise/charts/src/charts/chart/axis/numberAxis";
import { BarSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/cartesian/barSeries";
import { LineSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/cartesian/lineSeries";

function createPieChart() {
    const chart = new PolarChart();
    chart.parent = document.body;

    const series = new PieSeries();
    series.data = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
    series.angleKey = 'value';
    chart.series = [series];
}

function createBarChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = 'bottom';

    const yAxis = new NumberAxis();
    yAxis.position = 'left';

    const chart = new CartesianChart();
    chart.parent = document.body;
    chart.axes = [xAxis, yAxis];

    const series = new BarSeries();
    series.data = [{ x: 'Pat', y: 1 }, { x: 'Dan', y: 2 }, { x: 'Bob', y: 3 }, { x: 'Jes', y: 4 }];
    series.xKey = 'x';
    series.yKeys = ['y'];
    chart.series = [series];
}

function createLineChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = 'bottom';

    const yAxis = new NumberAxis();
    yAxis.position = 'left';

    const chart = new CartesianChart();
    chart.parent = document.body;
    chart.axes = [xAxis, yAxis];

    const series = new LineSeries();
    series.data = [{ x: 'Pat', y: 1 }, { x: 'Dan', y: 2 }, { x: 'Bob', y: 3 }, { x: 'Jes', y: 4 }];
    series.xKey = 'x';
    series.yKey = 'y';
    chart.series = [series];
}

document.addEventListener('DOMContentLoaded', () => {
    createPieChart();
    createBarChart();
    createLineChart();
});
