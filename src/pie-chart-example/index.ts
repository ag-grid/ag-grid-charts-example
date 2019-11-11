import { PieSeries } from '@ag-grid-enterprise/charts/src/charts/chart/series/pieSeries';
import { Chart, LegendPosition } from '@ag-grid-enterprise/charts/src/charts/chart/chart';
import { Padding } from '@ag-grid-enterprise/charts/src/charts/util/padding';
import { Caption } from '@ag-grid-enterprise/charts/src/charts/caption';

import './app.css';
import { FontStyle, FontWeight } from '@ag-grid-enterprise/charts/src/charts/scene/shape/text';
import { PolarChart } from '@ag-grid-enterprise/charts/src/charts/chart/polarChart';
import { DropShadow } from '@ag-grid-enterprise/charts/src/charts/scene/dropShadow';

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

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

function createSlider<D>(text: string, values: D[], action: (value: D) => void): HTMLInputElement {
    const n = values.length;
    const id = String(Date.now());
    const sliderId = 'slider-' + id;
    const datalistId = 'slider-list-' + id;
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '300px';
    wrapper.style.padding = '5px';
    wrapper.style.margin = '5px';
    wrapper.style.border = '1px solid lightgray';
    wrapper.style.borderRadius = '5px';
    wrapper.style.backgroundColor = 'white';

    const slider = document.createElement('input');
    slider.setAttribute('id', sliderId);
    slider.setAttribute('list', datalistId);
    slider.style.height = '1.8em';
    slider.style.flex = '1';

    const label = document.createElement('label');
    label.setAttribute('for', sliderId);
    label.innerHTML = text;
    label.style.font = '12px sans-serif';
    label.style.marginRight = '5px';

    // Currently, no browser fully supports these features.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
    const datalist = document.createElement('datalist');
    datalist.setAttribute('id', datalistId);

    values.forEach((value, index) => {
        const option = document.createElement('option');
        option.setAttribute('value', String(index));
        option.setAttribute('label', String(value));
        datalist.appendChild(option);
    });

    slider.type = 'range';
    slider.min = '0';
    slider.max = String(n - 1);
    slider.step = '1';
    slider.value = '0';
    slider.style.width = '200px';

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
    wrapper.appendChild(datalist);
    document.body.appendChild(wrapper);

    slider.addEventListener('input', (e) => {
        const index = +(e.target as HTMLInputElement).value;
        action(values[index]);
    });
    return slider;
}

function makeChartResizeable(chart: Chart) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let chartSize: [number, number];
    const scene = chart.scene;

    scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        chartSize = chart.size;
        isDragging = true;
    });
    scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            chart.size = [chartSize[0] + dx, chartSize[1] + dy];
        }
    });
    scene.canvas.element.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const chart = new PolarChart();
    chart.parent = document.body;
    chart.width = 800;
    chart.height = 400;

    const pieSeries = new PieSeries();
    pieSeries.data = data;
    pieSeries.innerRadiusOffset = -40;
    pieSeries.angleKey = 'value';
    pieSeries.labelKey = 'label';
    pieSeries.label.enabled = true;
    pieSeries.title = new Caption();
    pieSeries.title.text = 'Mobile OSes';
    pieSeries.strokeWidth = 2;
    pieSeries.calloutStrokeWidth = 1;
    pieSeries.shadow = new DropShadow();
    pieSeries.shadow.color = 'rgba(0,0,0,0.2)';
    pieSeries.shadow.blur = 15;

    const pieSeries2 = new PieSeries();
    pieSeries2.data = data2;
    pieSeries2.outerRadiusOffset = -80;
    pieSeries2.innerRadiusOffset = -120;
    pieSeries2.title = new Caption();
    pieSeries2.title.text = 'Users';
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

    chart.scene.canvas.element.style.border = '1px solid black';

    makeChartResizeable(chart);

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('pie-chart');
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
            chart.size = [640, 300];
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
            pieSeries2.calloutColors = ['black'];
            pieSeries2.strokeWidth = 3;
            pieSeries2.calloutStrokeWidth = 1;
        }, 12000);
    });

    document.body.appendChild(document.createElement('br'));

    function changeTheme(labelColor: string, bgColor: string) {
        chart.legend.labelColor = labelColor;
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
        pieSeries2.calloutColors = [v];
    });
    createSlider('calloutStrokeWidth', [2, 3, 4, 5, 6], v => {
        pieSeries2.calloutStrokeWidth = v;
    });

    let rotationIncrement = 0;
    createSlider('rotation', [0, 0.2, 0.4, 0.6], v => {
        rotationIncrement = v;
        (function step() {
            pieSeries.rotation -= rotationIncrement;
            pieSeries2.rotation += rotationIncrement;
            chart.onLayoutDone = rotationIncrement ? step : undefined;
        })();
    });

    createSlider('calloutLength', [10, 20, 30], v => {
        pieSeries.calloutLength = v;
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

    createSlider('legendPosition', ['right', 'bottom', 'left', 'top'] as LegendPosition[], v => {
        chart.legend.position = v;
    });
    createSlider('legendPadding', [20, 80, 160, 240], v => {
        chart.legend.padding = v;
    });
    createSlider('legendMarkerLineWidth', [1, 2, 3, 4, 5, 6], v => {
        chart.legend.markerStrokeWidth = v;
    });
    createSlider('legendMarkerSize', [4, 6, 10, 14, 18, 22, 26, 30], v => {
        chart.legend.markerSize = v;
    });
    createSlider('legendItemPaddingX', [4, 6, 8, 10, 12, 16], v => {
        chart.legend.itemPaddingX = v;
    });
    createSlider('legendItemPaddingY', [4, 6, 8, 10, 12, 16], v => {
        chart.legend.itemPaddingY = v;
    });
    createSlider('legendLabelFont', [12, 18, 24, 30, 36], v => {
        chart.legend.labelFontSize = v;
        chart.legend.labelFontFamily = 'sans-serif';
    });
    createSlider('legendLabelColor', ['black', 'red', 'gold', 'green'], v => {
        chart.legend.labelColor = v;
    });
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
    createSlider('legendMarkerPadding', [8, 12, 16, 20, 24], v => {
        chart.legend.markerPadding = v;
    });

    createSlider('stroke opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        pieSeries.strokeOpacity = v;
    });
    createSlider('fill opacity', [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0], v => {
        pieSeries.fillOpacity = v;
    });
});
