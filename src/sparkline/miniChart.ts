import { Group, Padding, Scene } from '../../charts/main';
import { Observable, reactive } from '../../charts/util/observable';

class MiniChartAxis extends Observable {
    @reactive('update') stroke: string = 'black'; 
    @reactive('update') strokeWidth: number = 1;
}
export abstract class MiniChart extends Observable {

    protected scene: Scene = new Scene();
    protected rootGroup: Group = new Group();

    @reactive() data?: number[] = undefined;
    @reactive() padding?: Padding = new Padding(3);

    readonly axis = new MiniChartAxis();

    constructor() {
        super();

        this.scene.canvas.element.style.border = '1px solid black';
        this.scene.container = document.body;
        this.scene.root = this.rootGroup;

        this.addPropertyListener('data', this.processData, this);
        this.addPropertyListener('padding', this.scheduleLayout, this);
        this.axis.addEventListener('update', this.scheduleLayout, this);

        this.addHoverEventListener();
    }

    private _width: number = 100;
    set width(value: number) {
        if (this._width !== value) {
            this._width = value;
            this.scene.resize(value, this.height);
            this.scheduleLayout();
        }
    }
    get width(): number {
        return this._width;
    }

    private _height: number = 100;
    set height(value: number) {
        if (this._height !== value) {
            this._height = value;
            this.scene.resize(this.width, value);
            this.scheduleLayout();
        }
    }
    get height(): number {
        return this._height;
    }

    private _yData: number[] = [];
    set yData(value: number[]) {
        this._yData = value;
    }
    get yData() : number[] {
        return this._yData;
    }

    private _xData: number[] = [];
    set xData(value: number[]) {
        this._xData = value;
    }
    get xData(): number[] {
        return this._xData;
    }

    private _nodeData: { x: number, y: number}[] = [];
    set nodeData(value: { x: number, y: number}[]) {
        this._nodeData = value;
    }
    get nodeData(): { x: number, y: number}[] {
        return this._nodeData;
    }

    update() { }
    onHover(event: MouseEvent) { }

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

    findMinAndMax(data: number[]): [number, number] {
        let min: number = Math.min(...data);
        let max: number = Math.max(...data);
        return [min, max];
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

    private _onHover = this.onHover.bind(this);
    addHoverEventListener(): void {
        this.scene.canvas.element.addEventListener('mousemove', (e) => this.onHover(e));

        // for clean up
        // this.scene.canvas.element.removeEventListener('click', this._resizeMarker);
    }
}