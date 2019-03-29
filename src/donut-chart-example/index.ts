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

    const pieSeries1 = new PieSeries<Datum>();
    pieSeries1.offsetX = -200;
    chart.addSeries(pieSeries1);
    pieSeries1.setDataAndFields(data, 'value1', 'label');
    pieSeries1.shadow = shadow;
    pieSeries1.lineWidth = 1;
    pieSeries1.calloutWidth = 1;

    const pieSeries2 = new PieSeries<Datum>();
    pieSeries2.offsetX = -200;
    chart.addSeries(pieSeries2);
    pieSeries2.setDataAndFields(data, 'value2', 'label');
    pieSeries2.shadow = shadow;
    pieSeries2.lineWidth = 1;
    pieSeries2.calloutWidth = 1;

    const pieSeries3 = new PieSeries<Datum>();
    pieSeries3.offsetX = -200;
    chart.addSeries(pieSeries3);
    pieSeries3.setDataAndFields(data, 'value3', 'label');
    pieSeries3.shadow = shadow;
    pieSeries3.lineWidth = 1;
    pieSeries3.calloutWidth = 1;

    const series = chart.series as PieSeries<Datum>[];
    const thickness = 20;
    const padding = 5;
    let offset = 0;
    series.forEach(series => {
        series.outerRadiusOffset = offset;
        offset -= thickness;
        series.innerRadiusOffset = offset;
        offset -= padding;
    });

    document.body.appendChild(document.createElement('br'));

    const saveImageButton = document.createElement('button');
    saveImageButton.textContent = 'Save Chart Image';
    document.body.appendChild(saveImageButton);
    saveImageButton.addEventListener('click', () => {
        chart.scene.download('pie-chart');
    });
});
