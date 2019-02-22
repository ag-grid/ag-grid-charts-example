import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Text} from "ag-grid-enterprise/src/charts/scene/shape/text";
import {Arc, ArcType} from "ag-grid-enterprise/src/charts/scene/shape/arc";
import {toRadians} from "ag-grid-enterprise/src/charts/util/angle";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(700, 900);
    scene.parent = document.body;
    const rootGroup = new Group();

    {
        const arc = Arc.create(100, 100, 80, 80, toRadians(0), toRadians(270));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'red';
        arc.lineWidth = 5;
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
        const arc = Arc.create(100, 100, 80, 80, toRadians(0), toRadians(270));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'green';
        arc.lineWidth = 5;
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
        const arc = Arc.create(100, 100, 80, 80, toRadians(0), toRadians(270));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'blue';
        arc.lineWidth = 5;
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
        const arc = Arc.create(100, 300, 80, 80, toRadians(0), toRadians(230));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'red';
        arc.lineWidth = 5;
        // arc.type = ArcType.Open; // default
        rootGroup.append(arc);
    }

    {
        const arc = Arc.create(100, 300, 80, 80, toRadians(0), toRadians(230));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'green';
        arc.lineWidth = 5;
        arc.translationX = 200;
        arc.type = ArcType.Chord;
        rootGroup.append(arc);
    }

    {
        const arc = Arc.create(100, 300, 80, 80, toRadians(0), toRadians(230));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'blue';
        arc.lineWidth = 5;
        arc.translationX = 400;
        arc.type = ArcType.Round;
        rootGroup.append(arc);
    }

    // ------------------------------------------------------------------------

    {
        const arc = Arc.create(100, 500, 80, 80, toRadians(-70), toRadians(20));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'red';
        arc.lineWidth = 5;
        // arc.type = ArcType.Open; // default
        rootGroup.append(arc);
    }

    {
        const arc = Arc.create(100, 500, 80, 80, toRadians(-70), toRadians(20));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'green';
        arc.lineWidth = 5;
        arc.translationX = 200;
        arc.type = ArcType.Chord;
        rootGroup.append(arc);
    }

    {
        const arc = Arc.create(100, 500, 80, 80, toRadians(-70), toRadians(20));
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'blue';
        arc.lineWidth = 5;
        arc.translationX = 400;
        arc.type = ArcType.Round;
        rootGroup.append(arc);
    }

    // ------------------------------------------------------------------------

    {
        const arc = Arc.create(100, 700, 80, 80, 0, Math.PI * 2);
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'red';
        arc.lineWidth = 5;
        // arc.type = ArcType.Open; // default
        rootGroup.append(arc);
    }

    {
        const arc = Arc.create(100, 700, 80, 80, 0, Math.PI * 2);
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'green';
        arc.lineWidth = 5;
        arc.translationX = 200;
        arc.type = ArcType.Chord;
        rootGroup.append(arc);
    }

    {
        const arc = Arc.create(100, 700, 80, 80, 0, Math.PI * 2);
        arc.fillStyle = 'gold';
        arc.strokeStyle = 'blue';
        arc.lineWidth = 5;
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
