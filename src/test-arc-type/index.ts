import {Scene} from "@ag-grid-enterprise/grid-charts/src/charts/scene/scene";
import {Group} from "@ag-grid-enterprise/grid-charts/src/charts/scene/group";
import {Text} from "@ag-grid-enterprise/grid-charts/src/charts/scene/shape/text";
import {Arc, ArcType} from "@ag-grid-enterprise/grid-charts/src/charts/scene/shape/arc";
import {toRadians} from "@ag-grid-enterprise/grid-charts/src/charts/util/angle";
import { areaRadial } from "d3";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 700,
        height: 900
    });
    scene.parent = document.body;
    const rootGroup = new Group();

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 100;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(0);
        arc.endAngle = toRadians(270);
        arc.fill = 'gold';
        arc.stroke = 'red';
        arc.strokeWidth = 5;
        // arc.type = ArcType.Open; // default
        rootGroup.append(arc);

        const text = new Text();
        text.text = "ArcType.Open";
        text.textAlign = 'center';
        text.x = 100;
        text.y = 10;
        rootGroup.append(text);
    }

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 100;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(0);
        arc.endAngle = toRadians(270);
        arc.fill = 'gold';
        arc.stroke = 'green';
        arc.strokeWidth = 5;
        arc.translationX = 200;
        arc.type = ArcType.Chord;
        rootGroup.append(arc);

        const text = new Text();
        text.text = "ArcType.Chord";
        text.textAlign = 'center';
        text.translationX = 200;
        text.x = 100;
        text.y = 10;
        rootGroup.append(text);
    }

    {
        const arc = new Arc();
        arc.centerY = 100;
        arc.centerY = 100;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(0);
        arc.endAngle = toRadians(270);
        arc.fill = 'gold';
        arc.stroke = 'blue';
        arc.strokeWidth = 5;
        arc.translationX = 400;
        arc.type = ArcType.Round;
        rootGroup.append(arc);

        const text = new Text();
        text.text = "ArcType.Round";
        text.textAlign = 'center';
        text.translationX = 400;
        text.x = 100;
        text.y = 10;
        rootGroup.append(text);
    }

    // ------------------------------------------------------------------------

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 300;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(0);
        arc.endAngle = toRadians(230);
        arc.fill = 'gold';
        arc.stroke = 'red';
        arc.strokeWidth = 5;
        // arc.type = ArcType.Open; // default
        rootGroup.append(arc);
    }

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 300;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(0);
        arc.endAngle = toRadians(230);
        arc.fill = 'gold';
        arc.stroke = 'green';
        arc.strokeWidth = 5;
        arc.translationX = 200;
        arc.type = ArcType.Chord;
        rootGroup.append(arc);
    }

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 300;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(0);
        arc.endAngle = toRadians(230);
        arc.fill = 'gold';
        arc.stroke = 'blue';
        arc.strokeWidth = 5;
        arc.translationX = 400;
        arc.type = ArcType.Round;
        rootGroup.append(arc);
    }

    // ------------------------------------------------------------------------

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 500;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(-70);
        arc.endAngle = toRadians(20);
        arc.fill = 'gold';
        arc.stroke = 'red';
        arc.strokeWidth = 5;
        // arc.type = ArcType.Open; // default
        rootGroup.append(arc);
    }

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 500;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(-70);
        arc.endAngle = toRadians(20);
        arc.fill = 'gold';
        arc.stroke = 'green';
        arc.strokeWidth = 5;
        arc.translationX = 200;
        arc.type = ArcType.Chord;
        rootGroup.append(arc);
    }

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 500;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = toRadians(-70);
        arc.endAngle = toRadians(20);
        arc.fill = 'gold';
        arc.stroke = 'blue';
        arc.strokeWidth = 5;
        arc.translationX = 400;
        arc.type = ArcType.Round;
        rootGroup.append(arc);
    }

    // ------------------------------------------------------------------------

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 700;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = 0;
        arc.endAngle = Math.PI * 2;
        arc.fill = 'gold';
        arc.stroke = 'red';
        arc.strokeWidth = 5;
        // arc.type = ArcType.Open; // default
        rootGroup.append(arc);
    }

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 700;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = 0;
        arc.endAngle = Math.PI * 2;
        arc.fill = 'gold';
        arc.stroke = 'green';
        arc.strokeWidth = 5;
        arc.translationX = 200;
        arc.type = ArcType.Chord;
        rootGroup.append(arc);
    }

    {
        const arc = new Arc();
        arc.centerX = 100;
        arc.centerY = 700;
        arc.radiusX = 80;
        arc.radiusY = 80;
        arc.startAngle = 0;
        arc.endAngle = Math.PI * 2;
        arc.fill = 'gold';
        arc.stroke = 'blue';
        arc.strokeWidth = 5;
        arc.translationX = 400;
        arc.type = ArcType.Round;
        rootGroup.append(arc);

        const text = new Text();
        text.text = "Should't have a stroke from the center to 3 o-clock";
        text.translationX = 400;
        text.textAlign = 'center';
        text.x = 100;
        text.y = 600;
        rootGroup.append(text);
    }

    scene.root = rootGroup;
});
