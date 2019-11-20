import {Scene} from "@ag-grid-enterprise/charts/src/charts/scene/scene";
import {Group} from "@ag-grid-enterprise/charts/src/charts/scene/group";
import {Arc} from "@ag-grid-enterprise/charts/src/charts/scene/shape/arc";
import {Selection} from "@ag-grid-enterprise/charts/src/charts/scene/selection";
import {FpsCounter} from "@ag-grid-enterprise/charts/src/charts/scene/fpsCounter";

document.addEventListener('DOMContentLoaded', () => {
    const width = 800;
    const height = 400;
    const scene = new Scene();
    scene.width = width;
    scene.height = height;
    scene.parent = document.body;

    const group = new Group();

    const deltas: [number, number][] = [];

    const n = 1000;
    for (let i = 0; i < n; i++) {
        deltas.push([Math.random() - 0.5, Math.random() - 0.5]);
    }

    const selection = Selection.select(group).selectAll().setData(deltas).enter.append(Arc);

    selection.each(arc => {
        arc.centerX = 0;
        arc.centerY = 0;
        arc.radiusX = 7;
        arc.radiusY = 7;
        arc.endAngle = 3 * Math.PI / 2;
        arc.translationX = Math.random() * width;
        arc.translationY = Math.random() * height;
        arc.fill = 'red';
        arc.stroke = 'black';
        arc.strokeWidth = 3;
    });

    scene.root = group;

    const fpsCounter = new FpsCounter(document.body);

    (function step() {
        fpsCounter.countFrame();

        selection.each((arc, datum) => {
            arc.translationX += datum[0];
            arc.translationY += datum[1];

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
