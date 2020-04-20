import borneo from "ag-charts-community/src/chart/palettes";

import { createButton, createSlider } from "../../lib/ui";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { CategoryAxis } from "ag-charts-community/src/chart/axis/categoryAxis";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { DropShadow } from "ag-charts-community/src/scene/dropShadow";
import { Caption } from "ag-charts-community/src/caption";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";
import { Circle } from "ag-charts-community/src/chart/marker/circle";
import { BarSeries } from "ag-charts-community/src/chart/series/cartesian/barSeries";
import { makeChartResizeable } from "../../lib/chart";
import { AgChart, Padding } from "ag-charts-community";

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

type NegativeDatum = {
    xKey: string,
    yKey1: number,
    yKey2: number,
    yKey3: number
};

const negativeData: NegativeDatum[] = [{
    xKey: 'Jan',
    yKey1: 5,
    yKey2: 7,
    yKey3: -9,
}, {
    xKey: 'Feb',
    yKey1: 10,
    yKey2: -15,
    yKey3: 20
}];

function createColumnChartDeclaratively() {
    const data = [
        {
            beverage: 'Coffee',
            Q1: 450,
            Q2: 560,
            Q3: 600,
            Q4: 700
        },
        {
            beverage: 'Tea',
            Q1: 270,
            Q2: 380,
            Q3: 450,
            Q4: 520
        },
        {
            beverage: 'Milk',
            Q1: 180,
            Q2: 170,
            Q3: 190,
            Q4: 200
        },
    ];

    const chart = AgChart.create({
        data,
        container: document.body,
        title: {
            text: 'Beverage Expenses'
        },
        subtitle: {
            text: 'per quarter'
        },
        padding: {
            top: 40,
            right: 40,
            bottom: 40,
            left: 40
        },
        series: [{
            type: 'column',
            xKey: 'beverage',
            yKeys: ['Q1', 'Q2', 'Q3', 'Q4']
        }],
        legend: {
            spacing: 40
        }
    });
}

function createColumnChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.padding = new Padding(40);
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.title = new Caption();
    chart.title.text = 'Beverage Expenses';
    chart.title.fontSize = 14;
    chart.subtitle = new Caption();
    chart.subtitle.text = 'per quarter';
    chart.subtitle.fontSize = 12;
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yNames = ['Q1', 'Q2', 'Q3', 'Q4']; // bar labels
    barSeries.xKey = 'category';
    barSeries.yKeys = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    barSeries.data = data;
    barSeries.fills = borneo.fills;
    barSeries.tooltipEnabled = true;
    barSeries.label.enabled = false;
    // barSeries.shadow = new DropShadow();
    // barSeries.shadow.color = 'rgba(0,0,0,0.5)';
    // barSeries.shadow.blur = 10;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('Negative Data', () => {
        barSeries.data = negativeData;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = ['yKey1', 'yKey2', 'yKey3'];
    });

    createButton('Grouped', () => {
        barSeries.grouped = true;
    });
    createButton('Stacked', () => {
        barSeries.grouped = false;
    });

    createButton('Enable labels', () => {
        barSeries.label.enabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.label.enabled = false;
    });

    createSlider('label font size', [10, 12, 14, 16, 18, 20], v => {
        barSeries.label.fontSize = v;
    });

    createSlider('normalizeTo', [NaN, 100, 500, 1], v => {
        if (v && chart.title) {
            chart.title.text = 'Normalize to WTFYW';
            if (chart.subtitle) {
                chart.subtitle.enabled = false;
            }
        }
        barSeries.normalizedTo = v;
    });

    createSlider('shadow color', ['red', 'green', 'blue'], v => {
        if (barSeries.shadow) {
            barSeries.shadow.color = v;
        }
    });

    return chart;
}

function createBarChart() {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new CategoryAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.axes = [xAxis, yAxis];

    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';
    chart.legend.markerShape = Circle;

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    barSeries.flipXY = true;
    addSeriesIf();
    barSeries.yNames = ['Q1', 'Q2', 'Q3', 'Q4']; // bar labels
    barSeries.xKey = 'category';
    barSeries.yKeys = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    barSeries.data = data;
    barSeries.fills = borneo.fills;
    barSeries.tooltipEnabled = true;
    barSeries.label.enabled = false;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('Negative Data', () => {
        barSeries.data = negativeData;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = ['yKey1', 'yKey2', 'yKey3'];
    });

    createButton('Grouped', () => {
        barSeries.grouped = true;
    });
    createButton('Stacked', () => {
        barSeries.grouped = false;
    });

    createButton('Enable labels', () => {
        barSeries.label.enabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.label.enabled = false;
    });

    createSlider('normalizeTo', [NaN, 100, 500, 1], v => {
        if (v && chart.title) {
            chart.title.text = 'Normalize to WTFYW';
            if (chart.subtitle) {
                chart.subtitle.enabled = false;
            }
        }
        barSeries.normalizedTo = v;
    });

    createSlider('stroke width', [1, 2, 4, 6, 8, 10], v => {
        barSeries.strokeWidth = v;
    });

    createSlider('stroke opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        barSeries.strokeOpacity = v;
    });
    createSlider('fill opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        barSeries.fillOpacity = v;
    });

    return chart;
}

document.addEventListener('DOMContentLoaded', () => {
    const columnChart = createColumnChart();
    makeChartResizeable(columnChart);

    // document.body.appendChild(document.createElement('br'));
    // createColumnChartDeclaratively();

    document.body.appendChild(document.createElement('br'));

    const barChart = createBarChart();
    makeChartResizeable(barChart);
});
