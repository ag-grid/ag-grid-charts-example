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
    const chart = new CartesianChart({
        parent: document.body,
        xAxis: new CategoryAxis(),
        yAxis: new NumberAxis()
    });
    chart.width = document.body.clientWidth;
    chart.height = 600;

    setTimeout(() => {
        const lineSeries = new LineSeries();
        lineSeries.lineWidth = 4;
        chart.xAxis.labelRotation = 45;
        chart.addSeries(lineSeries);
        lineSeries.data = categoryData;
        lineSeries.xField = 'category';
        lineSeries.yField = 'value';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
});
