import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Diamond} from "ag-grid-enterprise/src/charts/chart/marker/diamond";
import {Triangle} from "ag-grid-enterprise/src/charts/chart/marker/triangle";
import {Square} from "ag-grid-enterprise/src/charts/chart/marker/square";
import {Circle} from "ag-grid-enterprise/src/charts/chart/marker/circle";
import {Cross} from "ag-grid-enterprise/src/charts/chart/marker/cross";
import {Plus} from "ag-grid-enterprise/src/charts/chart/marker/plus";
import { createSlider } from "../../lib/ui";
import { pad } from "ag-grid-enterprise/src/charts/util/time/format/locale";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 400,
        height: 100
    });
    scene.parent = document.body;
    const rootGroup = new Group();
    rootGroup.translationY = 50;
    scene.root = rootGroup;

    const diamond = new Diamond();
    const triangle = new Triangle();
    const square = new Square();
    const circle = new Circle();
    const cross = new Cross();
    const plus = new Plus();

    rootGroup.append([diamond, triangle, square, circle, cross, plus]);

    diamond.translationX = 50;
    diamond.fill = 'red';

    triangle.translationX = 100;
    triangle.fill = 'blue';

    square.translationX = 150;
    square.fill = 'green';

    circle.translationX = 200;
    circle.fill = 'orange';

    cross.translationX = 250;
    cross.fill = 'magenta';

    plus.translationX = 300;
    plus.fill = 'cyan';

    document.body.appendChild(document.createElement('br'));
    createSlider('Size', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], v => {
        diamond.size = v;
        triangle.size = v;
        square.size = v;
        circle.size = v;
        cross.size = v;
        plus.size = v;
    });

    createSlider('Stroke color', [undefined, 'black', 'gray', 'maroon'], v => {
        diamond.stroke = v;
        triangle.stroke = v;
        square.stroke = v;
        circle.stroke = v;
        cross.stroke = v;
        plus.stroke = v;
    });

    createSlider('Stroke width', [1, 2, 3, 4, 5, 6], v => {
        diamond.strokeWidth = v;
        triangle.strokeWidth = v;
        square.strokeWidth = v;
        circle.strokeWidth = v;
        cross.strokeWidth = v;
        plus.strokeWidth = v;
    });
});
