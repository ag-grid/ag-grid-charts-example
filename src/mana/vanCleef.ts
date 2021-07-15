import { Path } from "../../charts/scene/shape/path";
import { toRadians } from "../../charts/util/angle";
import { Angles, Coordinates } from "./types";


/**
 * four leaf clover
 */
export class VanCleef extends Path {

    private _x: number = 0
    set x(value: number) {
        if (this._x !== value) {
            this._x = value
            this.dirtyPath = true
        }
    }
    get x(): number {
        return this._x
    }

    private _y: number = 0
    set y(value: number) {
        if(this._y !== value) {
            this._y = value
            this.dirtyPath = true
        }
    }
    get y() : number {
        return this._y
    }


    private _size: number = 0
    set size(value: number) {
        if (this._size !== value) {
            this._size = value
            this.dirtyPath = true
        }
    }
    get size() : number {
        return this._size
    }

    updatePath = (): void => {
        const path = this.path

        path.clear()

        const r = this._size / 4

        const arc1: Coordinates & Angles  = {
            x: this._x + r,
            y: this._y - r,
            startAngle: toRadians(180),
            endAngle: toRadians(90)
        }

        const arc2: Coordinates & Angles  = {
            x: this._x + r,
            y: this._y + r,
            startAngle: toRadians(270),
            endAngle: toRadians(180)
        }

        const arc3 : Coordinates & Angles = {
            x: this._x - r,
            y: this._y + r,
            startAngle: toRadians(0),
            endAngle: toRadians(270)
        }
        
        const arc4: Coordinates & Angles= {
            x: this._x -r,
            y: this._y - r,
            startAngle: toRadians(90),
            endAngle: toRadians(0)
        }

        path.cubicArc(arc1.x, arc1.y, r, r, 0, arc1.startAngle, arc1.endAngle, 0)
        path.cubicArc(arc2.x, arc2.y, r, r, 0, arc2.startAngle, arc2.endAngle, 0)
        path.cubicArc(arc3.x, arc3.y, r, r, 0, arc3.startAngle, arc3.endAngle, 0)
        path.cubicArc(arc4.x, arc4.y, r, r, 0, arc4.startAngle, arc4.endAngle, 0)

        path.closePath()

    }
}