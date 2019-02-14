import scaleLinear from "ag-grid-enterprise/src/charts/scale/linearScale";
import {BandScale} from "ag-grid-enterprise/src/charts/scale/bandScale";
import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Axis} from "ag-grid-enterprise/src/charts/axis";
import {Arc} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {Text} from "ag-grid-enterprise/src/charts/scene/shape/text";

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
}

function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 5000);
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
    topCategoryAxisRotatedLabels90(root);

    scene.root = root;
}

function testAutoFlippingParallelMirroredLabels() {
    const scene = new Scene(900, 900);
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Parallel labels option is used. Labels should auto flip to avoid upside-down text.';
    title.textAlign = 'center';
    title.font = '14px sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = Arc.create(450, 450, 400, 400, 0, Math.PI * 2);
    arc.fillStyle = null;
    arc.strokeStyle = 'black';
    root.append(arc);

    const centerDot = Arc.create(450, 450, 5, 5, 0, Math.PI * 2);
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['March', 'April', 'May', 'June', 'July', 'August'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = 0;
    axis.translationX = 450;
    axis.translationY = 450;
    axis.isParallelLabels = true;
    axis.isMirrorLabels = true;
    axis.render();

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.render();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function testAutoFlippingPerpendicularMirroredLabels() {
    const scene = new Scene(900, 900);
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Regular labels. Labels should auto flip to avoid upside-down text.';
    title.textAlign = 'center';
    title.font = '14px sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = Arc.create(450, 450, 400, 400, 0, Math.PI * 2);
    arc.fillStyle = null;
    arc.strokeStyle = 'black';
    root.append(arc);

    const centerDot = Arc.create(450, 450, 5, 5, 0, Math.PI * 2);
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['March', 'April', 'May', 'June', 'July', 'August'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = 0;
    axis.translationX = 450;
    axis.translationY = 450;
    axis.isMirrorLabels = true;
    axis.render();

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.render();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function testRotationFixedPerpendicularMirroredLabels() {
    const scene = new Scene(900, 900);
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Perpendicular labels with custom rotation that should be preserved at all times. No auto flipping.';
    title.textAlign = 'center';
    title.font = '14px sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = Arc.create(450, 450, 400, 400, 0, Math.PI * 2);
    arc.fillStyle = null;
    arc.strokeStyle = 'black';
    root.append(arc);

    const centerDot = Arc.create(450, 450, 5, 5, 0, Math.PI * 2);
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['March', 'April', 'May', 'June', 'July', 'August'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = 0;
    axis.translationX = 450;
    axis.translationY = 450;
    axis.labelRotation = 45;
    axis.isMirrorLabels = true;
    axis.render();

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.render();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function testRotationFixedParallelMirroredLabels() {
    const scene = new Scene(900, 900);
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Parallel labels with custom rotation that should be preserved at all times. No auto flipping.';
    title.textAlign = 'center';
    title.font = '14px sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = Arc.create(450, 450, 400, 400, 0, Math.PI * 2);
    arc.fillStyle = null;
    arc.strokeStyle = 'black';
    root.append(arc);

    const centerDot = Arc.create(450, 450, 5, 5, 0, Math.PI * 2);
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.4;

    const group = new Group();
    root.append(group);

    const axis = new Axis<string>(scale, group);
    axis.rotation = -90;
    axis.translationX = 450;
    axis.translationY = 450;
    axis.labelRotation = -30;
    axis.isParallelLabels = true;
    axis.isMirrorLabels = true;
    axis.render();

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.render();
            requestAnimationFrame(step);
        })();
    });

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
    axis.translationY = 50;
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
    axis.translationY = 50;
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
    axis.translationY = 50;
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
    axis.translationY = 50;
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

    delay().then(() => {
        (function step() {
            axis.labelRotation++;
            axis.render();
            requestAnimationFrame(step);
        })();
    });
}

function leftAxisRotatedLabelsMinus45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 400;
    axis.translationY = 50;
    axis.labelRotation = -45;
    axis.render();

    delay().then(() => {
        (function step() {
            axis.labelRotation += 1;
            axis.render();
            requestAnimationFrame(step);
        })();
    });
}

function rightAxisRotatedLabels45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 500;
    axis.translationY = 50;
    axis.isMirrorLabels = true;
    axis.labelRotation = 45;
    axis.render();

    delay().then(() => {
        (function step() {
            axis.labelRotation += 1;
            axis.render();
            requestAnimationFrame(step);
        })();
    });
}

function rightAxisRotatedLabelsMinus45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const group = new Group();
    root.append(group);

    const axis = new Axis<number>(scale, group);
    axis.translationX = 600;
    axis.translationY = 50;
    axis.isMirrorLabels = true;
    axis.labelRotation = -45;
    axis.render();

    delay().then(() => {
        (function step() {
            axis.labelRotation += 1;
            axis.render();
            requestAnimationFrame(step);
        })();
    });
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
    axis.isParallelLabels = true;
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
    axis.isParallelLabels = true;
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
    axis.isParallelLabels = true;
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
    axis.isParallelLabels = true;
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
    axis.isParallelLabels = true;
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
    axis.isParallelLabels = true;
    axis.labelRotation = 45;
    axis.isMirrorLabels = true;
    axis.render();
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
    axis.isParallelLabels = true;
    axis.labelRotation = -45;
    axis.isMirrorLabels = true;
    axis.render();
}

function topCategoryAxisRotatedLabels90(root: Group) {
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
    axis.translationY = 260;
    axis.isParallelLabels = true;
    axis.labelRotation = -90;
    axis.isMirrorLabels = true;
    axis.render();
}

document.addEventListener('DOMContentLoaded', () => {
    renderVerticalAxes();
    renderHorizontalAxes();
    testAutoFlippingPerpendicularMirroredLabels();
    testAutoFlippingParallelMirroredLabels();
    testRotationFixedPerpendicularMirroredLabels();
    testRotationFixedParallelMirroredLabels();
});
