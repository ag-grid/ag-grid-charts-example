import { PolarChart } from "@ag-grid-enterprise/charts/src/charts/chart/polarChart";
import { PieSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/pieSeries";
import { Caption } from "@ag-grid-enterprise/charts/src/charts/caption";
import { createButton } from "../../lib/ui";
import { toDegrees } from "@ag-grid-enterprise/charts/src/charts/util/angle";

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
    chart.parent = document.body;
    chart.legend.position = 'bottom';
    chart.legend.labelFontSize = 15;
    chart.legend.labelFontFamily = 'Source Sans Pro';
    chart.legend.labelColor = 'rgb(124, 124, 124)';
    chart.legend.markerPadding = 6;

    const series = new PieSeries();
    series.data = data;
    series.angleKey = 'value';
    series.labelKey = 'label';
    series.fills = ['#5e64b2', '#fec444', '#f07372', '#35c2bd'];
    series.strokes = [];
    series.calloutColors = ['rgb(118, 117, 117)'];
    series.calloutLength = 13;
    series.showInLegend = true;
    series.labelFontSize = 14;
    series.labelFontFamily = 'Source Sans Pro';
    series.labelColor = 'rgb(102, 102, 102)';

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

        const dx = x - chart.centerX;
        const dy = y - chart.centerY;

        startSeriesAngle = series.rotation;
        startCursorAngle = Math.atan2(dy, dx);

        isDragging = true;
    });
    chart.element.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.offsetX;
            const y = e.offsetY;

            const dx = x - chart.centerX;
            const dy = y - chart.centerY;

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
