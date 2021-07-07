import { Arc, DropShadow, Group, Rect } from "../../charts/main";
import { Scene } from "../../charts/scene/scene";
import { Text } from "../../charts/scene/shape/text";
import { Selection } from "../../charts/scene/selection";

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

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const data2 = [10, 9, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];
const data3 = [4, 5, 6];

let selection: Selection<Rect, Group, number, any> = Selection.select(group).selectAll<Rect>();

function update(data: number[]) {
    const update = selection.setData(data);

    console.log(`Update size: ${update.size}`);
    console.log(`Enter size: ${update.enter.size}`);
    console.log(`Exit size: ${update.exit.size}`);

    const enter = update.enter.append(Rect);
    update.exit.remove();
    selection = update.merge(enter);
    selection.each((rect, datum, index) => {
        rect.x = index * 50;
        rect.y = datum * 10;
        rect.width = 50;
        rect.height = 50;
        rect.fill = 'cyan';
    });
}

update(data);


setTimeout(function () {
    update(data2);
}, 2000);

setTimeout(function () {
    update(data3);
}, 4000);

// let angle = 0;
// function next() {
//     text.rotation = (angle++ % 360) / 360 * Math.PI * 2;
//     window.requestAnimationFrame(next);
// }
// window.requestAnimationFrame(next);