import scaleLinear from "@ag-grid-enterprise/charts/src/charts/scale/linearScale";
import {BandScale} from "@ag-grid-enterprise/charts/src/charts/scale/bandScale";
import {createHdpiCanvas} from "@ag-grid-enterprise/charts/src/charts/canvas/canvas";
import {CanvasAxis} from "@ag-grid-enterprise/charts/src/charts/canvasAxis";

const gradientTheme = [
    ['#69C5EC', '#53AFD6'],
    ['#FDED7C', '#FDE95C'],
    ['#B6D471', '#A4CA4E'],
    ['#EC866B', '#E76846'],
    ['#FB9D5D', '#FA8535'],
];

const data = [
    {
        category: 'Canvas',

        // Device Pixel Ratio: 1
        chromeMac1: 53,
        firefoxMac1: 60,
        chromeWin1: 46,
        firefoxWin1: 45,

        // Device Pixel Ratio: 2
        chromeMac2: 29,
        firefoxMac2: 48,
        chromeWin2: 20,
        firefoxWin2: 37,
        iPad2: 60
    },
    {
        category: 'SVG',

        // Device Pixel Ratio: 1
        chromeMac1: 59,
        firefoxMac1: 49,
        chromeWin1: 37,
        firefoxWin1: 40,

        // Device Pixel Ratio: 2
        chromeMac2: 59,
        firefoxMac2: 41,
        chromeWin2: 22,
        firefoxWin2: 38,
        iPad2: 23
    }
];

function renderChart() {
    const stacks = [
        ['chromeMac1', 'firefoxMac1', 'chromeWin1', 'firefoxWin1'],
        ['chromeMac2', 'firefoxMac2', 'chromeWin2', 'firefoxWin2', 'iPad2']
    ];
    const stackNames = [
        'DPR: 1',
        'DPR: 2'
    ];
    const stackKeyNames = [
        ['Chrome Mac', 'Firefox Mac', 'Chrome Win', 'Firefox Win'],
        ['Chrome Mac', 'Firefox Mac', 'Chrome Win', 'Firefox Win', 'iPad Air 2']
    ];
    const colors = gradientTheme;

    const padding = {
        top: 20,
        right: 40,
        bottom: 40,
        left: 60
    };
    const n = data.length;
    const xData = data.map(d => d.category);
    const yData = data.map(datum => {
        const groupStacks = stacks.map(stackKeys => {
            // For each stack returns an array of values representing the top
            // of each bar in the stack, the last value being the height of the stack.
            const values: number[] = [];
            let sum = 0;
            stackKeys.forEach(key => values.push(sum += (datum as any)[key]));
            return values;
        });
        return groupStacks;
    });

    const canvasWidth = document.body.getBoundingClientRect().width;
    const canvasHeight = 480;
    const seriesWidth = canvasWidth - padding.left - padding.right;
    const seriesHeight = canvasHeight - padding.top - padding.bottom;

    const yScale = scaleLinear();
    // Find the tallest stack in each group, then the tallest stack overall.
    yScale.domain = [0, Math.max(...yData.map(stacks => Math.max(...stacks.map(stack => stack[stack.length - 1]))))];
    yScale.range = [seriesHeight, 0];

    const xGroupScale = new BandScale<string>();
    xGroupScale.domain = xData;
    xGroupScale.range = [0, seriesWidth];
    xGroupScale.paddingInner = 0.1;
    xGroupScale.paddingOuter = 0.3;
    const groupWidth = xGroupScale.bandwidth;

    const xStackScale = new BandScale<string>();
    xStackScale.domain = stackNames;
    xStackScale.range = [0, groupWidth];
    xStackScale.padding = 0.1;
    xStackScale.round = true;
    const barWidth = xStackScale.bandwidth;

    const canvas = createHdpiCanvas(canvasWidth, canvasHeight);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    ctx.font = '14px Verdana';

    // bars
    ctx.save();
    ctx.translate(padding.left, padding.top);
    for (let i = 0; i < n; i++) { // group index
        const category = xData[i];
        const groupStacks = yData[i];
        const groupX = xGroupScale.convert(category); // x-coordinate of the group
        groupStacks.forEach((stack, stackIndex) => {
            const stackX = xStackScale.convert(stackNames[stackIndex]); // x-coordinate of the stack within a group
            const x = groupX + stackX;

            const label = stackNames[stackIndex];
            const labelWidth = ctx.measureText(label).width;
            ctx.fillStyle = 'black';
            ctx.fillText(label, x + barWidth / 2 - labelWidth / 2, seriesHeight + 20);

            let keyIndex = 0;
            stack.reduce((bottom, top) => {
                const yBottom = yScale.convert(bottom);
                const yTop = yScale.convert(top);

                const color = colors[keyIndex % colors.length];
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

                const label = stackKeyNames[stackIndex][keyIndex] + ': ' +
                    (data[i] as any)[stacks[stackIndex][keyIndex]].toString();
                const labelWidth = ctx.measureText(label).width;
                ctx.fillStyle = 'black';
                ctx.fillText(label, x + barWidth / 2 - labelWidth / 2, yTop + 20);

                keyIndex++;
                return top;
            }, 0);
        });
    }
    ctx.restore();

    // y-axis
    const yAxis = new CanvasAxis<number>(yScale);
    yAxis.translation = [padding.left, padding.top];
    yAxis.render(ctx);

    // x-axis
    const xAxis = new CanvasAxis<string>(xGroupScale);
    xAxis.rotation = -Math.PI / 2;
    xAxis.translation = [padding.left, padding.top + seriesHeight];
    xAxis.flippedLabels = true;
    xAxis.tickSize = 20;
    xAxis.tickPadding = 7;
    xAxis.render(ctx);
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});
