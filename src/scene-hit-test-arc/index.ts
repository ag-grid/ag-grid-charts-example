import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Arc, ArcType} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {toRadians} from "ag-grid-enterprise/src/charts/util/angle";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 800,
        height: 400
    });
    scene.parent = document.body;
    const rootGroup = new Group();
    const pimpGroup = new Group();
    const arcGroup = new Group();

    rootGroup.translationX = 30;
    pimpGroup.rotationDeg = 30;
    arcGroup.scalingX = 1.2;

    const arc = new Arc();
    arc.centerX = 250;
    arc.centerY = 150;
    arc.radiusX = 100;
    arc.radiusY = 50;
    arc.startAngle = toRadians(90);
    arc.endAngle = toRadians(350);
    arc.stroke = 'red';
    arc.type = ArcType.Chord;

    const arc2 = new Arc();
    arc2.centerX = 500;
    arc2.centerY = 200;
    arc2.radiusX = 80;
    arc2.radiusY = 150;
    arc2.startAngle = 0;
    arc2.endAngle = toRadians(120);
    arc2.stroke = 'red';
    arc2.type = ArcType.Chord;

    const arc3 = new Arc();
    arc3.centerX = 300;
    arc3.centerY = 50;
    arc3.radiusX = 30;
    arc3.radiusY = 30;
    arc3.stroke = 'red';
    arc3.type = ArcType.Chord;

    rootGroup.append([pimpGroup, arc2]);
    pimpGroup.append([arcGroup, arc3]);
    arcGroup.append(arc);

    scene.root = rootGroup;
});
