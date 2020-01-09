import { LineSeries } from "ag-charts-community/src/chart/series/cartesian/lineSeries";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { CategoryAxis } from "ag-charts-community/src/chart/axis/categoryAxis";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";

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
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.container = document.body;
    chart.axes = [xAxis, yAxis];

    setTimeout(() => {
        const lineSeries = new LineSeries();
        lineSeries.strokeWidth = 4;
        xAxis.label.rotation = 45;
        chart.addSeries(lineSeries);
        lineSeries.data = categoryData;
        lineSeries.xKey = 'category';
        lineSeries.yKey = 'value';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
});
