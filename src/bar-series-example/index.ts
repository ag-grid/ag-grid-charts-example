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

document.addEventListener('DOMContentLoaded', () => {
    const chart = new CartesianChart<Datum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = 900;
    chart.height = 500;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const barSeries = new BarSeries<Datum>();
    chart.addSeries(barSeries);
    barSeries.xField = 'category';
    barSeries.yFields = ['q1Actual'];
    barSeries.yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    barSeries.data = data;

    setTimeout(() => {
        barSeries.yFields = ['q1Actual', 'q2Actual'];
    }, 3000);
    setTimeout(() => {
        barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual'];
    }, 6000);
    setTimeout(() => {
        barSeries.yFields = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    }, 9000);
    setTimeout(() => {
        barSeries.isGrouped = true;
    }, 12000);

    // barSeries.xField = 'xField';
    // barSeries.yFields = ['yField1', 'yField2', 'yField3'];
    // barSeries.yFieldNames = ['1', '2', '3'];
    // // barSeries.isGrouped = true;
    // barSeries.data = data2;

    // setTimeout(() => {
    //     barSeries.yFields = ['q1Budget', 'q2Budget', 'q3Budget', 'q4Budget'];
    // }, 2000);
});
