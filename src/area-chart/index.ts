import scaleLinear from "ag-grid-enterprise/src/charts/scale/linearScale";
import {BandScale} from "ag-grid-enterprise/src/charts/scale/bandScale";
import {createHdpiCanvas} from "ag-grid-enterprise/src/charts/canvas/canvas";
import {CanvasAxis} from "ag-grid-enterprise/src/charts/canvasAxis";

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

// This may look similar to the line chart example, but the area series are stacked,
// filled and show how the values of individual components relate to the whole.
function renderChart(isTopStroke = true, isBlackStroke = true, fillOpacity = 0.7, isFullStack = false, stackTotal = 100) {
    // `isFullStack` is whether to treat each category's fields as components of the category, where the category
    // value is always equal to the `stackTotal` value. Otherwise the category value is determined as the sum
    // of the values of its fields. `isFullStack` option is useful when you want to show percentage values, rather than
    // absolute. For example, when you want to show what percentage of the market share belongs to each of the components
    // at any given time (category).
    const xField = 'month';
    const yFields = ['desktops', 'laptops', 'tablets'];
    const colors = colorTheme;

    const padding = {
        top: 20,
        right: 100,
        bottom: 40,
        left: 60
    };

    const n = data.length;
    // Map field names to their values.
    const xData = data.map(datum => (datum as any)[xField]);
    // `yData` - `n` arrays of size `yFields.length` each.
    // For each category returns an array of values representing the top
    // of each point in the stack, the last value being the height of the stack.
    const yData = data.map(datum => {
        const values: number[] = [];
        let sum = 0;
        yFields.forEach(field => values.push(sum += (datum as any)[field]));
        return values;
    });

    if (isFullStack) {
        yData.forEach(stack => {
            const n = stack.length;
            const total = stack[n - 1];
            for (let i = 0; i < n; i++) {
                stack[i] = stack[i] / total * stackTotal;
            }
        });
    }

    const canvasWidth = document.body.getBoundingClientRect().width;
    const canvasHeight = 480;
    const seriesWidth = canvasWidth - padding.left - padding.right;
    const seriesHeight = canvasHeight - padding.top - padding.bottom;

    const yScale = scaleLinear();
    // Get the height of each stack and find the highest one.
    yScale.domain = [0, isFullStack ? stackTotal : Math.max(...yData.map(d => d[d.length - 1]))];
    yScale.range = [seriesHeight, 0];

    const xScale = new BandScale<string>();
    xScale.domain = xData;
    xScale.range = [0, seriesWidth];
    const bandwidth = xScale.bandwidth;

    const canvas = createHdpiCanvas(canvasWidth, canvasHeight);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    ctx.font = '14px Verdana';

    const markerRadius = 5;

    ctx.save();
    ctx.translate(padding.left, padding.top);

    // area
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.lineWidth = 3;
    let fieldIndex = -1;
    const topStrokes: [number, number][][] = [];
    // Simply use reduce to fetch fields in pairs.
    yFields.reduce((fieldA, fieldB) => {
        ctx.fillStyle = colors[(fieldIndex + 1) % colors.length];
        ctx.strokeStyle = isBlackStroke ? 'black' : ctx.fillStyle;

        const topStroke: [number, number][] = [];

        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const yDatum = yData[i];
            const category = xData[i];
            const value = fieldIndex >= 0 ? yDatum[fieldIndex] : 0;
            const x = xScale.convert(category) + bandwidth / 2;
            const y = yScale.convert(value);

            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        for (let i = n - 1; i >= 0; i--) {

            const yDatum = yData[i];
            const category = xData[i];
            const value = yDatum[fieldIndex + 1];
            const x = xScale.convert(category) + bandwidth / 2;
            const y = yScale.convert(value);

            ctx.lineTo(x, y);
            topStroke.push([x, y]);
        }
        ctx.closePath();

        ctx.globalAlpha = fillOpacity;
        ctx.fill();

        if (!isTopStroke) {
            ctx.globalAlpha = 1;
            ctx.stroke();
        }

        topStrokes.push(topStroke);

        fieldIndex++;
        return fieldB;
    }, ''); // empty field means all y's are zeros (x-axis)

    if (isTopStroke) {
        ctx.lineWidth = 3;
        topStrokes.forEach((stroke, fieldIndex) => {
            ctx.beginPath();
            ctx.strokeStyle = isBlackStroke ? 'black' : colors[fieldIndex % colors.length];
            stroke.forEach((p, i) => {
                i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
            });
            ctx.globalAlpha = 1;
            ctx.stroke();
        });
    }

    // markers
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    yFields.forEach((_, fieldIndex) => {
        ctx.fillStyle = colors[fieldIndex % colors.length];
        for (let i = 0; i < n; i++) {
            const yDatum = yData[i];
            const category = xData[i];
            const value = yDatum[fieldIndex];
            const x = xScale.convert(category) + bandwidth / 2;
            const y = yScale.convert(value);
            ctx.beginPath();
            ctx.arc(x, y, markerRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
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

    const legendLeft = canvasWidth - padding.right;
    const legendItemHeight = 30;
    const legendMarkerPadding = 20;
    const legendTop = padding.top + (seriesHeight - legendItemHeight * yFields.length) / 2;
    ctx.strokeStyle = 'black';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 2;
    yFields.forEach((field, i) => {
        const itemY = i * legendItemHeight + legendTop;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(legendLeft, itemY, markerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(field, legendLeft + legendMarkerPadding, itemY);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart(true, true);
    renderChart(true, false, 0.5);
    renderChart(false, true);

    renderChart(true, true, 1, true);
    renderChart(true, false, 0.5, true);
    renderChart(false, true, 1, true);
});
