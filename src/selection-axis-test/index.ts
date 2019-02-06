import scaleLinear from "ag-grid-enterprise/src/charts/scale/linearScale";
import {BandScale} from "ag-grid-enterprise/src/charts/scale/bandScale";
import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Axis} from "ag-grid-enterprise/src/charts/axis";

function delay() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

function renderAxes() {
    const padding = {
        top: 20,
        right: 40,
        bottom: 40,
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

    const scene = new Scene(document.body, chartWidth, chartHeight);
    const rootGroup = new Group();

    // y-axis
    const yAxisGroup = new Group();
    const yAxis = new Axis<number>(yScale, yAxisGroup);
    yAxis.translation = [padding.left, padding.top];
    yAxis.render();

    // x-axis
    const xAxisGroup = new Group();
    const xAxis = new Axis<string>(xScale, xAxisGroup);
    xAxis.rotation = -Math.PI / 2;
    xAxis.translation = [padding.left, padding.top + seriesHeight];
    xAxis.flippedLabels = true;
    xAxis.render();

    rootGroup.append([xAxisGroup,yAxisGroup]);
    scene.root = rootGroup;

    console.assert(yAxisGroup.countChildren(1) === 16); // 15 tick-label Groups + Line

    delay().then(() => {
        xScale.domain = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        xAxis.render();

        yScale.domain = [0, 50];
        yAxis.render();
        return delay();
    }).then(() => {
        xScale.domain = ['Amanda', 'Bob', 'Casey', 'Don', 'Edward', 'Fred', 'George'];
        xAxis.render();

        yScale.domain = [-100, 40];
        yAxis.render();
        return delay();
    }).then(() => {
        xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
        xScale.range = [0, 300];
        xAxis.mirroredLabels = true;
        xAxis.render();

        yScale.domain = [1, 2];
        yScale.range = [0, 300];
        yAxis.render();
        return delay();
    }).then(() => {
        xScale.domain = ['Cat', 'Wolf', 'Sheep', 'Horse', 'Bear'];
        xScale.range = [0, 600];
        xAxis.rotation -= Math.PI / 5;
        xAxis.render();

        yScale.domain = [1.95, 2];
        yScale.range = [0, seriesHeight];
        yAxis.render();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAxes();
});
