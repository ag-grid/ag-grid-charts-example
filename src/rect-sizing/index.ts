import { Scene } from "ag-charts-community/src/scene/scene";
import { Group } from "ag-charts-community/src/scene/group";
import { Rect, RectSizing } from "ag-charts-community/src/scene/shape/rect";
import { createSlider } from "../../lib/ui";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene();
    scene.resize(800, 800);
    scene.container = document.body;
    const group = new Group();

    const rect1 = new Rect();
    rect1.x = 100;
    rect1.y = 100;
    rect1.width = 200;
    rect1.height = 200;
    rect1.fill = 'red';
    rect1.stroke = 'black';
    rect1.sizing = RectSizing.Content;

    const rect2 = new Rect();
    rect2.x = 400;
    rect2.y = 100;
    rect2.width = 200;
    rect2.height = 200;
    rect2.fill = 'red';
    rect2.stroke = 'black';
    rect2.sizing = RectSizing.Border;

    const rect3 = new Rect();
    rect3.x = 700;
    rect3.y = 100;
    rect3.width = 20;
    rect3.height = 20;
    rect3.fill = 'red';
    rect3.stroke = 'black';
    rect3.sizing = RectSizing.Border;

    const rect4 = new Rect();
    rect4.x = 700;
    rect4.y = 250;
    rect4.width = 20;
    rect4.height = 2;
    rect4.fill = 'red';
    rect4.stroke = 'black';
    rect4.sizing = RectSizing.Border;

    const rect5 = new Rect();
    rect5.x = 700;
    rect5.y = 300;
    rect5.width = 2;
    rect5.height = 20;
    rect5.fill = 'red';
    rect5.stroke = 'black';
    rect5.sizing = RectSizing.Border;

    const rect6 = new Rect();
    rect6.x = 213.744290865384613;
    rect6.y = 622.66658101934716;
    rect6.width = 36.65144230769231;
    rect6.height = 4.439123395946794;
    rect6.fill = '#9c27b0';
    rect6.stroke = '#6d1b7b';
    rect6.sizing = RectSizing.Border;
    rect6.strokeWidth = 6;

    const rect7 = new Rect();
    rect7.x = 213.744290865384613;
    rect7.y = 635;
    rect7.width = 36.65144230769231;
    rect7.height = 4.439123395946794;
    rect7.fill = '#9c27b0';
    rect7.stroke = '#6d1b7b';
    rect7.sizing = RectSizing.Border;
    rect7.strokeWidth = 0;

    const barRect1 = new Rect();
    barRect1.x = 290.4833409926471;
    barRect1.y = 370;
    barRect1.width = 101.03768382352942;
    barRect1.height = 30;
    barRect1.sizing = RectSizing.Border;
    barRect1.strokeWidth = 15;
    barRect1.fill = 'red';
    barRect1.stroke = 'maroon';

    const barRect2 = new Rect();
    barRect2.x = 290.4833409926471;
    barRect2.y = 341.6666666666667;
    barRect2.width = 101.03768382352942;
    barRect2.height = 28.333333333333314;
    barRect2.sizing = RectSizing.Border;
    barRect2.strokeWidth = 15;
    barRect2.fill = 'cyan';
    barRect2.stroke = 'lime';

    const barRect3 = new Rect();
    barRect3.x = 290.4833409926471;
    barRect3.y = 310;
    barRect3.width = 101.03768382352942;
    barRect3.height = 31.666666666666686;
    barRect3.sizing = RectSizing.Border;
    barRect3.strokeWidth = 15;
    barRect3.fill = 'red';
    barRect3.stroke = 'maroon';

    group.append(rect1);
    group.append(rect2);
    group.append(rect3);
    group.append(rect4);
    group.append(rect5);
    group.append(rect6);
    group.append(rect7);

    group.append(barRect1);
    group.append(barRect2);
    group.append(barRect3);

    scene.root = group;

    document.body.appendChild(document.createElement('br'));
    createSlider('Stroke width', [0, 2, 4, 6, 8, 10, 12, 16, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 500, 1000], v => {
        rect1.strokeWidth = v;
        rect2.strokeWidth = v;
        rect3.strokeWidth = v;
        rect4.strokeWidth = v;
        rect5.strokeWidth = v;
        rect6.strokeWidth = v;
        rect7.strokeWidth = v;

        barRect1.strokeWidth = v;
        barRect2.strokeWidth = v;
        barRect3.strokeWidth = v;
    });
});
