import { PolarChart } from "ag-grid-enterprise/src/charts/chart/polarChart";
import { PieSeries } from "ag-grid-enterprise/src/charts/chart/series/pieSeries";

const data = [
    {label: 'BlackBerry', value: 6.8, other: 9},
];

function renderChart() {
    const chart = new PolarChart();
    chart.parent = document.body;

    const series = new PieSeries();
    series.data = data;
    series.angleField = 'value';
    series.labelField = 'label';
    series.labelEnabled = false;

    chart.addSeries(series);
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
