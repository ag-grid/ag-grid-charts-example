import {Scene} from "@ag-grid-enterprise/charts/src/charts/scene/scene";
import {Group} from "@ag-grid-enterprise/charts/src/charts/scene/group";
import {Line} from "@ag-grid-enterprise/charts/src/charts/scene/shape/line";
import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {
    sceneGraphTest();
    d3SvgTest();

    lineDashTest();
});

function sceneGraphTest() {
    const scene = new Scene();
    scene.width = 800;
    scene.height = 400;
    scene.parent = document.body;
    const group = new Group();

    let x1 = 50;
    let x2 = 100;
    const diagonalLine = new Line();
    diagonalLine.x1 = 50;
    diagonalLine.y1 = 50;
    diagonalLine.x2 = 100;
    diagonalLine.y2 = 100;

    const verticalLine = new Line();
    verticalLine.x1 = 150;
    verticalLine.y1 = 150;
    verticalLine.x2 = 150;
    verticalLine.y2 = 250;

    const horizontalLine = new Line();
    horizontalLine.x1 = 200;
    horizontalLine.y1 = 100;
    horizontalLine.x2 = 300;
    horizontalLine.y2 = 100;

    const movingLine1 = new Line();
    movingLine1.x1 = x1;
    movingLine1.y1 = 200;
    movingLine1.x2 = x1;
    movingLine1.y2 = 300;

    const movingLine2 = new Line();
    movingLine2.x1 = x2;
    movingLine2.y1 = 200;
    movingLine2.x2 = x2;
    movingLine2.y2 = 300;

    diagonalLine.strokeWidth = 1;
    verticalLine.strokeWidth = 1;
    horizontalLine.strokeWidth = 1;

    movingLine1.strokeWidth = 1;
    movingLine2.strokeWidth = 1;

    group.append([
        diagonalLine,
        verticalLine,
        horizontalLine,
        movingLine1,
        movingLine2
    ]);

    (function step() {
        // Pixel grid alignment causes no issues during animation,
        // if position as well as position increment are integers.
        x1 += 1;
        movingLine1.x1 = x1;
        movingLine1.x2 = x1;

        // However, a more fine grained changes to position will
        // result in a visible flickering on non-retina displays,
        // whether pixel grid alignment is used or not. So we don't
        // provide an option in the Segment node to disable it (it's
        // been tested and removed).
        x2 += 0.2;
        movingLine2.x1 = x2;
        movingLine2.x2 = x2;

        if (x1 < 750) {
            requestAnimationFrame(step);
        }
    })();

    scene.root = group;
}

function d3SvgTest() {
    const g = d3.select(document.body).append('svg')
        .attr('width', 800)
        .attr('height', 400)
        .append('g');

    g.append('line')
        .attr('x1', '50')
        .attr('y1', '50')
        .attr('x2', '100')
        .attr('y2', '100')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    g.append('line')
        .attr('x1', '150')
        .attr('y1', '150')
        .attr('x2', '150')
        .attr('y2', '250')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('shape-rendering', 'crispEdges');

    g.append('line')
        .attr('x1', '200')
        .attr('y1', '100')
        .attr('x2', '300')
        .attr('y2', '100')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('shape-rendering', 'crispEdges');

    let x1 = 50;
    let x2 = 100;
    let x3 = 150;

    const movingLine1 = g.append('line')
        .attr('x1', x1)
        .attr('y1', '200')
        .attr('x2', x1)
        .attr('y2', '300')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('shape-rendering', 'crispEdges');

    const movingLine2 = g.append('line')
        .attr('x1', x2)
        .attr('y1', '200')
        .attr('x2', x2)
        .attr('y2', '300')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('shape-rendering', 'crispEdges');

    const movingLine3 = g.append('line')
        .attr('x1', x3)
        .attr('y1', '200')
        .attr('x2', x3)
        .attr('y2', '300')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    (function step() {
        x1 += 1;
        movingLine1
            .attr('x1', x1)
            .attr('x2', x1);

        // It's interesting that the `crispEdges` option
        // always snaps to the pixel grid. Looks like it does
        // the rounding of the final value. We can emulate that
        // if desired.
        x2 += 0.2;
        movingLine2
            .attr('x1', x2)
            .attr('x2', x2);

        x3 += 0.2;
        movingLine3
            .attr('x1', x3)
            .attr('x2', x3);

        if (x1 < 750) {
            requestAnimationFrame(step);
        }
    })();
}

function lineDashTest() {
    const scene = new Scene();
    scene.width = 800;
    scene.height = 200;
    scene.parent = document.body;
    const rootGroup = new Group();

    const line1 = new Line();
    line1.x1 = 50;
    line1.y1 = 30;
    line1.x2 = 750;
    line1.y2 = 30;
    line1.strokeWidth = 10;
    line1.lineDash = [20, 10, 5];

    const line2 = new Line();
    line2.x1 = 50;
    line2.y1 = 60;
    line2.x2 = 750;
    line2.y2 = 60;
    line2.strokeWidth = 10;
    line2.lineDash = [20, 5, 5, 5];

    const line3 = new Line();
    line3.x1 = 50;
    line3.y1 = 90;
    line3.x2 = 750;
    line3.y2 = 90;
    line3.strokeWidth = 10;
    line3.lineDash = [30, 15];

    const line4 = new Line();
    line4.x1 = 50;
    line4.y1 = 120;
    line4.x2 = 750;
    line4.y2 = 120;
    line4.strokeWidth = 10;
    line4.lineDash = [30, 15];
    line4.lineCap = 'round';

    const line5 = new Line();
    line5.x1 = 50;
    line5.y1 = 150;
    line5.x2 = 750;
    line5.y2 = 150;
    line5.strokeWidth = 10;
    line5.lineDash = [30, 15];
    line5.lineCap = 'square';

    rootGroup.append([line1, line2, line3, line4, line5]);
    scene.root = rootGroup;
}
