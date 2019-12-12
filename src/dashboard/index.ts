import { CartesianChart } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/cartesianChart";
import { CategoryAxis } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/axis/categoryAxis";
import { ChartAxisPosition } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/chartAxis";
import { ColumnSeries } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/series/cartesian/columnSeries";
import { Caption } from "@ag-grid-enterprise/charts/dist/cjs/charts/caption";
import { NumberAxis } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/axis/numberAxis";
import './app.css';
import { material, palettes, pastel } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/palettes";
import { GroupedCategoryAxis } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/axis/groupedCategoryAxis";
import { GroupedCategoryChart } from "@ag-grid-enterprise/charts/dist/cjs/charts/chart/groupedCategoryChart";
import { FontWeight } from "@ag-grid-enterprise/charts/dist/cjs/charts/chartOptions";
import { ChartBuilder } from "@ag-grid-enterprise/charts/dist/cjs/charts/chartBuilder";

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
    chart.parent = document.body;
    chart.size = [800, 400];
    chart.legend.position = 'bottom';
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

    const columnSeries = new ColumnSeries();
    columnSeries.xKey = 'name';
    columnSeries.yKeys = ['founded'];
    columnSeries.yNames = ['Oldest companies'];
    columnSeries.tooltipEnabled = true;
    columnSeries.fills = [pastel.fills[1]];
    columnSeries.strokes = [pastel.strokes[1]];
    columnSeries.strokeWidth = 2;
    columnSeries.fillOpacity = 0.7;
    columnSeries.label.enabled = true;
    columnSeries.label.formatter = params => params.value.toFixed(0);
    columnSeries.tooltipRenderer = params => {
        const titleStyle = `style="color: white; background-color: ${params.color}"`;
        const titleString = params.title ? `<div class="title" ${titleStyle}>${params.datum.name}</div>` : '';

        return `${titleString}<div class="content">${params.datum.info}</div>`;
    };

    chart.axes = [leftAxis, bottomAxis];
    chart.series = [columnSeries];
    chart.data = data;
}

function createSimpleOldestCompaniesChart() {
    (ChartBuilder as any).create({

    });
}

document.addEventListener('DOMContentLoaded', () => {
    createOldestCompaniesChart();
});
