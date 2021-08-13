import { BandScale, Group, LinearScale, Path } from '../../charts/main';
import { Selection } from '../../charts/scene/selection'
import { Observable, reactive } from '../../charts/util/observable';
import { Circle } from './circle';
import { Diamond } from './diamond';
import { Marker } from './marker';
import { MiniChart, SeriesNodeDatum } from './miniChart';
import { toTooltipHtml } from './miniChartTooltip';
import { Square } from './square';

interface LineNodeDatum extends SeriesNodeDatum { }
class MiniChartMarker extends Observable {
    @reactive() enabled: boolean = true;
    @reactive() shape: string = 'circle';
    @reactive('update') size: number = 0;
    @reactive('update') fill?: string = 'black';
    @reactive('update') stroke?: string = 'black';
    @reactive('update') strokeWidth: number = 1;
}
class MiniChartLine extends Observable {
    @reactive('update') stroke: string = 'black';
    @reactive('update') strokeWidth: number = 1;
}
export class MiniLineChart extends MiniChart {

    static className = 'MiniLineChart';

    private miniLineChartGroup: Group = new Group();
    protected linePath: Path = new Path();
    protected yScale: LinearScale = new LinearScale();
    protected xScale: BandScale<number> = new BandScale<number>();
    private markers: Group = new Group();
    private markerSelection: Selection<Marker, Group, LineNodeDatum, any> = Selection.select(this.markers).selectAll<Marker>();
    private markerSelectionData: LineNodeDatum[] = [];

    readonly marker = new MiniChartMarker();
    readonly line = new MiniChartLine();

    constructor() {
        super();

        this.rootGroup.append(this.miniLineChartGroup);
        this.miniLineChartGroup.append([this.linePath, this.markers]);

        this.marker.addEventListener('update', this.updateMarkers, this);
        this.marker.addPropertyListener('enabled', this.updateMarkers, this);
        this.marker.addPropertyListener('shape', this.onMarkerShapeChange, this);
        this.line.addEventListener('update', this.updateLine, this);
    }

    protected getNodeData(): LineNodeDatum[] {
        return this.markerSelectionData;
    }

    private getMarkerShape(shape: string) {
        switch (shape) {
            case 'circle':
                return Circle;
            case 'square':
                return Square;
            case 'diamond':
                return Diamond;
            default:
                return Circle;
        }
    }

    private onMarkerShapeChange() {
        this.markerSelection = this.markerSelection.setData([]);
        this.markerSelection.exit.remove();
        this.scheduleLayout();
    }

    protected update(): void {
        const { seriesRect } = this;
        this.rootGroup.translationX = seriesRect.x;
        this.rootGroup.translationY = seriesRect.y;

        this.updateXScale();
        this.updateYScaleRange();
        this.updateYScaleDomain();

        const nodeData = this.generateNodeData();
        this.markerSelectionData = nodeData;

        this.updateMarkerSelection(nodeData);
        this.updateMarkers();

        this.updateLine();
    }

    protected updateYScaleRange(): void {
        const { yScale, seriesRect } = this;
        yScale.range = [seriesRect.height, 0];
    }

    protected updateYScaleDomain(): void {
        const { yData, yScale } = this;
        let [minY, maxY] = this.findMinAndMax(yData);

        if (minY === maxY) {
            // if all values in the data are the same, minY and maxY will be equal, need to adjust the domain with some padding.
            const padding = Math.abs(minY * 0.01);
            minY -= padding;
            maxY += padding;
        }

        yScale.domain = [minY, maxY];
    }

    protected updateXScale(): void {
        const { xScale, seriesRect, xData } = this;
        xScale.range = [0, seriesRect.width];
        xScale.domain = xData;
    }

    protected generateNodeData(): LineNodeDatum[] {
        const { yData, xData, data, xScale, yScale } = this;

        if (!data) {
            return [];
        }

        const offsetX = xScale.bandwidth / 2;

        const nodeData: LineNodeDatum[] = [];

        for (let i = 0; i < yData.length; i++) {
            let yDatum = yData[i];
            let xDatum = xData[i];

            if (yDatum == undefined) {
                continue;
            }

            const x = xScale.convert(i) + offsetX;
            const y = yScale.convert(yDatum);

            nodeData.push({
                seriesDatum: { x: xDatum, y: yDatum },
                point: { x, y }
            });
        }
        return nodeData;
    }

    private updateMarkerSelection(selectionData: LineNodeDatum[]): void {
        const { marker } = this;

        const shape = this.getMarkerShape(marker.shape);

        let updateMarkerSelection = this.markerSelection.setData(selectionData);
        let enterMarkerSelection = updateMarkerSelection.enter.append(shape);

        updateMarkerSelection.exit.remove();

        this.markerSelection = updateMarkerSelection.merge(enterMarkerSelection);
    }

    private updateMarkers(): void {
        const { marker } = this;

        this.markerSelection.each((node, datum, index) => {
            node.size = marker.size;
            node.fill = marker.fill;
            node.stroke = marker.stroke;
            node.strokeWidth = marker.strokeWidth;
            node.visible = marker.enabled;

            node.translationX = datum.point.x;
            node.translationY = datum.point.y;
        });
    }

    protected updateLine(): void {
        const { linePath, yData, xData, xScale, yScale, line } = this;

        if (yData.length < 2) {
            return;
        }

        const path = linePath.path;
        const n = yData.length;
        const offsetX = xScale.bandwidth / 2;
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

    protected highlightDatum(closestDatum: SeriesNodeDatum): void {
        const { size, fill, stroke, strokeWidth } = this.marker;
        const { highlightStyle } = this;
        this.markerSelection.each((node, datum) => {
            if (closestDatum) {
                const isClosest = datum.point.x === closestDatum.point.x && datum.point.y === closestDatum.point.y;
                node.size = isClosest ? highlightStyle.size : size;
                node.fill = isClosest ? highlightStyle.fill : fill;
                node.stroke = isClosest ? highlightStyle.stroke : stroke;
                node.strokeWidth = isClosest ? highlightStyle.strokeWidth : strokeWidth;
            }
        })
    }

    protected dehighlightDatum(): void {
        const { size, fill, stroke, strokeWidth } = this.marker;
        this.markerSelection.each((node) => {
            node.size = size;
            node.fill = fill;
            node.stroke = stroke;
            node.strokeWidth = strokeWidth;
        })
    }

    getTooltipHtml(datum: SeriesNodeDatum): string | undefined {
        const { title, marker } = this;
        const seriesDatum = datum.seriesDatum;
        const yValue = datum.seriesDatum.y;
        const xValue = datum.seriesDatum.x;
        const backgroundColor = marker.fill;
        const content = typeof xValue !== 'number' ? `${this.formatDatum(seriesDatum.x)}: ${this.formatDatum(seriesDatum.y)}` : `${this.formatDatum(seriesDatum.y)}`;

        const defaults = {
            backgroundColor,
            title,
            content
        }

        if (this.tooltip.renderer) {
            return toTooltipHtml(this.tooltip.renderer({
                datum: seriesDatum,
                title,
                backgroundColor,
                yValue,
                xValue,
            }), defaults);
        }

        return toTooltipHtml(defaults);
    }
}