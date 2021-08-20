import { createButton, createSlider } from "../../lib/ui";
import { makeChartResizeable } from "../../lib/chart";
import { CategoryAxis } from "../../charts/chart/axis/categoryAxis";
import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { Caption } from "../../charts/caption";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { BarSeries } from "../../charts/chart/series/cartesian/barSeries";

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
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yNames = {
        q1Actual: 'Q1',
        q2Actual: 'Q2',
        q3Actual: 'Q3',
        q4Actual: 'Q4',
    };
    barSeries.xKey = 'category';
    barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    barSeries.data = data;
    // barSeries.fills = borneo.fills;
    barSeries.tooltip.enabled = true;
    barSeries.label.enabled = false;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('Negative Data', () => {
        barSeries.data = negativeData;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = [['yKey1'], ['yKey2'], ['yKey3']];
    });

    createButton('Grouped', () => {
        barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    });
    createButton('Stacked', () => {
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
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

    return chart;
}

function createBarChart() {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new CategoryAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
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
    barSeries.yNames = {
        q1Actual: 'Q1',
        q2Actual: 'Q2',
        q3Actual: 'Q3',
        q4Actual: 'Q4',
    };
    barSeries.xKey = 'category';
    barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    barSeries.data = data;
    // barSeries.fills = borneo.fills;
    barSeries.tooltip.enabled = true;
    barSeries.label.enabled = false;
    barSeries.flipXY = true;
    barSeries.highlightStyle.strokeWidth = 2;
    barSeries.highlightStyle.series.enabled = false;
    barSeries.highlightStyle.series.dimOpacity = 0.3;
    barSeries.highlightStyle.series.strokeWidth = 4;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('Negative Data', () => {
        barSeries.data = negativeData;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = [['yKey1'], ['yKey2'], ['yKey3']];
    });

    createButton('Grouped', () => {
        barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    });
    createButton('Stacked', () => {
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
    });

    createButton('Enable labels', () => {
        barSeries.label.enabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.label.enabled = false;
    });

    createButton('Toggle Series Highlighting', () => {
        barSeries.highlightStyle.series.enabled = !barSeries.highlightStyle.series.enabled;
    });

    createSlider('dimOpacity', [0.3, 0.6, 1], v => {
        barSeries.highlightStyle.series.dimOpacity = v;
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

    document.body.appendChild(document.createElement('br'));

    const barChart = createBarChart();
    makeChartResizeable(barChart);
});
