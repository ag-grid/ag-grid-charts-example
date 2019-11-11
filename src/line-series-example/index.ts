import { CartesianChart } from "@ag-grid-enterprise/charts/src/charts/chart/cartesianChart";
import { CategoryAxis } from "@ag-grid-enterprise/charts/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "@ag-grid-enterprise/charts/src/charts/chart/axis/numberAxis";
import { LineSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/lineSeries";
import { BarSeries } from "@ag-grid-enterprise/charts/src/charts/chart/series/barSeries";

import './app.css';
import { Circle } from "@ag-enterprise/grid-charts/src/charts/chart/marker/circle";

type CategoryDatum = {
    category: string,
    value: any
};

type NumericDatum = {
    xValue: number,
    yValue: number
};

type MultiValue = {
    category: string,
    value1: number,
    value2: number,
    value3: number
};

const categoryData: CategoryDatum[] = [
    { category: 'John', value: 3 },
    { category: 'Nige', value: 7 },
    { category: 'Vicky', value: 6 },
    { category: 'Rick', value: 4 },
    { category: 'Lucy', value: 8 },
    { category: 'Ben', value: 5 },
    { category: 'Barbara', value: 6 },
    { category: 'Maria', value: 3 }
];

const categoryDataWithGaps: CategoryDatum[] = [
    { category: 'John', value: 0 },
    { category: 'Nige', value: 7 },
    { category: 'Vicky', value: null },
    { category: 'Rick', value: 4 },
    { category: 'Lucy', value: 8 },
    { category: 'Ben', value: undefined },
    { category: 'Barbara', value: undefined },
    { category: 'Bob', value: 7 },
    { category: 'Maria', value: 3 },
    { category: 'Susie', value: NaN },
    { category: 'Maria', value: 5 }
];

function generateCategoryData(n = 50): CategoryDatum[] {
    const data: CategoryDatum[] = [];
    for (let i = 0; i < n; i++) {
        const datum: CategoryDatum = {
            category: 'A' + (i + 1),
            value: Math.random() * 10
        };
        data.push(datum);
    }
    return data;
}

function generateMultiValueData(n = 50): MultiValue[] {
    const data: MultiValue[] = [];
    for (let i = 0; i < n; i++) {
        const datum: MultiValue = {
            category: 'A' + (i + 1),
            value1: Math.random() * 10,
            value2: Math.random() * 20,
            value3: Math.random() * 15,
        };
        data.push(datum);
    }
    return data;
}

function generateSinData(): NumericDatum[] {
    const data: NumericDatum[] = [];
    const step = 0.1;
    for (let i = -10; i < 10; i += step) {
        const datum: NumericDatum = {
            xValue: i,
            yValue: Math.sin(i)
        };
        data.push(datum);
    }
    return data;
}

function generateLogData(): NumericDatum[] {
    const data: NumericDatum[] = [];
    const step = 10;
    for (let i = 1; i < 1000; i += step) {
        const datum: NumericDatum = {
            xValue: i,
            yValue: Math.log(i)
        };
        data.push(datum);
    }
    return data;
}

function generateSpiralData(): NumericDatum[] {
    // r = a + bθ
    // x = r * Math.cos(θ)
    // y = r * Math.sin(θ)
    const a = 1;
    const b = 1;
    const data: NumericDatum[] = [];
    const step = 0.1;
    for (let th = 1; th < 50; th += step) {
        const r = (a + b * th);
        const datum: NumericDatum = {
            xValue: r * Math.cos(th),
            yValue: r * Math.sin(th)
        };
        data.push(datum);
    }
    return data;
}

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


function createCategoryLineChart() {
    const chart = new CartesianChart({
        xAxis: new CategoryAxis(),
        yAxis: new NumberAxis()
    });
    chart.parent = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 600;

    const lineSeries = new LineSeries();
    lineSeries.marker.type = Circle;
    lineSeries.marker.enabled = true;
    chart.xAxis.label.rotation = 45;
    chart.addSeries(lineSeries);
    lineSeries.tooltipEnabled = true;
    lineSeries.tooltipRenderer = params => {
        if (params.datum[params.xKey] === 'Rick') {
            return ''; // don't show tooltip for this guy
        }
        return '<div class="content"><strong>Value: </strong>' + params.datum[params.yKey].toString() + '</div>';
    };
    lineSeries.data = categoryData;
    lineSeries.xKey = 'category';
    lineSeries.yKey = 'value';

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });

    createButton('Use data with gaps', () => {
        lineSeries.data = categoryDataWithGaps;
        lineSeries.xKey = 'category';
        lineSeries.yKey = 'value';
    })

    createButton('Change data', () => {
        lineSeries.data = generateCategoryData(Math.floor(Math.random() * 50));
        lineSeries.xKey = 'category';
        lineSeries.yKey = 'value';
    });

    createButton('No data', () => {
        lineSeries.data = [];
        lineSeries.xKey = 'category';
        lineSeries.yKey = 'value';
    });

    createButton('No x-key', () => {
        lineSeries.xKey = '';
    });

    createButton('No y-key', () => {
        lineSeries.yKey = '';
    });

    createButton('Single data point', () => {
        lineSeries.data = [{
            category: 'One',
            value: 17
        }];
        lineSeries.xKey = 'category';
        lineSeries.yKey = 'value';
    });
}

function createNumericLineChart() {
    document.body.appendChild(document.createElement('br'));

    const chart = new CartesianChart({
        xAxis: new NumberAxis(),
        yAxis: new NumberAxis()
    });
    chart.parent = document.body;
    chart.width = 600;
    chart.height = 600;

    const lineSeries = new LineSeries();
    lineSeries.marker.type = Circle;
    lineSeries.marker.enabled = true;
    lineSeries.strokeWidth = 2;
    lineSeries.showInLegend = false;
    chart.xAxis.label.rotation = 45;
    chart.addSeries(lineSeries);
    lineSeries.data = generateSinData();
    lineSeries.xKey = 'xValue';
    lineSeries.yKey = 'yValue';

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('chart');
    });

    createButton('Math.log data', () => {
        lineSeries.data = generateLogData();
    });

    createButton('Spiral data', () => {
        lineSeries.data = generateSpiralData();
    });

    createButton('Hide markers', () => {
        lineSeries.marker.enabled = false;
    });

    createButton('Show markers', () => {
        lineSeries.marker.enabled = true;
    });

    createButton('Animate Math.sin data', () => {
        const data: NumericDatum[] = [];
        const step = 0.1;
        let i = -10;

        chart.onLayoutDone = nextFrame;

        function nextFrame() {
            data.push({
                xValue: i,
                yValue: Math.sin(i)
            });
            lineSeries.data = data;

            if (i < 10) {
                i += step;
            } else {
                chart.onLayoutDone = undefined;
            }
        }

        nextFrame();
    });

    createButton('Animate spiral data', () => {
        const a = 1;
        const b = 1;
        const data: NumericDatum[] = [];
        const step = 0.1;
        let th = 1;

        chart.onLayoutDone = nextFrame;

        function nextFrame() {
            const r = (a + b * th);
            data.push({
                xValue: r * Math.cos(th),
                yValue: r * Math.sin(th)
            });
            lineSeries.data = data;

            if (th < 50) {
                th += step;
            } else {
                chart.onLayoutDone = undefined;
            }
        }

        nextFrame();
    });

    document.body.appendChild(document.createElement('br'));
    const niceCheckboxLabel = document.createElement('label');
    niceCheckboxLabel.innerHTML = 'Data domain auto-rounding (desirable for static charts but not for animated ones)';
    const niceCheckbox = document.createElement('input');
    niceCheckbox.type = 'checkbox';
    niceCheckbox.checked = true;
    niceCheckboxLabel.appendChild(niceCheckbox);
    document.body.appendChild(niceCheckboxLabel);
    niceCheckbox.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const xAxis = chart.xAxis;
        const yAxis = chart.yAxis;

        if (xAxis instanceof NumberAxis) {
            xAxis.nice = target.checked;
        }
        if (yAxis instanceof NumberAxis) {
            yAxis.nice = target.checked;
        }
        chart.layoutPending = true;
    });

    createSlider('lineWidth', [0, 2, 4, 6, 8], value => lineSeries.strokeWidth = value);
    createSlider('markerLineWidth', [0, 2, 4, 6, 8], value => lineSeries.marker.strokeWidth = value);
    createSlider('markerSize', [0, 2, 4, 6, 8], value => lineSeries.marker.size = value);
}

function createMultiLineChart() {
    const chart = new CartesianChart({
        xAxis: new CategoryAxis(),
        yAxis: new NumberAxis()
    });
    chart.parent = document.body;
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.xAxis.label.rotation = 90;

    const data = generateMultiValueData(10);

    const lineSeries1 = new LineSeries();
    lineSeries1.marker.type = Circle;
    lineSeries1.strokeWidth = 4;
    lineSeries1.fill = '#f3622d';
    lineSeries1.xKey = 'category';
    lineSeries1.yKey = 'value1';

    const lineSeries2 = new LineSeries();
    lineSeries2.marker.type = Circle;
    lineSeries2.strokeWidth = 4;
    lineSeries2.fill = '#fba71b';
    lineSeries2.xKey = 'category';
    lineSeries2.yKey = 'value2';

    const lineSeries3 = new LineSeries();
    lineSeries3.marker.type = Circle;
    lineSeries3.strokeWidth = 4;
    lineSeries3.fill = '#57b757';
    lineSeries3.xKey = 'category';
    lineSeries3.yKey = 'value3';

    const barSeries = new BarSeries();
    barSeries.fills = ['#41a9c9'];
    barSeries.xKey = 'category';
    barSeries.yKeys = ['value3'];

    // Both approaches are valid here:
    // chart.addSeries(barSeries);
    // chart.addSeries(lineSeries1);
    // chart.addSeries(lineSeries2);
    // chart.addSeries(lineSeries3);

    chart.series = [
        barSeries,
        lineSeries1,
        lineSeries2,
        lineSeries3
    ] as any[]; // TODO

    chart.data = data;

    document.body.appendChild(document.createElement('br'));
    const saveImageButton = document.createElement('button');
    saveImageButton.textContent = 'Save Chart Image';
    document.body.appendChild(saveImageButton);
    saveImageButton.addEventListener('click', () => {
        chart.scene.download('chart');
    });

    const changeDataButton = document.createElement('button');
    changeDataButton.textContent = 'Change data';
    document.body.appendChild(changeDataButton);
    changeDataButton.addEventListener('click', () => {
        chart.data = generateMultiValueData(Math.random() * 30);
    });

    const animateButton = document.createElement('button');
    animateButton.textContent = 'Animate';
    document.body.appendChild(animateButton);
    animateButton.addEventListener('click', () => {
        const data: MultiValue[] = [];
        const step = 0.1;
        let i = -10;
        let index = 0;

        chart.onLayoutDone = nextFrame;

        function nextFrame() {
            data.push({
                category: 'A' + (++index),
                value1: Math.sin(i) * 0.5,
                value2: Math.cos(i),
                value3: Math.sin(i)
            });
            i += step;

            chart.data = data;

            if (i < 10) {
                i += step;
            } else {
                chart.onLayoutDone = undefined;
            }
        }

        nextFrame();
    });

    createButton('Remove the bar series', () => {
        if (chart.removeSeries(barSeries)) {
            console.log('The bar series was removed.');
        } else {
            console.log('No series removed. The chart does not contain the given series.');
        }
    });

    createButton('Add the bar series back', () => {
        if (chart.addSeries(barSeries)) {
            console.log('Bar series was successfully added.');
        } else {
            console.log('Could not add bar series.');
        }
    });

    createButton('Insert bar series before line series', () => {
        if (chart.addSeries(barSeries, lineSeries1)) {
            console.log('Bar series was successfully inserted.');
        } else {
            console.log('Could not insert bar series.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
    createNumericLineChart();
    createMultiLineChart();
});
