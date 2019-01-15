import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {Rect} from "ag-grid-enterprise/src/charts/scene/shape/rect";
import {FpsCounter} from "ag-grid-enterprise/src/charts/scene/fpsCounter";
import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {

    // Canvas scene graph API

    const scene = new Scene(document.body, 800, 400);
    const group = new Group();

    const arc = new Arc(50, 100, 30, 20, 0, Math.PI * 2);

    const rect = new Rect(100, 100, 50, 50);

    rect.scalingX = 2;
    rect.rotationDeg = 10;
    rect.translationY = -50;

    group.add([arc, rect]);
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
