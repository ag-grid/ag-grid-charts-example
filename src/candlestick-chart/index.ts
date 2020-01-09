import './app.css';
import { data } from './data';
import { TimeAxis } from 'ag-charts-community/src/chart/axis/timeAxis';
import { CartesianChart } from 'ag-charts-community/src/chart/cartesianChart';
import month from 'ag-charts-community/src/util/time/month';
import { NumberAxis } from 'ag-charts-community/src/chart/axis/numberAxis';
import { OHLCSeries } from "ag-charts-community/src/chart/series/cartesian/ohlc/ohlcSeries";
import { makeChartResizeable } from '../../lib/chart';
import { LineSeries } from 'ag-charts-community/src/chart/series/cartesian/lineSeries';
import { createButton } from '../../lib/ui';
import { Square } from 'ag-charts-community/src/chart/marker/square';
import { locale } from 'ag-charts-community/src/util/time/format/defaultLocale';
import { CategoryAxis } from 'ag-charts-community/src/chart/axis/categoryAxis';
import { BarSeries } from 'ag-charts-community/src/chart/series/cartesian/barSeries';
import { ChartAxisPosition } from 'ag-charts-community/src/chart/chartAxis';

function createChart() {
    const xAxis = new TimeAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.tick.count = month;
    xAxis.label.format = '%m-%Y';

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.width = 1600;
    chart.height = 800;
    chart.axes = [xAxis, yAxis];

    const dateFormatter = locale.format('%d %b, %Y');
    const lineSeries = new LineSeries();
    lineSeries.title = "MSFT's highs";
    lineSeries.xKey = 'date';
    lineSeries.yKey = 'high';
    lineSeries.stroke = 'black';
    lineSeries.fill = '#0082cf';
    lineSeries.strokeWidth = 1;
    lineSeries.tooltipEnabled = true;
    lineSeries.visible = false;
    lineSeries.tooltipRenderer = (params) => {
        const { title, color } = params;
        const x = params.datum[params.xKey];
        const y = params.datum[params.yKey];
        const titleStyle = `style="color: white; background-color: ${color}"`;
        const titleHtml = title ? `<div class="ag-chart-tooltip-title" ${titleStyle}>${title}</div>` : '';
        const contentHtml = dateFormatter(x) + ': ' + (typeof y === 'number' ? y.toFixed(2) : String(y));
        return `${titleHtml}<div class="ag-chart-tooltip-content">${contentHtml}</div>`;
    };

    const ohlcSeries = new OHLCSeries();
    ohlcSeries.title = 'Microsoft';
    ohlcSeries.marker.strokeWidth = 1;
    ohlcSeries.tooltipEnabled = true;

    chart.series = [ohlcSeries, lineSeries] as any;

    chart.container = document.body;

    const volumeChart = createVolumeChart();

    makeChartResizeable(chart);

    chart.data = data;

    document.body.appendChild(document.createElement('br'));

    createButton('Add line markers', () => {
        lineSeries.marker.shape = Square;
        lineSeries.marker.size = 3;
    });

    createButton('Remove line markers', () => {
        lineSeries.marker.shape = undefined;
    });
}

function createVolumeChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = -90;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;
    // xAxis.tick.count = month;
    // xAxis.label.format = '%m-%Y';
    // xAxis.label.rotation = 45;
    const chart = new CartesianChart();
    chart.width = 1600;
    chart.height = 200;
    chart.axes = [xAxis, yAxis];

    const barSeries = new BarSeries();
    barSeries.xKey = 'date';
    barSeries.yKeys = ['volume'];
    barSeries.yNames = ['Volume'];
    barSeries.grouped = false;

    chart.series = [barSeries] as any;

    chart.data = data.map((d, i) => {
        return {
            date: String(i),
            volume: d.volume
        };
    });

    chart.container = document.body;

    makeChartResizeable(chart);

    return chart;
}

document.addEventListener('DOMContentLoaded', () => {
    createChart();
});
