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

    const arc = new Arc(100, 100, 30, 20, 0, Math.PI * 2);

    arc.scalingX = 1.5;
    arc.scalingY = 2;
    arc.rotation = Math.PI / 4;
    arc.translationX = 100;
    arc.translationY = -100;

    const rect = new Rect(200, 100, 50, 50);

    rect.scalingX = 1.5;
    rect.scalingY = 2;
    rect.rotation = Math.PI / 4;
    rect.translationX = 100;
    rect.translationY = -100;

    group.add([arc, rect]);

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
