import scaleLinear, {LinearScale} from "ag-grid-enterprise/src/charts/scale/linearScale";
import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Selection} from "ag-grid-enterprise/src/charts/scene/selection";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc, ArcType} from "ag-grid-enterprise/src/charts/scene/shape/Arc";
import {Line} from "ag-grid-enterprise/src/charts/scene/shape/Line";
import {Text} from "ag-grid-enterprise/src/charts/scene/shape/Text";
import {normalizeAngle180, toRadians} from "ag-grid-enterprise/src/charts/util/angle";

export interface ChartOptions {
    parent: HTMLElement;

    size: {
        width: number;
        height: number;
    };

    colors: string[];

    series: any[];
    axes: any[];
}

enum AxisPosition {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT
}

class ChartAxis {

}

class LeftAxis extends ChartAxis {
    private _fields: string[] = [];
    set fields(values: string[]) {

    }
    get fields(): string[] {
        return this._fields;
    }
}

abstract class ChartSeries {
    abstract set data(data: any[]);
    abstract get data(): any[];

    protected _chart: Chart | null = null;
    abstract set chart(chart: Chart | null);
    abstract get chart(): Chart | null;

    readonly group: Group = new Group();
    abstract processData(): void;
    abstract update(): void;
}

export class CartesianChart {

    private _axes: ChartAxis[] = [];
    private _series: ChartSeries[] = [];

    constructor(options: ChartOptions) {
        this.initialConfig = options;
    }

    private readonly initialConfig: ChartOptions;

    private init(config: ChartOptions) {

    }

    performLayout() {

    }

}

abstract class PolarSeries extends ChartSeries {
    /**
     * The center of the polar series (for example, the center of a pie).
     * If the polar chart has multiple series, all of them will have their
     * center set to the same value as a result of the polar chart layout.
     * The center coordinates are not supposed to be set by the user.
     */
    centerX: number = 0;
    centerY: number = 0;

    /**
     * The offset from the center. If layering multiple polar series on top of
     * another is not the desired behavior, one can specify the offset from the
     * center (determined by the chart's layout) to position each series anywhere
     * in the chart. Note that this value is absolute and will have to be changed
     * when the size of the chart changes.
     */
    offsetX: number = 0;
    offsetY: number = 0;

    /**
     * The series rotation in degrees.
     */
    _rotation: number = 0;
    abstract set rotation(value: number);
    abstract get rotation(): number;

    /**
     * The maximum radius the series can use.
     * This value is set automatically as a result of the polar chart layout
     * and is not supposed to be set by the user.
     */
    radius: number = 0;

    /**
     * The name of the numeric field to use to determine the angle (for example,
     * a pie slice angle).
     */
    _angleField: string = '';
    abstract set angleField(value: string);
    abstract get angleField(): string;

    // angularAxis: any;
    // radialAxis: any;
}

type PieSectorData = {
    index: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    midAngle: number,

    fillStyle: string,
    strokeStyle: string,

    label?: {
        text: string,
        x: number,
        y: number
    },

    callout?: {
        start: {
            x: number,
            y: number
        },
        end: {
            x: number,
            y: number
        }
    }
};

enum PieSeriesNodeTag {
    Sector,
    Callout,
    Label
}

class PieSeries extends PolarSeries {
    labelField?: string;
    labelFont: string = '14px Verdana';
    labelColor: string = 'black';
    labelRotation: number = 0;
    labelMinAngle: number = 20; // in degrees

    calloutColor: string = 'black';
    calloutWidth: number = 2;
    calloutLength: number = 10;
    calloutPadding: number = 3;

    set chart(chart: Chart | null) {
        if (this._chart !== chart) {
            this._chart = chart;
            this.update();
        }
    }
    get chart(): Chart | null {
        return this._chart;
    }

    set angleField(value: string) {
        if (this._angleField !== value) {
            this._angleField = value;
            this.processData();
            this.update();
        }
    }
    get angleField(): string {
        return this._angleField;
    }

    set rotation(value: number) {
        if (this._rotation !== value) {
            this._rotation = value;
            this.processData();
            this.update();
        }
    }
    get rotation(): number {
        return this._rotation;
    }

    strokeStyle: string = 'black';
    lineWidth: number = 2;

    /**
     * The name of the numeric field to use to determine pie slice
     */
    _radiusField?: string;
    set radiusField(value: string | undefined) {
        if (this._radiusField !== value) {
            this._radiusField = value;
            this.processData();
            this.update();
        }
    }
    get radiusField(): string | undefined {
        return this._radiusField;
    }

    private angleScale: LinearScale<number> = (() => {
        const scale = scaleLinear();
        scale.domain = [0, 1];
        // Add 90 deg to start the first pie at 12 o'clock.
        scale.range = [-Math.PI, Math.PI].map(angle => angle + Math.PI / 2);
        return scale;
    })();

    private radiusScale: LinearScale<number> = scaleLinear();

    private groupSelection: Selection<Group, Group, PieSectorData, any> = Selection.select(this.group).selectAll<Group>();

    private sectorsData: PieSectorData[] = [];

    private _data: any[] = [];
    set data(data: any[]) {
        this._data = data;
        this.processData();

        if (this.chart && this.chart.isLayoutPending) {
            return;
        }

        this.update();
    }
    get data(): any[] {
        return this._data;
    }

    processData(): void {
        const data = this.data;
        const centerX = this.centerX + this.offsetX;
        const centerY = this.centerY + this.offsetY;

        this.group.translationX = centerX;
        this.group.translationY = centerY;

        const angleData: number[] = data.map(datum => datum[this.angleField]);
        const angleDataTotal = angleData.reduce((a, b) => a + b, 0);
        // The ratios (in [0, 1] interval) used to calculate the end angle value for every pie slice.
        // Each slice starts where the previous one ends, so we only keep the ratios for end angles.
        const angleDataRatios = (() => {
            let sum = 0;
            return angleData.map(datum => sum += datum / angleDataTotal);
        })();

        const labelField = this.labelField;
        let labelData: string[] = [];
        if (labelField) {
            labelData = data.map(datum => datum[labelField]);
        }

        const radiusField = this.radiusField;
        let radiusData: number[] = [];
        if (radiusField) {
            radiusData = data.map(datum => datum[radiusField]);
            this.radiusScale.domain = [0, Math.max(...radiusData, 1)];
            this.radiusScale.range = [0, this.radius];
        }

        const angleScale = this.angleScale;

        const sectorsData = this.sectorsData;
        sectorsData.length = 0;

        const rotation = toRadians(this.rotation);

        let sectorIndex = 0;
        // Simply use reduce here to pair up adjacent ratios.
        angleDataRatios.reduce((start, end) => {
            const radius = radiusField ? this.radiusScale.convert(radiusData[sectorIndex]) : this.radius;
            const startAngle = angleScale.convert(start + rotation);
            const endAngle = angleScale.convert(end + rotation);

            const midAngle = (startAngle + endAngle) / 2;
            const span = Math.abs(endAngle - startAngle);
            const midCos = Math.cos(midAngle);
            const midSin = Math.sin(midAngle);
            const calloutLength = this.calloutLength;

            const labelMinAngle = toRadians(this.labelMinAngle);
            const isLabelVisible = labelField && span > labelMinAngle;

            sectorsData.push({
                index: sectorIndex,
                radius,
                startAngle,
                endAngle,
                midAngle: normalizeAngle180(midAngle),

                fillStyle: colors[sectorIndex % colors.length],
                strokeStyle: 'black',

                label: isLabelVisible ? {
                    text: labelData[sectorIndex],
                    x: midCos * (radius + calloutLength + this.calloutPadding),
                    y: midSin * (radius + calloutLength + this.calloutPadding)
                } : undefined,

                callout: isLabelVisible ? {
                    start: {
                        x: midCos * radius,
                        y: midSin * radius
                    },
                    end: {
                        x: midCos * (radius + calloutLength),
                        y: midSin * (radius + calloutLength)
                    }
                } : undefined
            });

            sectorIndex++;

            return end;
        }, 0);
    }

    update(): void {
        if (this.chart && this.chart.isLayoutPending) {
            return;
        }

        const updateGroups = this.groupSelection.setData(this.sectorsData);
        updateGroups.exit.remove();

        const enterGroups = updateGroups.enter.append(Group);
        enterGroups.append(Arc).each(node => node.tag = PieSeriesNodeTag.Sector);
        enterGroups.append(Line).each(node => node.tag = PieSeriesNodeTag.Callout);
        enterGroups.append(Text).each(node => node.tag = PieSeriesNodeTag.Label);

        const groupSelection = updateGroups.merge(enterGroups);

        groupSelection.selectByTag<Arc>(PieSeriesNodeTag.Sector)
            .each((arc, datum) => {
                arc.type = ArcType.Round;
                arc.radiusX = datum.radius;
                arc.radiusY = datum.radius;
                arc.startAngle = datum.startAngle;
                arc.endAngle = datum.endAngle;
                arc.fillStyle = datum.fillStyle;
                arc.strokeStyle = this.strokeStyle;
                arc.lineWidth = this.lineWidth;
                arc.lineJoin = 'round';
            });

        groupSelection.selectByTag<Line>(PieSeriesNodeTag.Callout)
            .each((line, datum) => {
                const callout = datum.callout;
                if (callout) {
                    line.lineWidth = this.calloutWidth;
                    line.strokeStyle = this.calloutColor;
                    line.x1 = callout.start.x;
                    line.y1 = callout.start.y;
                    line.x2 = callout.end.x;
                    line.y2 = callout.end.y;
                } else {
                    line.strokeStyle = null;
                }
            });

        const halfPi = Math.PI / 2;

        groupSelection.selectByTag<Text>(PieSeriesNodeTag.Label)
            .each((text, datum) => {
                const angle = datum.midAngle;
                // Split the circle into quadrants like so: ⊗
                let quadrantStart = -3 * Math.PI / 4; // same as `normalizeAngle180(toRadians(-135))`

                if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                    text.textAlign = 'center';
                    text.textBaseline = 'bottom';
                } else if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                    text.textAlign = 'left';
                    text.textBaseline = 'middle';
                } else if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                    text.textAlign = 'center';
                    text.textBaseline = 'hanging';
                } else {
                    text.textAlign = 'right';
                    text.textBaseline = 'middle';
                }

                const label = datum.label;
                if (label) {
                    text.fillStyle = 'black';
                    text.font = this.labelFont;
                    text.fillStyle = this.labelColor;
                    text.text = label.text;
                    text.x = label.x;
                    text.y = label.y;
                } else {
                    text.fillStyle = null;
                }
            });

        this.groupSelection = groupSelection;
    }
}

type Padding = {
    top: number,
    right: number,
    bottom: number,
    left: number
};

abstract class Chart {
    protected scene: Scene = new Scene();

    constructor() {
        this.scene.parent = document.body;
        this.scene.root = new Group();
    }

    private _padding: Padding = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    set padding(value: Padding) {
        this._padding = value;
        this.isLayoutPending = true;
    }
    get padding(): Padding {
        return this._padding;
    }

    set size(value: [number, number]) {
        this.scene.size = value;
        this.isLayoutPending = true;
    }

    set width(value: number) {
        this.scene.width = value;
        this.isLayoutPending = true;
    }
    get width(): number {
        return this.scene.width;
    }

    set height(value: number) {
        this.scene.height = value;
        this.isLayoutPending = true;
    }
    get height(): number {
        return this.scene.height;
    }

    private layoutCallbackId: number = 0;
    set isLayoutPending(value: boolean) {
        if (value) {
            if (!this.layoutCallbackId) {
                this.layoutCallbackId = requestAnimationFrame(this._performLayout);
            }
        } else if (this.layoutCallbackId) {
            cancelAnimationFrame(this.layoutCallbackId);
            this.layoutCallbackId = 0;
        }
    }

    /**
     * Only `true` while we are waiting for the layout to start.
     * This will be `false` if the layout has already started and is ongoing.
     */
    get isLayoutPending(): boolean {
        return !!this.layoutCallbackId;
    }

    private readonly _performLayout = () => {
        this.layoutCallbackId = 0;
        this.performLayout();
    };

    abstract performLayout(): void;
}

export class PolarChart extends Chart {
    centerX: number = 0;
    centerY: number = 0;

    radius: number = 0;

    private _series: PolarSeries[] = [];

    addSeries(series: PolarSeries) {
        if (this.scene.root) {
            this.scene.root.append(series.group);
        }
        this._series.push(series);
        series.chart = this;
        this.isLayoutPending = true;
    }

    performLayout() {
        const shrinkRect = {
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        };

        const padding = this.padding;
        shrinkRect.x += padding.left;
        shrinkRect.y += padding.top;
        shrinkRect.width -= padding.left + padding.right;
        shrinkRect.height -= padding.top + padding.bottom;

        const centerX = this.centerX = shrinkRect.x + shrinkRect.width / 2;
        const centerY = this.centerY = shrinkRect.y + shrinkRect.height / 2;
        const radius = Math.min(shrinkRect.width, shrinkRect.height) / 2;

        this._series.forEach(series => {
            series.centerX = centerX;
            series.centerY = centerY;
            series.radius = radius;
            series.processData();
            series.update();
        });
    }
}

const colors = [
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#E55934',
    '#FA7921',
    '#fa3081'
];

const data = [
    { label: 'Android', value: 56.9, other: 7 },
    { label: 'iOS', value: 22.5, other: 8 },
    { label: 'BlackBerry', value: 6.8, other: 9 },
    { label: 'Symbian', value: 8.5, other: 10 },
    { label: 'Bada', value: 2.6, other: 11 },
    { label: 'Windows', value: 1.9, other: 12 }
];

const data2 = [
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
    const chart = new PolarChart();
    chart.width = 900;
    chart.height = 400;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };
    const pieSeries = new PieSeries();
    pieSeries.offsetX = -200;
    chart.addSeries(pieSeries);
    pieSeries.angleField = 'value';
    pieSeries.labelField = 'label';
    pieSeries.data = data;

    const pieSeries2 = new PieSeries();
    pieSeries2.offsetX = 200;
    chart.addSeries(pieSeries2);
    pieSeries2.angleField = 'value';
    pieSeries2.labelField = 'label';
    pieSeries2.data = data2;

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
    }, 4000);

    setTimeout(() => {
        pieSeries.data = data2;
    }, 6000);

    setTimeout(() => {
        pieSeries.data = data;
    }, 8000);

    setTimeout(() => {
        pieSeries2.angleField = 'other';
    }, 10000);

    setTimeout(() => {
        pieSeries2.angleField = 'value';
        pieSeries2.radiusField = 'other';
    }, 12000);

    setTimeout(() => {
        pieSeries2.strokeStyle = 'white';
        pieSeries2.lineWidth = 3;
        pieSeries2.calloutWidth = 1;
        (function step() {
            pieSeries2.rotation += 0.1;
            requestAnimationFrame(step);
        })();
    }, 14000);
});
