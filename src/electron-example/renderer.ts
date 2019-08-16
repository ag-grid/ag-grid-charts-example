import { remote } from 'electron';
const { BrowserWindow } = remote;
import * as path from 'path';

const newWindowBtn = document.createElement('button');
newWindowBtn.innerText = 'New Window';
document.body.appendChild(newWindowBtn);
document.body.appendChild(document.createElement('br'));

newWindowBtn.addEventListener('click', (event) => {
    let win = new BrowserWindow({
        width: 400,
        height: 320,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.on('close', () => { (win as any) = undefined });
    win.loadFile('index.html');
    win.show();
});


import borneo from "ag-grid-enterprise/src/charts/chart/palettes";
import { ChartBuilder } from "ag-grid-enterprise/src/chartAdaptor/builder/chartBuilder";
import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import { Chart } from "ag-grid-enterprise/src/charts/chart/chart";
import { CartesianChart } from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import { CategoryAxis } from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";

import './app.css';

type Datum = {
    category: string,

    q1Budget: number,
    q2Budget: number,
    q3Budget: number,
    q4Budget: number,

    q1Actual: number,
    q2Actual: number,
    q3Actual: number,
    q4Actual: number
};

const data: Datum[] = [
    {
        category: 'Coffee',

        q1Budget: 500,
        q2Budget: 500,
        q3Budget: 500,
        q4Budget: 500,

        q1Actual: 450,
        q2Actual: 560,
        q3Actual: 600,
        q4Actual: 700
    },
    {
        category: 'Tea',

        q1Budget: 350,
        q2Budget: 400,
        q3Budget: 450,
        q4Budget: 500,

        q1Actual: 270,
        q2Actual: 380,
        q3Actual: 450,
        q4Actual: 520
    },
    {
        category: 'Milk',

        q1Budget: 200,
        q2Budget: 180,
        q3Budget: 180,
        q4Budget: 180,

        q1Actual: 180,
        q2Actual: 170,
        q3Actual: 190,
        q4Actual: 200
    },
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

function createColumnChart() {
    const chart = ChartBuilder.createCartesianChart({
        parent: document.body,
        width: 800,
        height: 500,
        title: {
            text: 'Beverage Expenses'
        },
        subtitle: {
            text: 'per quarter'
        },
        xAxis: {
            type: 'category',
            labelRotation: 0,
            title: {
                text: 'Beverage'
            }
        },
        yAxis: {
            type: 'number',
            title: {
                text: 'Expenses'
            }
        }
    });
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    barSeries.xField = 'category';
    barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    barSeries.data = data;
    barSeries.fills = borneo.fills;
    barSeries.tooltipEnabled = true;
    barSeries.labelEnabled = false;

    return chart;
}

function createBarChart() {
    const chart = new CartesianChart({
        xAxis: new NumberAxis(),
        yAxis: new CategoryAxis()
    });

    chart.parent = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.layout = 'horizontal';
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    barSeries.xField = 'category';
    barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    barSeries.data = data;
    barSeries.fills = borneo.fills;
    barSeries.tooltipEnabled = true;
    barSeries.labelEnabled = false;

    return chart;
}

document.addEventListener('DOMContentLoaded', () => {
    const columnChart = createColumnChart();
    makeChartResizeable(columnChart);

    // document.body.appendChild(document.createElement('br'));
    //
    // const barChart = createBarChart();
    // makeChartResizeable(barChart);
});
