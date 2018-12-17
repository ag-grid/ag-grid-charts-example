import scaleLinear from "ag-grid-enterprise/src/charts/scale/linearScale";
import {BandScale} from "ag-grid-enterprise/src/charts/scale/bandScale";
import {createHdpiCanvas} from "ag-grid-enterprise/src/charts/canvas/canvas";
import {Axis} from "ag-grid-enterprise/src/charts/axis";

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

    const yFields = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    const yFieldNames = ['Q1', 'Q2', 'Q3', 'Q4'];
    const colors = gradientTheme;

    const padding = {
        top: 20,
        right: 40,
        bottom: 40,
        left: 60
    };
    const n = data.length;
    const xData = data.map(d => d.category);
    // For each category returns an array of values representing the height
    // of each bar in the group.
    const yData = data.map(datum => {
        const values: number[] = [];
        yFields.forEach(field => values.push((datum as any)[field]));
        return values;
    });

    const canvasWidth = document.body.getBoundingClientRect().width;
    const canvasHeight = 480;
    const seriesWidth = canvasWidth - padding.left - padding.right;
    const seriesHeight = canvasHeight - padding.top - padding.bottom;

    const yScale = scaleLinear();
    // Find the tallest bar in each group, then the tallest bar overall.
    yScale.domain = [0, Math.max(...yData.map(values => Math.max(...values)))];
    yScale.range = [seriesHeight, 0];

    const xGroupScale = new BandScale<string>();
    xGroupScale.domain = xData;
    xGroupScale.range = [0, seriesWidth];
    xGroupScale.paddingInner = 0.1;
    xGroupScale.paddingOuter = 0.3;
    const groupWidth = xGroupScale.bandwidth;

    const xBarScale = new BandScale<string>();
    xBarScale.domain = yFields;
    xBarScale.range = [0, groupWidth];
    xBarScale.padding = 0.1;
    xBarScale.round = true;
    const barWidth = xBarScale.bandwidth;

    const canvas = createHdpiCanvas(canvasWidth, canvasHeight);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    ctx.font = '14px Verdana';

    // bars
    ctx.save();
    ctx.translate(padding.left, padding.top);
    for (let i = 0; i < n; i++) {
        const category = xData[i];
        const values = yData[i];
        const groupX = xGroupScale.convert(category); // x-coordinate of the group
        values.forEach((value, j) => {
            const barX = xBarScale.convert(yFields[j]); // x-coordinate of the bar within a group
            const x = groupX + barX;
            const y = yScale.convert(value);

            const color = colors[j % colors.length];
            if (Array.isArray(color)) {
                const gradient = ctx.createLinearGradient(x, y, x + barWidth, seriesHeight);
                gradient.addColorStop(0, color[0]);
                gradient.addColorStop(1, color[1]);
                ctx.fillStyle = gradient;
            }
            else {
                ctx.fillStyle = color;
            }
            ctx.fillRect(x, y, barWidth, seriesHeight - y);
            ctx.strokeRect(x, y, barWidth, seriesHeight - y);

            const label = yFieldNames[j];
            const labelWidth = ctx.measureText(label).width;
            ctx.fillStyle = 'black';
            ctx.fillText(label, x + barWidth / 2 - labelWidth / 2, y + 20);
        })
    }
    ctx.restore();

    // y-axis
    const yAxis = new Axis<number>(yScale);
    yAxis.translation = [padding.left, padding.top];
    yAxis.render(ctx);

    // x-axis
    const xAxis = new Axis<string>(xGroupScale);
    xAxis.rotation = -Math.PI / 2;
    xAxis.translation = [padding.left, padding.top + seriesHeight];
    xAxis.flippedLabels = true;
    xAxis.render(ctx);
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
