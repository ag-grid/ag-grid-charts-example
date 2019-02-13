import scaleLinear from "ag-grid-enterprise/src/charts/scale/linearScale";
import {BandScale} from "ag-grid-enterprise/src/charts/scale/bandScale";
import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Axis} from "ag-grid-enterprise/src/charts/axis";

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
}

function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 10000);
    }).then(nextFrame);
}

function renderVerticalAxes() {
    const scene = new Scene(900, 500);
    scene.parent = document.body;
    const root = new Group();

    leftAxisBottomUp(root);
    leftAxisTopDown(root);
    rightAxisBottomUp(root);
    rightAxisTopDown(root);
    leftAxisRotatedLabels45(root);
    leftAxisRotatedLabelsMinus45(root);
    rightAxisRotatedLabels45(root);
    rightAxisRotatedLabelsMinus45(root);

    scene.root = root;

    // delay().then(() => {
    //     xScale.domain = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    //     xAxis.render();
    //
    //     yScale.domain = [0, 50];
    //     yAxis.render();
    // }).then(delay).then(() => {
    //     xScale.domain = ['Amanda', 'Bob', 'Casey', 'Don', 'Edward', 'Fred', 'George'];
    //     xAxis.render();
    //
    //     yScale.domain = [-100, 40];
    //     yAxis.render();
    // }).then(delay).then(() => {
    //     xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
    //     xScale.range = [0, 300];
    //     xAxis.mirroredLabels = true;
    //     xAxis.render();
    //
    //     yScale.domain = [1, 2];
    //     yScale.range = [0, 300];
    //     yAxis.render();
    // }).then(delay).then(() => {
    //     console.assert(scene.frameIndex === 4);
    //
    //     xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
    //     xScale.range = [0, 600];
    //     xAxis.rotation -= Math.PI / 5;
    //     xAxis.render();
    //
    //     yScale.domain = [1.95, 2];
    //     yScale.range = [0, seriesHeight];
    //     yAxis.render();
    // });
}

function renderHorizontalAxes() {
    const scene = new Scene(900, 500);
    scene.parent = document.body;
    const root = new Group();

    bottomCategoryAxis(root);
    bottomCategoryAxisRotatedLabels45(root);
    bottomCategoryAxisRotatedLabelsMinus45(root);
    bottomCategoryAxisRotatedLabels90(root);

    topCategoryAxis(root);
    topCategoryAxisRotatedLabels45(root);
    topCategoryAxisRotatedLabelsMinus45(root);

    scene.root = root;
}

function leftAxisBottomUp(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 50;
    axis.translationY = 10;
    axis.render();
}

function leftAxisTopDown(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [0, 400];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 100;
    axis.translationY = 10;
    axis.render();
}

function rightAxisBottomUp(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.isMirrorLabels = true;
    axis.translationX = 120;
    axis.translationY = 10;
    axis.render();
}

function rightAxisTopDown(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [0, 400];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.isMirrorLabels = true;
    axis.translationX = 170;
    axis.translationY = 10;
    axis.render();
}

function leftAxisRotatedLabels45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 300;
    axis.translationY = 50;
    axis.labelRotation = 45;
    axis.render();
}

function leftAxisRotatedLabelsMinus45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 350;
    axis.translationY = 50;
    axis.labelRotation = -45;
    axis.render();
}

function rightAxisRotatedLabels45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 380;
    axis.translationY = 50;
    axis.isMirrorLabels = true;
    axis.labelRotation = 45;
    axis.render();
}

function rightAxisRotatedLabelsMinus45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 430;
    axis.translationY = 50;
    axis.isMirrorLabels = true;
    axis.labelRotation = -45;
    axis.render();
}

function bottomCategoryAxis(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 10;
    axis.translationY = 50;
    axis.isFlipLabels = true;
    axis.render();
}

function bottomCategoryAxisRotatedLabels45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 10;
    axis.translationY = 120;
    axis.isFlipLabels = true;
    axis.labelRotation = 45;
    axis.render();
}

function bottomCategoryAxisRotatedLabelsMinus45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 10;
    axis.translationY = 190;
    axis.isFlipLabels = true;
    axis.labelRotation = -45;
    axis.render();
}

function bottomCategoryAxisRotatedLabels90(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 10;
    axis.translationY = 260;
    axis.isFlipLabels = true;
    axis.labelRotation = 90;
    axis.render();
}

function topCategoryAxis(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 450;
    axis.translationY = 50;
    axis.isFlipLabels = true;
    axis.isMirrorLabels = true;
    axis.render();
}

function topCategoryAxisRotatedLabels45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 450;
    axis.translationY = 120;
    axis.isFlipLabels = true;
    axis.labelRotation = 45;
    axis.isMirrorLabels = true;
    axis.render();

    // delay().then(() => {
    //     function step() {
    //         axis.labelRotation += 1;
    //         axis.render();
    //         requestAnimationFrame(step);
    //     }
    //     step();
    // });
}

function topCategoryAxisRotatedLabelsMinus45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 450;
    axis.translationY = 190;
    axis.isFlipLabels = true;
    axis.labelRotation = -45;
    axis.isMirrorLabels = true;
    axis.render();
}

document.addEventListener('DOMContentLoaded', () => {
    renderVerticalAxes();
    renderHorizontalAxes();
});
