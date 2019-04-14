import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";
import {BarSeries} from "ag-grid-enterprise/src/charts/chart/series/barSeries";

type CategoryDatum = {
    category: string,
    value: number
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

function createCategoryLineChart() {
    const chart = new CartesianChart<CategoryDatum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = document.body.clientWidth;
    chart.height = 600;

    const lineSeries = new LineSeries<CategoryDatum, string, number>();
    lineSeries.lineWidth = 4;
    chart.xAxis.labelRotation = 45;
    chart.addSeries(lineSeries);
    lineSeries.tooltip = true;
    lineSeries.tooltipRenderer = params => {
        if (params.datum[params.xField] === 'Rick') {
            return ''; // don't show tooltip for this guy
        }
        return '<strong>Value: </strong>' + params.datum[params.yField].toString();
    };
    lineSeries.data = categoryData;
    lineSeries.xField = 'category';
    lineSeries.yField = 'value';

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
        lineSeries.data = generateCategoryData(Math.floor(Math.random() * 50));
    });

    const noDataButton = document.createElement('button');
    noDataButton.textContent = 'No data';
    document.body.appendChild(noDataButton);
    noDataButton.addEventListener('click', () => {
        lineSeries.data = [];
    });

    const onePointButton = document.createElement('button');
    onePointButton.textContent = 'Single data point';
    document.body.appendChild(onePointButton);
    onePointButton.addEventListener('click', () => {
        lineSeries.data = [{
            category: 'One',
            value: 17
        }];
    });
}

function createNumericLineChart() {
    document.body.appendChild(document.createElement('br'));

    const chart = new CartesianChart<NumericDatum, number, number>(
        new NumberAxis(),
        new NumberAxis()
    );
    chart.width = 600;
    chart.height = 600;

    const lineSeries = new LineSeries<NumericDatum, number, number>();
    lineSeries.lineWidth = 2;
    chart.xAxis.labelRotation = 45;
    chart.addSeries(lineSeries);
    lineSeries.data = generateSinData();
    lineSeries.xField = 'xValue';
    lineSeries.yField = 'yValue';

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

    createButton('Animate Math.sin data', () => {
        const data: NumericDatum[] = [];
        const step = 0.1;
        let i = -10;

        (function nextFrame() {
            data.push({
                xValue: i,
                yValue: Math.sin(i)
            });
            lineSeries.data = data;

            if (i < 10) {
                i += step;
                requestAnimationFrame(nextFrame);
            }
        })();
    });

    createButton('Animate spiral data', () => {
        const a = 1;
        const b = 1;
        const data: NumericDatum[] = [];
        const step = 0.1;
        let th = 1;

        (function nextFrame() {
            const r = (a + b * th);
            data.push({
                xValue: r * Math.cos(th),
                yValue: r * Math.sin(th)
            });
            lineSeries.data = data;

            if (th < 50) {
                th += step;
                requestAnimationFrame(nextFrame);
            }
        })();
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

    document.body.appendChild(document.createElement('br'));
    const lineWidthSlider = document.createElement('input');
    lineWidthSlider.type = 'range';
    lineWidthSlider.min = '0';
    lineWidthSlider.max = '10';
    lineWidthSlider.step = '0.5';
    lineWidthSlider.value = '2';
    lineWidthSlider.style.width = '400px';
    document.body.appendChild(lineWidthSlider);
    lineWidthSlider.addEventListener('input', (e) => {
        lineSeries.lineWidth = +(e.target as HTMLInputElement).value;
    });

    document.body.appendChild(document.createElement('br'));
    const markerLineWidthSlider = document.createElement('input');
    markerLineWidthSlider.type = 'range';
    markerLineWidthSlider.min = '0';
    markerLineWidthSlider.max = '10';
    markerLineWidthSlider.step = '0.5';
    markerLineWidthSlider.value = '2';
    markerLineWidthSlider.style.width = '400px';
    document.body.appendChild(markerLineWidthSlider);
    markerLineWidthSlider.addEventListener('input', (e) => {
        lineSeries.markerLineWidth = +(e.target as HTMLInputElement).value;
    });

    document.body.appendChild(document.createElement('br'));
    const markerRadiusSlider = document.createElement('input');
    markerRadiusSlider.type = 'range';
    markerRadiusSlider.min = '0';
    markerRadiusSlider.max = '10';
    markerRadiusSlider.step = '0.5';
    markerRadiusSlider.value = '5';
    markerRadiusSlider.style.width = '400px';
    document.body.appendChild(markerRadiusSlider);
    markerRadiusSlider.addEventListener('input', (e) => {
        lineSeries.markerRadius = +(e.target as HTMLInputElement).value;
    });
}

function createMultiLineChart() {
    const chart = new CartesianChart<MultiValue, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.xAxis.labelRotation = -90;

    const data = generateMultiValueData(10);

    const lineSeries1 = new LineSeries<MultiValue, string, number>();
    lineSeries1.lineWidth = 4;
    lineSeries1.color = '#f3622d';
    lineSeries1.xField = 'category';
    lineSeries1.yField = 'value1';

    const lineSeries2 = new LineSeries<MultiValue, string, number>();
    lineSeries2.lineWidth = 4;
    lineSeries2.color = '#fba71b';
    lineSeries2.xField = 'category';
    lineSeries2.yField = 'value2';

    const lineSeries3 = new LineSeries<MultiValue, string, number>();
    lineSeries3.lineWidth = 4;
    lineSeries3.color = '#57b757';
    lineSeries3.xField = 'category';
    lineSeries3.yField = 'value3';

    const barSeries = new BarSeries<MultiValue, string, number>();
    barSeries.colors = ['#41a9c9'];
    barSeries.xField = 'category';
    barSeries.yFields = ['value3'];

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
    ];

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

        (function nextFrame() {
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
                setTimeout(nextFrame, 33);
            }
        })();
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
