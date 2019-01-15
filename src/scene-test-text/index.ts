import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Line} from "ag-grid-enterprise/src/charts/scene/shape/line";
import {PixelSnapBias} from "ag-grid-enterprise/src/charts/canvas/canvas";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(document.body, 800, 400);
    const group = new Group();

    let x1 = 50;
    let x2 = 100;
    const diagonalSegment = new Line([50, 50, 100, 100]);
    const verticalSegment = new Line([150, 150, 150, 250]);
    const horizontalSegment = new Line([200, 100, 300, 100]);
    const movingSegment1 = new Line([x1, 200, x1, 300]);
    const movingSegment2 = new Line([x2, 200, x2, 300]);

    diagonalSegment.lineWidth = 1;
    verticalSegment.lineWidth = 1;
    horizontalSegment.lineWidth = 1;

    movingSegment1.lineWidth = 1;
    movingSegment2.lineWidth = 1;

    group.add([
        diagonalSegment,
        verticalSegment,
        horizontalSegment,
        movingSegment1,
        movingSegment2
    ]);

    setTimeout(() => {
        verticalSegment.pixelSnapBias = PixelSnapBias.Negative;
        horizontalSegment.pixelSnapBias = PixelSnapBias.Negative;
    }, 2000);

    (function step() {
        // Pixel grid alignment causes no issues during animation,
        // if position as well as position increment are integers.
        x1 += 1;
        movingSegment1.x1 = x1;
        movingSegment1.x2 = x1;

        // However, a more fine grained changes to position will
        // result in a visible flickering on non-retina displays,
        // whether pixel grid alignment is used or not. So we don't
        // provide an option in the Segment node to disable it (it's
        // been tested and removed).
        x2 += 0.2;
        movingSegment2.x1 = x2;
        movingSegment2.x2 = x2;

        if (x1 < 750) {
            requestAnimationFrame(step);
        }
    })();

    scene.root = group;
});
