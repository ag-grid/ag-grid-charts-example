import scaleLinear, {LinearScale} from "ag-grid-enterprise/src/charts/scale/linearScale";
import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Selection} from "ag-grid-enterprise/src/charts/scene/selection";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc, ArcType} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {Line} from "ag-grid-enterprise/src/charts/scene/shape/line";
import {Text} from "ag-grid-enterprise/src/charts/scene/shape/text";
import {normalizeAngle180, toRadians} from "ag-grid-enterprise/src/charts/util/angle";
import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {BarSeries} from "ag-grid-enterprise/src/charts/chart/series/barSeries";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";

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

document.addEventListener('DOMContentLoaded', () => {
    const chart = new CartesianChart<Datum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = 900;
    chart.height = 500;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const barSeries = new BarSeries<Datum, string, number>();
    chart.series = [barSeries];
    barSeries.xField = 'label';
    barSeries.yFields = ['value'];
    barSeries.data = data;
});
