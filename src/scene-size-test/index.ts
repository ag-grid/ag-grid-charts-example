import {Scene} from "ag-charts-community/src/scene/scene";
import {Group} from "ag-charts-community/src/scene/group";
import {Arc, ArcType} from "ag-charts-community/src/scene/shape/arc";
import {Rect} from "ag-charts-community/src/scene/shape/rect";

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
}

function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(nextFrame);
}

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene();
    scene.resize(400, 400);
    scene.container = document.body;

    const root = new Group();

    const rect = new Rect();
    rect.x = 0;
    rect.y = 0;
    rect.width = 500;
    rect.height = 500;
    rect.fill = 'blue';
    rect.rotation = Math.PI / 9;
    rect.translationX = 50;
    root.append(rect);

    const arc = new Arc();
    arc.centerX = 300;
    arc.centerY = 200;
    arc.radiusX = 150;
    arc.radiusY = 150;
    arc.fill = 'orange';
    arc.type = ArcType.Chord;
    root.append(arc);

    scene.root = root;

    delay().then(() => {
        scene.resize(scene.width - 100, scene.height);
    }).then(delay).then(() => {
        scene.resize(scene.width, scene.height - 100);
    }).then(delay).then(() => {
        scene.resize(600, 600);
    });
});
