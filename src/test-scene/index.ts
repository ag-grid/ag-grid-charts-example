import { Arc, BandScale, Chart, DropShadow, Group, Line, LinearScale, Rect } from "../../charts/main";
import { Scene } from "../../charts/scene/scene";
import { Text } from "../../charts/scene/shape/text";
import { Selection } from "../../charts/scene/selection";
import { createButton, createSlider, createSlider2 } from "../../lib/ui";

const scene = new Scene(document, 800, 600);
scene.canvas.element.style.border = '1px solid black';

const text = new Text();
text.x = 400;
text.y = 300;
text.textAlign = 'left'
text.textBaseline = 'middle';
text.text = 'Mana';
text.fontSize = 90;
text.fill = 'red';
text.stroke = 'black';
text.strokeWidth = 3;
text.lineDash = [10, 10];
text.fillShadow = new DropShadow();
text.fillShadow.blur = 10;
text.fillShadow.color = 'rgba(255, 0, 0, 0.7)';
text.rotationCenterX = 400;
text.rotationCenterY = 300;

createSlider('offset', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], value => {
    text.lineDashOffset = value;
});
createButton('Press me', () => {
    text.fill = 'green';
});
// text.scalingY = 1.5;
// text.translationY = -100;

// const arc = new Arc();
// arc.radiusX = arc.radiusY = 100;
// arc.fill = 'green';
// arc.centerY = 100;

const group = new Group();

group.append(text);
// group.append(arc);
// group.translationX = 100;

scene.root = group;

scene.container = document.body;

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const data2 = [10, 9, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];
// const data3 = [4, 5, 6];

// let selection: Selection<Rect, Group, number, any> = Selection.select(group).selectAll<Rect>();

// function update(data: number[]) {
//     const update = selection.setData(data);

//     console.log(`Update size: ${update.size}`);
//     console.log(`Enter size: ${update.enter.size}`);
//     console.log(`Exit size: ${update.exit.size}`);

//     const enter = update.enter.append(Rect);
//     update.exit.remove();
//     selection = update.merge(enter);
//     selection.each((rect, datum, index) => {
//         rect.x = index * 50;
//         rect.y = datum * 10;
//         rect.width = 50;
//         rect.height = 50;
//         rect.fill = 'cyan';
//     });
// }

// update(data);


// setTimeout(function () {
//     update(data2);
// }, 2000);

// setTimeout(function () {
//     update(data3);
// }, 4000);

let angle = 0;
let offset = 0;
function next() {
    text.rotation = (angle++ % 360) / 360 * Math.PI * 2;
    text.lineDashOffset = ++offset;
    window.requestAnimationFrame(next);
}
window.requestAnimationFrame(next);

// t [0, 1]
// x0 x1 [200, 500]
// [-250, 200] [200, 500]
const scale = new LinearScale();
scale.domain = [-250, 200];
scale.range = [200, 700];
console.log(scale.convert(-250));
console.log(scale.convert(200));
console.log(scale.convert(0));

console.log('linear ticks', scale.ticks());

console.log('----------------');

const bandScale = new BandScale();
const categories = ['Rob', 'Niall', 'Gil'];
bandScale.domain = categories;
bandScale.range = [0, 300];
bandScale.paddingInner = 0;
bandScale.paddingOuter = 0.1;
console.log(bandScale.bandwidth);
console.log(bandScale.convert('Rob'));
console.log(bandScale.convert('Niall'));
console.log(bandScale.convert('Gil'));
console.log('band scale ticks', bandScale.ticks());

const linearSelection = Selection.select(group).selectAll();
const updateLinear = linearSelection.setData(scale.ticks());
updateLinear.enter.append(Text).each((text, datum) => {
    text.textAlign = 'center';
    text.x = scale.convert(datum);
    text.y = 100;
    text.text = String(datum);
});

const linearSelection2 = Selection.select(group).selectAll();
const updateLinear2 = linearSelection2.setData(scale.ticks());
updateLinear2.enter.append(Line).each((line, datum) => {
    line.stroke = 'black';
    line.strokeWidth = 1;
    line.x1 = line.x2 = scale.convert(datum);
    line.y1 = 110;
    line.y2 = 115;
});

const axisLine = new Line();
axisLine.stroke = 'black';
axisLine.strokeWidth = 1;
axisLine.y1 = axisLine.y2 = 110;
axisLine.x1 = scale.range[0];
axisLine.x2 = scale.range[1];
group.append(axisLine);

const bandSelection = Selection.select(group).selectAll();
const updateBand = linearSelection.setData(bandScale.ticks());
updateBand.enter.append(Text).each((text, datum) => {
    text.textAlign = 'center';
    text.x = bandScale.convert(datum);
    text.y = 200;
    text.text = String(datum);
});

function makeSceneResizeable(scene: Scene, onResize: (width: number, height: number) => void) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let sceneSize: [number, number];

    scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        sceneSize = [scene.width, scene.height];
        isDragging = true;
    });
    scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            scene.resize(sceneSize[0] + dx, sceneSize[1] + dy);
            onResize(scene.width, scene.height);
        }
    });
    scene.canvas.element.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

makeSceneResizeable(scene, (width, height) => {
    text.x = width / 2;
    text.y = height / 2;
    text.rotationCenterX = width / 2;
    text.rotationCenterY = height / 2;
});

class MyChart {

    private scene: Scene;

    private _data: any[] = [];
    set data(data: any[]) {
        this._data = data;
        this.processData();
    }
    get data(): any[] {
        return this._data;
    }

    private _size: [number, number] = [800, 600];
    set size(size: [number, number]) {
        this._size = size;
        // resize the scene
        this.updateSelections();
    }
    get size(): [number, number] {
        return this._size;
    }

    constructor() {
        this.scene = new Scene(document, this.size[0], this.size[1]);
        makeSceneResizeable(this.scene, this.onResize);
    }

    private onResize(width: number, height: number) {
        // resize logic
    }

    // private xAxisSelection
    // private yAxisSelection
    // private markerSelection

    private processData() {
        this.updateSelections();
    }

    private updateSelections() {
        this.updateXAxisSelection();
        this.updateYAxisSelection();
        this.updateMarkerSelection();
    }

    private updateXAxisSelection() {
        // this.updateXAxisSelection = merge result
    }

    private updateYAxisSelection() {

    }

    private updateMarkerSelection() {

    }
}