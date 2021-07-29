import { BandScale, Group, LinearScale, Path } from '../../charts/main';
import { Selection } from '../../charts/scene/selection'
import { Observable, reactive } from '../../charts/util/observable';
import { Circle } from './circle';
import { MiniChart } from './miniChart';

class HighlightStyle {
    size: number = 3;
}
class MiniChartMarker extends Observable {
    @reactive('update') fill: string = 'black';
    @reactive('update') stroke: string = 'black';
    @reactive('update') strokeWidth: number = 1;

    readonly highlightStyle = new HighlightStyle();
}
class MiniChartLine extends Observable {
    @reactive('update') stroke: string = 'black';
    @reactive('update') strokeWidth: number = 1;
}
export class MiniLineChart extends MiniChart {

    private miniLineChartGroup: Group = new Group();
    private linePath: Path = new Path();
    private yScale: LinearScale = new LinearScale();
    private xScale: BandScale<number> = new BandScale<number>();
    private markers: Group = new Group();
    private markersSelection: Selection<Circle, Group, { x: number; y: number; }, any> = Selection.select(this.markers).selectAll<Circle>();

    readonly marker = new MiniChartMarker();
    readonly line = new MiniChartLine();
   
    constructor() {
        super();
        
        this.rootGroup.append(this.miniLineChartGroup);
        this.miniLineChartGroup.append([this.markers, this.linePath]);

        this.marker.addEventListener('update', this.updateMarkers, this);
        this.line.addEventListener('update', this.updateLine, this);
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
        const { padding, height } = this;
        this.yScale.range = [padding.top, height - padding.bottom];
    }

    updateYScaleDomain(): void {
        const [minY, maxY] = this.findMinAndMax(this.yData);
        this.yScale.domain = [maxY, minY];
    }

    updateXScale(): void {
        const { padding, width, xData } = this;
        this.xScale.range = [padding.left, width - padding.left - padding.right];
        this.xScale.domain = xData;
    }

    updateMarkersSelection(): void {
        const { nodeData } = this;
        
        let updateMarkersSelection = this.markersSelection.setData(nodeData);
        let enterMarkersSelection = updateMarkersSelection.enter.append(Circle);

        updateMarkersSelection.exit.remove();

        this.markersSelection = updateMarkersSelection.merge(enterMarkersSelection);
    }

    updateMarkers(): void {
        const { marker } = this;

        this.markersSelection.each((circle, datum, index) => {
            circle.centerX = datum.x;
            circle.centerY = datum.y;
            circle.fill = marker.fill;
            circle.stroke = marker.stroke;
            circle.strokeWidth = marker.strokeWidth;
        });
    }

    updateLine(): void {
        const { linePath, data, xScale, yScale, line } = this;

        const path = linePath.path;
        const n = data.length;
        const offsetX = xScale.bandwidth / 2;

        path.clear();

        for (let i = 0; i < n; i++) {
            const x = xScale.convert(i) + offsetX;
            const y = yScale.convert(data[i]);

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
        this.markersSelection.each((marker) => {
            const isInPath: boolean = marker.isPointInPath(event.offsetX, event.offsetY);
            marker.radius = isInPath ? this.marker.highlightStyle.size : 1.5;
        })
    }
}