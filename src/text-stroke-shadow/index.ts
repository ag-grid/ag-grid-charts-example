import { DropShadow } from "../../charts/scene/dropShadow";
import { Group } from "../../charts/scene/group";
import { Scene } from "../../charts/scene/scene";
import { Text } from "../../charts/scene/shape/text";

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
