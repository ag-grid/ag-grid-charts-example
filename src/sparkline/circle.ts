import { Shape } from "../../charts/scene/shape/shape";

export class Circle extends Shape {
    isPointInPath(x: number, y: number) {
        return false
    }

    isPointInStroke(x: number, y: number) {
        return false
    }
    
    render() {

    }
}