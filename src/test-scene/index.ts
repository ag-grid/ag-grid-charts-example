import { Arc, DropShadow, Group } from "../../charts/main";
import { Scene } from "../../charts/scene/scene";
import { Text } from "../../charts/scene/shape/text";

const scene = new Scene(document, 800, 600);
scene.canvas.element.style.border = '1px solid black';

const text = new Text();
text.x = 400;
text.y = 300;
text.textAlign = 'left'
text.textBaseline = 'middle';
text.text = 'Mana';
text.fontSize = 50;
text.fill = 'red';
text.stroke = 'black';
text.strokeWidth = 1;
text.fillShadow = new DropShadow();
text.fillShadow.blur = 10;
text.fillShadow.color = 'rgba(0, 0, 0, 0.3)';
text.rotationCenterX = 400;
text.rotationCenterY = 300;
// text.scalingY = 1.5;
// text.translationY = -100;

const arc = new Arc();
arc.radiusX = arc.radiusY = 100;
arc.fill = 'green';
arc.centerY = 100;

const group = new Group();

group.append(text);
group.append(arc);
group.translationX = 100;

scene.root = group;

scene.container = document.body;

let angle = 0;

function next() {
    text.rotation = (angle++ % 360) / 360 * Math.PI * 2;
    window.requestAnimationFrame(next);
}
window.requestAnimationFrame(next);