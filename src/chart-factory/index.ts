import './app.css';
import { AgChart } from "ag-charts-community/src/chart/agChart";
import { createButton } from "../../lib/ui";
import { LegendPosition } from "ag-charts-community";

function createLineChart() {
    const data = [{
        month: 'Jan',
        revenue: 155000,
        profit: 33000
    }, {
        month: 'Feb',
        revenue: 123000,
        profit: 35500
    }, {
        month: 'Mar',
        revenue: 172500,
        profit: 41000
    }, {
        month: 'Apr',
        revenue: 185000,
        profit: 50000
    }];

    const scatterData = [{
        x: 23,
        y: 74
    }, {
        x: 83,
        y: 80
    }, {
        x: 55,
        y: 93
    }, {
        x: 34,
        y: 45
    }, {
        x: 77,
        y: 66
    }];

    const chart1 = AgChart.create({
        // chart type is optional because it defaults to `cartesian`
        container: document.body,
        data,
        series: [{
            // series type if optional because `line` is default for `cartesian` charts
            xKey: 'month',
            yKey: 'revenue',
            marker: {
                shape: 'plus',
                size: 20
            }
        }, {
            type: 'column', // have to specify type explicitly here
            xKey: 'month',
            yKeys: ['profit'],
            fills: ['lime']
        }],
        legend: {}
    });

    let legendMarkerSize = 15;
    let legendPositionIndex = 0;
    createButton('Increase legend marker size', () => {
        AgChart.update(chart1, {
            data,
            series: [{
                xKey: 'month',
                yKey: 'revenue'
            }, {
                type: 'column',
                xKey: 'month',
                yKeys: ['profit'],
                fills: ['lime']
            }],
            legend: {
                markerSize: (legendMarkerSize += 2),
                position: [LegendPosition.Right, LegendPosition.Bottom, LegendPosition.Left, LegendPosition.Right][legendPositionIndex++ % 4]
            }
        });
    });

    AgChart.create({
        type: 'polar',
        container: document.body,
        data,
        series: [{ // series type is optional because that's the default for `polar` charts
            angleKey: 'profit',
            tooltipEnabled: true
        }]
    });

    AgChart.create({
        // `polar` chart type is optional because it can be inferred from the type of series
        container: document.body,
        data,
        series: [{
            type: 'pie',
            angleKey: 'revenue',
            labelKey: 'month',
            innerRadiusOffset: -50 // donut hole
        }]
    });

    AgChart.create({
        container: document.body,
        data: scatterData,
        title: {
            text: 'Scatter Plot',
            // fontSize: 18,
            // fontWeight: 'bold'
        },
        subtitle: {
            fontStyle: 'italic'
        },
        axes: [{
            type: 'number',
            position: 'right',
            gridStyle: [{
                stroke: 'rgba(0,0,0,0.3)',
                lineDash: [2, 2]
            }, {
                stroke: undefined
            }]
        }, {
            type: 'number',
            position: 'bottom',
            label: {
                rotation: 45
            }
        }],
        series: [{
            type: 'scatter',
            // marker: {
            //     type: 'plus'
            // },
            xKey: 'x',
            yKey: 'y'
        }],
        // legend: {
        //     enabled: true
        // }
    });
}

function test() {
    const chart = AgChart.create({
        // chart type is optional because it defaults to `cartesian`
        container: document.body,
        data: [{
            month: 'Jan',
            revenue: 155000,
            profit: 33000
        }, {
            month: 'Feb',
            revenue: 123000,
            profit: 35500
        }],
        series: [{
            // series type if optional because `line` is default for `cartesian` charts
            xKey: 'month',
            yKey: 'revenue',
            marker: {
                shape: 'plus',
                size: 20
            }
        }, {
            type: 'column', // have to specify type explicitly here
            xKey: 'month',
            yKeys: ['profit'],
            fills: ['lime']
        }],
        legend: {
            itemPaddingY: 16
        }
    });
    AgChart.update(chart, {
        width: 500,
        height: 500,
        padding: {
            top: 30,
            right: 40,
            bottom: 50,
            left: 60
        },
        subtitle: {
            text: 'My Subtitle',
            fontSize: 20
        },
        series: [{
            // series type if optional because `line` is default for `cartesian` charts
            xKey: 'month',
            yKey: 'revenue',
            marker: {
                shape: 'plus',
                size: 20
            }
        }, {
            type: 'column', // have to specify type explicitly here
            xKey: 'month',
            yKeys: ['profit'],
            fills: ['lime']
        }],
        legend: {
            padding: 50,
            position: LegendPosition.Bottom
        }
    });

    console.assert(chart.container === undefined);
    console.assert(chart.width === 500);
    console.assert(chart.height === 500);
    console.assert(chart.data.length === 0);
    console.assert(chart.padding.top === 30);
    console.assert(chart.padding.right === 40);
    console.assert(chart.padding.bottom === 50);
    console.assert(chart.padding.left === 60);
    console.assert(chart.title === undefined);
    console.assert(chart.subtitle.text === 'My Subtitle');
    console.assert(chart.subtitle.fontSize === 20);
}

document.addEventListener('DOMContentLoaded', () => {
    // createLineChart();
    test();
});
