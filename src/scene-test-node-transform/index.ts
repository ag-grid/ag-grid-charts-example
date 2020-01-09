import {Scene} from "ag-charts-community/src/scene/scene";
import {Group} from "ag-charts-community/src/scene/group";
import {Arc} from "ag-charts-community/src/scene/shape/arc";
import {Rect} from "ag-charts-community/src/scene/shape/rect";
import {FpsCounter} from "ag-charts-community/src/scene/fpsCounter";
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

    arc.scalingX = 1.5;
    arc.scalingY = 2;
    arc.rotation = Math.PI / 4;
    arc.translationX = 100;
    arc.translationY = -100;

    const rect = new Rect();
    rect.x = 200;
    rect.y = 100;
    rect.width = 50;
    rect.height = 50;

    rect.scalingX = 1.5;
    rect.scalingY = 2;
    rect.rotation = Math.PI / 4;
    rect.translationX = 100;
    rect.translationY = -100;

    group.append([arc, rect]);

    scene.root = group;


    // D3/SVG API

    const g = d3.select(document.body).append('svg')
        .attr('width', 800)
        .attr('height', 400)
        .append('g');

    g.append('ellipse')
        .attr('cx', 100)
        .attr('cy', 100)
        .attr('rx', 30)
        .attr('ry', 20)
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('transform', 'translate(100, -100) rotate(45) scale(1.5, 2)');

    g.append('rect')
        .attr('x', 200)
        .attr('y', 100)
        .attr('width', 50)
        .attr('height', 50)
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('transform', 'translate(100, -100) rotate(45) scale(1.5, 2)');
});
