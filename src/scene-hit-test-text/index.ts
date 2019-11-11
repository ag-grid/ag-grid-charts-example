import {Scene} from "@ag-grid-enterprise/charts/src/charts/scene/scene";
import {Group} from "@ag-grid-enterprise/charts/src/charts/scene/group";
import {Text} from "@ag-grid-enterprise/charts/src/charts/scene/shape/text";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 800,
        height: 400
    });
    scene.parent = document.body;
    const rootGroup = new Group();
    const pimpGroup = new Group();
    const textGroup = new Group();

    rootGroup.translationX = 100;
    pimpGroup.rotationDeg = 30;
    textGroup.scalingY = 2;

    const text = new Text();
    text.text = 'Scrooggle';
    text.x = 100;
    text.y = 100;
    text.rotation = -Math.PI / 6;

    rootGroup.append(pimpGroup);
    pimpGroup.append(textGroup);
    textGroup.append(text);

    scene.root = rootGroup;
});
