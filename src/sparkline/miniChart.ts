import { Scene } from "../../charts/main";
import { Observable, reactive } from "../../charts/util/observable";
import { Padding } from "../mana/padding";

export abstract class MiniChart extends Observable {

    protected scene: Scene = new Scene()


    @reactive("dataChange") data?: any[] = undefined;
    @reactive("update") padding?: Padding = new Padding()

    constructor() {
        super()
        this.addEventListener("dataChange", () => this.processData(), this)
        this.addEventListener("update", this.processData, this)
        this.padding.addEventListener("update", this.processData, this)
        this.scene.container = document.body
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