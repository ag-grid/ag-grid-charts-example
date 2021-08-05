import { Marker } from './marker';

export class Diamond extends Marker {

    static className = 'Square Marker';
    
    isPointInStroke(x: number, y: number): boolean {
        return false;
    }
    
    isPointInPath(x: number, y: number): boolean {
        // approximate to a circle
        const { size } = this;

        const { x: tx, y: ty } = this.transformPoint(x, y);
        const hs = size / 2;

        const dx = Math.abs(this.x - tx);
        const dy = Math.abs(this.y - ty);
        const R = Math.sqrt((dx ** 2) + (dy ** 2));

        return R <= hs;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.dirtyTransform) {
            this.computeTransformMatrix();
        }
        this.matrix.toContext(ctx);

        let { x, y, size } = this;

        const hs = size / 2;

        ctx.beginPath();
        ctx.moveTo(x, y -= hs);

        ctx.lineTo(x += hs, y += hs);
        ctx.lineTo(x -= hs, y += hs);
        ctx.lineTo(x -= hs, y -= hs);
        ctx.lineTo(x += hs, y -= hs);
        
        ctx.closePath();

        this.fillStroke(ctx);

        this.dirty = false;
    }
}