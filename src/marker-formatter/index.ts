import { pie } from "d3";
import { Circle } from "../../charts/chart/marker/circle";
import { Diamond } from "../../charts/chart/marker/diamond";
import { Plus } from "../../charts/chart/marker/plus";
import { AreaSeries, BarSeries, CartesianChart, CategoryAxis, ChartAxisPosition, LineSeries, NumberAxis, PieSeries, PolarChart, ScatterSeries } from "../../charts/main";
import { makeChartResizeable } from "../../lib/chart";
import { createButton, createSlider } from "../../lib/ui";

function createChart() {
    const data = generateData({
        count: 100,
        start: 0,
        end: 10,
        scale: 100,
        fns: [x => Math.sin(x * 1.5), x => Math.cos(x * 2), Math.sin, x => -Math.random()]
    });

    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 600;

    const areaSeries = new AreaSeries();
    areaSeries.marker.shape = Plus;
    areaSeries.marker.enabled = true;
    areaSeries.marker.size = 16;
    areaSeries.marker.formatter = params => {
        return {
            size: params.yKey === 'y2' ? 10 : params.size
        }
    };
    areaSeries.fillOpacity = 0.7;
    areaSeries.data = data;
    areaSeries.xKey = 'x';
    areaSeries.yKeys = ['y1', 'y2'];
    areaSeries.yNames = ['sin * 1.5 (normal size)', 'cos * 2 (size 10)'];

    const lineSeries = new LineSeries();
    lineSeries.marker.shape = Circle;
    lineSeries.marker.formatter = params => {
        return {
            fill: params.highlighted ? 'cyan' : (params.datum[params.yKey] > 0 ? 'green' : 'red'),
            stroke: params.stroke,
            strokeWidth: params.datum[params.yKey] > 0 ? params.strokeWidth : 4,
            size: params.highlighted ? 16 : 10
        };
    };
    lineSeries.data = data;
    lineSeries.xKey = 'x';
    lineSeries.yKey = 'y3';
    lineSeries.yName = 'sin (pos/green, neg/red)';

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.shape = Diamond;
    scatterSeries.marker.size = 10;
    scatterSeries.marker.maxSize = 40;
    scatterSeries.marker.formatter = params => {
        return {
            fill: params.fill,
            stroke: params.stroke,
            strokeWidth: params.size > 30 ? 4 : 2,
            size: params.size
        };
    };
    scatterSeries.data = data;
    scatterSeries.xKey = 'x';
    scatterSeries.yKey = 'y4';
    scatterSeries.yName = '-random (large size == thick stroke)';
    scatterSeries.sizeKey = 'size';

    chart.addSeries(areaSeries);
    chart.addSeries(lineSeries);
    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);

    createSlider('Area marker shape', ['plus', 'circle', 'diamond', 'cross', 'triangle'], shape => {
        areaSeries.marker.shape = shape;
    });

    createSlider('Legend marker shape (should override series marker shape)', ['plus', 'circle', 'diamond', 'cross', 'triangle'], shape => {
        chart.legend.item.marker.shape = shape;
    });

    createButton('Make legend use series markers again', () => {
        chart.legend.item.marker.shape = undefined;
    });
}

function createBarChart() {
    const data = [
        {
            category: 'A',
            value1: 5,
            value2: 2,
        },
        {
            category: 'B',
            value1: 7,
            value2: 3,
        },
        {
            category: 'C',
            value1: 11,
            value2: 5
        }
    ];

    const categoryAxis = new CategoryAxis();
    categoryAxis.position = ChartAxisPosition.Bottom;

    const numberAxis = new NumberAxis();
    numberAxis.position = ChartAxisPosition.Left;

    const barSeries = new BarSeries();
    barSeries.xKey = 'category';
    barSeries.yKeys = ['value1', 'value2'];
    barSeries.formatter = params => {
        return {
            fill: params.highlighted ? 'red' : params.fill,
            stroke: 'red',
            strokeWidth: params.datum.category === 'B' ? 6 : 2
        };
    };

    const chart = new CartesianChart();

    chart.axes = [categoryAxis, numberAxis];
    chart.series = [barSeries];
    chart.data = data;
    chart.width = 500;
    chart.height = 400;
    chart.container = document.body;

    makeChartResizeable(chart);
}

function createPieChart() {
    const data = [
        {
            category: 'A',
            value1: 5,
            value2: 2,
        },
        {
            category: 'B',
            value1: 7,
            value2: 3,
        },
        {
            category: 'C',
            value1: 11,
            value2: 5
        }
    ];

    const pieSeries = new PieSeries();
    pieSeries.angleKey = 'value1';
    pieSeries.labelKey = 'category';
    pieSeries.formatter = params => {
        return {
            fill: params.highlighted ? 'red' : params.fill,
            stroke: 'red',
            strokeWidth: params.datum.category === 'B' ? 6 : 2
        };
    };

    const chart = new PolarChart();
    chart.series = [pieSeries];
    chart.width = 500;
    chart.height = 400;
    chart.data = data;
    chart.container = document.body;
}

function createLineChart() {
    const data = [
        {
            month: 'Jan',
            revenue: 0.20,
            threshold: 0.4
        },
        {
            month: 'Feb',
            revenue: 0.21,
            threshold: 0.4
        },
        {
            month: 'Mar',
            revenue: 0.25,
            threshold: 0.4
        },
        {
            month: 'Apr',
            revenue: 0.28,
            threshold: 0.4
        },
        {
            month: 'May',
            revenue: 0.30,
            threshold: 0.4
        },
    ];

    const categoryAxis = new CategoryAxis();
    categoryAxis.position = ChartAxisPosition.Bottom;

    const numberAxis = new NumberAxis();
    numberAxis.position = ChartAxisPosition.Left;

    const lineSeries1 = new LineSeries();
    lineSeries1.xKey = 'month';
    lineSeries1.yKey = 'revenue';

    const lineSeries2 = new LineSeries();
    lineSeries2.xKey = 'month';
    lineSeries2.yKey = 'threshold';

    const chart = new CartesianChart();

    chart.axes = [categoryAxis, numberAxis];
    chart.series = [lineSeries1, lineSeries2];
    chart.data = data;
    chart.width = 500;
    chart.height = 400;
    chart.container = document.body;

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createLineChart();
    // createBarChart();
    // createPieChart();
    // createChart();
});

function generateData(params: {
    count: number,
    start: number,
    end: number,
    scale: number,
    fns: ((x: number) => number)[]
}): { x: number, y1: number, y2: number, y3: number, y4: number, size: number }[] {
    const data = [];
    const start = Math.min(params.start, params.end);
    const end = Math.max(params.start, params.end);
    const step = (end - start) / params.count;
    const fns = params.fns;
    const scale = params.scale;

    for (let i = start; i < end; i += step) {
        data.push({
            x: i,
            y1: fns[0 % fns.length](i) * scale,
            y2: fns[1 % fns.length](i) * scale,
            y3: fns[2 % fns.length](i) * scale,
            y4: fns[3 % fns.length](i) * scale,
            size: Math.random()
        });
    }
    return data;
}
