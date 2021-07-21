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
    private markersSelection: Selection<Circle, Group, { x: number; y: number; }, any> = Selection.select(this.markers).selectAll<Circle>();


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

        this.scene.canvas.element.style.border = "1px solid black";

        this.rootGroup.append(this.miniLineChartGroup);
        this.miniLineChartGroup.append(this.markers);
        this.miniLineChartGroup.append(this.linePath);
        this.addHoverEventListener();
    }

    processData() {
        const { data, yData, xData } = this;

        if (!data) {
            return;
        };

        yData.length = 0;
        xData.length = 0;

        for (let i = 0, n = data.length; i < n; i++) {
            const y = data[i];
            yData.push(y);
            xData.push(i);
        }

        this.update();
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
        this.updateLine();
    }

    updateYScaleRange(): void {
        const { padding, size } = this;
        this.yScale.range = [padding.top, size[1] - padding.bottom];
    }

    updateYScaleDomain(): void {
        const [minY, maxY] = this.findMinAndMax(this.yData);
        this.yScale.domain = [maxY, minY];

    }

    updateXScale(): void {
        const { padding, size, xData } = this;
        this.xScale.range = [padding.left, size[0] - padding.left - padding.right];
        this.xScale.domain = xData;
    }

    findMinAndMax(data: number[]): [number, number] {
        let min: number = Math.min(...data);
        let max: number = Math.max(...data);
        return [min, max];
    }


    updateMarkersSelection(): void {
        const { nodeData } = this;
        let updateMarkersSelection = this.markersSelection.setData(nodeData);
        let enterMarkersSelection = updateMarkersSelection.enter.append(Circle);

        updateMarkersSelection.exit.remove();

        this.markersSelection = updateMarkersSelection.merge(enterMarkersSelection);


        this.updateMarkers();

    }

    updateMarkers(): void {
        const { markerFill, markerStroke, markerStrokeWidth } = this;
        this.markersSelection.each((marker, datum, index) => {
            marker.centerX = datum.x;
            marker.centerY = datum.y;
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

    private _resizeMarker = this.resizeMarker.bind(this);
    addHoverEventListener(): void {
        this.scene.canvas.element.addEventListener("click", this._resizeMarker);
        this.scene.canvas.element.addEventListener("mousemove", (e) => this.resizeMarker(e));

        // for clean up
        // this.scene.canvas.element.removeEventListener("click", this._resizeMarker);
    }

    resizeMarker(event: MouseEvent): void {
        this.markersSelection.each((marker) => {
            const isInPath: boolean = marker.isPointInPath(event.offsetX, event.offsetY);
            // console.log("Point", event.offsetX, event.offsetY);
            marker.radius = isInPath ? this.markerHighlightSize : 1.5;
        })
    }
}