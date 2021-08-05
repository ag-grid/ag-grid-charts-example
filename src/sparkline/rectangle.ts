import { Shape } from '../../charts/main';

export class Rectangle extends Shape {

    static className = 'Column';

    private _x: number;
    set x(value: number) {
        if (this._x !== value) {
            this._x = value;
            this.dirty = true;
        }
    }
    get x(): number {
        return this._x;
    }

    private _y: number;
    set y(value: number) {
        if (this._y !== value) {
            this._y = value;
            this.dirty = true;
        }
    }
    get y(): number {
        return this._y;
    }

    private _width: number;
    set width(value: number) {
        if (this._width !== value) {
            this._width = value;
            this.dirty = true;
        }
    }
    get width(): number {
        return this._width;
    }

    private _height: number;
    set height(value: number) {
        if (this._height !== value) {
            this._height = value;
            this.dirty = true;
        }
    }
    get height(): number {
        return this._height;
    }
    
    isPointInStroke(x: number, y: number): boolean {
        return false;
    }
    
    isPointInPath(x: number, y: number): boolean {
        return false;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.dirtyTransform) {
            this.computeTransformMatrix();
        }
        this.matrix.toContext(ctx);

        const { x, y, width, height } = this;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        this.fillStroke(ctx);

        this.dirty = false;
    }
}