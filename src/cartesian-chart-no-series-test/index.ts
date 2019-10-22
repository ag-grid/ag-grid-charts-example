import { LineSeries } from "@ag-enterprise/grid-charts/src/charts/chart/series/lineSeries";
import { CartesianChart } from "@ag-enterprise/grid-charts/src/charts/chart/cartesianChart";
import { CategoryAxis } from "@ag-enterprise/grid-charts/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "@ag-enterprise/grid-charts/src/charts/chart/axis/numberAxis";

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
    const xAxis = new CategoryAxis();
    const yAxis = new NumberAxis();
    const chart = new CartesianChart({
        xAxis,
        yAxis
    });
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.parent = document.body;

    setTimeout(() => {
        const lineSeries = new LineSeries();
        lineSeries.strokeWidth = 4;
        chart.xAxis.label.rotation = 45;
        chart.addSeries(lineSeries);
        lineSeries.data = categoryData;
        lineSeries.xKey = 'category';
        lineSeries.yKey = 'value';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
});
