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

    const yScale = scaleLinear();
    yScale.domain = [0, 700];
    yScale.range = [seriesHeight, 0];

    const xScale = new BandScale<string>();
    xScale.domain = ['Coffee', 'Tea', 'Milk'];
    xScale.range = [0, seriesWidth];
    xScale.paddingInner = 0.1;
    xScale.paddingOuter = 0.3;

    const scene = new Scene(chartWidth, chartHeight);
    scene.parent = document.body;
    scene.isRenderFrameIndex = true;
    const rootGroup = new Group();

    // y-axis
    const yAxisGroup = new Group();
    const yAxis = new Axis<number>(yScale, yAxisGroup);
    yAxis.translationX = padding.left;
    yAxis.translationY = padding.top;
    yAxis.render();

    // x-axis
    const xAxisGroup = new Group();
    const xAxis = new Axis<string>(xScale, xAxisGroup);
    xAxis.rotation = -Math.PI / 2;
    xAxis.translationX = padding.left;
    xAxis.translationY = padding.top + seriesHeight;
    xAxis.isFlipLabels = true;
    xAxis.render();

    rootGroup.append([xAxisGroup,yAxisGroup]);
    scene.root = rootGroup;

    console.assert(yAxisGroup.countChildren(1) === 16); // 15 tick-label Groups + Line

    delay().then(() => {
        xScale.domain = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        xAxis.render();

        yScale.domain = [0, 50];
        yAxis.render();
    }).then(delay).then(() => {
        xScale.domain = ['Amanda', 'Bob', 'Casey', 'Don', 'Edward', 'Fred', 'George'];
        xAxis.render();

        yScale.domain = [-100, 40];
        yAxis.render();
    }).then(delay).then(() => {
        xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
        xScale.range = [0, 300];
        xAxis.isMirrorLabels = true;
        xAxis.render();

        yScale.domain = [1, 2];
        yScale.range = [0, 300];
        yAxis.render();
    }).then(delay).then(() => {
        console.assert(scene.frameIndex === 4);

        xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
        xScale.range = [0, 600];
        xAxis.rotation -= Math.PI / 5;
        xAxis.render();

        yScale.domain = [1.95, 2];
        yScale.range = [0, seriesHeight];
        yAxis.render();
    }).then(delay).then(() => {
        // In the previous block, the `render` method was called for both axes,
        // but the scene graph is expected to render only once because all
        // DOM changes are delayed until the next frame.
        console.assert(scene.frameIndex === 5);

        xAxis.render();
        yAxis.render();
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
