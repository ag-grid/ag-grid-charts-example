import { ChartAxisPosition } from "../../charts/chart/chartAxis";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { CartesianChart } from "../../charts/chart/cartesianChart";
import { BarSeries } from "../../charts/chart/series/cartesian/barSeries";
import { makeChartResizeable } from "../../lib/chart";
import { GroupedCategoryAxis } from "../../charts/chart/axis/groupedCategoryAxis";
import { AgChart } from "../../charts/chart/agChart";
import { createSlider } from "../../lib/ui";
import { MaterialDark } from "../../charts/chart/themes/materialDark";
import { PastelDark } from "../../charts/chart/themes/pastelDark";
import { VividDark } from "../../charts/chart/themes/vividDark";
import { MaterialLight } from "../../charts/chart/themes/materialLight";
import { PastelLight } from "../../charts/chart/themes/pastelLight";
import { SolarLight } from "../../charts/chart/themes/solarLight";
import { VividLight } from "../../charts/chart/themes/vividLight";
import { AgCartesianChartOptions, AgChartOptions, AgChartThemeOptions } from "../../charts/chart/agChartOptions";
import { SolarDark } from "../../charts/chart/themes/solarDark";
import { AgChartTheme } from "../../charts/chart/themes/agChartTheme";

const data = [
    { name: "E", value: 0.12702 },
    { name: "T", value: 0.09056 },
    { name: "A", value: 0.08167 },
    { name: "O", value: 0.07507 },
    { name: "I", value: 0.06966 },
    { name: "N", value: 0.06749 },
    { name: "S", value: 0.06327 },
    { name: "H", value: 0.06094 },
    { name: "R", value: 0.05987 },
    { name: "D", value: 0.04253 },
    { name: "L", value: 0.04025 },
    { name: "C", value: 0.02782 },
    { name: "U", value: 0.02758 },
    { name: "M", value: 0.02406 },
    { name: "W", value: 0.0236 },
    { name: "F", value: 0.02288 },
    { name: "G", value: 0.02015 },
    { name: "Y", value: 0.01974 },
    { name: "P", value: 0.01929 },
    { name: "B", value: 0.01492 },
    { name: "V", value: 0.00978 },
    { name: "K", value: 0.00772 },
    { name: "J", value: 0.00153 },
    { name: "X", value: 0.0015 },
    { name: "Q", value: 0.00095 },
    { name: "Z", value: 0.00074 },
].map((v: any) => {
    v.value2 = v.value * Math.random();
    v.value3 = v.value * Math.random();
    v.value4 = 0.1 + Math.random() * 0.1;
    v.value5 = 0.1 + Math.random() * 0.2;
    v.value6 = 0.2 + Math.random() * 0.2;
    v.value7 = 0.15 + Math.random() * 0.10;
    v.value8 = 0.10 + Math.random() * 0.10;
    return v;
});

const polarChartData = [
    { label: 'Android', value: 56.9, other: 7 },
    { label: 'iOS', value: 22.5, other: 8 },
    { label: 'BlackBerry', value: 6.8, other: 9 },
    { label: 'Symbian', value: 8.5, other: 10 },
    { label: 'Bada', value: 2.6, other: 11 },
    { label: 'Windows', value: 1.9, other: 12 }
];

const groupedCategoryData = [
    {
        category: {
            labels: [
                "Poppy Grady",
                "Argentina"
            ]
        },
        jan: 86135,
        feb: 178,
        mar: 55905
    },
    {
        category: {
            labels: [
                "Layla Smith",
                "Argentina"
            ]
        },
        jan: 23219,
        feb: 11523,
        mar: 54291
    },
    {
        category: {
            labels: [
                "Isabella Kingston",
                "Belgium"
            ]
        },
        jan: 66433,
        feb: 3655,
        mar: 52061
    },
    {
        category: {
            labels: [
                "Mia Unalkat",
                "Brazil"
            ]
        },
        jan: 57544,
        feb: 39051,
        mar: 78481
    },
    {
        category: {
            labels: [
                "Gil Lopes",
                "Colombia"
            ]
        },
        jan: 20479,
        feb: 2253,
        mar: 39309
    },
    {
        category: {
            labels: [
                "Isabelle Donovan",
                "Colombia"
            ]
        },
        jan: 73957,
        feb: 25775,
        mar: 56291
    }
].map(d => {
    d.category.toString = function () {
        return this.labels.slice().reverse().join(' - ');
    };
    return d;
});

const themes: (string | AgChartThemeOptions)[] = [
    'light',
    {
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
        defaults: {
            cartesian: {
                title: {
                    text: 'Get Your Pot Of Gold Theme'
                },
                series: {
                    line: {
                        marker: {
                            size: 16
                        }
                    }
                }
            }
        }
    } as AgChartThemeOptions,
    'material-light', // new MaterialLight(),
    'pastel-light', // new PastelLight(),
    'solar-light', // new SolarLight(),
    'vivid-light', // new VividLight(),
    'dark',
    'material-dark', // new MaterialDark(),
    'pastel-dark', // new PastelDark(),
    'solar-dark', // new SolarDark(),
    'vivid-dark', // new VividDark()
];

function createColumnChart() {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const options: AgChartOptions = {
        autoSize: false,
        tooltipTracking: false,
        data,
        theme: {
            // baseTheme: 'dark',
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
            defaults: {
                cartesian: {
                    title: {
                        text: 'Get Your Pot Of Gold Theme'
                    },
                    series: {
                        line: {
                            marker: {
                                size: 16
                            }
                        }
                    },
                    axes: {
                        category: {
                            title: {
                                text: 'Bottom'
                            }
                        },
                        number: {
                            title: {
                                text: 'Left'
                            }
                        }
                    }
                }
            }
        } as AgChartThemeOptions,
        // title: {},
        // subtitle: {},
        axes: [{
            type: 'category',
            position: 'bottom',
        }, {
            type: 'number',
            position: 'left'
        }],
        series: [{
            type: 'area',
            xKey: 'name',
            yKeys: ['value7', 'value8']
        }, {
            type: 'column',
            xKey: 'name',
            yKeys: ['value', 'value2']
        }, {
            type: 'scatter',
            xKey: 'name',
            yKey: 'value3'
        }, {
            type: 'line',
            xKey: 'name',
            yKey: 'value4'
        }, {
            type: 'line',
            xKey: 'name',
            yKey: 'value5'
        }, {
            type: 'line',
            xKey: 'name',
            yKey: 'value6'
        }]
    };
    const chart = AgChart.create(options, div, data);

    chart.scene.canvas.element.style.border = '1px solid black';

    makeChartResizeable(chart);

    document.body.appendChild(document.createElement('br'));

    createSlider('Theme', themes, (value: string | AgChartThemeOptions) => {
        options.theme = value;
        AgChart.update(chart, options, div);
    });

    return chart;
}

function createGroupedColumnChart() {
    const xAxis = new GroupedCategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';

    const barSeries = new BarSeries();
    barSeries.xKey = 'category';
    barSeries.yKeys = ['jan', 'feb', 'mar'];
    barSeries.data = groupedCategoryData;

    chart.series = [barSeries];

    chart.navigator.enabled = true;

    makeChartResizeable(chart);

    return chart;
}

function createZoomedColumnChartUsingFactory() {
    const options: AgCartesianChartOptions = {
        container: document.body,
        data,
        width: 500,
        series: [{
            type: 'column',
            xKey: 'name',
            yKeys: ['value']
        }],
        axes: [{
            type: 'number',
            position: 'left',
            // visibleRange: [0, 0.5]
        }, {
            type: 'category',
            position: 'bottom',
            // visibleRange: [0, 0.5]
        }],
        navigator: {
            enabled: true,
            height: 50,
            mask: {
                fill: 'red',
                strokeWidth: 2
            },
            minHandle: {
                width: 16,
                height: 30,
                stroke: 'blue',
                fill: 'yellow',
                gripLineGap: 4,
                gripLineLength: 12,
                strokeWidth: 2
            },
            maxHandle: {
                width: 16,
                stroke: 'red',
                fill: 'cyan'
            }
        }
    };
    const chart = AgChart.create(options);

    makeChartResizeable(chart);

    return chart;
}

function createPieChart() {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const options: any = {
        type: 'pie',
        autoSize: false,
        tooltipTracking: false,
        data: polarChartData,
        title: {},
        subtitle: {},
        series: [{
            // type: 'pie',
            angleKey: 'value',
            labelKey: 'label'
        }]
    };
    const chart = AgChart.create(options, div);

    chart.scene.canvas.element.style.border = '1px solid black';

    makeChartResizeable(chart);

    document.body.appendChild(document.createElement('br'));

    createSlider('Theme', themes, value => {
        options.theme = value;
        AgChart.update(chart, options, div);
    });

    return chart;
}

document.addEventListener('DOMContentLoaded', () => {
    createColumnChart();
    createPieChart();
    // createGroupedColumnChart();
    // createZoomedColumnChartUsingFactory();
});