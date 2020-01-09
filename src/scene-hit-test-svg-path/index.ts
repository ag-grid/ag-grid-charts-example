import {Scene} from "ag-charts-community/src/scene/scene";
import {Group} from "ag-charts-community/src/scene/group";
import {Path} from "ag-charts-community/src/scene/shape/path";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene();
    scene.resize(1000, 400);
    scene.container = document.body;

    const rootGroup = new Group();
    const pimpGroup = new Group();
    const innerGroup = new Group();

    rootGroup.translationX = 100;
    pimpGroup.rotationDeg = 30;
    innerGroup.scalingX = 0.7;

    const applePathString = 'M1585 1215q-39 125-123 250-129 196-257 196-49 0-140-32-86-32-151-32-61 0-142 33-81 34-132 34-152 0-301-259-147-261-147-503 0-228 113-374 113-144 284-144 72 0 177 30 104 30 138 30 45 0 143-34 102-34 173-34 119 0 213 65 52 36 104 100-79 67-114 118-65 94-65 207 0 124 69 223t158 126zm-376-1173q0 61-29 136-30 75-93 138-54 54-108 72-37 11-104 17 3-149 78-257 74-107 250-148 1 3 2.5 11t2.5 11q0 4 .5 10t.5 10z';
    const mobilePathString = 'M976 1408q0-33-23.5-56.5t-56.5-23.5-56.5 23.5-23.5 56.5 23.5 56.5 56.5 23.5 56.5-23.5 23.5-56.5zm208-160v-704q0-13-9.5-22.5t-22.5-9.5h-512q-13 0-22.5 9.5t-9.5 22.5v704q0 13 9.5 22.5t22.5 9.5h512q13 0 22.5-9.5t9.5-22.5zm-192-848q0-16-16-16h-160q-16 0-16 16t16 16h160q16 0 16-16zm288-16v1024q0 52-38 90t-90 38h-512q-52 0-90-38t-38-90v-1024q0-52 38-90t90-38h512q52 0 90 38t38 90z';

    const applePath = new Path();
    applePath.svgPath = applePathString;
    applePath.scalingX = 0.2;
    applePath.scalingY = 0.2;
    applePath.fill = '#8b888d';
    applePath.stroke = 'black';
    applePath.strokeWidth = 3;

    const applePath2 = new Path();
    applePath2.svgPath = applePathString;
    applePath2.scalingX = 0.2;
    applePath2.scalingY = 0.2;
    applePath2.translationX = 50;
    applePath2.fill = '#61afef';
    applePath2.stroke = 'black';
    applePath2.strokeWidth = 3;

    const mobilePath = new Path();
    mobilePath.svgPath = mobilePathString;
    mobilePath.translationX = 400;
    mobilePath.scalingX = 0.25;
    mobilePath.scalingY = 0.25;
    mobilePath.fill = '#3ead3f';
    mobilePath.stroke = 'black';
    mobilePath.strokeWidth = 3;

    rootGroup.append([applePath, mobilePath, pimpGroup]);
    pimpGroup.append([innerGroup]);
    innerGroup.append(applePath2);

    scene.root = rootGroup;
});
