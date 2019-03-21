import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";

type Datum = {
    label: string,
    value: number,
    other: number
};

const data: Datum[] = [
    { label: 'John', value: 3, other: 7 },
    { label: 'Nige', value: 7, other: 8 },
    { label: 'Vicky', value: 6, other: 9 },
    { label: 'Rick', value: 4, other: 10 },
    { label: 'Lucy', value: 8, other: 11 },
    { label: 'Ben', value: 5, other: 12 },
    { label: 'Barbara', value: 6, other: 10 },
    { label: 'Maria', value: 3, other: 8 }
];

function generateData(n = 50): Datum[] {
    const data: Datum[] = [];
    for (let i = 0; i < n; i++) {
        const datum: Datum = {
            label: 'A' + (i + 1),
            value: Math.random() * 10,
            other: Math.random() * 100
        };
        data.push(datum);
    }
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
    const chart = new CartesianChart<any, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = document.body.clientWidth;
    chart.height = document.body.clientHeight;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const lineSeries = new LineSeries<any>();
    lineSeries.lineWidth = 4;
    chart.xAxis.labelRotation = 45;
    chart.addSeries(lineSeries);
    lineSeries.setDataAndFields(data, 'label', 'value');

    const saveImageButton = document.createElement('button');
    saveImageButton.textContent = 'Save Chart Image';
    document.body.appendChild(saveImageButton);
    saveImageButton.addEventListener('click', () => {
        chart.scene.download('pie-chart');
    });

    const changeDataButton = document.createElement('button');
    changeDataButton.textContent = 'Change data';
    document.body.appendChild(changeDataButton);
    changeDataButton.addEventListener('click', () => {
        lineSeries.setDataAndFields(generateData(Math.floor(Math.random() * 50)), 'label', 'value');
    });
});
