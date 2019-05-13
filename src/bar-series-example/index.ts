import { CartesianChart } from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import { CategoryAxis } from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import { Chart, LegendPosition } from "ag-grid-enterprise/src/charts/chart/chart";
import { material, nord } from "ag-grid-enterprise/src/charts/chart/palettes";

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

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

function createSlider<D>(text: string, values: D[], action: (value: D) => void): HTMLInputElement {
    const n = values.length;
    const id = String(Date.now());
    const sliderId = 'slider-' + id;
    const datalistId = 'slider-list-' + id;
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '300px';
    wrapper.style.padding = '5px';
    wrapper.style.margin = '5px';
    wrapper.style.border = '1px solid lightgray';
    wrapper.style.borderRadius = '5px';
    wrapper.style.backgroundColor = 'white';

    const slider = document.createElement('input');
    slider.setAttribute('id', sliderId);
    slider.setAttribute('list', datalistId);
    slider.style.height = '1.8em';
    slider.style.flex = '1';

    const label = document.createElement('label');
    label.setAttribute('for', sliderId);
    label.innerHTML = text;
    label.style.font = '12px sans-serif';
    label.style.marginRight = '5px';

    // Currently, no browser fully supports these features.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
    const datalist = document.createElement('datalist');
    datalist.setAttribute('id', datalistId);

    values.forEach((value, index) => {
        const option = document.createElement('option');
        option.setAttribute('value', String(index));
        option.setAttribute('label', String(value));
        datalist.appendChild(option);
    });

    slider.type = 'range';
    slider.min = '0';
    slider.max = String(n - 1);
    slider.step = '1';
    slider.value = '0';
    slider.style.width = '200px';

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
    wrapper.appendChild(datalist);
    document.body.appendChild(wrapper);

    slider.addEventListener('input', (e) => {
        const index = +(e.target as HTMLInputElement).value;
        action(values[index]);
    });
    return slider;
}

function makeChartResizeable(chart: Chart<any, any, any>) {
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
    const chart = new CartesianChart<any, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = document.body.clientWidth;
    chart.height = document.body.clientHeight;
    chart.scene.hdpiCanvas.canvas.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    let backgroundColor = 'white';

    const barSeries = new BarSeries<any>();
    addSeriesIf();
    barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4']; // bar labels
    barSeries.xField = 'category';
    barSeries.yFields = ['q1Actual'];
    barSeries.data = data;
    barSeries.colors = material;

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
        barSeries.tooltip = true;
    });
    createButton('Hide tooltips', () => {
        barSeries.tooltip = false;
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
    createButton('Material colors', () => {
        barSeries.colors = material;
    });
    createButton('Nord colors', () => {
        barSeries.colors = nord;
    });
    createButton('Light theme', () => {
        chart.xAxis.labelColor = 'black';
        chart.xAxis.gridStyle = [{
            strokeStyle: 'rgb(219, 219, 219)',
            lineDash: [4, 2]
        }];
        chart.xAxis.update();

        chart.yAxis.labelColor = 'black';
        chart.yAxis.gridStyle = [{
            strokeStyle: 'rgb(219, 219, 219)',
            lineDash: [4, 2]
        }];
        chart.yAxis.update();

        chart.legend.labelColor = 'black';
        document.body.style.backgroundColor = backgroundColor = 'white';
    });
    createButton('Dark theme', () => {
        chart.xAxis.labelColor = 'rgb(221, 221, 221)';
        chart.xAxis.gridStyle = [{
            strokeStyle: 'rgb(100, 100, 100)',
            lineDash: [4, 2]
        }];
        chart.xAxis.update();

        chart.yAxis.labelColor = 'rgb(221, 221, 221)';
        chart.yAxis.gridStyle = [{
            strokeStyle: 'rgb(100, 100, 100)',
            lineDash: [4, 2]
        }];
        chart.yAxis.update();

        chart.legend.labelColor = 'rgb(221, 221, 221)';
        document.body.style.backgroundColor = backgroundColor = '#1e1e1e';
    });
    createButton('No y-fields', () => {
        barSeries.yFields = [];
    });

    createSlider('lineWidth', [0, 1, 2, 3, 4, 5, 6], v => {
        barSeries.lineWidth = v;
    });
    createSlider('legendPosition', [LegendPosition.Right, LegendPosition.Bottom, LegendPosition.Left, LegendPosition.Top], v => {
        chart.legendPosition = v;
    });
    createSlider('legend font', ['12px sans-serif', '12px serif', '12px Snell Roundhand'], v => {
        chart.legend.labelFont = v;
    });

    makeChartResizeable(chart);
});
