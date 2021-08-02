import { Marker } from './marker';
export class Circle extends Marker {

    static className = 'Circle Marker';

    isPointInPath(x: number, y: number) {
        const { x: tx, y: ty } = this.transformPoint(x, y);

        const r = this.size / 2;

        const dx = Math.abs(this.x - tx);
        const dy = Math.abs(this.y - ty);
        const R = Math.sqrt((dx ** 2) + (dy ** 2));

        return R <= r;
    }

    isPointInStroke(x: number, y: number) {
        return false;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.dirtyTransform) {
            this.computeTransformMatrix();
        }
        this.matrix.toContext(ctx);

        const { x, y, size } = this;
        const radius = size / 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.fillStroke(ctx);

        this.dirty = false;
    }
}