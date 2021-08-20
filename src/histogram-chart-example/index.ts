import { createButton, createSlider, createDropdown } from "../../lib/ui";
import { makeChartResizeable } from "../../lib/chart";
import Chance from "chance";
import { HistogramBin, HistogramSeries } from "../../charts/chart/series/cartesian/histogramSeries";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { Padding } from "../../charts/util/padding";
import { Caption } from "../../charts/caption";

const numberOfAthletes = 1000;

const knownSeed: number = 123;
const chance = new Chance(knownSeed);

type binsSpec = [number, number][];

const exampleBinRanges: {[k: string]: binsSpec} = {
    ageCategories: [[16,21], [21, 30], [30, 35], [35, 50], [50,60], [60,65]],
    evenlySpacedDecades: [[10, 20], [20, 30], [30,40], [40,50], [50,60], [60,70]],
    'undefined (use defaults)': undefined
} as any;

const labelFormatters: { [key: string]: (b: HistogramBin) => string } = {
    ageRange: (b: any) => `${b.domain[0]} to ${b.domain[1]}`,
    'default (none given)': undefined,
    medalCount: (b: any) => `${b.total} medals`,
    athleteCount: (b: any) => `${b.frequency} athletes`,
    both: (b: any) => `${b.frequency} athletes won ${b.total} medals`
} as any;

type Palmares = {
    age: number,
    name: string,
    nationality: string,
    gold: number,
    silver: number,
    bronze: number
};

const randomAge = () => {
    const normal = 12 + chance.normal({mean:17, dev: 5})
    return Math.max( Math.min( normal, 65 ), 16 );
}

const data: Palmares[] = Array(numberOfAthletes).fill(0).map(() => ({
    name: chance.name(),
    age: randomAge(),
    nationality: chance.country(),
    gold: chance.natural({ min: 1, max: 4 }),
    silver: chance.natural({ min: 1, max: 6 }),
    bronze: chance.natural({ min: 1, max: 8 })
}));

const medalColours = {
    gold:'#fba71b',
    silver:'#888888',
    bronze:'#f3622d'
};

const newLine = () => document.body.appendChild(document.createElement('br'));

function createHistogramChart() {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.padding = new Padding(40);
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = document.body.offsetWidth;
    chart.height = 500;
    chart.title = new Caption();
    chart.title.text = 'Medals';
    chart.title.fontSize = 14;
    chart.subtitle = new Caption();
    chart.subtitle.text = `awards by age category, based on ${numberOfAthletes} athletes`;
    chart.subtitle.fontSize = 12;
    chart.scene.canvas.element.style.border = '1px solid black';

    const histogramSeries = new HistogramSeries();
    histogramSeries.xKey = 'age';
    histogramSeries.yKey = 'gold';

    // histogramSeries.binDomains = exampleBinRanges.ageCategories;
    // histogramSeries.constantWidth = false;

    histogramSeries.data = data;
    histogramSeries.fill = medalColours.gold;
    histogramSeries.tooltip.enabled = true;
    histogramSeries.label.enabled = true;
    // histogramSeries.label.formatter = labelFormatters.ageRange;

    chart.addSeries(histogramSeries);

    createDropdown('Bin domains', exampleBinRanges, (b) => {
        console.log('changing bins to', b);
        // histogramSeries.binDomains = b;
        // histogramSeries.constantWidth = !b;
    });

    newLine();
    createSlider('Bin count', [undefined, 2,3,4,5,6,7,8,9,10,12,14,16,20,30,50,100,200], number => {
        histogramSeries.binCount = number;
        // histogramSeries.constantWidth = !!number;
    });

    newLine();
    createButton('Enable labels', () => {
        histogramSeries.label.enabled = true;
    });

    createButton('Disable labels', () => {
        histogramSeries.label.enabled = false;
    });

    newLine();
    createDropdown('custom labels:', labelFormatters, formatter => {
        console.log('changing formatter to', formatter);
        // histogramSeries.label.formatter = formatter;
    });

    newLine();
    type medalCategories = keyof typeof medalColours;
    createDropdown('yKey', ['gold', 'silver', 'bronze', undefined] as any, (yKey: medalCategories) => {
        histogramSeries.yKey = yKey;
        histogramSeries.fill = medalColours[yKey] || '#283';
    });

    return chart;
}
document.addEventListener('DOMContentLoaded', () => {
    const chart = createHistogramChart();
    makeChartResizeable(chart);
});
