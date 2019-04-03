import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";

type CategoryDatum = {
    category: string,
    value: number
};

const categoryData: CategoryDatum[] = [
    { category: 'John', value: 3 },
    { category: 'Nige', value: 7 },
    { category: 'Vicky', value: 6 },
    { category: 'Rick', value: 4 },
    { category: 'Lucy', value: 8 },
    { category: 'Ben', value: 5 },
    { category: 'Barbara', value: 6 },
    { category: 'Maria', value: 3 }
];

function createCategoryLineChart() {
    const chart = new CartesianChart<CategoryDatum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = document.body.clientWidth;
    chart.height = 600;

    setTimeout(() => {
        const lineSeries = new LineSeries<CategoryDatum, string, number>();
        lineSeries.lineWidth = 4;
        chart.xAxis.labelRotation = 45;
        chart.addSeries(lineSeries);
        lineSeries.setDataAndFields(categoryData, 'category', 'value');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
});
