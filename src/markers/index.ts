import {Scene} from "ag-charts-community/src/scene/scene";
import {Group} from "ag-charts-community/src/scene/group";
import {Diamond} from "ag-charts-community/src/chart/marker/diamond";
import {Triangle} from "ag-charts-community/src/chart/marker/triangle";
import {Square} from "ag-charts-community/src/chart/marker/square";
import {Circle} from "ag-charts-community/src/chart/marker/circle";
import {Cross} from "ag-charts-community/src/chart/marker/cross";
import {Plus} from "ag-charts-community/src/chart/marker/plus";
import { createSlider } from "../../lib/ui";
import { pad } from "ag-charts-community/src/util/time/format/locale";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene();
    scene.resize(400, 100);
    scene.container = document.body;

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
    const label = document.createElement('div');
    document.body.appendChild(label);
    function updateSizeLabel() {
        label.innerText = String(diamond.size);
    }
    updateSizeLabel();
    createSlider('Size', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], v => {
        diamond.size = v;
        triangle.size = v;
        square.size = v;
        circle.size = v;
        cross.size = v;
        plus.size = v;

        updateSizeLabel();
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
