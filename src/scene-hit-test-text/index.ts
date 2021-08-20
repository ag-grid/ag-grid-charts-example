import { Group } from "../../charts/scene/group";
import { Text } from "../../charts/scene/shape/text";
import { Scene } from "../../charts/scene/scene";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene();
    scene.resize(800, 400);
    scene.container = document.body;

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
