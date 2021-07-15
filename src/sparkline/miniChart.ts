import { Group, Scene } from "../../charts/main";
import { Observable, reactive } from "../../charts/util/observable";
import { Padding } from "../mana/padding";

export abstract class MiniChart extends Observable {

    protected scene: Scene = new Scene()
    protected rootGroup: Group = new Group()


    @reactive("dataChange") data?: number[] = undefined;
    @reactive("update") padding?: Padding = new Padding()

    constructor() {
        super()
        this.addEventListener("dataChange", () => this.processData(), this)
        this.addEventListener("update", this.processData, this)
        this.padding.addEventListener("update", this.processData, this)
        this.scene.container = document.body
        this.scene.root = this.rootGroup
    }

    private _size: [number, number] = [100, 100]
    set size(value: [number, number]) {
        this._size = value;
        this.scene.resize(this._size[0], this._size[1])
        this.processData()
    }
    get size(): [number, number] {
        return this._size;
    }

    processData(){}


}