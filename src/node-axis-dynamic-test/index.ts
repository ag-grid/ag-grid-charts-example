import { Axis } from "../../charts/axis";
import { BandScale } from "../../charts/scale/bandScale";
import { LinearScale } from "../../charts/scale/linearScale";
import { Group } from "../../charts/scene/group";
import { Scene } from "../../charts/scene/scene";
import { toDegrees } from "../../charts/util/angle";

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
}

function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(nextFrame); // `then(nextFrame)` will prevent the delay
    // from resolving, if during the delay we switched to another
    // browser tab, which effectively pauses the execution, until we
    // switch the tab back, and prevents our assertions from failing.
}

function renderAxes() {
    const padding = {
        top: 40,
        right: 40,
        bottom: 80,
        left: 60
    };

    const chartWidth = document.body.getBoundingClientRect().width;
    const chartHeight = 480;
    const seriesWidth = chartWidth - padding.left - padding.right;
    const seriesHeight = chartHeight - padding.top - padding.bottom;

    const yScale = new LinearScale();
    yScale.domain = [0, 700];
    yScale.range = [seriesHeight, 0];

    const xScale = new BandScale<string>();
    xScale.domain = ['Coffee', 'Tea', 'Milk'];
    xScale.range = [0, seriesWidth];
    xScale.paddingInner = 0.1;
    xScale.paddingOuter = 0.3;

    const scene = new Scene();
    scene.resize(chartWidth, chartHeight);
    scene.container = document.body;
    scene.debug.renderFrameIndex = true;
    const rootGroup = new Group();

    // y-axis
    const yAxis = new Axis();
    yAxis.scale = yScale;
    yAxis.translation.x = padding.left;
    yAxis.translation.y = padding.top;
    yAxis.update();

    // x-axis
    const xAxis = new Axis();
    xAxis.scale = xScale;
    xAxis.rotation = -90;
    xAxis.translation.x = padding.left;
    xAxis.translation.y = padding.top + seriesHeight;
    xAxis.label.parallel = true;
    xAxis.update();

    rootGroup.append([xAxis.group, yAxis.group]);
    scene.root = rootGroup;

    console.assert(yAxis.group.countChildren(1) === 16); // 15 tick-label Groups + Line

    delay().then(() => {
        xScale.domain = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        xAxis.update();

        yScale.domain = [0, 50];
        yAxis.update();
    }).then(delay).then(() => {
        xScale.domain = ['Amanda', 'Bob', 'Casey', 'Don', 'Edward', 'Fred', 'George'];
        xAxis.update();

        yScale.domain = [-100, 40];
        yAxis.update();
    }).then(delay).then(() => {
        xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
        xScale.range = [0, 300];
        xAxis.label.mirrored = true;
        xAxis.update();

        yScale.domain = [1, 2];
        yScale.range = [0, 300];
        yAxis.update();
    }).then(delay).then(() => {
        console.assert(scene.frameIndex === 4);

        xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
        xScale.range = [0, 600];
        xAxis.rotation -= toDegrees(Math.PI / 5);
        xAxis.update();

        yScale.domain = [1.95, 2];
        yScale.range = [0, seriesHeight];
        yAxis.update();
    }).then(delay).then(() => {
        // In the previous block, the `render` method was called for both axes,
        // but the scene graph is expected to render only once because all
        // DOM changes are delayed until the next frame.
        console.assert(scene.frameIndex === 5);

        xAxis.update();
        yAxis.update();
    }).then(nextFrame).then(() => {
        // In the previous block, we called the `render` method
        // of both axes. This will result in the regeneration
        // of the ticks (data), new data join on the existing
        // selection of tick-label groups and update of the node
        // attributes. But because the attributes calculated and set
        // as the result of the described sequence are no different
        // from the attributes calculated during the previous
        // `render` call, no actual render (scene graph rasterisation)
        // will happen. This feature is built into our scene graph's
        // DOM itself - no rasterisation happens if the node attributes
        // stay the same. A selection's job is to prevent the unnecessary
        // generation or removal of DOM nodes. And no nodes are created
        // or removed either because the regenerated tick data stayed
        // the same, and so the `enter` and `exit` components of the
        // new data join are of size zero.
        console.assert(scene.frameIndex === 5);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAxes();
});
