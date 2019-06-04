import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";
import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import { CategoryAxis } from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";

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
    const chart = new CartesianChart(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;
    chart.width = 800;
    chart.height = 500;

    const lineSeries = new LineSeries();
    lineSeries.strokeWidth = 4;
    lineSeries.data = data;
    lineSeries.xField = 'country';
    lineSeries.yField = 'value';
    lineSeries.tooltipEnabled = true;
    lineSeries.title = 'Countries';

    chart.series = [lineSeries];
}

function createBarChart() {
    const chart = new CartesianChart(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.parent = document.body;
    chart.width = 800;
    chart.height = 500;

    const lineSeries = new BarSeries();
    lineSeries.strokeWidth = 4;
    lineSeries.data = data;
    lineSeries.xField = 'country';
    lineSeries.yFields = ['value', 'other'];
    lineSeries.yFieldNames = ['Countries', 'Whatever'];
    lineSeries.tooltipEnabled = true;

    chart.series = [lineSeries];
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
    createBarChart();
});
