import { Group, Padding, Scene } from "../../charts/main";
import { Observable, reactive } from "../../charts/util/observable";

export abstract class MiniChart extends Observable {

    protected scene: Scene = new Scene();
    protected rootGroup: Group = new Group();

    @reactive("dataChange") data?: number[] = undefined;
    @reactive() padding?: Padding = new Padding(3);
    @reactive() markerHighlightSize = 3;

    constructor() {
        super();
        this.addPropertyListener("data", this.processData, this);
        this.addPropertyListener("padding", this.scheduleLayout, this);
        this.addPropertyListener("markerHighlightSize", this.scheduleLayout, this);
        this.scene.container = document.body;
        this.scene.root = this.rootGroup;
    }

    private _size: [number, number] = [100, 100];
    set size(value: [number, number]) {
        this._size = value;
        this.scene.resize(this._size[0], this._size[1]);
        this.scheduleLayout();
    }
    get size(): [number, number] {
        return this._size;
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

    processData() { }
    update() { }
    
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

}