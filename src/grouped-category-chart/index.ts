import { GroupedCategoryChart } from 'ag-grid-enterprise/src/charts/chart/groupedCategoryChart';
import { Chart } from 'ag-grid-enterprise/src/charts/chart/chart';
import { GroupedCategoryAxis } from 'ag-grid-enterprise/src/charts/chart/axis/groupedCategoryAxis';
import { NumberAxis } from 'ag-grid-enterprise/src/charts/chart/axis/numberAxis';
import { BarSeries } from 'ag-grid-enterprise/src/charts/chart/series/barSeries';
import { LineSeries } from 'ag-grid-enterprise/src/charts/chart/series/lineSeries';
import { createButton } from '../../lib/ui';

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
    {category: {labels: ['San Francisco', 'California', 'USA', 'North America']}, value: 3, value2: 4}
];

function makeChartResizeable(chart: Chart) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let chartSize: [number, number];
    const scene = chart.scene;

    scene.hdpiCanvas.canvas.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        chartSize = chart.size;
        isDragging = true;
    });
    scene.hdpiCanvas.canvas.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            chart.size = [chartSize[0] + dx, chartSize[1] + dy];
        }
    });
    scene.hdpiCanvas.canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function createCategoryChart() {
    const chart = new GroupedCategoryChart(
        new GroupedCategoryAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.xAxis.tickSize = 20;
    chart.legend.enabled = false;

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

    chart.addSeries(barSeries);
    chart.addSeries(lineSeries);

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

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryChart();
});
