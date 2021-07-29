import { Shape } from "../../charts/scene/shape/shape";
export class Circle extends Shape {

    static className = "Circle Marker";

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

    isPointInPath(x: number, y: number) {
        const transformedPoint = this.transformPoint(x, y);

        const { centerX, centerY, radius: r } = this;

        const dx = Math.abs(centerX - transformedPoint.x);
        const dy = Math.abs(centerY - transformedPoint.y);
        const R = Math.sqrt((dx ** 2) + (dy ** 2));

        return R <= r;
    }

    isPointInStroke(x: number, y: number) {
        return false;
    }

    render(ctx: CanvasRenderingContext2D) {
        const { centerX, centerY, radius } = this;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        this.fillStroke(ctx);
    }
}