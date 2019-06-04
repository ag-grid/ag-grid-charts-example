import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc, ArcType} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {Rect} from "ag-grid-enterprise/src/charts/scene/shape/rect";

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
    const scene = new Scene(400, 400);
    scene.parent = document.body;
    const root = new Group();

    const rect = Rect.create(0, 0, 500, 500);
    rect.fill = 'blue';
    rect.rotation = Math.PI / 9;
    rect.translationX = 50;
    root.append(rect);

    const arc = Arc.create(300, 200, 150);
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
