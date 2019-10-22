import scaleLinear from "@ag-enterprise/grid-charts/src/charts/scale/linearScale";
import {BandScale} from "@ag-enterprise/grid-charts/src/charts/scale/bandScale";
import {createHdpiCanvas} from "@ag-enterprise/grid-charts/src/charts/canvas/canvas";
import {CanvasAxis} from "@ag-enterprise/grid-charts/src/charts/canvasAxis";

const gradientTheme = [
    ['#69C5EC', '#53AFD6'],
    ['#FDED7C', '#FDE95C'],
    ['#B6D471', '#A4CA4E'],
    ['#EC866B', '#E76846'],
    ['#FB9D5D', '#FA8535'],
];

const data = [
    {
        category: 'Coffee',

        q1Budget: 500,
        q2Budget: 500,
        q3Budget: 500,
        q4Budget: 500,

        q1Actual: 450,
        q2Actual: 560,
        q3Actual: 600,
        q4Actual: 700
    },
    {
        category: 'Tea',

        q1Budget: 350,
        q2Budget: 400,
        q3Budget: 450,
        q4Budget: 500,

        q1Actual: 270,
        q2Actual: 380,
        q3Actual: 450,
        q4Actual: 520
    },
    {
        category: 'Milk',

        q1Budget: 200,
        q2Budget: 180,
        q3Budget: 180,
        q4Budget: 180,

        q1Actual: 180,
        q2Actual: 170,
        q3Actual: 190,
        q4Actual: 200
    },
];

function renderChart() {
    const yKeys = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    const yNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    const colors = gradientTheme;

    const padding = {
        top: 20,
        right: 40,
        bottom: 40,
        left: 60
    };
    const n = data.length;
    const xData = data.map(d => d.category);
    // For each category returns an array of values representing the top
    // of each bar in the stack, the last value being the height of the stack.
    const yData = data.map(datum => {
        const values: number[] = [];
        let sum = 0;
        yKeys.forEach(key => values.push(sum += (datum as any)[key]));
        return values;
    });
    const canvasWidth = document.body.getBoundingClientRect().width;
    const canvasHeight = 480;
    const seriesWidth = canvasWidth - padding.left - padding.right;
    const seriesHeight = canvasHeight - padding.top - padding.bottom;

    const yScale = scaleLinear();
    // Get the height of each stack and find the highest one.
    yScale.domain = [0, Math.max(...yData.map(d => d[d.length - 1]))];
    yScale.range = [seriesHeight, 0];

    const xScale = new BandScale<string>();
    xScale.domain = xData;
    xScale.range = [0, seriesWidth];
    xScale.paddingInner = 0.1;
    xScale.paddingOuter = 0.3;
    const barWidth = xScale.bandwidth;

    const canvas = createHdpiCanvas(canvasWidth, canvasHeight);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    ctx.font = '14px Verdana';

    // bars
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.translate(padding.left, padding.top);
    for (let i = 0; i < n; i++) {
        const category = xData[i];
        const values = yData[i];
        const x = xScale.convert(category);
        // Using reduce here simply to get pairs of numbers in the `values` array:
        // the bottom and top of each bar.
        let j = 0;
        values.reduce((bottom, top) => {
            const yBottom = yScale.convert(bottom);
            const yTop = yScale.convert(top);

            const color = colors[j % colors.length];
            if (Array.isArray(color)) {
                const gradient = ctx.createLinearGradient(x, yTop, x + barWidth, yBottom);
                gradient.addColorStop(0, color[0]);
                gradient.addColorStop(1, color[1]);
                ctx.fillStyle = gradient;
            }
            else {
                ctx.fillStyle = color;
            }
            ctx.fillRect(x, yTop, barWidth, yBottom - yTop);
            ctx.strokeRect(x, yTop, barWidth, yBottom - yTop);

            const label = yNames[j] + ': ' + (data[i] as any)[yKeys[j]].toString();
            const labelWidth = ctx.measureText(label).width;
            ctx.fillStyle = 'black';
            ctx.fillText(label, x + barWidth / 2 - labelWidth / 2, yTop + 20);

            j++;
            return top;
        }, 0);
    }
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
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
