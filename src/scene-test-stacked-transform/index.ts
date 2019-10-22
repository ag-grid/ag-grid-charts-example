import {Scene} from "@ag-enterprise/grid-charts/src/charts/scene/scene";
import {Group} from "@ag-enterprise/grid-charts/src/charts/scene/group";
import {Arc} from "@ag-enterprise/grid-charts/src/charts/scene/shape/arc";
import {Rect} from "@ag-enterprise/grid-charts/src/charts/scene/shape/rect";
import {FpsCounter} from "@ag-enterprise/grid-charts/src/charts/scene/fpsCounter";
import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {

    // Canvas scene graph API

    const scene = new Scene({
        width: 800,
        height: 400
    });
    scene.parent = document.body;
    const group = new Group();

    const arc = new Arc();
    arc.centerX = 50;
    arc.centerY = 100;
    arc.radiusX = 30;
    arc.radiusY = 20;

    const rect = new Rect();
    rect.x = 100;
    rect.y = 100;
    rect.width = 50;
    rect.height = 50;

    rect.scalingX = 2;
    rect.rotationDeg = 10;
    rect.translationY = -50;

    group.append([arc, rect]);
    // The order of transformation doesn't matter here.
    // It's always: scale, rotate, translate.
    group.scalingY = 1.5;
    group.rotationDeg = -10;
    group.translationX = 50;

    scene.root = group;


    // D3/SVG API

    const g = d3.select(document.body).append('svg')
        .attr('width', 800)
        .attr('height', 400)
        .append('g');

    // The order of transformations matters here.
    g.attr('transform', 'translate(50, 0) rotate(-10) scale(1, 1.5)');

    g.append('ellipse')
        .attr('cx', 50)
        .attr('cy', 100)
        .attr('rx', 30)
        .attr('ry', 20)
        .attr('fill', 'red')
        .attr('stroke', 'black');

    g.append('rect')
        .attr('x', 100)
        .attr('y', 100)
        .attr('width', 50)
        .attr('height', 50)
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('transform', 'translate(0, -50) rotate(10) scale(2, 1)');
});
