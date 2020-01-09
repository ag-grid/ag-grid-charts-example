import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { LineSeries } from "ag-charts-community/src/chart/series/cartesian/lineSeries";
import { AreaSeries } from "ag-charts-community/src/chart/series/cartesian/areaSeries";
import { ScatterSeries } from "ag-charts-community/src/chart/series/cartesian/scatterSeries";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { Circle } from "ag-charts-community/src/chart/marker/circle";
import { Diamond } from "ag-charts-community/src/chart/marker/diamond";
import { Plus } from "ag-charts-community/src/chart/marker/plus";
import { makeChartResizeable } from "../../lib/chart";

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
    areaSeries.marker.size = 16;
    areaSeries.marker.formatter = params => {
        return {
            fill: params.fill,
            stroke: params.stroke,
            strokeWidth: params.strokeWidth,
            size: params.yKey === 'y2' ? 10 : params.size
        }
    };
    areaSeries.fillOpacity = 0.7;
    areaSeries.data = data;
    areaSeries.xKey = 'x';
    areaSeries.yKeys = ['y1', 'y2'];
    areaSeries.yNames = ['sin * 1.5', 'cos * 2'];

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
    lineSeries.yName = 'sin';

    const scatterSeries = new ScatterSeries();
    scatterSeries.marker.shape = Diamond;
    scatterSeries.marker.minSize = 10;
    scatterSeries.marker.size = 40;
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
    scatterSeries.yName = '-random';
    scatterSeries.sizeKey = 'size';

    chart.addSeries(areaSeries);
    chart.addSeries(lineSeries);
    chart.addSeries(scatterSeries);

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createChart();
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
