import scaleLinear from "@ag-grid-enterprise/charts/src/charts/scale/linearScale";
import {createHdpiCanvas} from "@ag-grid-enterprise/charts/src/charts/canvas/canvas";
import {CanvasAxis} from "@ag-grid-enterprise/charts/src/charts/canvasAxis";
import carData, {ICarInfo} from './auto-mpg';

const colors = [
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#E55934',
    '#FA7921',
    '#fa3081'
];

const names = [
    'Sarine',
    'David',
    'Kate',
    'Roma',
    'Josh',
    'Patrick',
    'Ji',
    'Hugo',
    'Pia',
    'Maria',
    'Wojceich',
    'Javier',
    'Eugine',
    'Jane',
    'Mbosa',
    'Duke',
    'Sophia',
    'William',
    'Isabella',
    'Ali'
];

function generateData(names: string[]) {
    return names.map(name => ({
        name,
        height: 150 + Math.random() * 50,
        weight: 50 + Math.random() * 50,
        age: 20 + Math.random() * 40
    }));
}

const data = [
    generateData(names),
    generateData(names),
    generateData(names)
];

type SeriesConfig = {
    name: string,
    xKey: string,
    yKey: string,
    radiusKey?: string,
    color?: string
};

function renderChart(data: any[][], configs: SeriesConfig[], minRadius = 2, maxRadius = 16) {
    console.assert(data.length === configs.length);

    const padding = {
        top: 20,
        right: 200,
        bottom: 20,
        left: 60
    };
    // `config.length` arrays of `data.length` size
    const xData = configs.map((config, i) => data[i].map(datum => datum[config.xKey] as number));
    const yData = configs.map((config, i) => data[i].map(datum => datum[config.yKey] as number));
    const defaultRadius = 6;
    const radiusData = configs.map((config, i) => data[i].map(datum => (config.radiusKey ? datum[config.radiusKey] : defaultRadius) as number));

    const canvasWidth = document.body.getBoundingClientRect().width;
    const canvasHeight = 480;
    const seriesWidth = canvasWidth - padding.left - padding.right;
    const seriesHeight = canvasHeight - padding.top - padding.bottom;

    // Returns [minValue, maxValue].
    function extent(data: number[][]): [number, number] {
        return [
            Math.min(...data.map(series => Math.min(...series))),
            Math.max(...data.map(series => Math.max(...series)))
        ];
    }

    // Find the x/y domains of each series, then x/y domains overall.
    const xScale = scaleLinear();
    xScale.domain = extent(xData);
    xScale.range = [0, seriesWidth];

    const yScale = scaleLinear();
    yScale.domain = extent(yData);
    yScale.range = [seriesHeight, 0];

    const radiusScale = scaleLinear();
    radiusScale.domain = extent(radiusData);
    radiusScale.range = [minRadius, maxRadius];

    const canvas = createHdpiCanvas(canvasWidth, canvasHeight);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    ctx.font = '14px Verdana';

    function drawSeries(color: string, xData: number[], yData: number[], radiusData: number[]) {
        console.assert(xData.length === yData.length);
        ctx.fillStyle = color;
        ctx.strokeStyle = 'black';
        const n = xData.length;
        for (let i = 0; i < n; i++) {
            const x = xScale.convert(xData[i]);
            const y = yScale.convert(yData[i]);
            const r = radiusScale.convert(radiusData[i]);

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    }

    const lineWidth = 1.5;

    // Scatter series.
    ctx.save();
    ctx.translate(padding.left, padding.top);

    ctx.beginPath();
    ctx.rect(0, 0, seriesWidth, seriesHeight);
    ctx.clip();

    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = lineWidth;
    configs.forEach((_, i) => drawSeries(colors[i % colors.length], xData[i], yData[i], radiusData[i]));
    ctx.restore();

    // x-axis
    const xAxis = new CanvasAxis<number>(xScale);
    xAxis.translation = [padding.left, padding.top + seriesHeight];
    xAxis.rotation = -Math.PI / 2;
    xAxis.flippedLabels = true;
    xAxis.render(ctx);

    // y-axis
    const yAxis = new CanvasAxis<number>(yScale);
    yAxis.translation = [padding.left, padding.top];
    yAxis.render(ctx);

    // Legend.
    const markerRadius = 5;
    const legendLeft = canvasWidth - padding.right + 50;
    const legendItemHeight = 30;
    const legendMarkerPadding = 20;
    const legendTop = padding.top + (seriesHeight - legendItemHeight * configs.length) / 2;
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = lineWidth;
    configs.forEach((config, i) => {
        const itemY = i * legendItemHeight + legendTop;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(legendLeft, itemY, markerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(config.name, legendLeft + legendMarkerPadding, itemY);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    {
        const commonConfig = {
            xKey: 'height', yKey: 'weight', radiusKey: 'age'
        };
        renderChart(data, [
            {name: 'Class A', ...commonConfig},
            {name: 'Class B', ...commonConfig},
            {name: 'Class C', ...commonConfig}
        ]);
    }

    {
        const carsByCountry: {[key: string]: ICarInfo[]} = {};
        carData.forEach(car => {
            const countryCars = carsByCountry[car.origin] || (carsByCountry[car.origin] = []);
            countryCars.push(car);
        });
        const commonConfig = {
            xKey: 'horsepower', yKey: 'weight', radiusKey: 'cylinders'
        };
        const countries = Object.keys(carsByCountry);
        renderChart(
            countries.map(country => carsByCountry[country]),
            countries.map(country => ({name: country, ...commonConfig})),
        );
    }
});
