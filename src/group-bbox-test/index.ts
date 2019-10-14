import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc, ArcType} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {Rect} from "ag-grid-enterprise/src/charts/scene/shape/rect";
import {Text} from "ag-grid-enterprise/src/charts/scene/shape/text";

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
        width: 600,
        height: 600
    });
    scene.parent = document.body;
    const group = new Group();
    const parentGroup = new Group();

    const rect = new Rect();
    rect.x = 100;
    rect.y = 50;
    rect.width = 150;
    rect.height = 150;
    rect.fill = 'blue';
    rect.rotation = Math.PI / 9;
    rect.translationX = 100;
    group.append(rect);

    const arc = new Arc();
    arc.centerX = 300;
    arc.centerY = 200;
    arc.radiusX = 130;
    arc.radiusY = 100;
    arc.fill = 'orange';
    arc.type = ArcType.Chord;

    const text = new Text();
    text.x = 100;
    text.y = 100;
    text.text = 'Vitaly Kravchenko';
    text.fontSize = 24;
    text.fontFamily = 'Verdana';
    text.rotation = Math.PI / 6;

    scene.root = group;

    delay().then(() => {
        group.append(arc);
    }).then(delay).then(() => {
        group.removeChild(rect);
    }).then(delay).then(() => {
        arc.rotation = -Math.PI / 18;
    }).then(delay).then(() => {
        group.translationX = 150;
        group.translationY = 50;
        group.scalingX = 0.7;
        group.scalingY = 0.5;
        group.rotation = Math.PI / 9;
    }).then(delay).then(() => {
        group.appendChild(rect);
    }).then(delay).then(() => {
        group.removeChild(arc);
    }).then(delay).then(() => {
        group.appendChild(text);
    }).then(delay).then(() => {
        scene.root = parentGroup;
        parentGroup.translationX = 100;
        parentGroup.appendChild(group);
    });
});
