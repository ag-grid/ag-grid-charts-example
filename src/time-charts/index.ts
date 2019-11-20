import { CartesianChart } from "@ag-grid-enterprise/charts/src/charts/chart/cartesianChart";
import { NumberAxis } from "@ag-grid-enterprise/charts/src/charts/chart/axis/numberAxis";
import { TimeAxis } from "@ag-grid-enterprise/charts/src/charts/chart/axis/timeAxis";
import { data as timestampData } from './timestampData';
import { data as minuteData1 } from './minuteData1';
import { data as minuteData2 } from './minuteData2';
import { Chart } from "@ag-grid-enterprise/charts/src/charts/chart/chart";
import year from "@ag-grid-enterprise/charts/src/charts/util/time/year";
import month from "@ag-grid-enterprise/charts/src/charts/util/time/month";
import second from "@ag-grid-enterprise/charts/src/charts/util/time/second";
import { LineSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/cartesian/lineSeries";
import { ScatterSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/cartesian/scatterSeries";
import setDefaultLocale from "@ag-grid-enterprise/charts/src/charts/util/time/format/defaultLocale";
import { Padding } from "@ag-grid-enterprise/charts/src/charts/util/padding";
import { Circle } from "@ag-grid-enterprise/charts/src/charts/chart/marker/circle";
import { ChartAxisPosition } from "@ag-grid-enterprise/charts/src/charts/chart/chartAxis";

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
    const xAxis = new TimeAxis();
    xAxis.label.rotation = 45;
    xAxis.tick.count = month.every(6);
    xAxis.tick.format = '%b %Y';

    const yAxis = new NumberAxis();

    const chart = new CartesianChart();
    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.type = Circle;
    scatterSeries.marker.strokeWidth = 0;
    scatterSeries.marker.size = 2;
    scatterSeries.data = timestampData.map(v => ({ x: v[0], y: v[1] }));
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

function createTimeChart2() {
    const xAxis = new TimeAxis();
    xAxis.label.rotation = 45;
    xAxis.tick.count = year.every(2);
    xAxis.tick.format = '%Y';

    const yAxis = new NumberAxis();

    const chart = new CartesianChart();
    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.type = Circle;
    scatterSeries.marker.strokeWidth = 0;
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
    xAxis.tick.count = second.every(30);
    xAxis.tick.format = 'Rob %H:%M:%S';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.type = Circle;
    scatterSeries.marker.strokeWidth = 0;
    scatterSeries.marker.size = 8;
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
    xAxis.tick.count = second.every(30);
    xAxis.tick.format = '%H:%M:%S';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.type = Circle;
    scatterSeries.marker.strokeWidth = 0;
    scatterSeries.marker.size = 8;
    scatterSeries.data = minuteData1;
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y';

    const lineSeries = new LineSeries();
    lineSeries.fill = 'orange';
    lineSeries.stroke = 'black';
    lineSeries.marker.type = Circle;
    lineSeries.marker.strokeWidth = 0;
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
    xAxis.tick.count = year;
    xAxis.tick.format = '%A, %d %B, %Y';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.type = Circle;
    scatterSeries.marker.strokeWidth = 0;
    scatterSeries.marker.size = 2;
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
    xAxis.tick.count = second;
    xAxis.tick.format = '%H:%M:%S';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.padding = new Padding(20, 60, 20, 20);
    chart.parent = document.body;
    chart.width = 800;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];

    const lineSeries = new LineSeries();
    lineSeries.showInLegend = false;
    lineSeries.marker.type = Circle;
    lineSeries.marker.strokeWidth = 0;
    lineSeries.marker.size = 8;
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
