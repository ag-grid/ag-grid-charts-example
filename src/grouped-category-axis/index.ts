import { GroupedCategoryChart } from 'ag-grid-enterprise/src/charts/chart/groupedCategoryChart';
import { Chart } from 'ag-grid-enterprise/src/charts/chart/chart';
import { GroupedCategoryAxis } from 'ag-grid-enterprise/src/charts/chart/axis/groupedCategoryAxis';
import { Caption } from "ag-grid-enterprise/src/charts/caption";
import { NumberAxis } from 'ag-grid-enterprise/src/charts/chart/axis/numberAxis';
import { BarSeries } from 'ag-grid-enterprise/src/charts/chart/series/barSeries';
import { LineSeries } from 'ag-grid-enterprise/src/charts/chart/series/lineSeries';
import { createButton, createSlider } from '../../lib/ui';

type CategoryDatum = {
    category: {labels: string[]},
    value: number,
    value2: number
};

const categoryData: CategoryDatum[] = [
    {category: {labels: ['London', 'England', 'UK', 'Europe']}, value: 3, value2: 2},
    {category: {labels: ['Bristol', 'England', 'UK', 'Europe']}, value: 7, value2: 5},
    {category: {labels: ['Glasgow', 'Scotland', 'UK', 'Europe']}, value: 6, value2: 3},
    {category: {labels: ['Austin', 'Texas', 'USA', 'North America']}, value: 4, value2: 7},
    {category: {labels: ['Austin', 'Texas', 'USA', 'North America']}, value: 4, value2: 7},
    {category: {labels: ['Seattle', 'Washington', 'USA', 'North America']}, value: 8, value2: 5},
    {category: {labels: ['San Jose', 'California', 'USA', 'North America']}, value: 5, value2: 2},
    {category: {labels: ['San Diego', 'California', 'USA', 'North America']}, value: 6, value2: 3},
    {category: {labels: ['San Francisco', 'California', 'USA', 'North America']}, value: 3, value2: 4},
    {category: {labels: ['Seattle']}, value: 3, value2: 4},
    {category: {labels: ['Seattle', 'Washington']}, value: 3, value2: 4}
];

const reducedCategoryData: CategoryDatum[] = [
    {category: {labels: ['London', 'England']}, value: 3, value2: 2},
    {category: {labels: ['Bristol', 'England']}, value: 7, value2: 5},
    {category: {labels: ['Glasgow', 'Scotland']}, value: 6, value2: 3},
    {category: {labels: ['Austin', 'Texas']}, value: 4, value2: 7},
    {category: {labels: ['Austin', 'Texas']}, value: 4, value2: 7},
    {category: {labels: ['Seattle', 'Washington']}, value: 8, value2: 5},
    {category: {labels: ['San Jose', 'California']}, value: 5, value2: 2},
    {category: {labels: ['San Diego', 'California']}, value: 6, value2: 3},
    {category: {labels: ['San Francisco', 'California']}, value: 3, value2: 4}
];

const noGroupData: CategoryDatum[] = [
    {category: {labels: ['London']}, value: 3, value2: 2},
    {category: {labels: ['Bristol']}, value: 7, value2: 5},
    {category: {labels: ['Glasgow']}, value: 6, value2: 3},
    {category: {labels: ['Austin']}, value: 4, value2: 7},
    {category: {labels: ['Austin']}, value: 4, value2: 7},
    {category: {labels: ['Seattle']}, value: 8, value2: 5},
    {category: {labels: ['San Jose']}, value: 5, value2: 2},
    {category: {labels: ['San Diego']}, value: 6, value2: 3},
    {category: {labels: ['San Francisco']}, value: 3, value2: 4}
];

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

function createCategoryColumnChart() {
    const chart = new GroupedCategoryChart({
        xAxis: new GroupedCategoryAxis(),
        yAxis: new NumberAxis()
    });
    chart.parent = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.xAxis.tickSize = 20;
    chart.xAxis.title = Caption.create({
        text: 'Cities'
    });
    chart.legend.enabled = true;

    const barSeries = new BarSeries();
    barSeries.data = categoryData;
    barSeries.xField = 'category';
    barSeries.yFields = ['value', 'value2'];
    barSeries.grouped = true;
    barSeries.fillOpacity = 0.3;

    const lineSeries = new LineSeries();
    lineSeries.marker = true;
    lineSeries.data = categoryData;
    lineSeries.xField = 'category';
    lineSeries.yField = 'value';

    const lineSeries2 = new LineSeries();
    lineSeries2.marker = true;
    lineSeries2.data = categoryData;
    lineSeries2.xField = 'category';
    lineSeries2.yField = 'value2';

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

    createButton('No x-field (line)', () => {
        lineSeries.xField = '';
    });

    createButton('No y-field (line)', () => {
        lineSeries.yField = '';
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
        (chart.xAxis as GroupedCategoryAxis).labelGrid = true;
        chart.xAxis.update();
    });
    createButton('label grid OFF', () => {
        (chart.xAxis as GroupedCategoryAxis).labelGrid = false;
        chart.xAxis.update();
    });

    createSlider('label rotation', [0, -45, 45, 90, -90], v => {
        chart.xAxis.labelRotation = v;
        chart.xAxis.update();
    });

    makeChartResizeable(chart);
}

function createCategoryBarChart() {
    const chart = new GroupedCategoryChart({
        xAxis: new NumberAxis(),
        yAxis: new GroupedCategoryAxis()
    });
    chart.parent = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.layout = 'horizontal';
    chart.xAxis.tickSize = 20;
    chart.xAxis.title = Caption.create({
        text: 'Cities'
    });
    chart.legend.enabled = true;

    const barSeries = new BarSeries();
    barSeries.data = categoryData;
    barSeries.xField = 'category';
    barSeries.yFields = ['value', 'value2'];
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
        (chart.yAxis as GroupedCategoryAxis).labelGrid = true;
        chart.yAxis.update();
    });
    createButton('label grid OFF', () => {
        (chart.yAxis as GroupedCategoryAxis).labelGrid = false;
        chart.yAxis.update();
    });

    createSlider('label rotation', [0, -45, 45, 90, -90], v => {
        chart.yAxis.labelRotation = v;
        chart.yAxis.update();
    });

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryColumnChart();
    createCategoryBarChart();
});
