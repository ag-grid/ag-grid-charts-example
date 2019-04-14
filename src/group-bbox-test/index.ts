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
    const scene = new Scene(600, 600);
    scene.parent = document.body;
    const group = new Group();
    const parentGroup = new Group();

    const rect = Rect.create(100, 50, 150, 150);
    rect.fillStyle = 'blue';
    rect.rotation = Math.PI / 9;
    rect.translationX = 100;
    group.append(rect);

    const arc = Arc.create(300, 200, 130, 100);
    arc.fillStyle = 'orange';
    arc.type = ArcType.Chord;

    const text = new Text();
    text.x = 100;
    text.y = 100;
    text.text = 'Vitaly Kravchenko';
    text.font = '24px Verdana';
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
