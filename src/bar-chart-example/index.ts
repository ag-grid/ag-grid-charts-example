import { createButton, createSlider } from "../../lib/ui";
import { makeChartResizeable } from "../../lib/chart";
import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { CategoryAxis } from "../../charts/chart/axis/categoryAxis";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { Caption } from "../../charts/caption";
import { BarLabelPlacement, BarSeries } from "../../charts/chart/series/cartesian/barSeries";
import { Circle } from "../../charts/chart/marker/circle";
import { AgChart } from "../../charts/chart/agChart";
import { Padding } from "../../charts/util/padding";
import { LogScale } from "../../charts/scale/logScale";
import { LinearScale, LineSeries } from "../../charts/main";
import * as d3 from "d3";

type Datum = {
    category: string,

    q1Budget: number,
    q2Budget: number,
    q3Budget: number,
    q4Budget: number,

    q1Actual: number,
    q2Actual: number,
    q3Actual: number,
    q4Actual: number
};

const data: Datum[] = [
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

type NegativeDatum = {
    xKey: string,
    yKey1: number,
    yKey2: number,
    yKey3: number
};

const negativeData: NegativeDatum[] = [{
    xKey: 'Jan',
    yKey1: 5,
    yKey2: 7,
    yKey3: -9,
}, {
    xKey: 'Feb',
    yKey1: 10,
    yKey2: -15,
    yKey3: 20
}];

function testing() {
    d3.format;
    d3.formatLocale;
    d3.formatDefaultLocale;
    d3.formatSpecifier;
}

function createColumnChartDeclaratively() {
    const data = [
        {
            beverage: 'Coffee',
            Q1: 450,
            Q2: 560,
            Q3: 600,
            Q4: 700
        },
        {
            beverage: 'Tea',
            Q1: 270,
            Q2: 380,
            Q3: 450,
            Q4: 520
        },
        {
            beverage: 'Milk',
            Q1: 180,
            Q2: 170,
            Q3: 190,
            Q4: 200
        },
    ];

    const chart = AgChart.create({
        data,
        container: document.body,
        title: {
            text: 'Beverage Expenses'
        },
        subtitle: {
            text: 'per quarter'
        },
        padding: {
            top: 40,
            right: 40,
            bottom: 40,
            left: 40
        },
        series: [{
            type: 'column',
            xKey: 'beverage',
            yKeys: ['Q1', 'Q2', 'Q3', 'Q4']
        }],
        legend: {
            spacing: 40
        }
    });
}

function createColumnChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.padding = new Padding(40);
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.title = new Caption();
    chart.title.text = 'Beverage Expenses';
    chart.title.fontSize = 14;
    chart.subtitle = new Caption();
    chart.subtitle.text = 'per quarter';
    chart.subtitle.fontSize = 12;
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.xKey = 'category';
    barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
    barSeries.yNames = {
        q1Actual: 'Q1',
        q2Actual: 'Q2',
        q3Actual: 'Q3',
        q4Actual: 'Q4',
    }; // bar labels
    barSeries.data = data;
    barSeries.fills = ['red', 'green', 'blue'];
    barSeries.tooltip.enabled = true;
    barSeries.label.enabled = false;
    // barSeries.shadow = new DropShadow();
    // barSeries.shadow.color = 'rgba(0,0,0,0.5)';
    // barSeries.shadow.blur = 10;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('Negative Data', () => {
        barSeries.data = negativeData;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = [['yKey1'], ['yKey2'], ['yKey3']];
    });

    createButton('Grouped', () => {
        barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    });
    createButton('Stacked', () => {
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
    });

    createButton('Enable labels', () => {
        barSeries.label.enabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.label.enabled = false;
    });

    createSlider('label font size', [10, 12, 14, 16, 18, 20], v => {
        barSeries.label.fontSize = v;
    });

    createSlider('normalizeTo', [NaN, 100, 500, 1], v => {
        if (v && chart.title) {
            chart.title.text = 'Normalize to WTFYW';
            if (chart.subtitle) {
                chart.subtitle.enabled = false;
            }
        }
        barSeries.normalizedTo = v;
    });

    createSlider('shadow color', ['red', 'green', 'blue'], v => {
        if (barSeries.shadow) {
            barSeries.shadow.color = v;
        }
    });

    return chart;
}

function createBarChart() {
    const xAxis = new NumberAxis();
    xAxis.position = ChartAxisPosition.Bottom;

    const yAxis = new CategoryAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.axes = [xAxis, yAxis];

    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';
    chart.legend.item.marker.shape = Circle;

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    barSeries.flipXY = true;
    addSeriesIf();
    barSeries.xKey = 'category';
    barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
    barSeries.yNames = {
        q1Actual: 'Q1',
        q2Actual: 'Q2',
        q3Actual: 'Q3',
        q4Actual: 'Q4',
    }; // bar labels
    barSeries.data = data;
    barSeries.fills = ['red', 'green', 'blue'];
    barSeries.tooltip.enabled = true;
    barSeries.label.enabled = false;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('Negative Data', () => {
        barSeries.data = negativeData;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = [['yKey1', 'yKey2', 'yKey3']];
    });

    createButton('Grouped', () => {
        barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    });
    createButton('Stacked', () => {
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
    });

    createButton('Enable labels', () => {
        barSeries.label.enabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.label.enabled = false;
    });

    createSlider('normalizeTo', [NaN, 100, 500, 1], v => {
        if (v && chart.title) {
            chart.title.text = 'Normalize to WTFYW';
            if (chart.subtitle) {
                chart.subtitle.enabled = false;
            }
        }
        barSeries.normalizedTo = v;
    });

    createSlider('stroke width', [1, 2, 4, 6, 8, 10], v => {
        barSeries.strokeWidth = v;
    });

    createSlider('stroke opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        barSeries.strokeOpacity = v;
    });
    createSlider('fill opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        barSeries.fillOpacity = v;
    });

    return chart;
}

function createGroupedAndStackedColumnChart() {
    // const data = [
    //     {
    //         beverage: 'Coffee',
    //         q1: 450,
    //         q2: 560,
    //         q3: 600,
    //         q4: 700,
    //         bob: 300,
    //         amy: 200
    //     },
    //     {
    //         beverage: 'Tea',
    //         q1: 270,
    //         q2: 380,
    //         q3: 450,
    //         q4: 520,
    //         bob: -300,
    //         amy: -400
    //     },
    //     {
    //         beverage: 'Milk',
    //         q1: 180,
    //         q2: 170,
    //         q3: 190,
    //         q4: 200,
    //         bob: 300,
    //         amy: 300
    //     },
    // ];

    const data = [
        {
            beverage: 'Coffee',
            q1: 0.0000001,
            q2: 0.000001,
            q3: 0.00001,
            q4: 0.0001,
            bob: 0.001,
            amy: 0.01
        },
        {
            beverage: 'Tea',
            q1: 0.0000001,
            q2: 0.000001,
            q3: 0.00001,
            q4: 0.0001,
            bob: -0.001,
            amy: -0.01
        },
        {
            beverage: 'Milk',
            q1: 0.0000001,
            q2: 0.000001,
            q3: 0.00001,
            q4: 0.0001,
            bob: 0.001,
            amy: 0.01
        },
    ];

    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 50;
    // xAxis.thickness = 50;

    const yAxis = new NumberAxis();
    yAxis.scale = new LogScale();
    yAxis.position = ChartAxisPosition.Left;
    yAxis.nice = false;
    yAxis.min = 0.0000001;
    yAxis.label.format = '.8f';
    // yAxis.thickness = 50;
    // yAxis.tick.count = 3;
    // yAxis.label.formatter = (params) => String(params.value);

    const yAxis2 = new NumberAxis();
    yAxis2.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.padding = new Padding(0);
    chart.legend.spacing = 40;
    chart.legend.item.label.formatter = params => {
        return params.value + ' - ' + params.id + ' - ' + String(params.itemId);
    };
    chart.axes = [xAxis, yAxis, yAxis2];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.title = new Caption();
    chart.title.text = 'Beverage Expenses';
    chart.title.fontSize = 14;
    chart.subtitle = new Caption();
    chart.subtitle.text = 'per quarter';
    chart.subtitle.fontSize = 12;
    chart.scene.canvas.element.style.border = '1px solid black';

    function addSeriesIf() {
        if (!chart.series.length) {
            chart.addSeries(barSeries);
        }
    }

    const barSeries = new BarSeries();
    addSeriesIf();
    barSeries.xKey = 'beverage';
    barSeries.yKeys = [['q1', 'q2', 'q3', 'q4'], ['bob', 'amy']];
    barSeries.cursor = 'crosshair';
    // barSeries.highlightStyle.fill = 'red';
    // barSeries.highlightStyle.stroke = undefined;
    // barSeries.hideInLegend = ['q2'];
    // chart.legend.addEventListener('click', (event: LegendClickEvent) => {
    //     console.log(event);
    //     barSeries.toggleSeriesItem('q4', event.enabled);
    // });
    // barSeries.yKeys = [['q1'], ['q2'], ['q3'], ['q4']];
    // barSeries.yKeys = [['q1', 'q2', 'q3', 'q4']];
    // barSeries.yNames = {
    //     q1: 'Q1',
    //     q2: 'Q2',
    //     q3: 'Q3',
    //     q4: 'Q4',
    //     bob: 'Bob',
    //     amy: 'Amy'
    // }; // bar labels
    barSeries.data = data;
    // barSeries.fills = ['pink', 'indianred', 'orangered', 'orange', 'gold', 'yellow'];
    barSeries.tooltip.enabled = true;
    // barSeries.label.enabled = false;
    // barSeries.shadow = new DropShadow();
    // barSeries.shadow.color = 'rgba(0,0,0,0.5)';
    // barSeries.shadow.blur = 10;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('bar-chart');
    });

    createButton('Toggle Scale (linear/log)', () => {
        if (yAxis.scale instanceof LogScale) {
            yAxis.scale = new LinearScale();
        } else {
            yAxis.scale = new LogScale();
            yAxis.nice = false;
            yAxis.min = 0.0000001;
            yAxis.label.format = '.8f';
        }
        chart.performLayout();
    });

    createButton('Negative Data', () => {
        barSeries.data = negativeData;
        barSeries.xKey = 'xKey';
        barSeries.yKeys = [['yKey1'], ['yKey2'], ['yKey3']];
        yAxis.min = -20;
    });

    createButton('Grouped', () => {
        barSeries.yKeys = [['q1Actual'], ['q2Actual'], ['q3Actual'], ['q4Actual']];
    });
    createButton('Stacked', () => {
        barSeries.yKeys = [['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual']];
    });

    createButton('Enable labels', () => {
        barSeries.label.enabled = true;
    });
    createButton('Disable labels', () => {
        barSeries.label.enabled = false;
    });
    createButton('Inside labels', () => {
        barSeries.label.placement = BarLabelPlacement.Inside;
    });
    createButton('Outside labels', () => {
        barSeries.label.placement = BarLabelPlacement.Outside;
    });
    createButton('Flip XY', () => {
        xAxis.position = ChartAxisPosition.Left;
        yAxis.position = ChartAxisPosition.Bottom;
        chart.axes = [xAxis, yAxis];
        barSeries.flipXY = true;
    });

    createButton('Change legend formatter', () => {
        chart.legend.item.label.formatter = params => {
            return params.value + '!';
        };
    });

    createSlider('label font size', [10, 12, 14, 16, 18, 20], v => {
        barSeries.label.fontSize = v;
    });

    createSlider('normalizeTo', [NaN, 100, 500, 1], v => {
        if (v && chart.title) {
            chart.title.text = 'Normalize to WTFYW';
            if (chart.subtitle) {
                chart.subtitle.enabled = false;
            }
        }
        barSeries.normalizedTo = v;
    });

    createSlider('shadow color', ['red', 'green', 'blue'], v => {
        if (barSeries.shadow) {
            barSeries.shadow.color = v;
        }
    });

    return chart;
}

function createGalleryBarChart(axisType: string = 'number', base: number = 10) {
    const data = [
        { type: 'Managers, directors & senior officials', earnings: 954, },
        { type: 'Professional occupations', earnings: 844, },
        { type: 'Associate professional & technical', earnings: 699, },
        { type: 'Skilled trades', earnings: 503, },
        { type: 'Process, plant & machine operatives', earnings: 501, },
        { type: 'Administrative & secretarial', earnings: 457, },
        { type: 'Sales & customer services', earnings: 407, },
        { type: 'Elementary occupations', earnings: 380, },
        { type: 'Caring, leisure & other services', earnings: 358, },
    ];

    const options: any = {
        container: document.body,
        data,
        height: 600,
        series: [{
            type: 'bar',
            xKey: 'type',
            yKeys: ['earnings'],
        }],
        axes: [
            {
                type: 'category',
                position: 'left',
            },
            {
                type: axisType,
                position: 'bottom',
                min: 100,
                base
            }
        ],
        legend: {
            enabled: false,
        },
    };

    AgChart.create(options);
}

function hello() {
    var myTheme = {
        baseTheme: 'ag-default-dark',
        palette: {
            fills: [
                '#5C2983',
                '#0076C5',
                '#21B372',
                '#FDDE02',
                '#F76700',
                '#D30018'
            ],
            strokes: ['black']
        },
        overrides: {
            cartesian: {
                title: {
                    fontSize: 24
                },
                series: {
                    column: {
                        label: {
                            enabled: true,
                            color: 'black'
                        }
                    }
                }
            }
        }
    };

    var options: any = {

        theme: myTheme,

        container: document.body,
        autoSize: true,
        padding: {
            left: 70,
            right: 70
        },
        title: {
            enabled: true,
            text: 'Custom Chart Theme Example'
        },
        data: [
            { label: 'Android', v1: 5.67, v2: 8.63, v3: 8.14, v4: 6.45, v5: 1.37 },
            { label: 'iOS', v1: 7.01, v2: 8.04, v3: 1.338, v4: 6.78, v5: 5.45 },
            { label: 'BlackBerry', v1: 7.54, v2: 1.98, v3: 9.88, v4: 1.38, v5: 4.44 },
            { label: 'Symbian', v1: 9.27, v2: 4.21, v3: 2.53, v4: 6.31, v5: 4.44 },
            { label: 'Windows', v1: 2.80, v2: 1.908, v3: 7.48, v4: 5.29, v5: 8.80 }
        ],
        series: [{
            type: 'column',
            xKey: 'label',
            yKeys: ['v1', 'v2', 'v3', 'v4', 'v5'],
            yNames: ['Reliability', 'Ease of use', 'Performance', 'Price', 'Market share']
        }]
    };

    var chart = AgChart.create(options);
}

document.addEventListener('DOMContentLoaded', () => {
    createButton('Create Column Chart', () => {
        const groupedStackedChart = createGroupedAndStackedColumnChart();
        makeChartResizeable(groupedStackedChart);
    });

    createButton('Create Bar Chart (number)', () => {
        createGalleryBarChart('number');
    });
    createButton('Create Bar Chart (log, 10)', () => {
        createGalleryBarChart('log', 10);
    });

    createButton('Create Bar Chart (log, E)', () => {
        createGalleryBarChart('log', Math.E);
    });

    createButton('Create Bar Chart (log, 2)', () => {
        createGalleryBarChart('log', 2);
    });

    // const groupedStackedChart = createGroupedAndStackedColumnChart();
    // makeChartResizeable(groupedStackedChart);
    // document.body.appendChild(document.createElement('br'));

    // const columnChart = createColumnChart();
    // makeChartResizeable(columnChart);

    // // document.body.appendChild(document.createElement('br'));
    // // createColumnChartDeclaratively();

    // document.body.appendChild(document.createElement('br'));

    // const barChart = createBarChart();
    // makeChartResizeable(barChart);
});
