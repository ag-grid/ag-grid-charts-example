import scaleLinear from "@ag-enterprise/grid-charts/src/charts/scale/linearScale";
import {BandScale} from "@ag-enterprise/grid-charts/src/charts/scale/bandScale";
import {Scene} from "@ag-enterprise/grid-charts/src/charts/scene/scene";
import {Group} from "@ag-enterprise/grid-charts/src/charts/scene/group";
import {Axis} from "@ag-enterprise/grid-charts/src/charts/axis";
import {Arc, ArcType} from "@ag-enterprise/grid-charts/src/charts/scene/shape/arc";
import {Text} from "@ag-enterprise/grid-charts/src/charts/scene/shape/text";
import { Caption } from "@ag-enterprise/grid-charts/src/charts/caption";

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

function shortDelay() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(nextFrame);
}

function renderVerticalAxesNormalLabels() {
    const scene = new Scene({
        width: 700,
        height: 500
    });
    scene.parent = document.body;
    const root = new Group();

    leftAxisBottomUp(root);
    leftAxisTopDown(root);
    rightAxisBottomUp(root);
    rightAxisTopDown(root);

    scene.root = root;
}

function renderVerticalAxesRotatedLabels() {
    const scene = new Scene({
        width: 700,
        height: 500
    });
    scene.parent = document.body;
    const root = new Group();

    leftAxisRotatedLabels45(root);
    leftAxisRotatedLabelsMinus45(root);
    rightAxisRotatedLabels45(root);
    rightAxisRotatedLabelsMinus45(root);

    scene.root = root;
}

function renderHorizontalAxes() {
    const scene = new Scene({
        width: 900,
        height: 500
    });
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
    const scene = new Scene({
        width: 900,
        height: 900
    });
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Parallel labels option is used. Labels should auto flip to avoid upside-down text.';
    title.textAlign = 'center';
    title.fontSize = 14;
    title.fontFamily = 'sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = new Arc();
    arc.centerX = 450;
    arc.centerY = 450;
    arc.radiusX = 400;
    arc.radiusY = 400;
    arc.fill = undefined;
    arc.stroke = 'black';
    root.append(arc);

    const centerDot = new Arc();
    centerDot.centerX = 450;
    centerDot.centerY = 450;
    centerDot.radiusX = 5;
    centerDot.radiusY = 5;
    centerDot.type = ArcType.Chord;
    centerDot.fill = 'black';
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['March', 'April', 'May', 'June', 'July', 'August'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.rotation = 0;
    axis.translation.x = 450;
    axis.translation.y = 450;
    axis.label.parallel = true;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.update();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function testAutoFlippingPerpendicularMirroredLabels() {
    const scene = new Scene({
        width: 900,
        height: 900
    });
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Regular labels. Labels should auto flip to avoid upside-down text.';
    title.textAlign = 'center';
    title.fontSize = 14;
    title.fontFamily = 'sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = new Arc();
    arc.centerX = 450;
    arc.centerY = 450;
    arc.radiusX = 400;
    arc.radiusY = 400;
    arc.fill = undefined;
    arc.stroke = 'black';
    root.append(arc);

    const centerDot = new Arc();
    centerDot.centerX = 450;
    centerDot.centerY = 450;
    centerDot.radiusX = 5;
    centerDot.radiusY = 5;
    centerDot.type = ArcType.Chord;
    centerDot.fill = 'black';
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['March', 'April', 'May', 'June', 'July', 'August'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.rotation = 0;
    axis.translation.x = 450;
    axis.translation.y = 450;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.update();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function testRotationFixedPerpendicularMirroredLabels() {
    const scene = new Scene({
        width: 900,
        height: 900
    });
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Perpendicular labels with custom rotation that should be preserved at all times. No auto flipping.';
    title.textAlign = 'center';
    title.fontSize = 14;
    title.fontFamily = 'sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = new Arc();
    arc.centerX = 450;
    arc.centerY = 450;
    arc.radiusX = 400;
    arc.radiusY = 400;
    arc.fill = undefined;
    arc.stroke = 'black';
    root.append(arc);

    const centerDot = new Arc();
    centerDot.centerX = 450;
    centerDot.centerY = 450;
    centerDot.radiusX = 5;
    centerDot.radiusY = 5;
    centerDot.type = ArcType.Chord;
    centerDot.fill = 'black';
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['March', 'April', 'May', 'June', 'July', 'August'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.rotation = 0;
    axis.translation.x = 450;
    axis.translation.y = 450;
    axis.label.rotation = 45;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.update();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function testRotationFixedParallelMirroredLabels() {
    const scene = new Scene({
        width: 900,
        height: 900
    });
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = 'Parallel labels with custom rotation that should be preserved at all times. No auto flipping.';
    title.textAlign = 'center';
    title.fontSize = 14;
    title.fontFamily = 'sans-serif';
    title.x = 450;
    title.y = 20;
    root.append(title);

    const arc = new Arc();
    arc.centerX = 450;
    arc.centerY = 450;
    arc.radiusX = 400;
    arc.radiusY = 400;
    arc.fill = undefined;
    arc.stroke = 'black';
    root.append(arc);

    const centerDot = new Arc();
    centerDot.centerX = 450;
    centerDot.centerY = 450;
    centerDot.radiusX = 5;
    centerDot.radiusY = 5;
    centerDot.type = ArcType.Chord;
    centerDot.fill = 'black';
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.4;

    const axis = new Axis(scale);
    axis.rotation = -90;
    axis.translation.x = 450;
    axis.translation.y = 450;
    axis.label.rotation = -30;
    axis.label.parallel = true;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.update();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function testRadialGrid() {
    const width = 700;
    const height = 700;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 50;

    const scene = new Scene({width, height});
    scene.parent = document.body;
    const root = new Group();

    const title = new Text();
    title.text = '';
    title.textAlign = 'center';
    title.fontSize = 14;
    title.fontFamily = 'sans-serif';
    title.x = centerX;
    title.y = 20;
    root.append(title);

    const arc = new Arc();
    arc.centerX = centerX;
    arc.centerY = centerY;
    arc.radiusX = radius;
    arc.radiusY = radius;
    arc.fill = undefined;
    arc.stroke = 'black';
    root.append(arc);

    const centerDot = new Arc();
    centerDot.centerX = centerX;
    centerDot.centerY = centerY;
    centerDot.radiusX = 5;
    centerDot.radiusY = 5;
    centerDot.type = ArcType.Chord;
    centerDot.fill = 'black';
    root.append(centerDot);

    const scale = new BandScale<string>();
    scale.domain = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn'];
    scale.range = [0, radius];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;


    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Planets';
    axis.rotation = 0;
    axis.translation.x = centerX;
    axis.translation.y = centerY;
    axis.update();

    root.append(axis.group);

    shortDelay().then(() => {
        axis.gridLength = 360;
        axis.radialGrid = true;
        axis.tick.color = undefined;
        axis.update();
    }).then(shortDelay).then(() => {
        axis.gridStyle = [{
            stroke: 'rgba(0, 0, 0, 0.3)',
            lineDash: undefined
        }, {
            stroke: undefined,
            lineDash: undefined
        }];
        axis.update();
    }).then(shortDelay).then(() => {
        axis.gridStyle = [{
            stroke: 'rgba(0, 0, 0, 0.3)',
            lineDash: undefined
        }, {
            stroke: 'rgba(0, 0, 0, 0.3)',
            lineDash: [10, 10]
        }];
        axis.update();
    }).then(shortDelay).then(() => {
        axis.gridStyle = [{
            stroke: 'red',
            lineDash: [5, 5]
        }, {
            stroke: 'green',
            lineDash: [10, 10]
        }, {
            stroke: 'blue',
            lineDash: [20, 5, 5, 5]
        }];
        axis.update();
    }).then(shortDelay).then(() => {
        axis.radialGrid = false;
        axis.update();
    }).then(shortDelay).then(() => {
        return new Promise(resolve => {
            (function step() {
                axis.gridLength -= 1;
                if (axis.gridLength <= 180) {
                    resolve();
                    return;
                }
                axis.update();
                requestAnimationFrame(step);
            })();
        });
    }).then(shortDelay).then(() => {
        axis.label.mirrored = true;
        axis.update();
    }).then(shortDelay).then(() => {
        title.text = 'Grid should be invisible now.';
        axis.gridLength = 0;
        axis.update();
    }).then(shortDelay).then(() => {
        title.text = '';
        axis.gridLength = 180;
        axis.radialGrid = true;
        axis.update();
    }).then(shortDelay).then(() => {
        return new Promise(resolve => {
            (function step() {
                axis.gridLength += 1;
                if (axis.gridLength >= 720) {
                    resolve();
                    return;
                }
                axis.update();
                requestAnimationFrame(step);
            })();
        });
    }).then(() => {
        (function step() {
            axis.rotation += 0.5;
            axis.update();
            requestAnimationFrame(step);
        })();
    });

    scene.root = root;
}

function leftAxisBottomUp(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.translation.x = 100;
    axis.translation.y = 50;
    axis.update();

    root.append(axis.group);
}

function leftAxisTopDown(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [0, 400];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.translation.x = 250;
    axis.translation.y = 50;
    axis.update();

    root.append(axis.group);
}

function rightAxisBottomUp(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.label.mirrored = true;
    axis.translation.x = 400;
    axis.translation.y = 50;
    axis.update();

    root.append(axis.group);
}

function rightAxisTopDown(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [0, 400];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.label.mirrored = true;
    axis.translation.x = 550;
    axis.translation.y = 50;
    axis.update();

    root.append(axis.group);
}

function leftAxisRotatedLabels45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.translation.x = 100;
    axis.translation.y = 50;
    axis.label.rotation = 45;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.label.rotation++;
            axis.update();
            requestAnimationFrame(step);
        })();
    });
}

function leftAxisRotatedLabelsMinus45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.translation.x = 250;
    axis.translation.y = 50;
    axis.label.rotation = -45;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.label.rotation += 1;
            axis.update();
            requestAnimationFrame(step);
        })();
    });
}

function rightAxisRotatedLabels45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.translation.x = 400;
    axis.translation.y = 50;
    axis.label.mirrored = true;
    axis.label.rotation = 45;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.label.rotation += 1;
            axis.update();
            requestAnimationFrame(step);
        })();
    });
}

function rightAxisRotatedLabelsMinus45(root: Group) {
    const scale = scaleLinear();
    scale.domain = [0, 700];
    scale.range = [400, 0];

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.translation.x = 550;
    axis.translation.y = 50;
    axis.label.mirrored = true;
    axis.label.rotation = -45;
    axis.update();

    root.append(axis.group);

    delay().then(() => {
        (function step() {
            axis.label.rotation += 1;
            axis.update();
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

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.rotation = -90;
    axis.translation.x = 10;
    axis.translation.y = 50;
    axis.label.parallel = true;
    axis.update();

    root.append(axis.group);
}

function bottomCategoryAxisRotatedLabels45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.rotation = -90;
    axis.translation.x = 10;
    axis.translation.y = 120;
    axis.label.parallel = true;
    axis.label.rotation = 45;
    axis.update();

    root.append(axis.group);
}

function bottomCategoryAxisRotatedLabelsMinus45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.rotation = -90;
    axis.translation.x = 10;
    axis.translation.y = 190;
    axis.label.parallel = true;
    axis.label.rotation = -45;
    axis.update();

    root.append(axis.group);
}

function bottomCategoryAxisRotatedLabels90(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.title = new Caption();
    axis.title.text = 'Axis Title';
    axis.rotation = -90;
    axis.translation.x = 10;
    axis.translation.y = 260;
    axis.label.parallel = true;
    axis.label.rotation = 90;
    axis.update();

    root.append(axis.group);
}

function topCategoryAxis(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.rotation = -90;
    axis.translation.x = 450;
    axis.translation.y = 50;
    axis.label.parallel = true;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);
}

function topCategoryAxisRotatedLabels45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.rotation = -90;
    axis.translation.x = 450;
    axis.translation.y = 120;
    axis.label.parallel = true;
    axis.label.rotation = 45;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);
}

function topCategoryAxisRotatedLabelsMinus45(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.rotation = -90;
    axis.translation.x = 450;
    axis.translation.y = 190;
    axis.label.parallel = true;
    axis.label.rotation = -45;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);
}

function topCategoryAxisRotatedLabels90(root: Group) {
    const scale = new BandScale<string>();
    scale.domain = ['Coffee', 'Tea', 'Milk'];
    scale.range = [0, 400];
    scale.paddingInner = 0.1;
    scale.paddingOuter = 0.3;

    const axis = new Axis(scale);
    axis.rotation = -90;
    axis.translation.x = 450;
    axis.translation.y = 260;
    axis.label.parallel = true;
    axis.label.rotation = -90;
    axis.label.mirrored = true;
    axis.update();

    root.append(axis.group);
}

document.addEventListener('DOMContentLoaded', () => {
    renderVerticalAxesNormalLabels();
    renderVerticalAxesRotatedLabels();
    renderHorizontalAxes();
    testAutoFlippingPerpendicularMirroredLabels();
    testAutoFlippingParallelMirroredLabels();
    testRotationFixedPerpendicularMirroredLabels();
    testRotationFixedParallelMirroredLabels();
    testRadialGrid();
});
