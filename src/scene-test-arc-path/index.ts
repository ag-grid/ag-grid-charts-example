import {Scene} from "@ag-grid-enterprise/grid-charts/src/charts/scene/scene";
import {Group} from "@ag-grid-enterprise/grid-charts/src/charts/scene/group";
import {Arc, ArcType} from "@ag-grid-enterprise/grid-charts/src/charts/scene/shape/arc";
import {FpsCounter} from "@ag-grid-enterprise/grid-charts/src/charts/scene/fpsCounter";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 800,
        height: 400
    });
    scene.parent = document.body;
    const group = new Group();

    const n = 1000;
    const width = scene.width;
    const height = scene.height;

    const arcs: Arc[] = [];
    const deltas: [number, number][] = [];
    for (let i = 0; i < n; i++) {
        const arc = new Arc();
        arc.centerX = Math.random() * width;
        arc.centerY = Math.random() * height;
        arc.radiusX = 7;
        arc.radiusY = 7;
        arc.startAngle = -Math.PI / 2;
        arc.endAngle = Math.PI;
        arc.fill = 'red';
        arc.stroke = 'black';
        arc.strokeWidth = 3;
        arc.type = ArcType.Round;
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
