import { BandScale, Group, Line, LinearScale, Path } from "../../charts/main";
import { Selection } from "../../charts/scene/selection"
import { MiniChart } from "./miniChart";
import { Rectangle } from "./rectangle";

type RectangleDatum = {
    x: number,
    y: number,
    width: number,
    height: number
}

export class MiniColumnChart extends MiniChart {
    
    private rectData: RectangleDatum[] = [];
    private miniColumnChartGroup: Group = new Group();
    private yScale: LinearScale = new LinearScale();
    private xScale: BandScale<number> = new BandScale<number>();
    private xAxisLine: Line = new Line();
    private columns: Group = new Group();
    private columnsSelection: Selection<Rectangle, Group, RectangleDatum, RectangleDatum> = Selection.select(this.columns).selectAll<Rectangle>();
    // private ticksSelection: Selection<Line, Group, RectangleDatum, RectangleDatum> = Selection.select(this.columns).selectAll<Line>();

    private _fill: string = "black";
    set fill(value: string) {
        if (this._fill !== value) {
            this._fill = value;
        }
    }
    get fill(): string {
        return this._fill;
    }

    private _stroke: string = "green";
    set stroke(value: string) {
        if (this._stroke !== value) {
            this._stroke = value;
        }
    }
    get stroke(): string {
        return this._stroke;
    }

    private _strokeWidth: number = 0;
    set strokeWidth(value: number) {
        if (this._strokeWidth !== value) {
            this._strokeWidth = value;
        }
    }
    get strokeWidth(): number {
        return this._strokeWidth;
    }

    private _axisStroke: string = "black";
    set axisStroke(value: string) {
        if (this._axisStroke !== value) {
            this._axisStroke = value;
        }
    }
    get axisStroke(): string {
        return this._axisStroke;
    }

    private _axisStrokeWidth: number = 0.3;
    set axisStrokeWidth(value: number) {
        if (this._axisStrokeWidth !== value) {
            this._axisStrokeWidth = value;
        }
    }
    get axisStrokeWidth() : number {
        return this._axisStrokeWidth;
    }


    constructor() {
        super();

        this.rootGroup.append(this.miniColumnChartGroup);
        this.miniColumnChartGroup.append([this.columns, this.xAxisLine]);

    }

    findMinAndMax(data: number[]): [number, number] {
        let min: number = Math.min(...data);
        let max: number = Math.max(...data);
        return [min, max];
    }

    update() {
        this.updateYScale();
        this.updateXScale();
        this.updateXAxisLine();
        this.generateNodeData();
        this.updateRectNodesSelection();

        // this.updateTicks();
        // this.updateTicksSelection();
    }

    updateYScale() {
        const { padding, size, yData } = this;
        
        this.yScale.range = [size[1] - padding.bottom, padding.top];

        const [minY, maxY] = this.findMinAndMax(yData);
        this.yScale.domain = [minY, maxY];
    }

    updateXScale() {
        const { padding, size, xData } = this;
        
        this.xScale.range = [padding.left, size[0] - padding.right];
        this.xScale.domain = xData;
        this.xScale.paddingInner = 0.1;
    }

    updateXAxisLine() {
        const { yData, xScale, yScale, axisStroke, axisStrokeWidth } = this;
        
        if (yData.findIndex(datum => datum < 0) !== -1) {

            this.xAxisLine.x1 = xScale.range[0];
            this.xAxisLine.x2 = xScale.range[1];
            this.xAxisLine.y1 = this.xAxisLine.y2 = 0;
            this.xAxisLine.stroke = axisStroke;
            this.xAxisLine.strokeWidth = axisStrokeWidth;
    
            this.xAxisLine.translationY = yScale.convert(0);
        }
    }

    // generateNodeData() {
    //     const { yData, xData, xScale, yScale } = this;

    //     const yZero: number = yScale.convert(0);
    //     const width: number = xScale.bandwidth;

    //     for (let i = 0, n = yData.length ; i < n; i++) {
    //         const yDatum = yData[i];
    //         const xDatum = xData[i];
            
    //         let y: number;
    //         let height: number;

    //         const x: number = xScale.convert(xDatum);

    //         if (yDatum < 0) {
    //             y = yZero
    //             height = yScale.convert(yDatum) - yZero;
    //         } else {
    //             y = yScale.convert(yDatum);
    //             height = yZero - yScale.convert(yDatum);
    //         }

    //         this.rectData.push({ x, y, width, height});
    //     }
    // }


    generateNodeData() {
        const { yData, xData, xScale, yScale } = this;

        const yZero: number = yScale.convert(0);
        const width: number = xScale.bandwidth;

        for (let i = 0, n = yData.length ; i < n; i++) {
            const yDatum = yData[i];
            const xDatum = xData[i];
            
            const y: number = Math.min(yScale.convert(yDatum), yZero);
            const yBottom: number = Math.max(yScale.convert(yDatum), yZero);
            const height: number = yBottom - y

            const x: number = xScale.convert(xDatum);

            this.rectData.push({ x, y, width, height});
        }
    }

    // updateTicksSelection() {
    //     const updateTicksSelection = this.ticksSelection.setData(this.rectData);
    //     const enterTicksSelection = updateTicksSelection.enter.append(Line);

    //     updateTicksSelection.exit.remove();

    //     this.ticksSelection = updateTicksSelection.merge(enterTicksSelection);

    //     this.updateTicks();
    // }

    // updateTicks() {
    //     this.ticksSelection.each((tick, datum, index) => {
    //         const { x } = datum
    //         tick.x1 = tick.x2 = x;
    //         tick.y1 = 0;
    //         tick.y2 = 100;
    //         tick.stroke = "yellow";
    //         tick.strokeWidth = 0.5;
    //     })
    // }

    updateRectNodesSelection() {
        const updateColumnsSelection = this.columnsSelection.setData(this.rectData);
        const enterColumnsSelection = updateColumnsSelection.enter.append(Rectangle);

        updateColumnsSelection.exit.remove();

        this.columnsSelection = updateColumnsSelection.merge(enterColumnsSelection);

        this.updateRectNodes();
    }

    updateRectNodes() {
        this.columnsSelection.each((column, datum, index) => {
            const { fill, stroke, strokeWidth } = this;
            const { x, y, width, height } = datum;
            column.x = x;
            column.y = y;
            column.width = width;
            column.height = height;
            column.fill = fill;
            column.stroke = stroke;
            column.strokeWidth = strokeWidth;
        })
    }

    onHover(event: MouseEvent) {
        this.columnsSelection.each((column, datum, index) => {
            const isInPath = column.isPointInPath(event.offsetX, event.offsetY);
            column.fill = isInPath ? "yellow" : this.fill;
        })
    }
    
}