import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Path} from "ag-grid-enterprise/src/charts/scene/shape/path";

abstract class Marker extends Path {
    private _x: number = 0;
    set x(value: number) {
        if (this._x !== value) {
            this._x = value;
            this.dirtyPath = true;
        }
    }
    get x(): number {
        return this._x;
    }

    private _y: number = 0;
    set y(value: number) {
        if (this._y !== value) {
            this._y = value;
            this.dirtyPath = true;
        }
    }
    get y(): number {
        return this._y;
    }

    private _size: number = 8;
    set size(value: number) {
        if (this._size !== value) {
            this._size = Math.abs(value);
            this.dirtyPath = true;
        }
    }
    get size(): number {
        return this._size;
    }
}

export class Triangle extends Marker {
    static className = 'Triangle';

    updatePath() {
        const s = this.size * 2.7;
        const x = this.x;
        const y = this.y;

        this.path.setFromString(`M${x},${y}m0-${s * 0.48}l${s * 0.5},${s * 0.87}-${s},0z`);
    }
}

export class Diamond extends Marker {
    static className = 'Diamond';

    updatePath() {
        const s = this.size * 1.25;
        const x = this.x - this.strokeWidth / 2;
        const y = this.y;

        this.path.setFromString(['M', x, y - s, 'l', s, s, -s, s, -s, -s, s, -s, 'z'].toString());
    }
}

export class Square extends Marker {
    static className = 'Square';

    updatePath() {
        const size = this.size * 1.2;
        const s = size * 2;
        const x = this.x - this.strokeWidth / 2;
        const y = this.y;

        this.path.setFromString(`M${x - size},${y - size}l${[s, 0, 0, s, -s, 0, 0, -s, 'z']}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 800,
        height: 800
    });
    scene.parent = document.body;
    const rootGroup = new Group();
    scene.root = rootGroup;

    const diamond = new Diamond();
    const triangle = new Triangle();
    const square = new Square();

    rootGroup.appendChild(diamond);
    rootGroup.appendChild(triangle);
    rootGroup.appendChild(square);

    diamond.translationX = 50;
    diamond.translationY = 50;
    diamond.fill = 'red';

    // diamond2.size = 30;
    triangle.translationX = 100;
    triangle.translationY = 50;
    triangle.fill = 'blue';

    square.translationX = 150;
    square.translationY = 50;
    square.fill = 'green';
});
