import './app.css';
import { createButton, createSlider } from "../../lib/ui";
import { makeChartResizeable } from "../../lib/chart";
import { CategoryAxis } from "../../charts/chart/axis/categoryAxis";
import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { Caption } from "../../charts/caption";
import { BarSeries } from "../../charts/chart/series/cartesian/barSeries";
import { find } from "../../charts/util/array";
import { LegendPosition } from '../../charts/chart/legend';

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

type Datum2 = {
    xKey: string,
    yKey1: number,
    yKey2: number,
    yKey3: number
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

const data2: Datum[] = [
    {
        category: 'Coffee',

        q1Budget: 500,
        q2Budget: 500,
        q3Budget: 500,
        q4Budget: 500,

        q1Actual: 0,
        q2Actual: 0,
        q3Actual: 0,
        q4Actual: 0
    }
];

const data3: Datum2[] = [{
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

function generateData(n = 50, yKeyCount = 10) {
    const data: any[] = [];
    const yKeys: string[] = [];
    for (let i = 0; i < yKeyCount; i++) {
        yKeys[i] = 'Y' + (i + 1);
    }
    for (let i = 0; i < n; i++) {
        const datum: any = {
            category: 'A' + (i + 1)
        };
        yKeys.forEach(key => {
            datum[key] = Math.random() * 10;
        });
        data.push(datum);
    }
    return {
        data,
        xKey: 'category',
        yKeys: [yKeys]
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.width = 800;
    chart.height = 500;
    chart.container = document.body;
    chart.axes = [xAxis, yAxis];
    chart.navigator.enabled = true;

    chart.title = new Caption();
    chart.title.text = 'Beverage Expenses';
    chart.subtitle = new Caption();
    chart.subtitle.text = 'per quarter';
    // chart.title = Caption.create('Beverage Expenses', 'bold 16px Verdana, sans-serif');
    // chart.subtitle = Caption.create('per quarter', '12px Verdana, sans-serif');
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    let backgroundColor = 'white';

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yNames = {
        'q1Actual': 'Q1',
        'q2Actual': 'Q2',
        'q3Actual': 'Q3',
        'q4Actual': 'Q4',
    }; // bar labels
    barSeries.xKey = 'category';
    barSeries.yKeys = [['q1Actual']];
    barSeries.data = data;
    barSeries.fills = ['red', 'green', 'blue', 'magenta', 'gold', 'cyan'];
    barSeries.tooltip.enabled = true;
    barSeries.label.enabled = false;

    barSeries.highlightStyle.item.fill = 'cyan';
    barSeries.highlightStyle.item.stroke = 'gold';
    barSeries.highlightStyle.item.strokeWidth = 4;
    barSeries.highlightStyle.series.enabled = true;
    barSeries.highlightStyle.series.dimOpacity = 0.2;
    barSeries.highlightStyle.series.strokeWidth = 2;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('1 y-key', () => {
        addSeriesIf();
        barSeries.xKey = 'category';
        barSeries.yKeys = [['q1Actual']];
        barSeries.data = data;
    });
    createButton('2 y-keys', () => {
        addSeriesIf();
        barSeries.xKey = 'category';
        barSeries.yKeys = [['q1Actual', 'q2Actual']];
        barSeries.data = data;
    });
    createButton('3 y-keys', () => {
        addSeriesIf();
        barSeries.xKey = 'category';
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual']];
        barSeries.data = data;
    });
    createButton('4 y-keys', () => {
        addSeriesIf();
        barSeries.xKey = 'category';
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
        barSeries.data = data;
    });

    createButton('Grouped', () => {
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
    });
    createButton('Stacked', () => {
        barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    });

    createButton('Generate 50 points (stacked bars)', () => {
        addSeriesIf();
        const config = generateData();
        barSeries.yNames = {}; // don't show bar labels
        barSeries.grouped = false;
        const xAxis = find(chart.axes, axis => axis.position === ChartAxisPosition.Bottom);
        if (xAxis) {
            xAxis.label.rotation = 45;
        }
        barSeries.xKey = config.xKey;
        barSeries.yKeys = config.yKeys;
        barSeries.data = config.data;
    });
    createButton('Generate 10 points (grouped bars)', () => {
        addSeriesIf();
        const config = generateData(10, 16);
        barSeries.yNames = {}; // don't show bar labels
        barSeries.xKey = config.xKey;
        barSeries.yKeys = config.yKeys;
        barSeries.data = config.data;
        barSeries.grouped = true;

        const xAxis = find(chart.axes, axis => axis.position === ChartAxisPosition.Bottom);
        if (xAxis) {
            xAxis.label.rotation = 0;
            xAxis.update();
        }
    });

    createButton('No data', () => {
        barSeries.data = [];
    });
    createButton('Data set #3', () => {
        barSeries.data = data3;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = [['yKey1', 'yKey2', 'yKey3']];
    });

    createButton('Use label formatter', () => {
        barSeries.label.formatter = params => `$${params.value.toFixed(1)} USD`;
    });
    createButton('Remove label formatter', () => {
        barSeries.label.formatter = undefined;
    });
    createButton('Show tooltips', () => {
        barSeries.tooltip.enabled = true;
    });
    createButton('Hide tooltips', () => {
        barSeries.tooltip.enabled = false;
    });
    createButton('Custom tooltip class', () => {
        chart.tooltip.class = 'my-tooltip';
    });
    createButton('Use tooltip renderer', () => {
        barSeries.tooltip.renderer = params => {
            return `<div style="background-color: #d4d1d6; padding: 5px;">
                X: ${params.datum[params.xKey]}<br>Y: ${params.datum[params.yKey]}
            </div>`;
        };
    });
    createButton('Remove tooltip renderer', () => {
        barSeries.tooltip.renderer = undefined;
    });
    createButton('Remove all series', () => {
        chart.removeAllSeries();
    });
    createButton('Light theme', () => {
        const xAxis = find(chart.axes, axis => axis.position === ChartAxisPosition.Bottom);
        if (xAxis) {
            xAxis.label.color = 'black';
            xAxis.gridStyle = [{
                stroke: 'rgb(219, 219, 219)',
                lineDash: [4, 2]
            }];
            xAxis.update();
        }

        const yAxis = find(chart.axes, axis => axis.position === ChartAxisPosition.Bottom);
        if (yAxis) {
            yAxis.label.color = 'black';
            yAxis.gridStyle = [{
                stroke: 'rgb(219, 219, 219)',
                lineDash: [4, 2]
            }];
            yAxis.update();
        }

        chart.legend.item.label.color = 'black';

        if (chart.title) {
            chart.title.color = 'black';
        }
        if (chart.subtitle) {
            chart.subtitle.color = 'black';
        }

        document.body.style.backgroundColor = backgroundColor = 'white';
    });
    createButton('Dark theme', () => {
        const labelColor = 'rgb(221, 221, 221)';

        const xAxis = find(chart.axes, axis => axis.position === ChartAxisPosition.Bottom);
        if (xAxis) {
            xAxis.label.color = labelColor;
            xAxis.gridStyle = [{
                stroke: 'rgb(100, 100, 100)',
                lineDash: [4, 2]
            }];
            xAxis.update();
        }

        const yAxis = find(chart.axes, axis => axis.position === ChartAxisPosition.Left);
        if (yAxis) {
            yAxis.label.color = labelColor;
            yAxis.gridStyle = [{
                stroke: 'rgb(100, 100, 100)',
                lineDash: [4, 2]
            }];
            yAxis.update();
        }

        chart.legend.item.label.color = labelColor;

        if (chart.title) {
            chart.title.color = labelColor;
        }
        if (chart.subtitle) {
            chart.subtitle.color = labelColor;
        }

        document.body.style.backgroundColor = backgroundColor = '#1e1e1e';
    });
    createButton('No y-keys', () => {
        barSeries.yKeys = [];
    });
    createButton('Enable labels', () => {
        barSeries.label.enabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.label.enabled = false;
    });
    createButton('Show Legend', () => chart.legend.enabled = true);
    createButton('Hide Legend', () => chart.legend.enabled = false);

    createSlider('stroke width', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], v => {
        barSeries.strokeWidth = v;
    });
    createSlider('legendPosition', ['right', 'bottom', 'left', 'top'] as LegendPosition[], v => {
        chart.legend.position = v;
    });
    createSlider('legend font', ['sans-serif', 'serif', 'Snell Roundhand'], v => {
        chart.legend.item.label.fontFamily = v;
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

    makeChartResizeable(chart);
});
