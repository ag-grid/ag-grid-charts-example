import { CartesianChart } from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import { CategoryAxis } from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import { LineSeries } from "ag-grid-enterprise/src/charts/chart/series/lineSeries";
import { createButton } from "../../lib/ui";
import { GroupedCategoryAxis } from "ag-grid-enterprise/src/charts/chart/axis/groupedCategoryAxis";
import { GroupedCategoryChart } from "ag-grid-enterprise/src/charts/chart/groupedCategoryChart";
import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import { Chart } from "ag-grid-enterprise/src/charts/chart/chart";

type CategoryDatum = {
    category: string,
    value: number,
    value2: number
};

const categoryData: CategoryDatum[] = [
    {category: 'John', value: 3, value2: 2},
    {category: 'Nige', value: 7, value2: 5},
    {category: 'Vicky', value: 6, value2: 3},
    {category: 'Rick', value: 4, value2: 7},
    {category: 'Lucy', value: 8, value2: 5},
    {category: 'Ben', value: 5, value2: 2},
    {category: 'Barbara', value: 6, value2: 3},
    {category: 'Maria', value: 3, value2: 4}
];

function generateCategoryData(n = 50): CategoryDatum[] {
    const data: CategoryDatum[] = [];
    for (let i = 0; i < n; i++) {
        const datum: CategoryDatum = {
            category: 'A' + (i + 1),
            value: Math.random() * 10,
            value2: Math.random() * 10
        };
        data.push(datum);
    }
    return data;
}

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
    // chart.xAxis.labelRotation = 45;
    chart.xAxis.tickSize = 20;
    chart.legend.enabled = false;

    const barSeries = new BarSeries();
    barSeries.data = categoryData;
    barSeries.xField = 'category';
    barSeries.yFields = ['value', 'value2'];
    barSeries.grouped = true;

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

    createButton('Change data', () => {
        lineSeries.data = generateCategoryData(Math.floor(Math.random() * 50));
        lineSeries.xField = 'category';
        lineSeries.yField = 'value';
    });

    createButton('No data', () => {
        lineSeries.data = [];
        lineSeries.xField = 'category';
        lineSeries.yField = 'value';
    });

    createButton('No x-field', () => {
        lineSeries.xField = '';
    });

    createButton('No y-field', () => {
        lineSeries.yField = '';
    });

    createButton('Single data point', () => {
        barSeries.data = lineSeries.data = [{
            category: 'One',
            value: 17
        }];
        lineSeries.xField = 'category';
        lineSeries.yField = 'value';

        barSeries.xField = 'category';
        barSeries.yFields = ['value'];
    });

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryChart();
});
