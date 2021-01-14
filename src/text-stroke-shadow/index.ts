import { Scene } from "ag-charts-community/src/scene/scene";
import { Group } from "ag-charts-community/src/scene/group";
import { Text } from "ag-charts-community/src/scene/shape/text";
import { DropShadow } from "ag-charts-community/src/scene/dropShadow";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene();
    scene.resize(800, 400);
    scene.container = document.body;

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
