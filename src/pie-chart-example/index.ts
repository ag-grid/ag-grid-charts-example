import { PieSeries } from 'ag-charts-community/src/chart/series/polar/pieSeries';
import { Padding } from 'ag-charts-community/src/util/padding';
import { Caption } from 'ag-charts-community/src/caption';

import { FontStyle, FontWeight } from 'ag-charts-community/src/scene/shape/text';
import { PolarChart } from 'ag-charts-community/src/chart/polarChart';
import { DropShadow } from 'ag-charts-community/src/scene/dropShadow';
import { makeChartResizeable } from "../../lib/chart";
import { AgChart, LegendPosition } from "ag-charts-community";
import { createButton, createSlider } from "../../lib/ui";

type Datum = {
    label: string,
    value: number,
    other: number
};

const data: Datum[] = [
    { label: 'Android', value: 56.9, other: 7 },
    { label: 'iOS', value: 22.5, other: 8 },
    { label: 'BlackBerry', value: 6.8, other: 9 },
    { label: 'Symbian', value: 8.5, other: 10 },
    { label: 'Bada', value: 2.6, other: 11 },
    { label: 'Windows', value: 1.9, other: 12 }
];

const data2: Datum[] = [
    { label: 'Nigel', value: 7, other: 8 },
    { label: 'Lucy', value: 6, other: 9 },
    { label: 'Rick', value: 4, other: 10 },
    { label: 'Barbara', value: 3, other: 8 },
    { label: 'John', value: 3, other: 7 },
    { label: 'Ben', value: 5, other: 12 },
    { label: 'Maria', value: 3, other: 10 },
    { label: 'Vicky', value: 8, other: 11 }
];

function createPieChart() {
    const chart = new PolarChart();
    chart.container = document.body;
    chart.width = 800;
    chart.height = 400;
    chart.element.style.marginBottom = '50px';

    const pieSeries = new PieSeries();
    pieSeries.data = data;
    pieSeries.innerRadiusOffset = -40;
    pieSeries.angleKey = 'value';
    pieSeries.labelKey = 'label';
    pieSeries.label.enabled = true;
    pieSeries.title = new Caption();
    pieSeries.title.text = 'Mobile OSes';
    pieSeries.title.fontSize = 14;
    pieSeries.title.fontWeight = 'bold';
    pieSeries.strokeWidth = 2;
    pieSeries.callout.strokeWidth = 1;
    pieSeries.shadow = new DropShadow();
    pieSeries.shadow.color = 'rgba(0,0,0,0.2)';
    pieSeries.shadow.blur = 15;

    const pieSeries2 = new PieSeries();
    pieSeries2.data = data2;
    pieSeries2.outerRadiusOffset = -80;
    pieSeries2.innerRadiusOffset = -120;
    pieSeries2.title = new Caption();
    pieSeries2.title.text = 'Users';
    pieSeries2.title.fontSize = 14;
    pieSeries2.title.fontWeight = 'bold';
    pieSeries2.angleKey = 'value';
    pieSeries2.labelKey = 'label';
    pieSeries2.label.enabled = true;

    chart.series = [pieSeries, pieSeries2];

    chart.title = new Caption();
    chart.title.text = 'Market Share of Mobile Operating Systems';
    chart.title.fontSize = 16;
    chart.subtitle = new Caption();
    chart.subtitle.text = 'Source: www.statista.com';
    chart.subtitle.fontStyle = 'italic';
    chart.subtitle.fontSize = 12;

    chart.padding = new Padding(40);

    chart.scene.canvas.element.style.border = '1px solid black';

    makeChartResizeable(chart);

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('pie-chart');
    });
    createButton('Toggle Legend', () => {
        chart.legend.enabled = !chart.legend.enabled;
    });
    createButton('Show tooltips', () => {
        pieSeries.tooltipEnabled = true;
        pieSeries2.tooltipEnabled = true;
    });
    createButton('Hide tooltips', () => {
        pieSeries.tooltipEnabled = false;
        pieSeries2.tooltipEnabled = false;
    });
    createButton('Use tooltip renderer', () => {
        pieSeries.tooltipRenderer = params => {
            return `<em>Value</em>: <span style='color: red;'>${params.datum[params.angleKey]}</span>`;
        };

        pieSeries2.tooltipRenderer = params => {
            const radiusValue = params.radiusKey ? `<br>Radius: ${params.datum[params.radiusKey]}` : '';
            return `Angle: ${params.datum[params.angleKey]}${radiusValue}`;
        };
    });
    createButton('Remove tooltip renderer', () => {
        pieSeries.tooltipRenderer = undefined;
        pieSeries2.tooltipRenderer = undefined;
    });
    createButton('Show labels', () => {
        pieSeries.label.enabled = true;
        pieSeries2.label.enabled = true;
    });
    createButton('Hide labels', () => {
        pieSeries.label.enabled = false;
        pieSeries2.label.enabled = false;
    });
    createButton('Set series name', () => {
        pieSeries.title = new Caption();
        pieSeries.title.text = 'Super series';

        pieSeries2.title = new Caption();
        pieSeries2.title.text = 'Duper series';
    });
    createButton('Remove series name', () => {
        pieSeries.title = undefined;
        pieSeries2.title = undefined;
    });
    createButton('Remove inner series', () => {
        chart.removeSeries(pieSeries2);
    });
    createButton('Add inner series', () => {
        chart.addSeries(pieSeries2);
    });

    createButton('Use radius key', () => {
        pieSeries2.data = data2;
        pieSeries2.angleKey = 'value';
        pieSeries2.labelKey = 'label';
        pieSeries2.radiusKey = 'other';
    });
    createButton('Remove radius key', () => {
        pieSeries2.radiusKey = '';
    });
    createButton('Run other tests', () => {
        setTimeout(() => {
            chart.padding = new Padding(70, 100, 70, 100);
            chart.width = 640;
            chart.height = 300;
        }, 2000);

        setTimeout(() => {
            pieSeries.labelKey = '';
        }, 4000);

        setTimeout(() => {
            pieSeries.data = data2;
            pieSeries.angleKey = 'value';
            pieSeries.labelKey = 'label';
        }, 6000);

        setTimeout(() => {
            pieSeries.data = data;
        }, 8000);

        setTimeout(() => {
            pieSeries2.angleKey = 'other';
        }, 10000);

        setTimeout(() => {
            pieSeries2.radiusKey = 'other';
            pieSeries2.strokes = ['white'];
            pieSeries2.callout.colors = ['black'];
            pieSeries2.strokeWidth = 3;
            pieSeries2.callout.strokeWidth = 1;
        }, 12000);
    });

    document.body.appendChild(document.createElement('br'));

    function changeTheme(labelColor: string, bgColor: string) {
        chart.legend.color = labelColor;
        chart.background.fill = bgColor;
        pieSeries.label.color = labelColor;
        pieSeries2.label.color = labelColor;
        if (pieSeries.title) {
            pieSeries.title.color = labelColor;
        }
        if (pieSeries2.title) {
            pieSeries2.title.color = labelColor;
        }
        if (chart.title) {
            chart.title.color = labelColor;
        }
        if (chart.subtitle) {
            chart.subtitle.color = labelColor;
        }
        document.body.style.backgroundColor = bgColor;
    }

    createButton('Light theme', () => {
        changeTheme('black', 'white');
    });
    createButton('Dark theme', () => {
        changeTheme('rgb(221, 221, 221)', '#1e1e1e');
    });

    document.body.appendChild(document.createElement('br'));

    createSlider('innerRadiusOffset', [-120, 0], v => {
        pieSeries2.innerRadiusOffset = v;
    });
    createSlider('calloutColor', ['red', 'green', 'blue', 'rgba(0,0,0,0)'], v => {
        pieSeries2.callout.colors = [v];
    });
    createSlider('calloutStrokeWidth', [2, 3, 4, 5, 6], v => {
        pieSeries2.callout.strokeWidth = v;
    });

    let rotationIncrement = 0;
    createSlider('rotation', [0, 0.2, 0.4, 0.6], v => {
        rotationIncrement = v;
        (function step() {
            pieSeries.rotation -= rotationIncrement;
            pieSeries2.rotation += rotationIncrement;
            if (rotationIncrement) {
                chart.addEventListener('layoutDone', step);
            }
        })();
    });

    createSlider('calloutLength', [10, 20, 30], v => {
        pieSeries.callout.length = v;
    });

    createSlider('calloutPadding', [3, 6, 9, 12], v => {
        pieSeries2.label.offset = v;
    });

    createSlider('labelFont', [
        { weight: undefined, size: 12, family: 'sans-serif' },
        { weight: 'bold', size: 14, family: 'sans-serif' },
        { weight: undefined, size: 16, family: 'Papyrus' }
    ], v => {
        const font = v;
        pieSeries.label.fontWeight = font.weight as FontWeight;
        pieSeries.label.fontSize = font.size;
        pieSeries.label.fontFamily = font.family;
    });

    createSlider('series.title.font', [
        { style: undefined, weight: 'bold', size: 12, family: 'sans-serif' },
        { style: 'italic', weight: undefined, size: 14, family: 'sans-serif' },
        { style: undefined, weight: undefined, size: 20, family: 'Papyrus' }
    ], v => {
        if (pieSeries.title) {
            const font = v;
            pieSeries.title.fontStyle = font.style as FontStyle;
            pieSeries.title.fontWeight = font.weight as FontWeight;
            pieSeries.title.fontSize = font.size;
            pieSeries.title.fontFamily = font.family;
        }
    });

    createSlider('series.title.color', ['black', 'red', 'green', 'blue'], v => {
        if (pieSeries.title) {
            pieSeries.title.color = v;
        }
    });

    createSlider('series.title.enabled', [true, false], v => {
        if (pieSeries.title) {
            pieSeries.title.enabled = v;
        }
    });

    createSlider('labelColor', ['black', 'red', 'gold', 'rgb(221, 221, 221)'], v => {
        pieSeries.label.color = v;
    });

    createSlider('labelMinAngle', [20, 40, 60], v => {
        pieSeries2.label.minAngle = v;
    });

    createSlider('legend position', ['right', 'bottom', 'left', 'top'] as LegendPosition[], v => {
        chart.legend.position = v;
    });
    createSlider('legend spacing', [20, 80, 160, 240], v => {
        chart.legend.spacing = v;
    });
    createSlider('legend strokeWidth', [1, 2, 3, 4, 5, 6], v => {
        chart.legend.strokeWidth = v;
    });
    createSlider('legend markerSize', [15, 20, 25, 30, 5, 10], v => {
        chart.legend.markerSize = v;
    });
    createSlider('legend markerShape', ['square', 'circle', 'diamond', 'cross', 'plus', 'triangle'], v => {
        chart.legend.markerShape = v;
    });
    createSlider('legend layoutHorizontalSpacing', [4, 6, 8, 10, 12, 16], v => {
        chart.legend.layoutHorizontalSpacing = v;
    });
    createSlider('legend layoutVerticalSpacing', [4, 6, 8, 10, 12, 16], v => {
        chart.legend.layoutVerticalSpacing = v;
    });
    document.body.appendChild(document.createElement('hr'));
    createSlider('legend font size', [12, 14, 16, 18, 20, 22, 24, 30, 36], v => {
        chart.legend.fontSize = v;
    });
    createSlider('legend fontWeight', ['normal', 'bold'], (v: FontWeight) => {
        chart.legend.fontWeight = v;
    });
    createSlider('legend fontFamily', ['Verdana', 'Papyrus', 'Comic Sans', 'Palatino'], v => {
        chart.legend.fontFamily = v;
    });
    createSlider('legend fontStyle', ['normal', 'italic'], (v: FontStyle) => {
        chart.legend.fontStyle = v;
    });
    createSlider('legend color', ['black', 'red', 'gold', 'green'], v => {
        chart.legend.color = v;
    });
    document.body.appendChild(document.createElement('hr'));

    createSlider('title color', ['black', 'red', 'gold', 'green'], v => {
        if (chart.title) {
            chart.title.color = v;
        }
    });
    createSlider('title font', [10, 13, 16, 19, 22, 25], v => {
        const title = chart.title;
        if (title) {
            title.fontWeight = 'bold';
            title.fontFamily = 'Verdana, sans-serif';
            title.fontSize = v;
        }
    });
    createSlider('subtitle font', [10, 12, 14, 16, 18, 20], v => {
        const subtitle = chart.subtitle;
        if (subtitle) {
            subtitle.fontStyle = 'italic';
            subtitle.fontFamily = 'Verdana, sans-serif';
            subtitle.fontSize = v;
        }
    });
    createSlider('title/subtitle enabled', [[true, true], [true, false], [false, true], [false, false]], v => {
        const [titleEnabled, subtitleEnabled] = v;
        if (chart.title) {
            chart.title.enabled = titleEnabled;
        }
        if (chart.subtitle) {
            chart.subtitle.enabled = subtitleEnabled;
        }
    });
    createSlider('legend itemSpacing', [8, 12, 16, 20, 24], v => {
        chart.legend.itemSpacing = v;
    });

    createSlider('stroke opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        pieSeries.strokeOpacity = v;
    });
    createSlider('fill opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        pieSeries.fillOpacity = v;
    });
}

function createPieChartDeclaratively() {
    const config = {
        data,
        container: document.body,
        series: [{
            type: 'pie',
            angleKey: 'value',
            labelKey: 'label',
            strokeWidth: 3
            // shadow: {
            //     color: 'red'
            // }
        }]
    } as any;

    const chart = AgChart.create(config);

    createButton('change tooltipOffset', () => {
        config.tooltipOffset = [40, 40];
        AgChart.update(chart, config);
    });

    createButton('add shadow', () => {
        config.series[0].shadow = {
            color: 'red'
        };
        AgChart.update(chart, config);
    });

    createButton('add title', () => {
        config.series[0].title = {};
        AgChart.update(chart, config);
    });

    createButton('change highlightStyle', () => {
        config.series[0].highlightStyle = {
            fill: 'red',
            stroke: 'black'
        };
        AgChart.update(chart, config);
    });

    createButton('change label offset', () => {
        config.series[0].label = {
            offset: 20
        };
        AgChart.update(chart, config);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createPieChart();
    createPieChartDeclaratively();
});
