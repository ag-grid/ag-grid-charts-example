import { AgChart } from "../../charts/main";
import { AgSparkline } from "../../sparklines/sparkline/agSparkline";

const yData = [1, 2, 3, 4, 2, -2, -3, -4, 2, 3, 4];

AgSparkline.create({
    container: document.body,
    width: 200,
    stroke: 'black',
    strokeWidth: 7,
    type: 'column',
    data: yData,
    axis: {
        strokeWidth: 7
    }
});

AgChart.create({
    container: document.body,
    autoSize: false,
    width: 200,
    height: 100,
    series: [{
        type: 'column',
        xKey: 'x',
        yKeys: ['y'],
        strokeWidth: 2,
        fills: ['#7CB5EC'],
        strokes: ['black'],
        data: yData.map((y, x) => ({ x, y }))
    }],
    theme: {
        overrides: {
            cartesian: {
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                axes: {
                    category: {
                        label: {
                            formatter: () => '',
                            color: undefined
                        },
                        tick: {
                            size: 0
                        },
                        paddingInner: 0.3,
                        gridStyle: []
                    },
                    number: {
                        line: {
                            color: undefined
                        },
                        label: {
                            formatter: () => '',
                            color: undefined
                        },
                        tick: {
                            size: 0
                        },
                        gridStyle: []
                    }
                },
                legend: {
                    enabled: false
                }
            }
        }
    }
});