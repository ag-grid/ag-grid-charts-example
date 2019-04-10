import {PolarChart} from "ag-grid-enterprise/src/charts/chart/polarChart";
import {PieSeries} from "ag-grid-enterprise/src/charts/chart/series/pieSeries";
import {DropShadow} from "ag-grid-enterprise/src/charts/scene/dropShadow";
import {Offset} from "ag-grid-enterprise/src/charts/scene/offset";

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
    { label: 'John', value: 3, other: 7 },
    { label: 'Nige', value: 7, other: 8 },
    { label: 'Vicky', value: 6, other: 9 },
    { label: 'Rick', value: 4, other: 10 },
    { label: 'Lucy', value: 8, other: 11 },
    { label: 'Ben', value: 5, other: 12 },
    { label: 'Barbara', value: 3, other: 10 },
    { label: 'Maria', value: 3, other: 8 }
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
    chart.width = 900;
    chart.height = 400;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const shadow = new DropShadow('rgba(0,0,0,0.2)', new Offset(0, 0), 15);

    const pieSeries = new PieSeries<Datum>();
    pieSeries.offsetX = -200;
    chart.addSeries(pieSeries);
    pieSeries.data = data;
    pieSeries.angleField = 'value';
    pieSeries.labelField = 'label';
    pieSeries.label = false;
    pieSeries.shadow = shadow;
    pieSeries.lineWidth = 1;
    pieSeries.calloutWidth = 1;

    const pieSeries2 = new PieSeries<Datum>();
    pieSeries2.offsetX = 200;
    chart.addSeries(pieSeries2);
    pieSeries2.data = data2;
    pieSeries2.angleField = 'value';
    pieSeries2.labelField = 'label';
    pieSeries2.label = false;

    document.body.appendChild(document.createElement('br'));

    createButton('Save Chart Image', () => {
        chart.scene.download('pie-chart');
    });
    createButton('Show tooltips', () => {
        pieSeries.tooltip = true;
        pieSeries2.tooltip = true;
    });
    createButton('Hide tooltips', () => {
        pieSeries.tooltip = false;
        pieSeries2.tooltip = false;
    });
    createButton('Show labels', () => {
        pieSeries.label = true;
        pieSeries2.label = true;
    });
    createButton('Hide labels', () => {
        pieSeries.label = false;
        pieSeries2.label = false;
    });
    createButton('Use tooltip renderer', () => {
        pieSeries.tooltipRenderer = params => {
            return `<em>Value</em>: <span style="color: red;">${params.datum[params.angleField]}</span>`;
        };

        pieSeries2.tooltipRenderer = params => {
            const radiusValue = params.radiusField ? `<br>Radius: ${params.datum[params.radiusField]}` : '';
            return `Angle: ${params.datum[params.angleField]}${radiusValue}`;
        };
    });
    createButton('Remove tooltip renderer', () => {
        pieSeries.tooltipRenderer = undefined;
        pieSeries2.tooltipRenderer = undefined;
    });

    let rotation = false;
    createButton('Moar Rotation!', () => {
        rotation = true;
        (function step() {
            pieSeries2.rotation += 0.1;
            if (rotation) {
                requestAnimationFrame(step);
            }
        })();
    });
    createButton('Rotation OFF', () => {
        rotation = false;
    });
    createButton('Use radius field', () => {
        pieSeries2.data = data2;
        pieSeries2.angleField = 'value';
        pieSeries2.labelField = 'label';
        pieSeries2.radiusField = 'other';
    });
    createButton('Remove radius field', () => {
        pieSeries2.radiusField = undefined;
    });
    createButton('Run other tests', () => {
        setTimeout(() => {
            pieSeries.offsetX = -150;
            pieSeries2.offsetX = 150;
            chart.padding = {
                top: 70,
                right: 100,
                bottom: 70,
                left: 100
            };
            chart.size = [640, 300];
        }, 2000);

        setTimeout(() => {
            pieSeries.labelField = undefined;
        }, 4000);

        setTimeout(() => {
            pieSeries.data = data2;
            pieSeries.angleField = 'value';
            pieSeries.labelField = 'label';
        }, 6000);

        setTimeout(() => {
            pieSeries.data = data;
        }, 8000);

        setTimeout(() => {
            pieSeries2.angleField = 'other';
        }, 10000);

        setTimeout(() => {
            pieSeries2.radiusField = 'other';
            pieSeries2.strokeStyle = 'white';
            pieSeries2.calloutColor = 'black';
            pieSeries2.lineWidth = 3;
            pieSeries2.calloutWidth = 1;
        }, 12000);
    });
});
