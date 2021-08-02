import { Marker } from "./marker";

export class Square extends Marker {

    static className = "Square Marker";
    
    isPointInStroke(x: number, y: number): boolean {
        return false;
    }
    
    isPointInPath(x: number, y: number): boolean {
        const { size } = this;
        
        const { x: tx, y: ty } = this.transformPoint(x, y);

        const hs = size / 2
        const x1 = this.x - hs;
        const x2 = this.x + hs;
        const y1 = this.y - hs;
        const y2 = this.y + hs;

        return tx >= x1 && tx <= x2 && ty >= y1 && ty <= y2;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.dirtyTransform) {
            this.computeTransformMatrix();
        }
        this.matrix.toContext(ctx);

        let { x, y, size } = this;
        const hs = size / 2

        ctx.beginPath();

        ctx.moveTo(x -= hs, y -= hs);
        ctx.lineTo(x += size, y);
        ctx.lineTo(x, y += size);
        ctx.lineTo(x -= size, y);
        ctx.lineTo(x, y -= size);

        ctx.closePath();

        this.fillStroke(ctx);

        this.dirty = false;
    }
}