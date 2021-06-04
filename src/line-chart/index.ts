import { HdpiCanvas } from "../../charts/canvas/hdpiCanvas";
import { CanvasAxis } from "../../charts/canvasAxis";
import { BandScale, LinearScale } from "../../charts/main";

const data = [
    {
        month: 'Jan',
        desktops: 80,
        laptops: 30,
        tablets: 10
    },
    {
        month: 'Feb',
        desktops: 45,
        laptops: 25,
        tablets: 15
    },
    {
        month: 'Mar',
        desktops: 25,
        laptops: 35,
        tablets: 20
    },
    {
        month: 'Apr',
        desktops: 20,
        laptops: 50,
        tablets: 35
    },
    {
        month: 'May',
        desktops: 10,
        laptops: 45,
        tablets: 60
    },
    {
        month: 'Jun',
        desktops: 5,
        laptops: 55,
        tablets: 95
    },
];

const colorTheme = [
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#E55934',
    '#FA7921',
];

function renderChart() {
    const yKeys = ['desktops', 'laptops', 'tablets'];
    const colors = colorTheme;

    const padding = {
        top: 20,
        right: 100,
        bottom: 40,
        left: 60
    };

    const n = data.length;
    // Map key names to their values.
    const xData = data.map(datum => datum.month);
    // `yData` - arrays of size `n` of the domain values for each of the `yKeys`.
    const yData = yKeys.map(key => data.map(datum => (datum as any)[key] as number));

    const canvasWidth = document.body.getBoundingClientRect().width;
    const canvasHeight = 480;
    const seriesWidth = canvasWidth - padding.left - padding.right;
    const seriesHeight = canvasHeight - padding.top - padding.bottom;

    const yScale = new LinearScale();
    yScale.domain = [0, Math.max(...yData.map(values => Math.max(...values)))];
    yScale.range = [seriesHeight, 0];

    const xScale = new BandScale<string>();
    xScale.domain = xData;
    xScale.range = [0, seriesWidth];
    const bandwidth = xScale.bandwidth;

    const canvas = new HdpiCanvas(document, canvasWidth, canvasHeight);
    document.body.appendChild(canvas.element);

    const ctx = canvas.element.getContext('2d')!;
    ctx.font = '14px Verdana';

    const markerRadius = 5;

    // line
    ctx.save();
    ctx.translate(padding.left, padding.top);
    yData.forEach((keyData, j) => {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 3;
        ctx.strokeStyle = colors[j % colors.length];
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const category = xData[i];
            const value = keyData[i];
            const x = xScale.convert(category) + bandwidth / 2;
            const y = yScale.convert(value);

            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = colors[j % colors.length];
        for (let i = 0; i < n; i++) {
            const category = xData[i];
            const value = keyData[i];
            const x = xScale.convert(category) + bandwidth / 2;
            const y = yScale.convert(value);
            ctx.beginPath();
            ctx.arc(x, y, markerRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();
    });
    ctx.restore();

    // y-axis
    const yAxis = new CanvasAxis<number>(yScale);
    yAxis.translation = [padding.left, padding.top];
    yAxis.render(ctx);

    // x-axis
    const xAxis = new CanvasAxis<string>(xScale);
    xAxis.rotation = -Math.PI / 2;
    xAxis.translation = [padding.left, padding.top + seriesHeight];
    xAxis.flippedLabels = true;
    xAxis.render(ctx);

    // legend
    const legendLeft = canvasWidth - padding.right;
    const legendItemHeight = 30;
    const legendMarkerPadding = 20;
    const legendTop = padding.top + (seriesHeight - legendItemHeight * yKeys.length) / 2;
    ctx.strokeStyle = 'black';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 2;
    yKeys.forEach((key, i) => {
        const itemY = i * legendItemHeight + legendTop;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(legendLeft, itemY, markerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(key, legendLeft + legendMarkerPadding, itemY);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
