import { update } from "lodash";
import { Group, LinearScale, Padding, Path, Scene } from "../../charts/main";
import { Observable, reactive } from "../../charts/util/observable";


export class Cardioid extends Observable {

    protected scene: Scene = new Scene();
    protected rootGroup: Group = new Group();
    private miniLineChartGroup: Group = new Group();
    private linePath: Path = new Path();
    private yScale: LinearScale = new LinearScale();
    private xScale: LinearScale= new LinearScale();


    @reactive("dataChange") data?: any[] = [];
    @reactive() padding?: Padding = new Padding(3);


    private _size: [number, number] = [100, 100];
    set size(value: [number, number]) {
        this._size = value;
        this.scene.resize(this._size[0], this._size[1]);
        this.scheduleLayout();
    }
    get size(): [number, number] {
        return this._size;
    }

    private _xKey: string = "x";
    set xKey(value: string) {
        if (this._xKey !== value) {
            this._xKey = value;
            this.processData();
        }
    }
    get xKey(): string {
        return this._xKey;
    }
    
    private _yKey: string = "y";
    set yKey(value: string) {
        if (this._yKey !== value) {
            this._yKey = value;
            this.processData();
        }
    }
    get yKey() : string {
        return this._yKey;
    }

    private _xData: number[] = [];
    set xData(value: number[]) {
        this._xData = value;
    }
    get xData(): number[] {
        return this._xData;
    }

    private _yData: number[] = [];
    set yData(value: number[]) {
        this._yData = value;
    }
    get yData() : number[] {
        return this._yData;
    }

    private _fill: string = "black";
    set fill(value: string) {
        if (this._fill !== value) {
            this._fill = value;
            this.scheduleLayout();
        }
    }
    get fill(): string {
        return this._fill;
    }


    private _lineStroke: string = "black";
    set lineStroke(value: string) {
        if (this._lineStroke !== value) {
            this._lineStroke = value;
            this.scheduleLayout();
        }
    }
    get lineStroke(): string {
        return this._lineStroke;
    }

    private _lineStrokeWidth: number = 0.5;
    set lineStrokeWidth(value: number) {
        if (this._lineStrokeWidth !== value) {
            this._lineStrokeWidth = value;
            this.scheduleLayout();
        }
    }
    get lineStrokeWidth(): number {
        return this._lineStrokeWidth;
    }

    private layoutId: number = 0;
    get layoutScheduled(): boolean {
        return !!this.layoutId;
    }
    scheduleLayout() {
        if (this.layoutId) {
            cancelAnimationFrame(this.layoutId);
        }
        this.layoutId = requestAnimationFrame(() => {
            this.update();
            this.layoutId = 0;
        })
    }


    constructor() {
        super();
        this.addEventListener("dataChange", this.processData, this);
        this.addPropertyListener("padding", this.scheduleLayout, this);
        this.scene.container = document.body;
        this.scene.root = this.rootGroup;

        this.scene.canvas.element.style.border = "1px solid black";
        
        this.rootGroup.append(this.miniLineChartGroup);
        this.miniLineChartGroup.append(this.linePath);
    }

    processData = (): void => {
        let { data, xKey, yKey, xData, yData } = this;

        if (!data || !xKey || !yKey) {
            return;
        }

        xData.length = 0;
        yData.length = 0;

        for (let i = 0, n = data.length; i < n; i ++) {
            const datum = data[i];
            const x = datum[xKey];
            const y = datum[yKey];

            xData.push(x);
            yData.push(y);
        }

        this.update();
    }

    update(): void {
        this.updateXScaleRange();
        this.updateXScaleDomain();
        this.updateYScaleRange();
        this.updateYScaleDomain();
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

    updateXScaleRange(): void {
        const { padding, size } = this;
        this.xScale.range = [padding.left, size[0] - padding.left - padding.right];
    }

    updateXScaleDomain(): void {
        const [minX, maxX] = this.findMinAndMax(this.xData);
        this.xScale.domain = [minX, maxX];
    }

    findMinAndMax(data: number[]): [number, number] {
        let min: number = Math.min(...data);
        let max: number = Math.max(...data);
        return [min, max];
    }

    // findMinAndMax = (key): { min: number, max: number}  => {
    //     this.data.map((datum: any) => {
    //         return datum[key]
    //     })
    //     let min: number = this.data[0][key]
    //     let max: number = 0
    
    //     for (let i = 0; i < this.data.length; i++) {
    //         if (this.data[i][key] < min) {
    //             min = this.data[i][key]
    //         }
    //         if (this.data[i][key] > max) {
    //             max = this.data[i][key]
    //         }
    //     }
    
    //     return {
    //         min,
    //         max
    //     }
    // }


    updateLine(): void {
        const { linePath, xData, yData, xScale, yScale, lineStroke, lineStrokeWidth, fill } = this;

        const path = linePath.path;
        const n = xData.length;

        path.clear();

        for (let i = 0; i < n; i++) {
            const x = xScale.convert(xData[i]);
            const y = yScale.convert(yData[i]);

            if (i === 0) {
                path.moveTo(x, y);
            } else {
                path.lineTo(x, y);
            }
        }

        linePath.fill = fill;
        linePath.stroke = lineStroke;
        linePath.strokeWidth = lineStrokeWidth;
        
        // linePath.path.closePath();

        // linePath.rotation = -Math.PI / 2;
        // linePath.rotationCenterX = xScale.range[1] / 2;
        // linePath.rotationCenterY = yScale.range[1] / 2;
    }
}