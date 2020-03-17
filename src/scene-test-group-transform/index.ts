import {Scene} from "ag-charts-community/src/scene/scene";
import {Group} from "ag-charts-community/src/scene/group";
import {Arc, ArcType} from "ag-charts-community/src/scene/shape/arc";
import {Rect} from "ag-charts-community/src/scene/shape/rect";
import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {

    // Canvas scene graph API

    const scene = new Scene();
    scene.resize(800, 400);
    scene.container = document.body;
    const group = new Group();

    const arc = new Arc();
    arc.centerX = 100;
    arc.centerY = 100;
    arc.radiusX = 30;
    arc.radiusY = 20;
    arc.fill = 'red';
    arc.stroke = 'black';
    arc.type = ArcType.Chord;

    const rect = new Rect();
    rect.x = 200;
    rect.y = 100;
    rect.width = 50;
    rect.height = 50;
    rect.fill = 'red';
    rect.stroke = 'black';

    group.append([arc, rect]);
    // The order of transformation doesn't matter here.
    // It's always: scale, rotate, translate.
    group.scalingX = 1.5;
    group.scalingY = 2;
    group.rotation = Math.PI / 4;
    group.translationX = 100;
    group.translationY = -100;

    scene.root = group;


    // D3/SVG API

    const g = d3.select(document.body).append('svg')
        .attr('width', 800)
        .attr('height', 400)
        .append('g');

    // The order of transformations matters here.
    g.attr('transform', 'translate(100, -100) rotate(45) scale(1.5, 2)');

    g.append('ellipse')
        .attr('cx', 100)
        .attr('cy', 100)
        .attr('rx', 30)
        .attr('ry', 20)
        .attr('fill', 'red')
        .attr('stroke', 'black');

    g.append('rect')
        .attr('x', 200)
        .attr('y', 100)
        .attr('width', 50)
        .attr('height', 50)
        .attr('fill', 'red')
        .attr('stroke', 'black');
});
