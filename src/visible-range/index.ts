import { createRangeSlider, createButton, createSlider } from "../../lib/ui";
import { makeChartResizeable } from "../../lib/chart";
import { CategoryAxis } from "../../charts/chart/axis/categoryAxis";
import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { BarSeries } from "../../charts/chart/series/cartesian/barSeries";
import { LineSeries } from "../../charts/chart/series/cartesian/lineSeries";
import { GroupedCategoryAxis } from "../../charts/chart/axis/groupedCategoryAxis";
import { AgChart } from "../../charts/chart/agChart";
import { AgCartesianChartOptions } from "../../charts/chart/agChartOptions";

const data = [
    { name: "E", value: 0.12702 },
    { name: "T", value: 0.09056 },
    { name: "A", value: 0.08167 },
    { name: "O", value: 0.07507 },
    { name: "I", value: 0.06966 },
    { name: "N", value: 0.06749 },
    { name: "S", value: 0.06327 },
    { name: "H", value: 0.06094 },
    { name: "R", value: 0.05987 },
    { name: "D", value: 0.04253 },
    { name: "L", value: 0.04025 },
    { name: "C", value: 0.02782 },
    { name: "U", value: 0.02758 },
    { name: "M", value: 0.02406 },
    { name: "W", value: 0.0236 },
    { name: "F", value: 0.02288 },
    { name: "G", value: 0.02015 },
    { name: "Y", value: 0.01974 },
    { name: "P", value: 0.01929 },
    { name: "B", value: 0.01492 },
    { name: "V", value: 0.00978 },
    { name: "K", value: 0.00772 },
    { name: "J", value: 0.00153 },
    { name: "X", value: 0.0015 },
    { name: "Q", value: 0.00095 },
    { name: "Z", value: 0.00074 },
];

const groupedCategoryData = [
    {
        category: {
            labels: [
                "Poppy Grady",
                "Argentina"
            ]
        },
        jan: 86135,
        feb: 178,
        mar: 55905
    },
    {
        category: {
            labels: [
                "Layla Smith",
                "Argentina"
            ]
        },
        jan: 23219,
        feb: 11523,
        mar: 54291
    },
    {
        category: {
            labels: [
                "Isabella Kingston",
                "Belgium"
            ]
        },
        jan: 66433,
        feb: 3655,
        mar: 52061
    },
    {
        category: {
            labels: [
                "Mia Unalkat",
                "Brazil"
            ]
        },
        jan: 57544,
        feb: 39051,
        mar: 78481
    },
    {
        category: {
            labels: [
                "Gil Lopes",
                "Colombia"
            ]
        },
        jan: 20479,
        feb: 2253,
        mar: 39309
    },
    {
        category: {
            labels: [
                "Isabelle Donovan",
                "Colombia"
            ]
        },
        jan: 73957,
        feb: 25775,
        mar: 56291
    }
].map(d => {
    d.category.toString = function () {
        return this.labels.slice().reverse().join(' - ');
    };
    return d;
});

function createColumnChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    // chart.padding = new Padding(40);
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';

    const barSeries = new BarSeries();
    barSeries.xKey = 'name';
    barSeries.yKeys = [['value']];
    barSeries.fills = ['#f7bc09'];
    barSeries.data = data;

    const lineSeries = new LineSeries();
    lineSeries.xKey = 'name';
    lineSeries.yKey = 'value';
    lineSeries.marker.fill = '#88be48';
    lineSeries.marker.stroke = 'black';
    lineSeries.stroke = '#88be48';
    lineSeries.data = data; //.map(d => ({ ...d, value: d.value -= 0.05 }));

    chart.series = [barSeries, lineSeries];

    document.body.appendChild(document.createElement('br'));

    createRangeSlider('Visible Range', [0, 1], 0.01, (min, max) => {
        chart.navigator.min = min;
        chart.navigator.max = max;
    });

    makeChartResizeable(chart);

    // chart.scene.canvas.setPixelRatio(1);
    // chart.scene.canvas.pixelated = true;

    createButton('Toggle Range Selector Visibility', () => {
        chart.navigator.enabled = !chart.navigator.enabled;
        chart.performLayout();
    });

    createSlider('Pixel Ratio', [0.1, 0.25, 0.5, 1, 2, 4], value => {
        chart.scene.canvas.setPixelRatio(value);
        chart.scene.dirty = true;
    });

    createButton('Pixelated: ON', () => {
        chart.scene.canvas.pixelated = true;
    });

    createButton('Pixelated: OFF', () => {
        chart.scene.canvas.pixelated = false;
    });

    return chart;
}

function createGroupedColumnChart() {
    const xAxis = new GroupedCategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';

    const barSeries = new BarSeries();
    barSeries.xKey = 'category';
    barSeries.yKeys = [['jan', 'feb', 'mar']];
    barSeries.data = groupedCategoryData;

    chart.series = [barSeries];

    chart.navigator.enabled = true;

    makeChartResizeable(chart);

    return chart;
}

function createZoomedColumnChartUsingFactory() {
    const chart = AgChart.create({
        container: document.body,
        data,
        width: 500,
        series: [{
            type: 'column',
            xKey: 'name',
            yKeys: ['value']
        }],
        axes: [{
            type: 'number',
            position: 'left',
            // visibleRange: [0, 0.5]
        }, {
            type: 'category',
            position: 'bottom',
            // visibleRange: [0, 0.5]
        }],
        navigator: {
            enabled: true,
            height: 50,
            mask: {
                fill: 'red',
                strokeWidth: 2
            },
            minHandle: {
                width: 16,
                height: 30,
                stroke: 'blue',
                fill: 'yellow',
                gripLineGap: 4,
                gripLineLength: 12,
                strokeWidth: 2
            },
            maxHandle: {
                width: 16,
                stroke: 'red',
                fill: 'cyan'
            }
        }
    });

    makeChartResizeable(chart);

    return chart;
}

document.addEventListener('DOMContentLoaded', () => {
    createColumnChart();
    createGroupedColumnChart();
    createZoomedColumnChartUsingFactory();
});