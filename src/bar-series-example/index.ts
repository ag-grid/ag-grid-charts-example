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
}

const data2: Datum2[] = [{
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

const data3: Datum[] = [
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

document.addEventListener('DOMContentLoaded', () => {
    const chart = new CartesianChart<any, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = 1200;
    chart.height = 800;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const barSeries = new BarSeries<any>();
    chart.addSeries(barSeries);
    // barSeries.xField = 'category';
    // barSeries.yFields = ['q1Actual'];
    barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4']; // bar labels
    // barSeries.data = data;
    barSeries.setDataAndFields(data, 'category', ['q1Actual']);

    // setTimeout(() => {
    //     barSeries.lineWidth = 20;
    //     barSeries.labelColor = 'red';
    //     barSeries.labelFont = '20px serif';
    // }, 2000);
    //
    // setTimeout(() => {
    //     const config = generateData();
    //     barSeries.lineWidth = 1;
    //     barSeries.yFieldNames = []; // don't show bar labels
    //     barSeries.setDataAndFields(config.data, config.xField, config.yFields);
    // }, 3000);

    setTimeout(() => {
        barSeries.yFields = ['q1Actual', 'q2Actual'];
    }, 2000);
    setTimeout(() => {
        barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual'];
    }, 4000);
    setTimeout(() => {
        barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    }, 6000);
    setTimeout(() => {
        barSeries.grouped = true;
    }, 8000);
    setTimeout(() => {
        barSeries.data = data3;
    }, 10000);
    setTimeout(() => {
        barSeries.data = [];
    }, 12000);
    setTimeout(() => {
        const config = generateData();
        barSeries.lineWidth = 1;
        barSeries.yFieldNames = []; // don't show bar labels
        barSeries.grouped = false;
        barSeries.setDataAndFields(config.data, config.xField, config.yFields);
    }, 14000);
    setTimeout(() => {
        const config = generateData(10, 10);
        barSeries.setDataAndFields(config.data, config.xField, config.yFields);
        barSeries.grouped = true;
    }, 16000);
    setTimeout(() => {
        chart.scene.hdpiCanvas.download('bar-chart');
    }, 18000);

    // barSeries.xField = 'xField';
    // barSeries.yFields = ['yField1', 'yField2', 'yField3'];
    // barSeries.yFieldNames = ['1', '2', '3'];
    // // barSeries.isGrouped = true;
    // barSeries.data = data2;

    // setTimeout(() => {
    //     barSeries.yFields = ['q1Budget', 'q2Budget', 'q3Budget', 'q4Budget'];
    // }, 2000);
});
