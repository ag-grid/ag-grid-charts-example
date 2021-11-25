import { BandScale } from '../../../charts/scale/bandScale';
import { Group } from '../../../charts/scene/group';
import { Path } from '../../../charts/scene/shape/path';
import { Observable, reactive } from '../../../charts/util/observable';
import { extent } from '../../../charts/util/array';
import { isNumber } from '../../../charts/util/value'
import { Marker } from '../marker/marker';
import { Sparkline, Point, SeriesNodeDatum } from '../sparkline';
import { Selection } from '../../../charts/scene/selection';
import { toTooltipHtml } from '../tooltip/sparklineTooltip';
import { getMarker } from '../marker/markerFactory';
import { Line } from '../../../charts/scene/shape/line';
import { getLineDash } from '../util/lineDash';

export interface MarkerFormatterParams {
    datum: any;
    xValue: any;
    yValue: any;
    min?: boolean;
    max?: boolean;
    first?: boolean;
    last?: boolean;
    fill?: string;
    stroke?: string;
    strokeWidth: number;
    size: number;
    highlighted: boolean;
}
export interface MarkerFormat {
    enabled?: boolean;
    shape?: string;
    size?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}
interface LineNodeDatum extends SeriesNodeDatum {
    readonly point: Point;
}
export interface CrosshairLineOptions {
    enabled?: boolean;
    stroke?: string;
    strokeWidth?: number;
    lineDash?: 'dash' | 'dashDot' | 'dashDotDot' | 'dot' | 'longDash' | 'longDashDot' | 'longDashDotDot' | 'shortDash' | 'shortDashDot' | 'shortDashDotDot' | 'shortDot' | 'solid' | string | number[];
    lineCap?: 'round'| 'square' | 'butt';
}

class SparklineMarker extends Observable {
    @reactive() enabled: boolean = true;
    @reactive() shape: string = 'circle';
    @reactive('update') size: number = 0;
    @reactive('update') fill?: string = 'rgb(124, 181, 236)';
    @reactive('update') stroke?: string = 'rgb(124, 181, 236)';
    @reactive('update') strokeWidth: number = 1;
    @reactive('update') formatter?: (params: MarkerFormatterParams) => MarkerFormat;
}
class SparklineLine extends Observable {
    @reactive('update') stroke: string = 'rgb(124, 181, 236)';
    @reactive('update') strokeWidth: number = 1;
}
class SparklineCrosshairs extends Observable {
    private static crosshairLineOptions = {
        enabled: false,
        stroke: 'rgba(0,0,0, 0.54)',
        strokeWidth: 1,
        lineDash: 'solid',
        lineCap: 'round'
    }
    @reactive('update') xLine: CrosshairLineOptions = Object.create(SparklineCrosshairs.crosshairLineOptions);
    @reactive('update') yLine: CrosshairLineOptions = Object.create(SparklineCrosshairs.crosshairLineOptions);
}
export class LineSparkline extends Sparkline {

    static className = 'LineSparkline';

    protected linePath: Path = new Path();
    protected xCrosshairLine: Line = new Line();
    protected yCrosshairLine: Line = new Line();

    private lineSparklineGroup: Group = new Group();
    private markers: Group = new Group();
    private markerSelection: Selection<Marker, Group, LineNodeDatum, any> = Selection.select(this.markers).selectAll<Marker>();
    private markerSelectionData: LineNodeDatum[] = [];

    readonly marker = new SparklineMarker();
    readonly line = new SparklineLine();
    readonly crosshairs = new SparklineCrosshairs();

    constructor() {
        super();

        this.rootGroup.append(this.lineSparklineGroup);
        this.lineSparklineGroup.append([this.linePath, this.xCrosshairLine, this.yCrosshairLine, this.markers]);

        this.marker.addEventListener('update', this.updateNodes, this);
        this.marker.addPropertyListener('enabled', this.updateNodes, this);
        this.marker.addPropertyListener('shape', this.onMarkerShapeChange, this);
        this.line.addEventListener('update', this.updateLine, this);
        this.crosshairs.addEventListener('update', this.updateCrosshairs, this);
    }

    protected getNodeData(): LineNodeDatum[] {
        return this.markerSelectionData;
    }

    /**
     * If marker shape is changed, this method should be called to remove the previous marker nodes selection.
     */
    private onMarkerShapeChange() {
        this.markerSelection = this.markerSelection.setData([]);
        this.markerSelection.exit.remove();
        this.scheduleLayout();
    }

    protected update(): void {
        const nodeData = this.generateNodeData();

        if (!nodeData) {
            return;
        }

        this.markerSelectionData = nodeData;

        this.updateSelection(nodeData);
        this.updateNodes();

        this.updateLine();
    }

    protected updateYScaleDomain(): void {
        const { yData, yScale } = this;

        const yMinMax = extent(yData, isNumber);

        let yMin = 0;
        let yMax= 1;

        if (yMinMax !== undefined) {
            yMin = this.min = yMinMax[0] as number;
            yMax = this.max = yMinMax[1] as number;
        }

        if (yMin === yMax) {
            // if all values in the data are the same, yMin and yMax will be equal, need to adjust the domain with some padding
            const padding = Math.abs(yMin * 0.01);
            yMin -= padding;
            yMax += padding;
        }

        yScale.domain = [yMin, yMax];
    }

    protected generateNodeData(): LineNodeDatum[] | undefined {
        const { data, yData, xData, xScale, yScale } = this;

        if (!data) {
            return;
        }

        const offsetX = xScale instanceof BandScale ? xScale.bandwidth / 2 : 0;

        const nodeData: LineNodeDatum[] = [];

        for (let i = 0; i < yData.length; i++) {
            let yDatum = yData[i];
            let xDatum = xData[i];

            if (yDatum == undefined) {
                continue;
            }

            const x = xScale.convert(xDatum) + offsetX;
            const y = yScale.convert(yDatum);

            nodeData.push({
                seriesDatum: { x: xDatum, y: yDatum },
                point: { x, y }
            });
        }
        return nodeData;
    }

    private updateSelection(selectionData: LineNodeDatum[]): void {
        const { marker } = this;

        const shape = getMarker(marker.shape);

        let updateMarkerSelection = this.markerSelection.setData(selectionData);
        let enterMarkerSelection = updateMarkerSelection.enter.append(shape);

        updateMarkerSelection.exit.remove();

        this.markerSelection = updateMarkerSelection.merge(enterMarkerSelection);
    }

    protected updateNodes(): void {
        const { highlightedDatum, highlightStyle, marker, min, max } = this;
        const { size: highlightSize, fill: highlightFill, stroke: highlightStroke, strokeWidth: highlightStrokeWidth } = highlightStyle;
        const markerFormatter = marker.formatter;

        this.markerSelection.each((node, datum, index) => {
            const highlighted = datum === highlightedDatum;
            const markerFill = highlighted && highlightFill !== undefined ? highlightFill : marker.fill;
            const markerStroke = highlighted && highlightStroke !== undefined ? highlightStroke : marker.stroke;
            const markerStrokeWidth = highlighted && highlightStrokeWidth !== undefined ? highlightStrokeWidth : marker.strokeWidth;
            const markerSize = highlighted && highlightSize !== undefined ? highlightSize : marker.size;

            let markerFormat: MarkerFormat | undefined = undefined;

            const { seriesDatum, point } = datum;

            if (markerFormatter) {
                const first = index === 0;
                const last = index === this.markerSelectionData.length - 1;
                const min = seriesDatum.y === this.min;
                const max = seriesDatum.y === this.max;

                markerFormat = markerFormatter({
                    datum,
                    xValue: seriesDatum.x,
                    yValue: seriesDatum.y,
                    min,
                    max,
                    first,
                    last,
                    fill: markerFill,
                    stroke: markerStroke,
                    strokeWidth: markerStrokeWidth,
                    size: markerSize,
                    highlighted
                });
            }

            node.size = markerFormat && markerFormat.size != undefined ? markerFormat.size : markerSize;
            node.fill = markerFormat && markerFormat.fill != undefined ? markerFormat.fill : markerFill;
            node.stroke = markerFormat && markerFormat.stroke != undefined ? markerFormat.stroke : markerStroke;
            node.strokeWidth = markerFormat && markerFormat.strokeWidth != undefined ? markerFormat.strokeWidth : markerStrokeWidth;

            node.translationX = point.x;
            node.translationY = point.y;
            node.visible = markerFormat && markerFormat.enabled != undefined ? markerFormat.enabled : marker.enabled && node.size > 0;
        });
    }

    protected updateLine(): void {
        const { linePath, yData, xData, xScale, yScale, line } = this;

        if (yData.length < 2) {
            return;
        }

        const path = linePath.path;
        const n = yData.length;
        const offsetX = xScale instanceof BandScale ? xScale.bandwidth / 2 : 0;
        let moveTo = true;

        path.clear();

        for (let i = 0; i < n; i++) {
            const xDatum = xData[i];
            const yDatum = yData[i];

            const x = xScale.convert(xDatum) + offsetX;
            const y = yScale.convert(yDatum);

            if (yDatum == undefined) {
                moveTo = true;
            } else {
                if (moveTo) {
                    path.moveTo(x, y);
                    moveTo = false;
                } else {
                    path.lineTo(x, y);
                }
            }
        }

        linePath.fill = undefined;
        linePath.stroke = line.stroke;
        linePath.strokeWidth = line.strokeWidth;
    }

    protected updateXCrosshairLine(): void {
        const { yScale, xCrosshairLine, highlightedDatum, crosshairs: { xLine } } = this;

        if (!xLine.enabled || highlightedDatum == undefined) {
            xCrosshairLine.strokeWidth = 0;
            return;
        }

        xCrosshairLine.y1 = yScale.range[0];
        xCrosshairLine.y2 = yScale.range[1];
        xCrosshairLine.x1 = xCrosshairLine.x2 = 0;
        xCrosshairLine.stroke = xLine.stroke;
        xCrosshairLine.strokeWidth = xLine.strokeWidth || 1;

        xCrosshairLine.lineCap = xLine.lineCap === 'round' || xLine.lineCap === 'square' ? xLine.lineCap : undefined;

        const { lineDash } = xLine;
        xCrosshairLine.lineDash = Array.isArray(lineDash) ? lineDash : getLineDash(xCrosshairLine.lineCap, xLine.lineDash as string);

        xCrosshairLine.translationX = highlightedDatum.point!.x;
    }

    protected updateYCrosshairLine() {
        const { xScale, yCrosshairLine, highlightedDatum, crosshairs: { yLine } } = this;

        if (!yLine.enabled || highlightedDatum == undefined) {
            yCrosshairLine.strokeWidth = 0;
            return;
        }

        yCrosshairLine.x1 = xScale.range[0];
        yCrosshairLine.x2 = xScale.range[1];
        yCrosshairLine.y1 = yCrosshairLine.y2 = 0;
        yCrosshairLine.stroke = yLine.stroke;
        yCrosshairLine.strokeWidth = yLine.strokeWidth || 1;

        yCrosshairLine.lineCap = yLine.lineCap === 'round' || yLine.lineCap === 'square' ? yLine.lineCap : undefined;

        const { lineDash } = yLine;
        yCrosshairLine.lineDash = Array.isArray(lineDash) ? lineDash : getLineDash(yCrosshairLine.lineCap, yLine.lineDash as string);

        yCrosshairLine.translationY = highlightedDatum.point!.y;
    }

    getTooltipHtml(datum: SeriesNodeDatum): string | undefined {
        const {  marker, dataType } = this;
        const { seriesDatum } = datum;
        const yValue = seriesDatum.y;
        const xValue = seriesDatum.x;
        const backgroundColor = marker.fill;
        const content = this.formatNumericDatum(yValue);
        const title = dataType === 'array' || dataType === 'object' ? this.formatDatum(xValue) : undefined;

        const defaults = {
            backgroundColor,
            content,
            title
        }

        if (this.tooltip.renderer) {
            return toTooltipHtml(this.tooltip.renderer({
                context: this.context,
                datum: seriesDatum,
                yValue,
                xValue,
            }), defaults);
        }

        return toTooltipHtml(defaults);
    }
}
