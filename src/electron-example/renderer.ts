import { remote } from 'electron';

import './app.css';
import { createButton } from "../../lib/ui";
import { makeChartResizeable } from "../../lib/chart";
import { CategoryAxis } from "../../charts/chart/axis/categoryAxis";
import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { Caption } from "../../charts/caption";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { BarSeries } from "../../charts/chart/series/cartesian/barSeries";
import borneo from "../../charts/chart/palettes";

const { BrowserWindow } = remote;

createButton('New Window', () => {
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

function createIFrame() {
    const iFrame = document.createElement('iframe');
    iFrame.style.width = '900px';
    iFrame.style.height = '600px';
    document.body.appendChild(iFrame);

    if (iFrame.contentWindow) {
        const iFrameDoc = iFrame.contentWindow.document;
        createBarChart(iFrameDoc);
    }
}

createButton('Create iFrame', () => {
    createIFrame();
});

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

function createColumnChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;
    xAxis.title = new Caption();
    xAxis.title.text = 'Beverage';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;
    yAxis.title = new Caption();
    yAxis.title.text = 'Expenses';

    const chart = new CartesianChart();
    chart.axes = [xAxis, yAxis];
    chart.width = 800;
    chart.height = 500;
    chart.container = document.body;
    chart.title = new Caption();
    chart.title.text = 'Beverage Expenses';
    chart.subtitle = new Caption();
    chart.subtitle.text = 'per quarter';
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    barSeries.xKey = 'category';
    barSeries.yKeys = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    barSeries.data = data;
    barSeries.fills = borneo.fills;
    barSeries.tooltipEnabled = true;
    barSeries.label.enabled = false;

    return chart;
}

function createBarChart(document: Document = window.document) {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new CategoryAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart(document);

    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';
    chart.axes = [xAxis, yAxis];

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    barSeries.xKey = 'category';
    barSeries.yKeys = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    barSeries.data = data;
    barSeries.fills = borneo.fills;
    barSeries.tooltipEnabled = true;
    barSeries.label.enabled = false;

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
