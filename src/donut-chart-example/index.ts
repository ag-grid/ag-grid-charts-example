import {PolarChart} from "ag-grid-enterprise/src/charts/chart/polarChart";
import {PieSeries} from "ag-grid-enterprise/src/charts/chart/series/pieSeries";
import {DropShadow} from "ag-grid-enterprise/src/charts/scene/dropShadow";
import {Offset} from "ag-grid-enterprise/src/charts/scene/offset";
import { Chart } from "ag-grid-enterprise/src/charts/chart/chart";

type Datum = {
    label: string,
    value1: number,
    value2: number,
    value3: number
};

const data: Datum[] = [
    { label: 'John', value1: 3, value2: 7, value3: 5 },
    { label: 'Nige', value1: 7, value2: 8, value3: 4 },
    { label: 'Vicky', value1: 6, value2: 9, value3: 2 },
    { label: 'Rick', value1: 4, value2: 10, value3: 7 },
    { label: 'Lucy', value1: 8, value2: 11, value3: 6 },
    { label: 'Ben', value1: 5, value2: 12, value3: 7 },
    { label: 'Barbara', value1: 3, value2: 10, value3: 5 },
    { label: 'Vitaly', value1: 7, value2: 7, value3: 7 },
    { label: 'Rob', value1: 5, value2: 8, value3: 5 },
    { label: 'Mary', value1: 3, value2: 7, value3: 9 },
    { label: 'Dave', value1: 3, value2: 3, value3: 3 },
    { label: 'Katrine', value1: 4, value2: 5, value3: 6 },
    { label: 'Donald', value1: 1, value2: 2, value3: 3 }
];

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

function makeChartResizeable(chart: Chart<any, any, any>) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let chartSize: [number, number];
    const scene = chart.scene;

    scene.hdpiCanvas.canvas.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        chartSize = chart.size;
        isDragging = true;
    });
    scene.hdpiCanvas.canvas.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            chart.size = [chartSize[0] + dx, chartSize[1] + dy];
        }
    });
    scene.hdpiCanvas.canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const chart = new PolarChart<Datum, number, any>();
    chart.width = 700;
    chart.height = 700;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const shadow = new DropShadow('rgba(0,0,0,0.2)', new Offset(0, 0), 15);

    const pieSeries1 = new PieSeries<Datum>();
    chart.addSeries(pieSeries1);
    pieSeries1.data = data;
    pieSeries1.angleField = 'value1';
    pieSeries1.labelField = 'label';
    pieSeries1.shadow = shadow;
    pieSeries1.lineWidth = 1;
    pieSeries1.calloutWidth = 1;

    const pieSeries2 = new PieSeries<Datum>();
    chart.addSeries(pieSeries2);
    pieSeries2.data = data;
    pieSeries2.angleField = 'value2';
    pieSeries2.labelField = 'label';
    pieSeries2.shadow = shadow;
    pieSeries2.lineWidth = 1;
    pieSeries2.calloutWidth = 1;
    pieSeries2.showInLegend = false;

    const pieSeries3 = new PieSeries<Datum>();
    chart.addSeries(pieSeries3);
    pieSeries3.data = data;
    pieSeries3.angleField = 'value3';
    pieSeries3.labelField = 'label';
    pieSeries3.shadow = shadow;
    pieSeries3.lineWidth = 1;
    pieSeries3.calloutWidth = 1;
    pieSeries3.showInLegend = false;

    const series = chart.series as PieSeries<Datum>[];
    const thickness = 40;
    const padding = 40;
    let offset = 0;
    series.forEach(series => {
        series.outerRadiusOffset = offset;
        offset -= thickness;
        series.innerRadiusOffset = offset;
        offset -= padding;
    });

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download({ fileName: 'pie-chart' });
    });

    createButton('Remove the inner series', () => {
        if (chart.removeSeries(pieSeries3)) {
            console.log('The inner series was removed.');
        } else {
            console.log('No series removed. The chart does not contain the given series.');
        }
    });

    createButton('Add the inner series back', () => {
        if (chart.addSeries(pieSeries3)) {
            console.log('The inner series was successfully added.');
        } else {
            console.log('Could not add the inner series.');
        }
    });

    createButton('Insert the inner series before other series', () => {
        if (chart.addSeries(pieSeries3, pieSeries2)) {
            console.log('The inner series was successfully inserted.');
        } else {
            console.log('Could not insert the inner series.');
        }
    });

    makeChartResizeable(chart);
});
