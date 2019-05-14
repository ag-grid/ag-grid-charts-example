import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";
import { toReadableNumber } from "ag-grid-enterprise/src/charts/util/number";

const data1 = [
    { category: '1', value: 0.0001234 },
    { category: '2', value: 0.0002234 },
    { category: '3', value: 0.0003234 },
    { category: '4', value: 0.0004234 },
    { category: '5', value: 0.0005234 },
    { category: '6', value: 0.0006234 },
    { category: '7', value: 0.0007234 },
    { category: '8', value: 0.0008234 }
];

const data2 = [
    { category: '1', value: 0.000001721 },
    { category: '2', value: 0.000002521 },
    { category: '3', value: 0.000003373 },
    { category: '4', value: 0.000004615 },
    { category: '5', value: 0.000005164 },
    { category: '6', value: 0.000006774 },
    { category: '7', value: 0.000007283 },
    { category: '8', value: 0.000008231 }
];

const data3 = [
    { category: '1', value: 0.000001721 },
    { category: '2', value: 0.0002521 },
    { category: '3', value: 0.00003373 },
    { category: '4', value: 0.000004615 },
    { category: '5', value: 0.000005164 },
    { category: '6', value: 0.006774 },
    { category: '7', value: 0.07283 },
    { category: '8', value: 0.00008231 }
];

const data4 = [
    { category: 'Ann', value: 65345897348 },
    { category: 'Joe', value: 43597234797 },
    { category: 'Bob', value: 33497234797 }
];

const data5 = [
    { category: 'Pat', value: 33497234 },
    { category: 'Rob', value: 65345897 },
    { category: 'Don', value: 43597234 },
];

const data6 = [
    { category: 'Amy', value: 65345 },
    { category: 'Don', value: 43597 },
    { category: 'Eve', value: 33497 }
];

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

function dataToHtml(data: any): string {
    const json = JSON.stringify(data, null, 4);
    return json.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/ /g, '&nbsp;');
}

function createCategoryLineChart() {
    const parentDiv = document.createElement('div');
    parentDiv.style.display = 'flex';
    document.body.appendChild(parentDiv);

    const dataDiv = document.createElement('div');
    dataDiv.style.font = '14px monospaced';
    dataDiv.style.border = '1px solid black';
    dataDiv.style.width = '200px';
    parentDiv.appendChild(dataDiv);

    const chart = new CartesianChart({
        parent: parentDiv,
        xAxis: new CategoryAxis(),
        yAxis: new NumberAxis(),
    });
    chart.width = 800;
    chart.height = 500;

    const lineSeries = new LineSeries();
    chart.addSeries(lineSeries);
    lineSeries.tooltip = true;
    lineSeries.tooltipRenderer = params => {
        if (params.datum[params.xField] === 'Rick') {
            return ''; // don't show tooltip for this guy
        }
        return '<strong>Value: </strong>' + params.datum[params.yField].toString();
    };
    lineSeries.data = data1;
    lineSeries.xField = 'category';
    lineSeries.yField = 'value';

    dataDiv.innerHTML = dataToHtml(data1);

    document.body.appendChild(document.createElement('br'));

    createButton('Download', () => {
        chart.scene.download({ fileName: 'chart' });
    });

    document.body.appendChild(document.createElement('br'));

    createButton('Data 1', () => {
        lineSeries.data = data1;
        dataDiv.innerHTML = dataToHtml(data1);
    });

    createButton('Data 2', () => {
        lineSeries.data = data2;
        dataDiv.innerHTML = dataToHtml(data2);
    });

    createButton('Data 3', () => {
        lineSeries.data = data3;
        dataDiv.innerHTML = dataToHtml(data3);
    });

    createButton('Data 4', () => {
        lineSeries.data = data4;
        dataDiv.innerHTML = dataToHtml(data4);
    });

    createButton('Data 5', () => {
        lineSeries.data = data5;
        dataDiv.innerHTML = dataToHtml(data5);
    });

    createButton('Data 6', () => {
        lineSeries.data = data6;
        dataDiv.innerHTML = dataToHtml(data6);
    });

    document.body.appendChild(document.createElement('br'));

    createButton('Show markers', () => {
        lineSeries.marker = true;
    });

    createButton('Hide markers', () => {
        lineSeries.marker = false;
    });

    document.body.appendChild(document.createElement('br'));

    createButton('Label formatters #1', () => {
        chart.xAxis.labelFormatter = value => {
            return `-${value}-`;
        };
        chart.yAxis.labelFormatter = (value, decimalDigits) => {
            return (decimalDigits != null ? value.toFixed(decimalDigits + 2) : value.toString()) + 'g';
        };
        chart.layoutPending = true;
        // Note: we can simply call `axis.update` to update the scene graph
        // while avoiding chart layout, but chances are, if the new labels
        // are longer than the old ones, they will be clipped, since we are not
        // recalculating the amount of padding needed for longest axis label,
        // which is done during layout.
        // chart.xAxis.update();
        // chart.yAxis.update();
    });

    createButton('Label formatters #2', () => {
        chart.xAxis.labelFormatter = value => {
            return `[${value}]`;
        };
        chart.yAxis.labelFormatter = (value, decimalDigits) => {
            return '$' + toReadableNumber(value, decimalDigits);
        };
        chart.layoutPending = true;
    });

    createButton('No label formatters', () => {
        chart.xAxis.labelFormatter = undefined;
        chart.yAxis.labelFormatter = undefined;
        chart.layoutPending = true;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
});
