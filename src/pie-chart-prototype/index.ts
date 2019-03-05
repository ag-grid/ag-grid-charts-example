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
    readonly group: Group = new Group();
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
    centerX: number = 0;
    centerY: number = 0;

    offsetX: number = 0;
    offsetY: number = 0;

    rotation: number = 0;

    radius: number = 0;

    /**
     * The name of the numeric field to use to determine the angle (for example,
     * a pie slice angle).
     */
    angleField: string = '';

    // angularAxis: any;
    // radialAxis: any;
}

type SectorData = {
    index: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    fillStyle: string,
    callout: {
        start: {
            x: number,
            y: number
        },
        end: {
            x: number,
            y: number
        },
        angle: number,
        label?: {
            x: number,
            y: number
        },
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

    calloutLength: number = 10;
    calloutPadding: number = 3;

    /**
     * The name of the numeric field to use to determine pie slice
     */
    radiusField?: string;

    private angleScale: LinearScale<number> = (() => {
        const scale = scaleLinear();
        scale.domain = [0, 1];
        // Add 90 deg to start the first pie at 12 o'clock.
        scale.range = [-Math.PI, Math.PI].map(angle => angle + Math.PI / 2);
        return scale;
    })();

    private radiusScale?: LinearScale<number>;

    private groupSelection: Selection<Group, Group, SectorData, any> = Selection.select(this.group).selectAll<Group>();

    private _data: any[] = [];
    set data(data: any[]) {
        this._data = data;

        const centerX = this.centerX;
        const centerY = this.centerY;

        this.group.translationX = centerX;
        this.group.translationY = centerY;

        const n = data.length;
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
        }

        const angleScale = this.angleScale;

        let sectorsData: SectorData[] = [];

        let sectorIndex = 0;
        // Simply use reduce here to pair up adjacent ratios.
        angleDataRatios.reduce((start, end) => {
            const radius = radiusField ? this.radiusScale!.convert(radiusData[sectorIndex]) : this.radius;
            const startAngle = angleScale.convert(start);
            const endAngle = angleScale.convert(end);

            const midAngle = (startAngle + endAngle) / 2;
            const span = Math.abs(endAngle - startAngle);
            const midCos = Math.cos(midAngle);
            const midSin = Math.sin(midAngle);
            const calloutLength = this.calloutLength;

            const labelMinAngle = toRadians(this.labelMinAngle);

            sectorsData.push({
                index: sectorIndex,
                radius,
                startAngle,
                endAngle,
                fillStyle: colors[sectorIndex % colors.length],
                callout: {
                    start: {
                        x: midCos * radius,
                        y: midSin * radius
                    },
                    end: {
                        x: midCos * (radius + calloutLength),
                        y: midSin * (radius + calloutLength)
                    },
                    label: (span > labelMinAngle) ? {
                        x: midCos * (radius + calloutLength + this.calloutPadding),
                        y: midSin * (radius + calloutLength + this.calloutPadding)
                    } : undefined,
                    angle: normalizeAngle180(midAngle)
                }
            });

            sectorIndex++;

            return end;
        }, 0);

        const updateGroups = this.groupSelection.setData(sectorsData);
        updateGroups.exit.remove();

        const enterGroups = updateGroups.enter.append(Group);
        enterGroups.append(Arc).each(node => node.tag = PieSeriesNodeTag.Sector);
        enterGroups.append(Line).each(node => node.tag = PieSeriesNodeTag.Callout);
        enterGroups.append(Text).each(node => node.tag = PieSeriesNodeTag.Label);

        const groupSelection = updateGroups.merge(enterGroups);

        groupSelection.selectByTag<Arc>(PieSeriesNodeTag.Sector)
            .each((sector, datum) => {
                sector.type = ArcType.Round;
                // sector.centerX = centerX;
                // sector.centerY = centerY;
                sector.radiusX = datum.radius;
                sector.radiusY = datum.radius;
                sector.startAngle = datum.startAngle;
                sector.endAngle = datum.endAngle;
                sector.fillStyle = datum.fillStyle;
                sector.lineWidth = 2;
                sector.lineJoin = 'round';
            });

        groupSelection.selectByTag<Line>(PieSeriesNodeTag.Callout)
            .each((line, datum) => {
                const labelPosition = datum.callout.label;
                if (labelPosition) {
                    line.lineWidth = 2;
                    line.strokeStyle = 'black';
                    line.x1 = datum.callout.start.x;
                    line.y1 = datum.callout.start.y;
                    line.x2 = datum.callout.end.x;
                    line.y2 = datum.callout.end.y;
                } else {
                    line.strokeStyle = null;
                }
            });

        const halfPi = Math.PI / 2;

        groupSelection.selectByTag<Text>(PieSeriesNodeTag.Label)
            .each((label, datum, index) => {
                const angle = datum.callout.angle;
                // Split the circle into quadrants like so: ⊗
                let quadrantStart = -3 * Math.PI / 4; // same as `normalizeAngle180(toRadians(-135))`

                if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                    label.textAlign = 'center';
                    label.textBaseline = 'bottom';
                } else if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                    label.textAlign = 'left';
                    label.textBaseline = 'middle';
                } else if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                    label.textAlign = 'center';
                    label.textBaseline = 'hanging';
                } else {
                    label.textAlign = 'right';
                    label.textBaseline = 'middle';
                }

                const labelPosition = datum.callout.label;
                if (labelPosition) {
                    label.fillStyle = 'black';
                    label.font = this.labelFont;
                    label.fillStyle = this.labelColor;
                    label.text = labelData[index];
                    label.x = labelPosition.x;
                    label.y = labelPosition.y;
                } else {
                    label.fillStyle = null;
                }
            });

        this.groupSelection = groupSelection;
    }
    get data(): any[] {
        return this._data;
    }

    update(): void {
        this.data = this._data;
    }
}

type Padding = {
    top: number,
    right: number,
    bottom: number,
    left: number
}

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
    get isLayoutPending(): boolean {
        return !!this.layoutCallbackId;
    }

    private readonly _performLayout = () => {
        this.performLayout();
        this.layoutCallbackId = 0;
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
    { label: 'Barbara', value: 3, other: 12 },
    { label: 'Maria', value: 3, other: 12 }
];

document.addEventListener('DOMContentLoaded', () => {
    const chart = new PolarChart();
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };
    const pieSeries = new PieSeries();
    chart.addSeries(pieSeries);
    pieSeries.angleField = 'value';
    pieSeries.labelField = 'label';
    pieSeries.data = data;

    setTimeout(() => {
        pieSeries.data = data2;
    }, 2000);

    setTimeout(() => {
        chart.size = [400, 300];
    }, 4000);
});
