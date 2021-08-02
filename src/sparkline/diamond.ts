import { Marker } from './marker';

export class Diamond extends Marker {

    static className = 'Square Marker';
    
    isPointInStroke(x: number, y: number): boolean {
        return false;
    }
    
    isPointInPath(x: number, y: number): boolean {
        // needs fixing
        const { x: tx, y: ty } = this.transformPoint(x, y);
        console.log()

        const x1 = this.x;
        const x2 = this.x + this.size;
        const y1 = this.y;
        const y2 = this.y + this.size;

        return tx >= x1 && tx <= x2 && ty >= y1 && ty <= y2;
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