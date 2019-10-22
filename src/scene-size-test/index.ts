import {Scene} from "@ag-enterprise/grid-charts/src/charts/scene/scene";
import {Group} from "@ag-enterprise/grid-charts/src/charts/scene/group";
import {Arc, ArcType} from "@ag-enterprise/grid-charts/src/charts/scene/shape/arc";
import {Rect} from "@ag-enterprise/grid-charts/src/charts/scene/shape/rect";

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
    const scene = new Scene({
        width: 400,
        height: 400
    });
    scene.parent = document.body;
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
        scene.width -= 100;
    }).then(delay).then(() => {
        scene.height -= 100;
    }).then(delay).then(() => {
        scene.size = [600, 600];
    });
});
