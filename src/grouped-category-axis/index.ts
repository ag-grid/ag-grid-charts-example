import { GroupedCategoryChart } from 'ag-charts-community/src/chart/groupedCategoryChart';
import { GroupedCategoryAxis } from 'ag-charts-community/src/chart/axis/groupedCategoryAxis';
import { Caption } from "ag-charts-community/src/caption";
import { NumberAxis } from 'ag-charts-community/src/chart/axis/numberAxis';
import { BarSeries } from 'ag-charts-community/src/chart/series/cartesian/barSeries';
import { LineSeries } from 'ag-charts-community/src/chart/series/cartesian/lineSeries';
import { createButton, createSlider } from '../../lib/ui';
import { Circle } from "ag-charts-community/src/chart/marker/circle";
import { Square } from "ag-charts-community/src/chart/marker/square";
import { ChartAxisPosition } from 'ag-charts-community/src/chart/chartAxis';
import { makeChartResizeable } from "../../lib/chart";

type CategoryDatum = {
    category: { labels: string[] },
    value: number,
    value2: number
};

const categoryData: CategoryDatum[] = [
    { category: { labels: ['London', 'England', 'UK', 'Europe'] }, value: 3, value2: 2 },
    { category: { labels: ['Bristol', 'England', 'UK', 'Europe'] }, value: 7, value2: 5 },
    { category: { labels: ['Glasgow', 'Scotland', 'UK', 'Europe'] }, value: 6, value2: 3 },
    { category: { labels: ['Austin', 'Texas', 'USA', 'North America'] }, value: 4, value2: 7 },
    { category: { labels: ['Austin', 'Texas', 'USA', 'North America'] }, value: 4, value2: 7 },
    { category: { labels: ['Seattle', 'Washington', 'USA', 'North America'] }, value: 8, value2: 5 },
    { category: { labels: ['San Jose', 'California', 'USA', 'North America'] }, value: 5, value2: 2 },
    { category: { labels: ['San Diego', 'California', 'USA', 'North America'] }, value: 6, value2: 3 },
    { category: { labels: ['San Francisco', 'California', 'USA', 'North America'] }, value: 3, value2: 4 },
    { category: { labels: ['Seattle'] }, value: 3, value2: 4 },
    { category: { labels: ['Seattle', 'Washington'] }, value: 3, value2: 4 }
];

const reducedCategoryData: CategoryDatum[] = [
    { category: { labels: ['London', 'England'] }, value: 3, value2: 2 },
    { category: { labels: ['Bristol', 'England'] }, value: 7, value2: 5 },
    { category: { labels: ['Glasgow', 'Scotland'] }, value: 6, value2: 3 },
    { category: { labels: ['Austin', 'Texas'] }, value: 4, value2: 7 },
    { category: { labels: ['Austin', 'Texas'] }, value: 4, value2: 7 },
    { category: { labels: ['Seattle', 'Washington'] }, value: 8, value2: 5 },
    { category: { labels: ['San Jose', 'California'] }, value: 5, value2: 2 },
    { category: { labels: ['San Diego', 'California'] }, value: 6, value2: 3 },
    { category: { labels: ['San Francisco', 'California'] }, value: 3, value2: 4 }
];

const noGroupData: CategoryDatum[] = [
    { category: { labels: ['London'] }, value: 3, value2: 2 },
    { category: { labels: ['Bristol'] }, value: 7, value2: 5 },
    { category: { labels: ['Glasgow'] }, value: 6, value2: 3 },
    { category: { labels: ['Austin'] }, value: 4, value2: 7 },
    { category: { labels: ['Austin'] }, value: 4, value2: 7 },
    { category: { labels: ['Seattle'] }, value: 8, value2: 5 },
    { category: { labels: ['San Jose'] }, value: 5, value2: 2 },
    { category: { labels: ['San Diego'] }, value: 6, value2: 3 },
    { category: { labels: ['San Francisco'] }, value: 3, value2: 4 }
];

function createCategoryColumnChart() {
    const xAxis = new GroupedCategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.tick.size = 20;
    xAxis.title = new Caption();
    xAxis.title.text = 'Cities';
    xAxis.title.fontSize = 18;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new GroupedCategoryChart();
    chart.container = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.axes = [xAxis, yAxis];
    chart.legend.enabled = true;

    const barSeries = new BarSeries();
    barSeries.data = categoryData;
    barSeries.xKey = 'category';
    barSeries.yKeys = ['value', 'value2'];
    barSeries.grouped = true;
    barSeries.fillOpacity = 0.3;

    const lineSeries = new LineSeries();
    lineSeries.marker.shape = Circle;
    lineSeries.fill = 'rgba(227,111,106,0.61)';
    lineSeries.data = categoryData;
    lineSeries.xKey = 'category';
    lineSeries.yKey = 'value';

    const lineSeries2 = new LineSeries();
    lineSeries2.marker.shape = Square;
    lineSeries2.fill = 'rgba(123,145,222,0.61)';
    lineSeries2.data = categoryData;
    lineSeries2.xKey = 'category';
    lineSeries2.yKey = 'value2';

    // chart.addSeries(barSeries);
    chart.addSeries(lineSeries);
    chart.addSeries(lineSeries2);

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });

    createButton('No data', () => {
        chart.data = [];
    });

    createButton('No x-key (line)', () => {
        lineSeries.xKey = '';
    });

    createButton('No y-key (line)', () => {
        lineSeries.yKey = '';
    });

    createButton('Single data point', () => {
        chart.data = categoryData.slice(0, 1);
    });

    createButton('Reduced category data', () => {
        chart.data = reducedCategoryData;
    });

    createButton('No groups data', () => {
        chart.data = noGroupData;
    });

    createButton('label grid ON', () => {
        xAxis.label.grid = true;
        xAxis.update();
    });
    createButton('label grid OFF', () => {
        xAxis.label.grid = false;
        xAxis.update();
    });

    createSlider('label rotation', [0, -45, 45, 90, -90], v => {
        xAxis.label.rotation = v;
        xAxis.update();
    });

    makeChartResizeable(chart);
}

function createCategoryBarChart() {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.tick.size = 20;
    xAxis.title = new Caption();
    xAxis.title.text = 'Cities';
    xAxis.title.fontSize = 18;

    const yAxis = new GroupedCategoryAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new GroupedCategoryChart();
    chart.container = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 1000;
    chart.padding.left = 60;
    chart.axes = [xAxis, yAxis];
    chart.legend.enabled = true;

    const barSeries = new BarSeries();
    barSeries.data = categoryData;
    barSeries.xKey = 'category';
    barSeries.yKeys = ['value', 'value2'];
    barSeries.grouped = true;
    barSeries.fillOpacity = 0.3;

    chart.addSeries(barSeries);

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });

    createButton('No data', () => {
        chart.data = [];
    });

    createButton('Single data point', () => {
        chart.data = categoryData.slice(0, 1);
    });

    createButton('Reduced category data', () => {
        chart.data = reducedCategoryData;
    });

    createButton('No groups data', () => {
        chart.data = noGroupData;
    });

    createButton('label grid ON', () => {
        yAxis.label.grid = true;
        yAxis.update();
    });
    createButton('label grid OFF', () => {
        yAxis.label.grid = false;
        yAxis.update();
    });

    createSlider('label rotation', [0, -45, 45, 90, -90], v => {
        yAxis.label.rotation = v;
        yAxis.update();
    });

    createSlider('label padding', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25], v => {
        yAxis.label.padding = v;
        yAxis.update();
    });

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryBarChart();
    createCategoryColumnChart();
});
