import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {BarSeries} from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";

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

document.addEventListener('DOMContentLoaded', () => {
    const chart = new CartesianChart<any, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = document.body.clientWidth;
    chart.height = document.body.clientHeight;

    const barSeries = new BarSeries<any>();
    barSeries.lineWidth = 4;
    chart.addSeries(barSeries);
    barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4']; // bar labels
    barSeries.setDataAndFields(data, 'category', ['q1Actual']);

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('1 y-field', () => {
        barSeries.setDataAndFields(data, 'category', ['q1Actual']);
    });
    createButton('2 y-fields', () => {
        barSeries.setDataAndFields(data, 'category', ['q1Actual', 'q2Actual']);
    });
    createButton('3 y-fields', () => {
        barSeries.setDataAndFields(data, 'category', ['q1Actual', 'q2Actual', 'q3Actual']);
    });
    createButton('4 y-fields', () => {
        barSeries.setDataAndFields(data, 'category', ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']);
    });

    createButton('Grouped', () => {
        barSeries.grouped = true;
    });
    createButton('Stacked', () => {
        barSeries.grouped = false;
    });

    createButton('Generate 50 points', () => {
        const config = generateData();
        barSeries.yFieldNames = []; // don't show bar labels
        barSeries.grouped = false;
        barSeries.lineWidth = 2;
        chart.xAxis.labelRotation = 45;
        barSeries.setDataAndFields(config.data, config.xField, config.yFields);
    });
    createButton('Generate 10 points', () => {
        const config = generateData(10, 10);
        barSeries.yFieldNames = []; // don't show bar labels
        barSeries.setDataAndFields(config.data, config.xField, config.yFields);
        barSeries.grouped = true;
        barSeries.lineWidth = 2;
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
        barSeries.tooltipRenderer = (datum, yField, xField) => {
            return `<div style="background-color: #d4d1d6; padding: 5px;">X: ${datum[xField]}<br>Y: ${datum[yField]}</div>`;
        };
    });
    createButton('Remove tooltip renderer', () => {
        barSeries.tooltipRenderer = undefined;
    });
});
