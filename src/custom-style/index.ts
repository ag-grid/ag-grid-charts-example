import { createButton } from "../../lib/ui";
import { PolarChart } from "../../charts/chart/polarChart";
import { PieSeries } from "../../charts/chart/series/polar/pieSeries";
import { Caption } from "../../charts/caption";
import { toDegrees } from "../../charts/util/angle";
import { LegendPosition } from "../../charts/chart/legend";

const data = [
    {
        "label": "Food",
        "value": "285040"
    },
    {
        "label": "Apparels",
        "value": "146330"
    },
    {
        "label": "Electronics",
        "value": "105070"
    },
    {
        "label": "Household",
        "value": "49100"
    }
];

function renderChart() {
    const chart = new PolarChart();
    chart.width = 550;
    chart.height = 350;
    chart.container = document.body;
    chart.legend.position = LegendPosition.Bottom;
    chart.legend.item.label.fontSize = 15;
    chart.legend.item.label.fontFamily = 'Source Sans Pro';
    chart.legend.item.label.color = 'rgb(124, 124, 124)';
    chart.legend.item.marker.padding = 6;

    const series = new PieSeries();
    series.data = data;
    series.angleKey = 'value';
    series.labelKey = 'label';
    series.fills = ['#5e64b2', '#fec444', '#f07372', '#35c2bd'];
    series.strokes = [];
    series.callout.colors = ['rgb(118, 117, 117)'];
    series.callout.length = 13;
    series.showInLegend = true;
    series.label.fontSize = 14;
    series.label.fontFamily = 'Source Sans Pro';
    series.label.color = 'rgb(102, 102, 102)';

    chart.addSeries(series);

    chart.title = new Caption();
    chart.title.text = 'Split of revenue by product categories';
    chart.title.fontWeight = 'bold';
    chart.title.fontSize = 18;
    chart.title.fontFamily = 'Source Sans Pro';
    chart.title.color = 'rgb(90, 90, 90)';

    chart.subtitle = new Caption();
    chart.subtitle.text = 'Last year';
    chart.subtitle.fontSize = 13;
    chart.subtitle.fontFamily = 'Source Sans Pro';
    chart.subtitle.color = 'rgb(153, 153, 153)';

    createButton('Save Chart', () => {
        chart.scene.download();
    });

    let isDragging = false;
    let startSeriesAngle = 0;
    let startCursorAngle = 0;
    chart.element.addEventListener('mousedown', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        const dx = x - series.centerX;
        const dy = y - series.centerY;

        startSeriesAngle = series.rotation;
        startCursorAngle = Math.atan2(dy, dx);

        isDragging = true;
    });
    chart.element.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.offsetX;
            const y = e.offsetY;

            const dx = x - series.centerX;
            const dy = y - series.centerY;

            const deltaCursorAngle = toDegrees(Math.atan2(dy, dx) - startCursorAngle);

            series.rotation = startSeriesAngle + deltaCursorAngle;
        }
    });
    chart.element.addEventListener('mouseup', (e) => {
        isDragging = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
