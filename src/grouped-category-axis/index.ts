import { GroupedCategoryChart } from '@ag-grid-enterprise/grid-charts/src/charts/chart/groupedCategoryChart';
import { Chart } from '@ag-grid-enterprise/grid-charts/src/charts/chart/chart';
import { GroupedCategoryAxis } from '@ag-grid-enterprise/grid-charts/src/charts/chart/axis/groupedCategoryAxis';
import { Caption } from "@ag-grid-enterprise/grid-charts/src/charts/caption";
import { NumberAxis } from '@ag-grid-enterprise/grid-charts/src/charts/chart/axis/numberAxis';
import { BarSeries } from '@ag-grid-enterprise/grid-charts/src/charts/chart/series/barSeries';
import { LineSeries } from '@ag-grid-enterprise/grid-charts/src/charts/chart/series/lineSeries';
import { createButton, createSlider } from '../../lib/ui';
import { CartesianChartLayout } from "@ag-grid-enterprise/grid-charts/src/charts/chart/cartesianChart";
import { Circle } from "@ag-grid-enterprise/grid-charts/src/charts/chart/marker/circle";
import { Square } from "@ag-grid-enterprise/grid-charts/src/charts/chart/marker/square";

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
    chart.xAxis.tick.size = 20;
    chart.xAxis.title = new Caption();
    chart.xAxis.title.text = 'Cities';
    chart.xAxis.title.fontSize = 18;
    chart.legend.enabled = true;

    const barSeries = new BarSeries();
    barSeries.data = categoryData;
    barSeries.xKey = 'category';
    barSeries.yKeys = ['value', 'value2'];
    barSeries.grouped = true;
    barSeries.fillOpacity = 0.3;

    const lineSeries = new LineSeries();
    lineSeries.marker.type = Circle;
    lineSeries.marker.fill = 'rgba(227,111,106,0.61)';
    lineSeries.data = categoryData;
    lineSeries.xKey = 'category';
    lineSeries.yKey = 'value';

    const lineSeries2 = new LineSeries();
    lineSeries2.marker.type = Square;
    lineSeries2.marker.fill = 'rgba(123,145,222,0.61)';
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
        (chart.xAxis as GroupedCategoryAxis).label.grid = true;
        chart.xAxis.update();
    });
    createButton('label grid OFF', () => {
        (chart.xAxis as GroupedCategoryAxis).label.grid = false;
        chart.xAxis.update();
    });

    createSlider('label rotation', [0, -45, 45, 90, -90], v => {
        chart.xAxis.label.rotation = v;
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
    chart.layout = CartesianChartLayout.Horizontal;
    chart.xAxis.tick.size = 20;
    chart.xAxis.title = new Caption();
    chart.xAxis.title.text = 'Cities';
    chart.xAxis.title.fontSize = 18;
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
        (chart.yAxis as GroupedCategoryAxis).label.grid = true;
        chart.yAxis.update();
    });
    createButton('label grid OFF', () => {
        (chart.yAxis as GroupedCategoryAxis).label.grid = false;
        chart.yAxis.update();
    });

    createSlider('label rotation', [0, -45, 45, 90, -90], v => {
        chart.yAxis.label.rotation = v;
        chart.yAxis.update();
    });

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryColumnChart();
    createCategoryBarChart();
});
