import { CategoryAxis } from "ag-charts-community/src/chart/axis/categoryAxis";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";
import { BarSeries } from "ag-charts-community/src/chart/series/cartesian/barSeries";
import { LineSeries } from "ag-charts-community/src/chart/series/cartesian/lineSeries";
import { createRangeSlider, createButton, createSlider } from "../../lib/ui";
import { Group } from "ag-charts-community/src/scene/group";
import { Path } from "ag-charts-community/src/scene/shape/path";
import { makeChartResizeable } from "../../lib/chart";
import { GroupedCategoryAxis } from "ag-charts-community/src/chart/axis/groupedCategoryAxis";
import { AgChart } from "ag-charts-community/src/chart/agChart";

const data = [
    { name: "E", value: 0.12702 },
    { name: "T", value: 0.09056 },
    { name: "A", value: 0.08167 },
    { name: "O", value: 0.07507 },
    { name: "I", value: 0.06966 },
    { name: "N", value: 0.06749 },
    { name: "S", value: 0.06327 },
    { name: "H", value: 0.06094 },
    { name: "R", value: 0.05987 },
    { name: "D", value: 0.04253 },
    { name: "L", value: 0.04025 },
    { name: "C", value: 0.02782 },
    { name: "U", value: 0.02758 },
    { name: "M", value: 0.02406 },
    { name: "W", value: 0.0236 },
    { name: "F", value: 0.02288 },
    { name: "G", value: 0.02015 },
    { name: "Y", value: 0.01974 },
    { name: "P", value: 0.01929 },
    { name: "B", value: 0.01492 },
    { name: "V", value: 0.00978 },
    { name: "K", value: 0.00772 },
    { name: "J", value: 0.00153 },
    { name: "X", value: 0.0015 },
    { name: "Q", value: 0.00095 },
    { name: "Z", value: 0.00074 },
];

const groupedCategoryData = [
    {
        category: {
            labels: [
                "Poppy Grady",
                "Argentina"
            ]
        },
        jan: 86135,
        feb: 178,
        mar: 55905
    },
    {
        category: {
            labels: [
                "Layla Smith",
                "Argentina"
            ]
        },
        jan: 23219,
        feb: 11523,
        mar: 54291
    },
    {
        category: {
            labels: [
                "Isabella Kingston",
                "Belgium"
            ]
        },
        jan: 66433,
        feb: 3655,
        mar: 52061
    },
    {
        category: {
            labels: [
                "Mia Unalkat",
                "Brazil"
            ]
        },
        jan: 57544,
        feb: 39051,
        mar: 78481
    },
    {
        category: {
            labels: [
                "Gil Lopes",
                "Colombia"
            ]
        },
        jan: 20479,
        feb: 2253,
        mar: 39309
    },
    {
        category: {
            labels: [
                "Isabelle Donovan",
                "Colombia"
            ]
        },
        jan: 73957,
        feb: 25775,
        mar: 56291
    }
].map(d => {
    d.category.toString = function () {
        return this.labels.slice().reverse().join(' - ');
    };
    return d;
});

class RangeSelector extends Group {
    static className = 'Range';

    protected isContainerNode: boolean = true;

    private static defaults = {
        x: 0,
        y: 0,
        width: 200,
        height: 30,
        min: 0,
        max: 1
    };

    private minHandle = new RangeHandle();
    private maxHandle = new RangeHandle();
    private mask = (() => {
        const { x, y, width, height, min, max } = RangeSelector.defaults;
        const mask = new RangeMask();

        mask.x = x;
        mask.y = y;
        mask.width = width;
        mask.height = height;
        mask.min = min;
        mask.max = max;

        const { minHandle, maxHandle } = this;
        minHandle.centerX = x;
        maxHandle.centerX = x + width;
        minHandle.centerY = maxHandle.centerY = y + height / 2;

        this.append([mask, minHandle, maxHandle]);

        return mask;
    })();

    protected _x: number = RangeSelector.defaults.x;
    set x(value: number) {
        this.mask.x = value;
        this.updateHandles();
    }
    get x(): number {
        return this.mask.x;
    }

    protected _y: number = RangeSelector.defaults.y;
    set y(value: number) {
        this.mask.y = value;
        this.updateHandles();
    }
    get y(): number {
        return this.mask.y;
    }

    protected _width: number = RangeSelector.defaults.width;
    set width(value: number) {
        this.mask.width = value;
        this.updateHandles();
    }
    get width(): number {
        return this.mask.width;
    }

    protected _height: number = RangeSelector.defaults.height;
    set height(value: number) {
        this.mask.height = value;
        this.updateHandles();
    }
    get height(): number {
        return this.mask.height;
    }

    protected _min: number = RangeSelector.defaults.min;
    set min(value: number) {
        this.mask.min = value;
        this.updateHandles();
    }
    get min(): number {
        return this.mask.min;
    }

    protected _max: number = RangeSelector.defaults.max;
    set max(value: number) {
        this.mask.max = value;
        this.updateHandles();
    }
    get max(): number {
        return this.mask.max;
    }

    private updateHandles() {
        const { minHandle, maxHandle, x, y, width, height, mask } = this;
        minHandle.centerX = x + width * mask.min;
        maxHandle.centerX = x + width * mask.max;
        minHandle.centerY = maxHandle.centerY = y + height / 2;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.dirtyTransform) {
            this.computeTransformMatrix();
        }
        this.matrix.toContext(ctx);

        const { mask, minHandle, maxHandle } = this;
        [mask, minHandle, maxHandle].forEach(child => {
            ctx.save();
            if (child.visible) {
                child.render(ctx);
            }
            ctx.restore();
        });
    }
}

class RangeHandle extends Path {
    static className = 'RangeHandle';

    protected _fill = '#f2f2f2';
    protected _stroke = '#999999';
    protected _strokeWidth = 1;

    protected _centerX: number = 0;
    set centerX(value: number) {
        if (this._centerX !== value) {
            this._centerX = value;
            this.dirtyPath = true;
        }
    }
    get centerX(): number {
        return this._centerX;
    }

    protected _centerY: number = 0;
    set centerY(value: number) {
        if (this._centerY !== value) {
            this._centerY = value;
            this.dirtyPath = true;
        }
    }
    get centerY(): number {
        return this._centerY;
    }

    protected _width: number = 8;
    set width(value: number) {
        if (this._width !== value) {
            this._width = value;
            this.dirtyPath = true;
        }
    }
    get width(): number {
        return this._width;
    }

    protected _height: number = 16;
    set height(value: number) {
        if (this._height !== value) {
            this._height = value;
            this.dirtyPath = true;
        }
    }
    get height(): number {
        return this._height;
    }

    updatePath() {
        const { path, centerX, centerY, width, height } = this;

        path.clear();

        const x = centerX - width / 2;
        const y = centerY - height / 2;

        // Handle.
        path.moveTo(x, y);
        path.lineTo(x + width, y);
        path.lineTo(x + width, y + height);
        path.lineTo(x, y + height);
        path.lineTo(x, y);

        // Grip lines.
        path.moveTo(centerX - 1, centerY - 4);
        path.lineTo(centerX - 1, centerY + 4);
        path.moveTo(centerX + 1, centerY - 4);
        path.lineTo(centerX + 1, centerY + 4);
    }
}

class RangeMask extends Path {
    static className = 'RangeMask';

    protected _stroke = 'black';
    protected _strokeWidth = 1;
    protected _fillOpacity = 0.2;

    protected _x: number = 0;
    set x(value: number) {
        if (this._x !== value) {
            this._x = value;
            this.dirtyPath = true;
        }
    }
    get x(): number {
        return this._x;
    }

    protected _y: number = 0;
    set y(value: number) {
        if (this._y !== value) {
            this._y = value;
            this.dirtyPath = true;
        }
    }
    get y(): number {
        return this._y;
    }

    protected _width: number = 200;
    set width(value: number) {
        if (this._width !== value) {
            this._width = value;
            this.dirtyPath = true;
        }
    }
    get width(): number {
        return this._width;
    }

    protected _height: number = 30;
    set height(value: number) {
        if (this._height !== value) {
            this._height = value;
            this.dirtyPath = true;
        }
    }
    get height(): number {
        return this._height;
    }

    protected _min: number = 0;
    set min(value: number) {
        value = Math.min(Math.max(value, 0), this.max);
        if (this._min !== value) {
            this._min = value;
            this.dirtyPath = true;
        }
    }
    get min(): number {
        return this._min;
    }

    protected _max: number = 1;
    set max(value: number) {
        value = Math.max(Math.min(value, 1), this.min);
        if (this._max !== value) {
            this._max = value;
            this.dirtyPath = true;
        }
    }
    get max(): number {
        return this._max;
    }

    updatePath() {
        const { path, x, y, width, height, min, max } = this;

        path.clear();

        // Whole range.
        path.moveTo(x, y);
        path.lineTo(x + width, y);
        path.lineTo(x + width, y + height);
        path.lineTo(x, y + height);
        path.lineTo(x, y);

        const minX = x + width * min;
        const maxX = x + width * max;
        // Visible range.
        path.moveTo(minX, y);
        path.lineTo(minX, y + height);
        path.lineTo(maxX, y + height);
        path.lineTo(maxX, y);
        path.lineTo(minX, y);
    }
}



function createColumnChart() {
    const xAxis = new CategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    // chart.padding = new Padding(40);
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';

    const barSeries = new BarSeries();
    barSeries.xKey = 'name';
    barSeries.yKeys = ['value'];
    barSeries.fills = ['#f7bc09'];
    barSeries.data = data;

    const lineSeries = new LineSeries();
    lineSeries.xKey = 'name';
    lineSeries.yKey = 'value';
    lineSeries.marker.fill = '#88be48';
    lineSeries.marker.stroke = 'black';
    lineSeries.stroke = '#88be48';
    lineSeries.data = data; //.map(d => ({ ...d, value: d.value -= 0.05 }));

    chart.series = [barSeries, lineSeries];

    document.body.appendChild(document.createElement('br'));

    createRangeSlider('Visible Range', [0, 1], 0.01, (min, max) => {
        chart.navigator.min = min;
        chart.navigator.max = max;
    });

    makeChartResizeable(chart);

    // chart.scene.canvas.setPixelRatio(1);
    // chart.scene.canvas.pixelated = true;

    createButton('Toggle Range Selector Visibility', () => {
        chart.navigator.enabled = !chart.navigator.enabled;
        chart.performLayout();
    });

    createSlider('Pixel Ratio', [0.1, 0.25, 0.5, 1, 2, 4], value => {
        chart.scene.canvas.setPixelRatio(value);
    });

    createButton('Pixelated: ON', () => {
        chart.scene.canvas.pixelated = true;
    });

    createButton('Pixelated: OFF', () => {
        chart.scene.canvas.pixelated = false;
    });

    return chart;
}

function createGroupedColumnChart() {
    const xAxis = new GroupedCategoryAxis();
    xAxis.position = ChartAxisPosition.Bottom;
    xAxis.label.rotation = 0;

    const yAxis = new NumberAxis();
    yAxis.position = ChartAxisPosition.Left;

    const chart = new CartesianChart();
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';

    const barSeries = new BarSeries();
    barSeries.xKey = 'category';
    barSeries.yKeys = ['jan', 'feb', 'mar'];
    barSeries.data = groupedCategoryData;

    chart.series = [barSeries];

    makeChartResizeable(chart);

    return chart;
}

function createZoomedColumnChartUsingFactory() {
    const chart = AgChart.create({
        container: document.body,
        data,
        width: 500,
        series: [{
            type: 'column',
            xKey: 'name',
            yKeys: ['value']
        }],
        axes: [{
            type: 'number',
            position: 'left',
            // visibleRange: [0, 0.5]
        }, {
            type: 'category',
            position: 'bottom',
            // visibleRange: [0, 0.5]
        }],
        navigator: {
            enabled: true,
            height: 60,
            mask: {
                fill: 'red',
                strokeWidth: 2
            },
            minHandle: {
                width: 16,
                height: 30,
                stroke: 'blue',
                fill: 'yellow',
                gripLineGap: 4,
                gripLineLength: 12,
                strokeWidth: 2
            },
            maxHandle: {
                width: 16,
                stroke: 'red',
                fill: 'cyan'
            }
        }
    });

    makeChartResizeable(chart);

    return chart;
}

document.addEventListener('DOMContentLoaded', () => {
    createColumnChart();
    createGroupedColumnChart();
    createZoomedColumnChartUsingFactory();
});