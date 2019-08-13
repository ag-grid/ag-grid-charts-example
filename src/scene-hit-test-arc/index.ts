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

    const arc = Arc.create(250, 150, 100, 50, toRadians(90), toRadians(350));
    arc.stroke = 'red';
    arc.type = ArcType.Chord;

    const arc2 = Arc.create(500, 200, 80, 150, 0, toRadians(120));
    arc2.stroke = 'red';
    arc2.type = ArcType.Chord;

    const arc3 = Arc.create(300, 50, 30);
    arc3.stroke = 'red';
    arc3.type = ArcType.Chord;

    rootGroup.append([pimpGroup, arc2]);
    pimpGroup.append([arcGroup, arc3]);
    arcGroup.append(arc);

    scene.root = rootGroup;
});
