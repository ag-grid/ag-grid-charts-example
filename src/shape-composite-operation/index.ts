import {Scene} from "@ag-enterprise/grid-charts/src/charts/scene/scene";
import {Group} from "@ag-enterprise/grid-charts/src/charts/scene/group";
import {Text} from "@ag-enterprise/grid-charts/src/charts/scene/shape/text";
import {Arc} from "@ag-enterprise/grid-charts/src/charts/scene/shape/arc";
import { arc } from "d3";

function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 800,
        height: 800
    });
    scene.parent = document.body;
    const rootGroup = new Group();

    const label = new Text();
    label.fontSize = 20;
    label.fontFamily = 'Verdana';
    label.textAlign = 'center';
    label.x = 150;
    label.y = 20;

    // Default composite operation is 'source-over'.

    const arc1 = new Arc();
    arc1.centerX = 150;
    arc1.centerY = 100;
    arc1.radiusX = 50;
    arc1.radiusY = 50;
    arc1.fill = 'red';

    const arc2 = new Arc();
    arc2.centerX = 185;
    arc2.centerY = 150;
    arc2.radiusX = 50;
    arc2.radiusY = 50;
    arc2.fill = 'lime';

    const arc3 = new Arc();
    arc3.centerX = 115;
    arc3.centerY = 150;
    arc3.radiusX = 50;
    arc3.radiusY = 50;
    arc3.fill = 'blue';

    rootGroup.append([arc1, arc2, arc3, label]);

    function setOp(op: string) {
        label.text = op;
        // TODO: `compositeOperation` implemented then reverted,
        //       as it is truly global - previously rendered shapes
        //       (even all the shapes rendered so far) can disappear
        //       with certain types of composite operations.
        //       Give it more thought later.
        // arc2.compositeOperation = op;
        // arc3.compositeOperation = op;
    }

    delay().then(() => setOp('source-in'))
        .then(delay).then(() => setOp('source-out'))
        .then(delay).then(() => setOp('source-atop'))
        .then(delay).then(() => setOp('destination-over'))
        .then(delay).then(() => setOp('destination-in'))
        .then(delay).then(() => setOp('destination-out'))
        .then(delay).then(() => setOp('destination-atop'))
        .then(delay).then(() => setOp('lighter'))
        .then(delay).then(() => setOp('copy'))
        .then(delay).then(() => setOp('xor'))
        .then(delay).then(() => setOp('multiply'))
        .then(delay).then(() => setOp('screen'))
        .then(delay).then(() => setOp('overlay'))
        .then(delay).then(() => setOp('darken'))
        .then(delay).then(() => setOp('lighten'))
        .then(delay).then(() => setOp('color-dodge'))
        .then(delay).then(() => setOp('color-burn'))
        .then(delay).then(() => setOp('hard-light'))
        .then(delay).then(() => setOp('soft-light'))
        .then(delay).then(() => setOp('difference'))
        .then(delay).then(() => setOp('exclusion'))
        .then(delay).then(() => setOp('hue'))
        .then(delay).then(() => setOp('saturation'))
        .then(delay).then(() => setOp('color'))
        .then(delay).then(() => setOp('luminosity'));

    scene.root = rootGroup;
});
