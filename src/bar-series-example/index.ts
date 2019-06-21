import { ChartBuilder } from "ag-grid-enterprise/src/chartAdaptor/builder/chartBuilder";
import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import { Chart, LegendPosition } from "ag-grid-enterprise/src/charts/chart/chart";
import { Caption } from "ag-grid-enterprise/src/charts/chart/caption";
import borneo, {
    bright,
    flat,
    material,
    pastel,
} from "ag-grid-enterprise/src/charts/chart/palettes";

import './app.css';
import { createButton, createSlider } from "../../lib/ui";

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
    xField: string,
    yField1: number,
    yField2: number,
    yField3: number
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
    xField: 'Jan',
    yField1: 5,
    yField2: 7,
    yField3: -9,
}, {
    xField: 'Feb',
    yField1: 10,
    yField2: -15,
    yField3: 20
}];

function generateData(n = 50, yFieldCount = 10) {
    const data: any[] = [];
    const yFields: string[] = [];
    for (let i = 0; i < yFieldCount; i++) {
        yFields[i] = 'Y' + (i + 1);
    }
    for (let i = 0; i < n; i++) {
        const datum: any = {
            category: 'A' + (i + 1)
        };
        yFields.forEach(field => {
            datum[field] = Math.random() * 10;
        });
        data.push(datum);
    }
    return {
        data,
        xField: 'category',
        yFields
    };
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

document.addEventListener('DOMContentLoaded', () => {
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
            labelRotation: 0
        },
        yAxis: {
            type: 'number'
        }
    });
    // chart.title = Caption.create('Beverage Expenses', 'bold 16px Verdana, sans-serif');
    // chart.subtitle = Caption.create('per quarter', '12px Verdana, sans-serif');
    chart.scene.hdpiCanvas.canvas.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    let backgroundColor = 'white';

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4']; // bar labels
    barSeries.xField = 'category';
    barSeries.yFields = ['q1Actual'];
    barSeries.data = data;
    barSeries.fills = material.fills;
    barSeries.tooltipEnabled = true;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download({ fileName: 'bar-chart', background: backgroundColor });
    });

    createButton('1 y-field', () => {
        addSeriesIf();
        barSeries.xField = 'category';
        barSeries.yFields = ['q1Actual'];
        barSeries.data = data;
    });
    createButton('2 y-fields', () => {
        addSeriesIf();
        barSeries.xField = 'category';
        barSeries.yFields = ['q1Actual', 'q2Actual'];
        barSeries.data = data;
    });
    createButton('3 y-fields', () => {
        addSeriesIf();
        barSeries.xField = 'category';
        barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual'];
        barSeries.data = data;
    });
    createButton('4 y-fields', () => {
        addSeriesIf();
        barSeries.xField = 'category';
        barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
        barSeries.data = data;
    });

    createButton('Grouped', () => {
        barSeries.grouped = true;
    });
    createButton('Stacked', () => {
        barSeries.grouped = false;
    });

    createButton('Generate 50 points', () => {
        addSeriesIf();
        const config = generateData();
        barSeries.yFieldNames = []; // don't show bar labels
        barSeries.grouped = false;
        chart.xAxis.labelRotation = 45;
        barSeries.xField = config.xField;
        barSeries.yFields = config.yFields;
        barSeries.data = config.data;
    });
    createButton('Generate 10 points', () => {
        addSeriesIf();
        const config = generateData(10, 16);
        barSeries.yFieldNames = []; // don't show bar labels
        barSeries.xField = config.xField;
        barSeries.yFields = config.yFields;
        barSeries.data = config.data;
        barSeries.grouped = true;
        chart.xAxis.labelRotation = 0;
        chart.xAxis.update();
    });

    createButton('No data', () => {
        barSeries.data = [];
    });
    // createButton('Data set #3', () => {
    //     barSeries.setDataAndFields(data3, 'xField', ['yField1', 'yField2', 'yField3']);
    // });

    createButton('Show labels (for non-generated data)', () => {
        barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    });
    createButton('Show labels (for generated data)', () => {
        barSeries.yFieldNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    });
    createButton('Hide labels', () => {
        barSeries.yFieldNames = [];
    });
    createButton('Show tooltips', () => {
        barSeries.tooltipEnabled = true;
    });
    createButton('Hide tooltips', () => {
        barSeries.tooltipEnabled = false;
    });
    createButton('Custom tooltip class', () => {
        chart.tooltipClass = 'my-tooltip';
    });
    createButton('Use tooltip renderer', () => {
        barSeries.tooltipRenderer = params => {
            return `<div style="background-color: #d4d1d6; padding: 5px;">
                X: ${params.datum[params.xField]}<br>Y: ${params.datum[params.yField]}
            </div>`;
        };
    });
    createButton('Remove tooltip renderer', () => {
        barSeries.tooltipRenderer = undefined;
    });
    createButton('Remove all series', () => {
        chart.removeAllSeries();
    });
    createButton('Borneo colors', () => {
        barSeries.fills = borneo.fills;
    });
    createButton('Material colors', () => {
        barSeries.fills = material.fills;
    });
    createButton('Pastel colors', () => {
        barSeries.fills = pastel.fills;
    });
    createButton('Bright colors', () => {
        barSeries.fills = bright.fills;
    });
    createButton('Flat colors', () => {
        barSeries.fills = flat.fills;
    });
    createButton('Light theme', () => {
        chart.xAxis.labelColor = 'black';
        chart.xAxis.gridStyle = [{
            stroke: 'rgb(219, 219, 219)',
            lineDash: [4, 2]
        }];
        chart.xAxis.update();

        chart.yAxis.labelColor = 'black';
        chart.yAxis.gridStyle = [{
            stroke: 'rgb(219, 219, 219)',
            lineDash: [4, 2]
        }];
        chart.yAxis.update();

        chart.legend.labelColor = 'black';

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

        chart.xAxis.labelColor = labelColor;
        chart.xAxis.gridStyle = [{
            stroke: 'rgb(100, 100, 100)',
            lineDash: [4, 2]
        }];
        chart.xAxis.update();

        chart.yAxis.labelColor = labelColor;
        chart.yAxis.gridStyle = [{
            stroke: 'rgb(100, 100, 100)',
            lineDash: [4, 2]
        }];
        chart.yAxis.update();

        chart.legend.labelColor = labelColor;

        if (chart.title) {
            chart.title.color = labelColor;
        }
        if (chart.subtitle) {
            chart.subtitle.color = labelColor;
        }

        document.body.style.backgroundColor = backgroundColor = '#1e1e1e';
    });
    createButton('No y-fields', () => {
        barSeries.yFields = [];
    });
    createButton('Enable labels', () => {
        barSeries.labelEnabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.labelEnabled = false;
    });
    createButton('Show Legend', () => chart.legend.enabled = true);
    createButton('Hide Legend', () => chart.legend.enabled = false);

    createSlider('lineWidth', [0, 1, 2, 3, 4, 5, 6], v => {
        barSeries.strokeWidth = v;
    });
    createSlider('legendPosition', ['right', 'bottom', 'left', 'top'] as LegendPosition[], v => {
        chart.legendPosition = v;
    });
    createSlider('legend font', ['12px sans-serif', '12px serif', '12px Snell Roundhand'], v => {
        chart.legend.labelFont = v;
    });
    createSlider('normalizeTo', [NaN, 100, 500, 1], v => {
        if (v && chart.title) {
            chart.title.text = 'Normalize to WTFYW';
            chart.subtitle = undefined;
        }
        barSeries.normalizedTo = v;
    });

    makeChartResizeable(chart);
});
