import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {FpsCounter} from "ag-grid-enterprise/src/charts/scene/fpsCounter";

// This example uses translationX/Y properties to position arcs,
// so that the arc paths are not recalculated on every frame.
// Instead, the transformation matrix of each arc is recalculated
// on every frame. This should result in a better performance,
// especially in case of complex paths.

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(800, 400);
    scene.parent = document.body;
    const group = new Group();

    const n = 1000;
    const width = scene.width;
    const height = scene.height;

    const arcs: Arc[] = [];
    const deltas: [number, number][] = [];

    for (let i = 0; i < n; i++) {
        const arc = new Arc();
        arc.centerX = 0;
        arc.centerY = 0;
        arc.radiusX = 7;
        arc.radiusY = 7;
        arc.endAngle = 3 * Math.PI / 2;
        arc.translationX = Math.random() * width;
        arc.translationY = Math.random() * height;
        arc.fillStyle = 'red';
        arc.strokeStyle = 'black';
        arc.lineWidth = 3;
        arcs.push(arc);

        deltas.push([Math.random() - 0.5, Math.random() - 0.5]);
    }
    group.append(arcs);

    scene.root = group;

    const fpsCounter = new FpsCounter(document.body);

    (function step() {
        fpsCounter.countFrame();
        arcs.forEach((arc, i) => {
            const delta = deltas[i];

            arc.translationX += delta[0];
            arc.translationY += delta[1];

            if (arc.translationX > width) {
                arc.translationX -= width;
            }
            else if (arc.translationX < 0) {
                arc.translationX += width;
            }

            if (arc.translationY > height) {
                arc.translationY -= height;
            }
            else if (arc.translationY < 0) {
                arc.translationY += height;
            }
        });

        requestAnimationFrame(step);
    })();
});
