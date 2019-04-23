import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";

type CategoryDatum = {
    country: { toString: () => string, id: string },
    value: number
};

const data: CategoryDatum[] = [
    { country: { toString: () => 'Italy', id: '0' }, value: 3 },
    { country: { toString: () => 'Italy', id: '1' }, value: 7 },
    { country: { toString: () => 'Italy', id: '2' }, value: 6 },
    { country: { toString: () => 'Italy', id: '3' }, value: 4 },
    { country: { toString: () => 'Italy', id: '4' }, value: 8 }
];

function createCategoryLineChart() {
    const chart = new CartesianChart<CategoryDatum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = 800;
    chart.height = 500;

    const lineSeries = new LineSeries<CategoryDatum, string, number>();
    lineSeries.lineWidth = 4;
    lineSeries.data = data;
    lineSeries.xField = 'country';
    lineSeries.yField = 'value';
    lineSeries.tooltip = true;

    chart.series = [lineSeries];
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
});
