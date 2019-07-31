import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Text } from "ag-grid-enterprise/src/charts/scene/shape/text";
import { DropShadow } from "ag-grid-enterprise/src/charts/scene/dropShadow";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(800, 400);
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
    text.fillShadow = new DropShadow({
        color: 'red',
        xOffset: 5,
        yOffset: 5,
        blur: 10
    });
    text.strokeShadow = new DropShadow({
        color: 'green',
        xOffset: 15,
        yOffset: 20,
        blur: 3
    });
    text.x = 100;
    text.y = 100;

    const rootGroup = new Group();
    rootGroup.append(text);

    scene.root = rootGroup;
});
