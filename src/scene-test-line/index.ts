import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Line} from "ag-grid-enterprise/src/charts/scene/shape/line";
import {PixelSnapBias} from "ag-grid-enterprise/src/charts/canvas/canvas";
import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(document.body, 800, 400);
    const group = new Group();

    let x1 = 50;
    let x2 = 100;
    const diagonalLine = new Line([50, 50, 100, 100]);
    const verticalLine = new Line([150, 150, 150, 250]);
    const horizontalLine = new Line([200, 100, 300, 100]);
    const movingLine1 = new Line([x1, 200, x1, 300]);
    const movingLine2 = new Line([x2, 200, x2, 300]);

    diagonalLine.lineWidth = 1;
    verticalLine.lineWidth = 1;
    horizontalLine.lineWidth = 1;

    movingLine1.lineWidth = 1;
    movingLine2.lineWidth = 1;

    group.add([
        diagonalLine,
        verticalLine,
        horizontalLine,
        movingLine1,
        movingLine2
    ]);

    // Test the other possible option for `pixelSnapBias`.
    // The vertical line should shift to the left, the vertical
    // should notch up.
    setTimeout(() => {
        verticalLine.pixelSnapBias = PixelSnapBias.Negative;
        horizontalLine.pixelSnapBias = PixelSnapBias.Negative;
    }, 2000);

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

    // D3/SVG API

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

    {
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
});
