import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc} from "ag-grid-enterprise/src/charts/scene/shape/arcPath2D";
import {FpsCounter} from "ag-grid-enterprise/src/charts/scene/fpsCounter";
import { ArcType } from "ag-grid-enterprise/src/charts/scene/shape/arc";

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
        arc.x = Math.random() * width;
        arc.y = Math.random() * height;
        arc.radius = 7;
        arc.endAngle = 3 * Math.PI / 2;
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

            arc.x += delta[0];
            arc.y += delta[1];

            if (arc.x > width) {
                arc.x -= width;
            }
            else if (arc.x < 0) {
                arc.x += width;
            }

            if (arc.y > height) {
                arc.y -= height;
            }
            else if (arc.y < 0) {
                arc.y += height;
            }
        });

        requestAnimationFrame(step);
    })();
});
