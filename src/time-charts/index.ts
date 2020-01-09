import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { TimeAxis } from "ag-charts-community/src/chart/axis/timeAxis";
import { data as timestampData } from './timestampData';
import { data as minuteData1 } from './minuteData1';
import { data as minuteData2 } from './minuteData2';
import year from "ag-charts-community/src/util/time/year";
import month from "ag-charts-community/src/util/time/month";
import second from "ag-charts-community/src/util/time/second";
import { LineSeries } from "ag-charts-community/src/chart/series/cartesian/lineSeries";
import { ScatterSeries } from "ag-charts-community/src/chart/series/cartesian/scatterSeries";
import setDefaultLocale from "ag-charts-community/src/util/time/format/defaultLocale";
import { Padding } from "ag-charts-community/src/util/padding";
import { Circle } from "ag-charts-community/src/chart/marker/circle";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";
import { makeChartResizeable } from "../../lib/chart";

function createTimeChart() {
    const xAxis = new TimeAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 45;
    xAxis.label.format = '%b %Y';
    xAxis.tick.count = month.every(6);

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.container = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.fill = 'red';
    scatterSeries.stroke = 'black';
    scatterSeries.strokeWidth = 0;
    scatterSeries.marker.shape = Circle;
    scatterSeries.marker.size = 2;
    scatterSeries.data = timestampData.map(v => ({ x: v[0], y: v[1] }));
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createTimeChart2() {
    const xAxis = new TimeAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 45;
    xAxis.label.format = '%Y';
    xAxis.tick.count = year.every(2);

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.container = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.fill = 'red';
    scatterSeries.stroke = 'black';
    scatterSeries.strokeWidth = 0;
    scatterSeries.marker.shape = Circle;
    scatterSeries.marker.size = 2;
    scatterSeries.data = timestampData.map(v => ({ x: v[0], y: v[1] }));
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createTimeChart3() {
    const xAxis = new TimeAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 45;
    xAxis.label.format = 'Rob %H:%M:%S';
    xAxis.tick.count = second.every(30);

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.container = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.shape = Circle;
    scatterSeries.marker.size = 8;
    scatterSeries.fill = 'red';
    scatterSeries.stroke = 'black';
    scatterSeries.strokeWidth = 0;
    scatterSeries.data = minuteData1;
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createComboTimeChart() {
    const xAxis = new TimeAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 45;
    xAxis.label.format = '%H:%M:%S';
    xAxis.tick.count = second.every(30);

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.container = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.fill = 'red';
    scatterSeries.stroke = 'black';
    scatterSeries.strokeWidth = 0;
    scatterSeries.marker.shape = Circle;
    scatterSeries.marker.size = 8;
    scatterSeries.data = minuteData1;
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    const lineSeries = new LineSeries();
    lineSeries.fill = 'orange';
    lineSeries.stroke = 'black';
    lineSeries.strokeWidth = 0;
    lineSeries.marker.shape = Circle;
    lineSeries.marker.size = 8;
    lineSeries.data = minuteData2;
    lineSeries.xKey = 'x';
    lineSeries.yKey = 'y';

    chart.addSeries(scatterSeries);
    chart.addSeries(lineSeries);

    makeChartResizeable(chart);
}

function createCustomLocaleTimeChart() {
    setDefaultLocale({
        dateTime: '%x %X',
        date: '%d.%m.%Y',
        time: '%-H:%M:%S',
        periods: ['', ''],
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortDays: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
        months: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    });

    const xAxis = new TimeAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = -90;
    xAxis.label.format = '%A, %d %B, %Y';
    xAxis.tick.count = year;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.container = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.shape = Circle;
    scatterSeries.marker.size = 2;
    scatterSeries.fill = 'red';
    scatterSeries.stroke = 'black';
    scatterSeries.strokeWidth = 0;
    scatterSeries.data = timestampData.map(v => ({ x: v[0], y: v[1] }));
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createRealTimeChart() {
    let seedX = Date.UTC(2019, 7, 11, 12, 32, 11);
    let seedY = 50.0;

    function generateNextX(): number {
        return (seedX += 1000);
    }
    function generateNextY(): number {
        return (seedY += (-2.5 + Math.random() * 5));
    }

    const data = Array.from({ length: 15 }, () => ({ x: generateNextX(), y: generateNextY() }));

    const xAxis = new TimeAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 45;
    xAxis.label.format = '%H:%M:%S';
    xAxis.tick.count = second;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.padding = new Padding(20, 60, 20, 20);
    chart.container = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const lineSeries = new LineSeries();
    lineSeries.showInLegend = false;
    lineSeries.marker.shape = Circle;
    lineSeries.marker.size = 8;
    lineSeries.strokeWidth = 0;
    lineSeries.data = data;
    lineSeries.xKey = 'x';
    lineSeries.yKey = 'y';

    chart.addSeries(lineSeries);

    setInterval(function() {
        data.shift();
        data.push({ x: generateNextX(), y: generateNextY() });
        lineSeries.data = data;
    }, 200);

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createTimeChart();
    createTimeChart2();
    createTimeChart3();
    createComboTimeChart();
    createCustomLocaleTimeChart();
    createRealTimeChart();
});
