import {PolarChart} from "ag-charts-community/src/chart/polarChart";
import {PieSeries} from "ag-charts-community/src/chart/series/polar/pieSeries";
import {DropShadow} from "ag-charts-community/src/scene/dropShadow";
import { makeChartResizeable } from "../../lib/chart";

const data = [
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

document.addEventListener('DOMContentLoaded', () => {
    const chart = new PolarChart();
    chart.container = document.body;
    chart.width = 700;
    chart.height = 700;

    const shadow = new DropShadow();
    shadow.color = 'rgba(0,0,0,0.2)';
    shadow.blur = 15;

    const pieSeries1 = new PieSeries();
    chart.addSeries(pieSeries1);
    pieSeries1.data = data;
    pieSeries1.angleKey = 'value1';
    pieSeries1.labelKey = 'label';
    pieSeries1.shadow = shadow;
    pieSeries1.strokeWidth = 1;
    pieSeries1.calloutStrokeWidth = 1;

    const pieSeries2 = new PieSeries();
    chart.addSeries(pieSeries2);
    pieSeries2.data = data;
    pieSeries2.angleKey = 'value2';
    pieSeries2.labelKey = 'label';
    pieSeries2.shadow = shadow;
    pieSeries2.strokeWidth = 1;
    pieSeries2.calloutStrokeWidth = 1;
    pieSeries2.showInLegend = false;

    const pieSeries3 = new PieSeries();
    chart.addSeries(pieSeries3);
    pieSeries3.data = data;
    pieSeries3.angleKey = 'value3';
    pieSeries3.labelKey = 'label';
    pieSeries3.shadow = shadow;
    pieSeries3.strokeWidth = 1;
    pieSeries3.calloutStrokeWidth = 1;
    pieSeries3.showInLegend = false;

    const series = chart.series as PieSeries[];
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
        chart.scene.download('pie-chart');
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
