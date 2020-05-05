import { CategoryAxis } from "ag-charts-community/src/chart/axis/categoryAxis";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";
import { Padding } from "ag-charts-community/src/util/padding";
import { Series } from "ag-charts-community/src/chart/series/series";
import { BarSeries } from "ag-charts-community/src/chart/series/cartesian/barSeries";
import { createSlider, createRangeSlider } from "../../lib/ui";
import { Scene } from "ag-charts-community/src/scene/scene";
import { Group } from "ag-charts-community/src/scene/group";
import { LinearScale } from "ag-charts-community/src/scale/linearScale";

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

function createColumnChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.padding = new Padding(40);
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';

    const barSeries = new BarSeries();
    barSeries.xKey = 'name';
    barSeries.yKeys = ['value'];
    barSeries.data = data;

    chart.series = [barSeries];

    const xRangeScale = new LinearScale();
    xRangeScale.domain = [0, 1];

    let first = true;
    let originalRange: number[];
    createRangeSlider('Visible Range', [0, 1], 0.01, range => {
        if (first) {
            xRangeScale.range = originalRange = xAxis.range;
            first = false;
        }
        const scale = 1 / Math.max(Math.abs(range[1] - range[0]), 0.05);
        console.log(range, scale);
        // const visibleRange = range = [
        //     xRangeScale.convert(range[0]) * scale,
        //     xRangeScale.convert(range[1]) * scale
        // ];
        const visibleRange = [
            originalRange[0],
            originalRange[1] * scale
        ];
        console.log('Visible Range', visibleRange);
        xAxis.range = visibleRange;
        xAxis.update();

        barSeries.update();
    });

    return chart;
}

class Navigator {
    readonly group: Group = new Group();
}

function canvasEx() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(800, 0);
    ctx.lineTo(800, 200);
    ctx.lineTo(0, 200);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-out';
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(600, 0);
    ctx.lineTo(600, 200);
    ctx.lineTo(400, 200);
    ctx.closePath();
    // ctx.fill();
    // ctx.fillRect(400, 0, 200, 200);
    ctx.clip();

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    // ctx.fillRect(0, 0, 800, 200);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(800, 0);
    ctx.lineTo(800, 200);
    ctx.lineTo(0, 200);
    // ctx.closePath();
    ctx.fill();
}

document.addEventListener('DOMContentLoaded', () => {
    createColumnChart();
});