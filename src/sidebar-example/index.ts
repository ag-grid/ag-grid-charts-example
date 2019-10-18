import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import { Chart } from "ag-grid-enterprise/src/charts/chart/chart";
import { Caption } from "ag-grid-enterprise/src/charts/caption";
import borneo, {
    bright,
    flat,
    material,
    pastel,
} from "ag-grid-enterprise/src/charts/chart/palettes";

import './app.css';
import { createButton, createSlider } from "../../lib/ui";
import * as d3 from "d3";
import { CartesianChart } from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import { CategoryAxis } from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";

function generateData(n = 50, yKeyCount = 10) {
    const data: any[] = [];
    const yKeys: string[] = [];
    for (let i = 0; i < yKeyCount; i++) {
        yKeys[i] = 'Y' + (i + 1);
    }
    for (let i = 0; i < n; i++) {
        const datum: any = {
            category: 'A' + (i + 1)
        };
        yKeys.forEach(key => {
            datum[key] = Math.random() * 10;
        });
        data.push(datum);
    }
    return {
        data,
        xKey: 'category',
        yKeys: yKeys
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const dialogDiv = document.createElement('div');
    const chartContainer = document.createElement('div');
    const panelDiv = document.createElement('div');
    dialogDiv.appendChild(chartContainer);
    dialogDiv.appendChild(panelDiv);
    document.body.appendChild(dialogDiv);

    const xAxis = new CategoryAxis();
    xAxis.label.rotation = 0;
    const yAxis = new NumberAxis();
    const chart = new CartesianChart({
        xAxis,
        yAxis
    });
    chart.width = 800;
    chart.height = 500;
    chart.parent = chartContainer;
    chart.title = new Caption();
    chart.title.text = 'This is a sliding panel test';
    chart.subtitle = new Caption();
    chart.subtitle.text = 'Nothing else to see here';

    panelDiv.style.flexGrow = '1';
    panelDiv.style.display = 'flex';
    panelDiv.style.flexDirection = 'column';
    panelDiv.style.backgroundColor = '#efefef';
    panelDiv.style.borderLeft = '1px solid black';
    panelDiv.style.padding = '10px';

    dialogDiv.style.display = 'flex';
    dialogDiv.style.overflow = 'hidden';
    dialogDiv.style.width = '800px';
    dialogDiv.style.boxShadow = '0 0 1px rgba(3, 3, 3, 0.7), 0.5vh 0.5vh 1vh rgba(3, 3, 3, 0.25)';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    const config = generateData(10, 16);
    barSeries.yNames = []; // don't show bar labels
    barSeries.xKey = config.xKey;
    barSeries.yKeys = config.yKeys;
    barSeries.data = config.data;
    barSeries.grouped = false;
    barSeries.fills = material.fills;
    barSeries.tooltipEnabled = true;

    createButton('Grouped', () => {
        barSeries.grouped = true;
    }, panelDiv);
    createButton('Stacked', () => {
        barSeries.grouped = false;
    }, panelDiv);

    document.body.appendChild(document.createElement('br'));

    createButton('Show panel', () => {
        panelDiv.style.position = 'inherit';
        panelDiv.style.right = 'inherit';
        panelDiv.style.opacity = '1';
        d3.transition().duration(700).tween('width', () => {
            const i = d3.interpolate(800, 600);
            return (t: number) => {
                chart.width = i(t);
            };
        });
    });

    createButton('Hide panel', () => {
        d3.transition().duration(700).tween('width', () => {
            const i = d3.interpolate(600, 800);
            return (t: number) => {
                chart.width = i(t);
            };
        });
    });

    createButton('Show overlay', () => {
        panelDiv.style.position = 'sticky';
        panelDiv.style.right = '0';
        panelDiv.style.opacity = '0';
        d3.transition().duration(1000).tween('width', () => {
            const minWidthInterpolator = d3.interpolate(0, 150);
            const opacityInterpolator = d3.interpolate(0, 0.95);
            return (t: number) => {
                panelDiv.style.minWidth = minWidthInterpolator(t) + 'px';
                panelDiv.style.opacity = String(opacityInterpolator(t));
            };
        });
    });

    createButton('Hide overlay', () => {
        d3.transition().duration(1000).tween('width', () => {
            const minWidthInterpolator = d3.interpolate(150, 0);
            const opacityInterpolator = d3.interpolate(0.95, 0);
            return (t: number) => {
                panelDiv.style.minWidth = minWidthInterpolator(t) + 'px';
                panelDiv.style.opacity = String(opacityInterpolator(t));
            };
        });
    });

    // makeChartResizeable(chart);
});
