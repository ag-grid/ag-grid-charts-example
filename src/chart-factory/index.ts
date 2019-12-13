import { agChart } from "./agChart";

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

    // agChart.create({
    //     // chart type is optional because it defaults to `cartesian`
    //     data,
    //     series: [{
    //         // series type if optional because `line` is default for `cartesian` charts
    //         xKey: 'month',
    //         yKey: 'revenue'
    //     }, {
    //         type: 'column', // have to specify type explicitly here
    //         xKey: 'month',
    //         yKeys: ['profit'],
    //         fills: ['lime']
    //     }]
    // });
    //
    // agChart.create({
    //     type: 'polar',
    //     data,
    //     series: [{ // series type is optional because that's the default for `polar` charts
    //         angleKey: 'profit'
    //     }]
    // });
    //
    // agChart.create({
    //     // `polar` chart type is optional because it can be inferred from the type of series
    //     data,
    //     series: [{
    //         type: 'pie',
    //         angleKey: 'revenue',
    //         labelKey: 'month',
    //         innerRadiusOffset: -50 // donut hole
    //     }]
    // });

    agChart.create({
        data: scatterData,
        title: {
            text: 'Scatter Plot',
            fontSize: 18,
            fontWeight: 'bold'
        },
        axes: [{
            type: 'number',
            position: 'right'
        }, {
            type: 'number',
            position: 'bottom'
        }],
        series: [{
            type: 'scatter',
            // marker: {
            //     type: 'plus'
            // },
            xKey: 'x',
            yKey: 'y'
        }]
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createLineChart();
});
