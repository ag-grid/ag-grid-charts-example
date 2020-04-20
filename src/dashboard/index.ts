import {
    Caption,
    CartesianChart,
    CategoryAxis,
    ChartAxisPosition,
    BarSeries,
    LegendPosition, pastel
} from "ag-charts-community";
import { NumberAxis } from "ag-charts-community/dist/cjs/chart/axis/numberAxis";

function createOldestCompaniesChart() {
    const data = [{
        founded: 578,
        name: 'Kongō Gumi',
        country: 'Japan',
        field: 'Construction',
        info: 'A Japanese construction company which was the world\'s oldest continuously ongoing independent company, operating for over 1,400 years until it became a subsidiary of Takamatsu in January 2006.'
    }, {
        founded: 803,
        name: 'Stiftskulinarium',
        country: 'Austria',
        field: 'Restaurant',
        info: 'St. Peter Stiftskulinarium is a restaurant within the walls of St Peter\'s Abbey in Salzburg, Austria. It is claimed to be the oldest inn in Central Europe.'
    }, {
        founded: 862,
        name: 'Staffelter Hof',
        country: 'Germany',
        field: 'Wine',
        info: 'A family run winery, distillery and guest house situated in the small town of Kröv, which is in the Bernkastel-Wittlich district of Rhineland-Palatinate, Germany.'
    }, {
        founded: 864,
        name: 'Monnaie de Paris',
        country: 'France',
        field: 'Mint',
        info: 'A government-owned institution responsible for producing France\'s euro coins. Founded in 864 AD, it is the world\'s oldest continuously-running minting institution operating from two sites, one in Paris and one in Pessac.'
    }, {
        founded: 900,
        name: 'Sean\'s Bar',
        country: 'Ireland',
        field: 'Pub',
        info: 'A pub on the County Roscommon side of the town of Athlone that claims to be Ireland’s oldest pub, dating back to AD 900. In 2004 Guinness World Records listed Seán\'s Bar as the oldest pub in Europe.'
    }, {
        founded: 1135,
        name: 'Munke Mølle',
        country: 'Denmark',
        field: 'Mill',
        info: 'The oldest still functioning company in Denmark, being founded in 1135 as a water mill on the Odense River in Odense city. The mill has been a purveyor to 38 kings and 2 queens, and today produces bread and cake mixes.'
    }].map(datum => {
        return {
            ...datum,
            labels: { labels: [datum.name, datum.country] }
        }
    });

    const chart = new CartesianChart();
    chart.container = document.body;
    chart.width = 800;
    chart.height = 400;
    chart.legend.position = LegendPosition.Bottom;
    chart.title = new Caption();
    chart.title.fontFamily = 'Verdana';
    chart.title.fontSize = 20;
    chart.title.fontWeight = 'bold';
    chart.title.text = 'Oldest companies in the world';

    const bottomAxis = new CategoryAxis();
    bottomAxis.position = ChartAxisPosition.Bottom;
    bottomAxis.title = new Caption();
    bottomAxis.title.fontFamily = 'Verdana';
    bottomAxis.title.fontSize = 14;
    bottomAxis.title.fontWeight = 'bold';
    bottomAxis.title.text = 'Company';
    bottomAxis.gridStyle = [];

    const leftAxis = new NumberAxis();
    leftAxis.position = ChartAxisPosition.Left;
    leftAxis.title = new Caption();
    leftAxis.title.fontFamily = 'Verdana';
    leftAxis.title.fontSize = 14;
    leftAxis.title.fontWeight = 'bold';
    leftAxis.title.text = 'Year founded';
    leftAxis.label.formatter = params => {
        return params.index % 2 === 0 ? params.value : '';
    };
    leftAxis.gridStyle = [{
        stroke: 'rgba(0,0,0,0.1)'
    }, {
        stroke: undefined
    }];

    const barSeries = new BarSeries();
    barSeries.xKey = 'name';
    barSeries.yKeys = ['founded'];
    barSeries.yNames = ['Oldest companies'];
    barSeries.tooltipEnabled = true;
    barSeries.fills = [pastel.fills[1]];
    barSeries.strokes = [pastel.strokes[1]];
    barSeries.strokeWidth = 2;
    barSeries.fillOpacity = 0.7;
    barSeries.label.enabled = true;
    barSeries.label.formatter = params => params.value.toFixed(0);
    barSeries.tooltipRenderer = params => {
        const titleStyle = `style="color: white; background-color: ${params.color}"`;
        const titleString = params.title ? `<div class="title" ${titleStyle}>${params.datum.name}</div>` : '';

        return `${titleString}<div class="content">${params.datum.info}</div>`;
    };

    chart.axes = [leftAxis, bottomAxis];
    chart.series = [barSeries];
    chart.data = data;
}

document.addEventListener('DOMContentLoaded', () => {
    createOldestCompaniesChart();
});
