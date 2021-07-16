import { Shape } from "../../charts/scene/shape/shape";
export class Circle extends Shape {

    static className = "Marker";

    isPointInPath(x: number, y: number) {
        // fix this
        const transformedPoint = this.transformPoint(x, y);
        // const transformedPoint = { x, y }
        const { centerX, centerY, radius: r } = this;
        
        const dx = Math.abs(centerX - transformedPoint.x)
        const dy = Math.abs(centerY - transformedPoint.y)
        return dx <= r && dy <= r
    }

    isPointInStroke(x: number, y: number) {
        return false;
    }

    private _centerX: number = 0;
    set centerX(value: number) {
        if (this._centerX !== value) {
            this._centerX = value;
            this.dirty = true;
        }
    }
    get centerX(): number {
        return this._centerX;
    }

    private _centerY: number = 0;
    set centerY(value: number) {
        if (this._centerY !== value) {
            this._centerY = value;
            this.dirty = true;
        }
    }
    get centerY(): number {
        return this._centerY;
    }

    private _radius: number = 1.5
    set radius(value: number) {
        if (this._radius !== value) {
            this._radius = value;
            this.dirty = true;
        }
    }
    get radius(): number {
        return this._radius;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
        this.fillStroke(ctx);
    }
}