import { Scene } from "@ag-grid-enterprise/grid-charts/src/charts/scene/scene";
import { Group } from "@ag-grid-enterprise/grid-charts/src/charts/scene/group";
import { Text } from "@ag-grid-enterprise/grid-charts/src/charts/scene/shape/text";
import { DropShadow } from "@ag-grid-enterprise/grid-charts/src/charts/scene/dropShadow";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 800,
        height: 400
    });
    scene.parent = document.body;

    const text = new Text();
    text.text = 'Hello';
    text.fontWeight = 'bold';
    text.fontSize = 80;
    text.fontFamily = 'Verdana, sans-serif';
    text.fill = 'red';
    text.stroke = 'black';
    text.strokeWidth = 3;
    text.lineDash = [6, 3];

    text.fillShadow = new DropShadow();
    text.fillShadow.color = 'red';
    text.fillShadow.xOffset = 5;
    text.fillShadow.yOffset = 5;
    text.fillShadow.blur = 10;

    text.strokeShadow = new DropShadow();
    text.strokeShadow.color = 'green';
    text.strokeShadow.xOffset = 15;
    text.strokeShadow.yOffset = 20;
    text.strokeShadow.blur = 3;

    text.x = 100;
    text.y = 100;

    const rootGroup = new Group();
    rootGroup.append(text);

    scene.root = rootGroup;
});
