import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";
import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";

import './app.css';

type CategoryDatum = {
    country: { toString: () => string },
    value: number,
    other: number
};

const data: CategoryDatum[] = [
    { country: { toString: () => 'France' }, value: 3, other: 2 },
    { country: { toString: () => 'Italy' }, value: 7, other: 3 },
    { country: { toString: () => 'France' }, value: 6, other: 2 },
    { country: { toString: () => 'Italy' }, value: 4, other: 5 },
    { country: { toString: () => 'Italy' }, value: 8, other: 3 }
];

function createCategoryLineChart() {
    const chart = new CartesianChart({
        parent: document.body,
        width: 800,
        height: 500,
        xAxis: { type: 'category' },
        yAxis: { type: 'number' }
    });

    const lineSeries = new LineSeries();
    lineSeries.lineWidth = 4;
    lineSeries.data = data;
    lineSeries.xField = 'country';
    lineSeries.yField = 'value';
    lineSeries.tooltip = true;
    lineSeries.title = 'Countries';

    chart.series = [lineSeries];
}

function createBarChart() {
    const chart = new CartesianChart({
        parent: document.body,
        width: 800,
        height: 500,
        xAxis: { type: 'category' },
        yAxis: { type: 'number' }
    });

    const lineSeries = new BarSeries({
        data,
        lineWidth: 4,
        xField: 'country',
        yFields: ['value', 'other'],
        yFieldNames: ['Countries', 'Whatever'],
        tooltip: true
    });

    chart.series = [lineSeries];
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
    createBarChart();
});
