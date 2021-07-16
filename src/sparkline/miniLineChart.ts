import { BandScale, Group, Line, LinearScale, Path } from "../../charts/main";
import { Selection } from "../../charts/scene/selection"
import { Circle } from "./circle";
import { MiniChart } from "./miniChart";

export class MiniLineChart extends MiniChart {

    private miniLineChartGroup: Group = new Group();
    private linePath: Path = new Path();
    private yScale: LinearScale = new LinearScale();
    private xScale: BandScale<number> = new BandScale<number>();
    private markers: Group = new Group();
    private markersSelection: Selection<Circle, Group, number, any> = Selection.select(this.markers).selectAll<Circle>();


    private _markerFill: string = "black";
    set markerFill(value: string) {
        if (this._markerFill !== value) {
            this._markerFill = value;
            this.updateMarkersSelection();
        }
    }
    get markerFill(): string {
        return this._markerFill;
    }

    private _markerStroke: string = "black";
    set markerStroke(value: string) {
        if (this._markerStroke !== value) {
            this._markerStroke = value;
            this.updateMarkersSelection();
        }
    }
    get markerStroke(): string {
        return this._markerStroke;
    }

    private _markerStrokeWidth: number = 1;
    set markerStrokeWidth(value: number) {
        if (this._markerStrokeWidth !== value) {
            this._markerStrokeWidth = value;
            this.updateMarkersSelection();
        }
    }
    get markerStrokeWidth(): number {
        return this._markerStrokeWidth;
    }

    private _lineStroke: string = "black";
    set lineStroke(value: string) {
        if (this._lineStroke !== value) {
            this._lineStroke = value;
            this.updateLine();
        }
    }
    get lineStroke(): string {
        return this._lineStroke;
    }

    private _lineStrokeWidth: number = 0.5;
    set lineStrokeWidth(value: number) {
        if (this._lineStrokeWidth !== value) {
            this._lineStrokeWidth = value;
            this.updateLine();
        }
    }
    get lineStrokeWidth(): number {
        return this._lineStrokeWidth;
    }

    constructor() {
        super();

        this.addEventListener("dataChange", this.scheduleLayout, this);

        this.scene.canvas.element.style.border = "1px solid black";
        
        this.rootGroup.append(this.miniLineChartGroup);
        this.miniLineChartGroup.append(this.markers);
        this.miniLineChartGroup.append(this.linePath);
        this.addHoverEventListener()
    }

    processData = (): void => {
        if (!this.data) {
            return;
        }
        this.updateXScale();
        this.updateYScaleDomain();
        this.updateMarkersSelection();
        this.updateLine();
    }

    updateYScaleRange(): void {
        this.yScale.range = [this.padding.top, this.size[1] - this.padding.bottom];
    }

    updateYScaleDomain(): void {
        const [minY, maxY] = this.findMinAndMax();
        this.yScale.domain = [maxY, minY];
    }

    updateXScale(): void {
        this.xScale.range = [this.padding.left, this.size[0] - this.padding.left - this.padding.right];
        this.xScale.domain = this.data.map((datum, index) => index);
    }

    findMinAndMax(): [number, number] {
        let min: number = Math.min(...this.data);
        let max: number = Math.max(...this.data);
        return [min, max];
    }


    updateMarkersSelection(): void {
        const { data, xScale, yScale, markerFill, markerStroke, markerStrokeWidth } = this;
        let updateMarkersSelection = this.markersSelection.setData(data);
        let enterMarkersSelection = updateMarkersSelection.enter.append(Circle);

        updateMarkersSelection.exit.remove();

        this.markersSelection = updateMarkersSelection.merge(enterMarkersSelection);

        const offsetX = xScale.bandwidth / 2;
        this.markersSelection.each((marker, datum, index) => {
            marker.centerX = xScale.convert(index) + offsetX;
            marker.centerY = yScale.convert(datum);
            marker.fill = markerFill;
            marker.stroke = markerStroke;
            marker.strokeWidth = markerStrokeWidth;
        });

    }

    updateLine(): void {
        const { linePath, data, xScale, yScale, lineStroke, lineStrokeWidth } = this;

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
        linePath.stroke = lineStroke;
        linePath.strokeWidth = lineStrokeWidth;
    }

    addHoverEventListener(): void {
        this.scene.canvas.element.addEventListener("click", this.resizeMarker.bind(this))
        // this.scene.canvas.element.addEventListener("mousemove", () => {})
    }

    resizeMarker(event: MouseEvent) : void {
        this.markersSelection.each((marker) => {
            const isInPath: boolean = marker.isPointInPath(event.offsetX, event.offsetY)
            console.log("Point", event.offsetX, event.offsetY)
            if (isInPath) {
                marker.radius = marker.radius * 2
            }
        })
    }
}