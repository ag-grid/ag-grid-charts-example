import { BandScale, Group, LinearScale, Path } from '../../charts/main';
import { Selection } from '../../charts/scene/selection'
import { Observable, reactive } from '../../charts/util/observable';
import { Circle } from './circle';
import { Diamond } from './diamond';
import { Marker } from './marker';
import { MiniChart } from './miniChart';
import { Square } from './square';

const HighlightStyle = {
    size: 6,
    fill: 'yellow',
    stroke: 'yellow',
    strokeWidth: 0
}
class MiniChartMarker extends Observable {
    @reactive() enabled: boolean = true;
    @reactive() shape: string = 'circle';
    @reactive('update') size: number = 3;
    @reactive('update') fill?: string = 'black';
    @reactive('update') stroke?: string = 'black';
    @reactive('update') strokeWidth?: number = 1;

    readonly highlightStyle = HighlightStyle;
}
class MiniChartLine extends Observable {
    @reactive('update') stroke: string = 'black';
    @reactive('update') strokeWidth: number = 1;
}
export class MiniLineChart extends MiniChart {

    private miniLineChartGroup: Group = new Group();
    protected linePath: Path = new Path();
    protected yScale: LinearScale = new LinearScale();
    protected xScale: BandScale<number> = new BandScale<number>();
    private markers: Group = new Group();
    private markersSelection: Selection<Marker, Group, { x: number; y: number; }, any> = Selection.select(this.markers).selectAll<Marker>();

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

    getMarker(shape: string) {
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

    onMarkerShapeChange() {
        this.markersSelection = this.markersSelection.setData([]);
        this.markersSelection.exit.remove();
        this.scheduleLayout();
    }

    update(): void {
        this.updateXScale();
        this.updateYScaleRange();
        this.updateYScaleDomain();

        this.generateNodeData();

        this.updateMarkersSelection();
        this.updateMarkers();
        this.updateLine();
    }

    updateYScaleRange(): void {
        const { yScale, padding, height } = this;
        yScale.range = [padding.top, height - padding.bottom];
    }

    updateYScaleDomain(): void {
        const { yData, yScale } = this;
        const [minY, maxY] = this.findMinAndMax(yData);
        yScale.domain = [maxY, minY];
    }

    updateXScale(): void {
        const {  xScale, padding, width, xData } = this;
        xScale.range = [padding.left, width - padding.left - padding.right];
        xScale.domain = xData;
    }

    generateNodeData(): { x: number, y: number }[] {
        const { yData, data, xScale, yScale } = this;

        if (!data) {
            return [];
        }

        const offsetX = xScale.bandwidth / 2;

        this.nodeData = [];

        for (let i = 0; i < yData.length; i++) {
            const yDatum = yData[i];
            const x = xScale.convert(i) + offsetX;
            const y = yScale.convert(yDatum);

            this.nodeData.push({ x, y });
        }
    }

    updateMarkersSelection(): void {
        const { nodeData, marker } = this;
        
        const shape = this.getMarker(marker.shape);

        let updateMarkersSelection = this.markersSelection.setData(nodeData);
        let enterMarkersSelection = updateMarkersSelection.enter.append(shape);

        updateMarkersSelection.exit.remove();

        this.markersSelection = updateMarkersSelection.merge(enterMarkersSelection);
    }

    updateMarkers(): void {
        const { marker } = this;

        this.markersSelection.each((node, datum, index) => {
            node.size = marker.size;
            
            node.fill = marker.fill;
            node.stroke = marker.stroke;
            node.strokeWidth = marker.strokeWidth;
            node.visible = marker.enabled;

            node.translationX = datum.x;
            node.translationY = datum.y;
        });
    }

    updateLine(): void {
        const { linePath, yData, xData, xScale, yScale, line } = this;

        if (yData.length < 2) {
            return;
        }

        const path = linePath.path;
        const n = yData.length;
        const offsetX = xScale.bandwidth / 2;

        path.clear();

        for (let i = 0; i < n; i++) {
            const x = xScale.convert(xData[i]) + offsetX;
            const y = yScale.convert(yData[i]);

            if (i === 0) {
                path.moveTo(x, y);
            } else {
                path.lineTo(x, y);
            }
        }

        linePath.fill = undefined;
        linePath.stroke = line.stroke;
        linePath.strokeWidth = line.strokeWidth;
    }

    onHover(event: MouseEvent): void {
        const { size, fill, stroke, strokeWidth, highlightStyle } = this.marker;
        this.markersSelection.each((marker) => {
            const isInPath: boolean = marker.isPointInPath(event.offsetX, event.offsetY);
            marker.size = isInPath ? highlightStyle.size : size;
            marker.fill = isInPath ? highlightStyle.fill : fill;
            marker.stroke = isInPath ? highlightStyle.stroke : stroke;
            marker.strokeWidth = isInPath ? highlightStyle.strokeWidth : strokeWidth;
        })
    }
}