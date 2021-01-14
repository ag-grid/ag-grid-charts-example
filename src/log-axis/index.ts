import * as d3 from "d3";
import { LogScale } from "ag-charts-community/src/scale/logScale";
import { Axis } from "ag-charts-community/src/axis";
import { Scene } from "ag-charts-community/src/scene/scene";
import { Group } from "ag-charts-community/src/scene/group";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { LineSeries } from "ag-charts-community/src/chart/series/cartesian/lineSeries";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";

document.addEventListener('DOMContentLoaded', () => {
    // testConvert();
    // changeOfBase();
    createScene();
    testD3Axis();
});

function testTicks() {
    const scale = d3.scaleLog().domain([100, 1000000]);
    console.log(scale.ticks(10));
    console.log(scale.ticks(4));

    scale.domain([-100, 10000]);
    console.log(scale.ticks(10));

    scale.domain([-1000, -10]);
    console.log(scale.ticks(10));
}

function testConvert() {
    {
        const scale = d3.scaleLog();
        scale.domain([10, 1000]);

        console.log(scale(50));
    }

    {
        const scale = d3.scaleLog();
        scale.domain([-1000, -10]);

        console.log(scale(-50));
    }
}

function changeOfBase() {
    {
        const scale = d3.scaleLog();
        scale.domain([10, 1000]);

        console.log(scale.ticks());
        scale.base(Math.E);
        console.log(scale.ticks());
    }
}

function testNice() {
    const scale = d3.scaleLog();
    scale.domain([Math.E * 1.234, Math.E * 5.783]);
    scale.base(Math.E);
    scale.nice();
    console.log(scale.domain());
}

function createScene() {
    const scene = new Scene();
    scene.resize(400, 1200);
    scene.container = document.body;
    const root = new Group();

    testAxis(root);
    testNiceAxis(root);
    createLineChart();

    scene.root = root;
}

const initialDelay = 3000;

function testAxis(root: Group) {
    const scale = new LogScale();
    scale.domain = [10, 10000];
    scale.range = [1000, 0];
    const axis = new Axis(scale);

    axis.translation.x = 150;
    axis.translation.y = 50;
    // axis.tickCount = 3;
    axis.update();

    root.append(axis.group);

    let max = 10000;
    function step() {
        max -= 5;
        scale.domain = [10, max];
        axis.update();
        if (max > 50) {
            requestAnimationFrame(step);
        }
    }
    setTimeout(step, initialDelay);
}

function testNiceAxis(root: Group) {
    const scale = new LogScale();
    scale.domain = [10, 10000];
    scale.range = [1000, 0];
    const axis = new Axis(scale);

    axis.translation.x = 250;
    axis.translation.y = 50;
    // axis.tickCount = 3;
    axis.update();

    root.append(axis.group);

    let max = 10000;
    function step() {
        max -= 5;
        scale.domain = [10, max];
        scale.nice();
        axis.update();
        if (max > 50) {
            requestAnimationFrame(step);
        }
    }
    setTimeout(step, initialDelay);
}

function createLineChart() {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new NumberAxis();
    (yAxis as any).scale = new LogScale();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.width = 800;
    chart.height = 1000;
    chart.axes = [xAxis, yAxis];

    chart.container = document.body;

    const series = new LineSeries();
    series.data = [{ x: 1, y: 5 }, { x: 3, y: 70 }, { x: 7, y: 800 }, { x: 9, y: 3300 }];
    series.xKey = 'x';
    series.yKey = 'y';
    series.strokeWidth = 3;
    series.stroke = 'black';
    series.marker.enabled = true;
    chart.series = [series as any];
}

function testD3Axis() {
    const g = d3.select(document.body).append('svg')
        .attr('width', 400)
        .attr('height', 1200)
        .append('g')
        .attr('transform', 'translate(150,50)');

    const logScale = d3.scaleLog().domain([10, 10000]).range([1000, 0]);
    const axis = d3.axisLeft(logScale);
    g.call(axis);

    let max = 10000;
    function step() {
        max -= 5;
        logScale.domain([10, max]);
        g.call(axis);
        if (max > 50) {
            requestAnimationFrame(step);
        }
    }
    setTimeout(step, initialDelay);
}
