import { PolarChart } from "ag-grid-enterprise/src/charts/chart/polarChart";
import { PieSeries } from "ag-grid-enterprise/src/charts/chart/series/pieSeries";
import { Caption } from "ag-grid-enterprise/src/charts/chart/caption";
import { createButton } from "../../lib/ui";

const data = [
    {
        "label": "Food",
        "value": "285040"
    },
    {
        "label": "Apparels",
        "value": "146330"
    },
    {
        "label": "Electronics",
        "value": "105070"
    },
    {
        "label": "Household",
        "value": "49100"
    }
];

function renderChart() {
    const chart = new PolarChart();
    chart.width = 550;
    chart.height = 350;
    chart.parent = document.body;
    chart.legendPosition = 'bottom';
    chart.legend.labelFont = '15px Source Sans Pro';
    chart.legend.labelColor = 'rgb(124, 124, 124)';
    chart.legend.markerPadding = 6;

    const series = new PieSeries();
    series.data = data;
    series.angleField = 'value';
    series.labelField = 'label';
    series.fills = ['#5e64b2', '#fec444', '#f07372', '#35c2bd'];
    series.strokes = [];
    series.calloutColors = ['rgb(118, 117, 117)'];
    series.calloutLength = 13;
    series.showInLegend = true;
    series.labelFont = '14px Source Sans Pro';
    series.labelColor = 'rgb(102, 102, 102)';

    chart.addSeries(series);

    chart.title = Caption.create({
        text: 'Split of revenue by product categories',
        font: 'bold 18px Source Sans Pro',
        color: 'rgb(90, 90, 90)'
    });
    chart.subtitle = Caption.create({
        text: 'Last year',
        font: '13px Source Sans Pro',
        color: 'rgb(153, 153, 153)'
    });

    createButton('Save Chart', () => {
        chart.scene.download();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
