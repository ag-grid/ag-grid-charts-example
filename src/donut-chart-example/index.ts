import {PolarChart} from "ag-grid-enterprise/src/charts/chart/polarChart";
import {PieSeries} from "ag-grid-enterprise/src/charts/chart/series/pieSeries";
import {DropShadow} from "ag-grid-enterprise/src/charts/scene/dropShadow";
import {Offset} from "ag-grid-enterprise/src/charts/scene/offset";

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
    { label: 'Maria', value1: 3, value2: 8, value3: 5 }
];

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
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
    pieSeries1.setDataAndFields(data, 'value1', 'label');
    pieSeries1.shadow = shadow;
    pieSeries1.lineWidth = 1;
    pieSeries1.calloutWidth = 1;

    const pieSeries2 = new PieSeries<Datum>();
    chart.addSeries(pieSeries2);
    pieSeries2.setDataAndFields(data, 'value2', 'label');
    pieSeries2.shadow = shadow;
    pieSeries2.lineWidth = 1;
    pieSeries2.calloutWidth = 1;

    const pieSeries3 = new PieSeries<Datum>();
    chart.addSeries(pieSeries3);
    pieSeries3.setDataAndFields(data, 'value3', 'label');
    pieSeries3.shadow = shadow;
    pieSeries3.lineWidth = 1;
    pieSeries3.calloutWidth = 1;

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
});
