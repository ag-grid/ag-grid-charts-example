import { CategoryAxis } from "ag-charts-community/src/chart/axis/categoryAxis";
import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";
import { Padding } from "ag-charts-community/src/util/padding";
import { Series } from "ag-charts-community/src/chart/series/series";
import { BarSeries } from "ag-charts-community/src/chart/series/cartesian/barSeries";
import { createSlider, createRangeSlider } from "../../lib/ui";
import { Scene } from "ag-charts-community/src/scene/scene";
import { Group } from "ag-charts-community/src/scene/group";
import { LinearScale } from "ag-charts-community/src/scale/linearScale";
import { Path } from "ag-charts-community/src/scene/shape/path";

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
    chart.padding = new Padding(40);
    chart.legend.spacing = 40;
    chart.axes = [xAxis, yAxis];
    chart.container = document.body;
    chart.width = 800;
    chart.height = 500;
    chart.scene.canvas.element.style.border = '1px solid black';

    const barSeries = new BarSeries();
    barSeries.xKey = 'name';
    barSeries.yKeys = ['value'];
    barSeries.data = data;

    chart.series = [barSeries];

    const scene = new Scene();
    scene.resize(800, 50);
    scene.container = document.body;
    const rangeMask = new RangeMask();
    rangeMask.x = 1;
    rangeMask.y = 200;
    rangeMask.width = scene.width - 2;
    rangeMask.height = scene.height - 2;
    // scene.root = rangeMask;

    const rangeHandle = new RangeHandle();
    rangeHandle.centerX = 300;
    rangeHandle.centerY = 225;

    const rangeSelector = new RangeSelector();
    rangeSelector.x = 77;
    rangeSelector.y = chart.height - 30 - 1;
    rangeSelector.width = 589;
    rangeSelector.height = 30;

    // chart.scene.root.appendChild(rangeMask);
    // chart.scene.root.appendChild(rangeHandle);
    chart.scene.root.appendChild(rangeSelector);

    const xRangeScale = new LinearScale();
    xRangeScale.domain = [0, 1];

    let first = true;
    let originalRange: number[];
    let originalTranslationX: number;
    createRangeSlider('Visible Range', [0, 1], 0.01, range => {
        if (first) {
            xRangeScale.range = originalRange = xAxis.range;
            originalTranslationX = xAxis.translation.x;
            first = false;
        }
        {
            const [min, max] = range;
            rangeMask.min = min;
            rangeMask.max = max;

            rangeSelector.min = min;
            rangeSelector.max = max;
        }
        const scale = 1 / Math.max(Math.abs(range[1] - range[0]), 0.05);
        console.log(range, scale);
        // const visibleRange = range = [
        //     xRangeScale.convert(range[0]) * scale,
        //     xRangeScale.convert(range[1]) * scale
        // ];
        const visibleRange = [
            originalRange[0],
            originalRange[1] * scale
        ];
        // xAxis.translation.x = originalTranslationX + (originalRange[1] - originalRange[0]) * scale;
        console.log('Visible Range', visibleRange);
        xAxis.range = visibleRange;
        xAxis.update();

        barSeries.update();
    });

    return chart;
}

class Navigator {
    readonly group: Group = new Group();
}

function canvasEx() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(800, 0);
    ctx.lineTo(800, 200);
    ctx.lineTo(0, 200);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-out';
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(600, 0);
    ctx.lineTo(600, 200);
    ctx.lineTo(400, 200);
    ctx.closePath();
    // ctx.fill();
    // ctx.fillRect(400, 0, 200, 200);
    ctx.clip();

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    // ctx.fillRect(0, 0, 800, 200);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(800, 0);
    ctx.lineTo(800, 200);
    ctx.lineTo(0, 200);
    // ctx.closePath();
    ctx.fill();
}

document.addEventListener('DOMContentLoaded', () => {
    createColumnChart();
});