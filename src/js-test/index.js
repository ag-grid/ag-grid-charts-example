import { PolarChart } from "ag-charts-community/src/chart/polarChart";
import { PieSeries } from "ag-charts-community/src/chart/series/polar/pieSeries";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { CategoryAxis } from "ag-charts-community/src/chart/axis/categoryAxis";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { BarSeries } from "ag-charts-community/src/chart/series/cartesian/barSeries";
import { LineSeries } from "ag-charts-community/src/chart/series/cartesian/lineSeries";

// test of JS as opposed to TS, to verify the library is accessible from plain javascript

function createPieChart() {
    const chart = new PolarChart();
    chart.width = 400;
    chart.height = 300;
    chart.container = document.body;

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
    chart.width = 400;
    chart.height = 300;
    chart.container = document.body;
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
    chart.width = 400;
    chart.height = 300;
    chart.container = document.body;
    chart.axes = [xAxis, yAxis];

    const series = new LineSeries();
    series.data = [{ x: 'Pat', y: 1 }, { x: 'Dan', y: 2 }, { x: 'Bob', y: 3 }, { x: 'Jes', y: 4 }];
    series.xKey = 'x';
    series.yKey = 'y';
    chart.series = [series];
}

function createFirstChartExample() {
    const peopleData = [{
        name: 'Claire',
        theater: 25,
        cinema: 10

    }, {
        name: 'John',
        theater: 11,
        cinema: 20
    }, {
        name: 'Mary',
        theater: 21,
        cinema: 12
    }];

    function createColumnChart1() {
        const chart = new CartesianChart();
        chart.width = 400;
        chart.height = 300;
        chart.container = document.body;

        const xAxis = new CategoryAxis();
        xAxis.position = 'bottom';

        const yAxis = new NumberAxis();
        yAxis.position = 'left';

        chart.axes = [xAxis, yAxis];

        const barSeries = new BarSeries();
        barSeries.data = peopleData;
        barSeries.xKey = 'name';
        barSeries.yKeys = ['theater'];

        chart.series = [barSeries];
    }

    function createColumnChart2() {
        const chart = new CartesianChart();
        chart.width = 400;
        chart.height = 300;
        chart.container = document.body;

        const xAxis = new CategoryAxis();
        xAxis.position = 'bottom';

        const yAxis = new NumberAxis();
        yAxis.position = 'left';

        chart.axes = [xAxis, yAxis];

        const barSeries = new BarSeries();
        barSeries.data = peopleData;
        barSeries.xKey = 'name';
        barSeries.yKeys = ['theater', 'cinema'];

        chart.series = [barSeries];
    }

    function createColumnChart3() {
        const chart = new CartesianChart();
        chart.width = 400;
        chart.height = 300;
        chart.container = document.body;

        const xAxis = new CategoryAxis();
        xAxis.position = 'bottom';

        const yAxis = new NumberAxis();
        yAxis.position = 'left';

        chart.axes = [xAxis, yAxis];

        const barSeries = new BarSeries();
        barSeries.data = peopleData;
        barSeries.xKey = 'name';
        barSeries.yKeys = ['theater', 'cinema'];
        barSeries.grouped = true;

        chart.series = [barSeries];
    }

    createColumnChart1();
    createColumnChart2();
    createColumnChart3();
}

document.addEventListener('DOMContentLoaded', () => {
    createPieChart();
    createBarChart();
    createLineChart();

    createFirstChartExample();
});
