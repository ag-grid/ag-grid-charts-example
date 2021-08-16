import { Circle } from "./circle";
import { Diamond } from "./diamond";
import { Square } from "./square";

export function getMarkerShape(shape: string) {
    switch (shape) {
        case 'circle':
            return Circle;
        case 'square':
            return Square;
        case 'diamond':
            return Diamond;
        default:
            return Circle;
    }
}