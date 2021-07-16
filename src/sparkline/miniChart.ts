import { Group, Padding, Scene } from "../../charts/main";
import { Observable, reactive } from "../../charts/util/observable";

export abstract class MiniChart extends Observable {

    protected scene: Scene = new Scene();
    protected rootGroup: Group = new Group();

    @reactive("dataChange") data?: number[] = undefined;
    @reactive() padding?: Padding = new Padding(3);

    constructor() {
        super();
        this.addEventListener("dataChange", this.scheduleLayout, this);
        this.addPropertyListener("padding", this.scheduleLayout, this);
        this.scene.container = document.body;
        this.scene.root = this.rootGroup;
    }

    private _size: [number, number] = [100, 100];
    set size(value: [number, number]) {
        this._size = value;
        this.scene.resize(this._size[0], this._size[1]);
        this.updateYScaleRange();
        this.scheduleLayout();
    }
    get size(): [number, number] {
        return this._size;
    }

    processData() { }
    updateYScaleRange() { }

    private layoutId: number = 0;
    get layoutScheduled(): boolean {
        return !!this.layoutId;
    }
    scheduleLayout() {
        if (this.layoutId) {
            cancelAnimationFrame(this.layoutId);
        }
        this.layoutId = requestAnimationFrame(() => {
            this.processData();
            this.layoutId = 0;
        })
    }

}