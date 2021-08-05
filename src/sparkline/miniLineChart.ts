import { BandScale, Group, LinearScale, Path } from '../../charts/main';
import { Selection } from '../../charts/scene/selection'
import { Observable, reactive } from '../../charts/util/observable';
import { Circle } from './circle';
import { Diamond } from './diamond';
import { Marker } from './marker';
import { MiniChart, SeriesNodeDatum } from './miniChart';
import { Square } from './square';

interface MarkerSelectionDatum extends SeriesNodeDatum {}
class MiniChartMarker extends Observable {
    @reactive() enabled: boolean = true;
    @reactive() shape: string = 'circle';
    @reactive('update') size: number = 3;
    @reactive('update') fill?: string = 'black';
    @reactive('update') stroke?: string = 'black';
    @reactive('update') strokeWidth: number = 1;
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
    private markerSelection: Selection<Marker, Group, MarkerSelectionDatum, any> = Selection.select(this.markers).selectAll<Marker>();
    private markerSelectionData: MarkerSelectionDatum[] = [];

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

    getNodeData() : MarkerSelectionDatum[] {
        return this.markerSelectionData;
    }

    getMarkerShape(shape: string) { 
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
        this.markerSelection = this.markerSelection.setData([]);
        this.markerSelection.exit.remove();
        this.scheduleLayout();
    }

    update(): void {
        const { seriesRect } = this;
        this.miniLineChartGroup.translationX = seriesRect.x;
        this.miniLineChartGroup.translationY = seriesRect.y;
        
        this.updateXScale();
        this.updateYScaleRange();
        this.updateYScaleDomain();

        const nodeData = this.generateNodeData();
        this.markerSelectionData = nodeData;
        
        this.updateMarkerSelection(nodeData);
        this.updateMarkers();

        this.updateLine();
    }

    updateYScaleRange(): void {
        const { yScale, seriesRect } = this;
        yScale.range = [seriesRect.height, 0];
    }

    updateYScaleDomain(): void {
        const { yData, yScale } = this;
        let [minY, maxY] = this.findMinAndMax(yData);
        //minY = minY < 0 ? minY : 0;
        yScale.domain = [minY, maxY];
    }

    updateXScale(): void {
        const {  xScale, seriesRect, xData } = this;
        xScale.range = [0, seriesRect.width];
        xScale.domain = xData;
    }

    generateNodeData(): MarkerSelectionDatum[] {
        const { yData, data, xScale, yScale } = this;

        if (!data) {
            return [];
        }

        const offsetX = xScale.bandwidth / 2;

        const nodeData: MarkerSelectionDatum [] = [];

        for (let i = 0; i < yData.length; i++) {
            const yDatum = yData[i];
            const x = xScale.convert(i) + offsetX;
            const y = yScale.convert(yDatum);

           nodeData.push({
                point: { x, y }
            });
        }

        return nodeData
    }

    updateMarkerSelection(selectionData: MarkerSelectionDatum[]): void {
        const { marker } = this;
        
        const shape = this.getMarkerShape(marker.shape);

        let updateMarkerSelection = this.markerSelection.setData(selectionData);
        let enterMarkerSelection = updateMarkerSelection.enter.append(shape);

        updateMarkerSelection.exit.remove();

        this.markerSelection = updateMarkerSelection.merge(enterMarkerSelection);
    }

    updateMarkers(): void {
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

    highlightDatum(closestDatum: SeriesNodeDatum): void {
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

    dehighlightDatum() : void {
        const { size, fill, stroke, strokeWidth } = this.marker;
        this.markerSelection.each((node) => {
                node.size = size;
                node.fill = fill;
                node.stroke = stroke;
                node.strokeWidth = strokeWidth;
            }
        )
    }
}