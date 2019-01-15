import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {FpsCounter} from "ag-grid-enterprise/src/charts/scene/fpsCounter";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(document.body, 800, 400);
    const group = new Group();

    const n = 1000;
    const width = scene.width;
    const height = scene.height;

    const arcs: Arc[] = [];
    const deltas: [number, number][] = [];
    for (let i = 0; i < n; i++) {
        const arc = new Arc(Math.random() * width, Math.random() * height,
            7, 7, 0, 3 * Math.PI / 2);
        arc.lineWidth = 3;
        arcs.push(arc);

        deltas.push([Math.random() - 0.5, Math.random() - 0.5]);
    }
    group.add(arcs);

    scene.root = group;

    const fpsCounter = new FpsCounter(document.body);

    (function step() {
        fpsCounter.countFrame();
        arcs.forEach((arc, i) => {
            const delta = deltas[i];
            arc.centerX += delta[0];
            arc.centerY += delta[1];
            if (arc.centerX > width) {
                arc.centerX -= width;
            }
            else if (arc.centerX < 0) {
                arc.centerX += width;
            }
            if (arc.centerY > height) {
                arc.centerY -= height;
            }
            else if (arc.centerY < 0) {
                arc.centerY += height;
            }
        });

        requestAnimationFrame(step);
    })();
});
