import { Shape } from "../../charts/scene/shape/shape";

export class Circle extends Shape {
    
    isPointInPath(x: number, y: number) {
        return false
    }

    isPointInStroke(x: number, y: number) {
        return false
    }

    private _centerX: number = 0
    set centerX(value: number) {
        if (value !== this._centerX) {
            this._centerX = value
        }
    }
    get centerX(): number {
        return this._centerX
    }

    private _centerY: number = 0
    set centerY(value: number) {
        if(value !== this._centerY) {
            this.centerY = value
        }
    }
    get centerY(): number {
        return this.centerY
    }

    private _radius: number = 1.5
    set radius(value: number) {
        if (value !== this._radius) {
            this._radius = value
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2* Math.PI, false)
    }
}