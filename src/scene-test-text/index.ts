import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Line} from "ag-grid-enterprise/src/charts/scene/shape/line";
import {Text} from "ag-grid-enterprise/src/charts/scene/shape/text";
import {Node} from "ag-grid-enterprise/src/charts/scene/node";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene(document.body, 800, 400);
    const group = new Group();

    const x = 200;
    const verticalLine = Line.create(x, 0, x, 400);

    const testText = 'Groggy Frog';

    // `textAlign` tests
    const startText = new Text();
    startText.text = testText;
    startText.x = x;
    startText.y = 60;
    // assuming `textAlign = 'start'` default
    const endText = new Text();
    endText.text = testText;
    endText.x = x;
    endText.y = 80;
    endText.textAlign = 'end';
    const centerText = new Text();
    centerText.text = testText;
    centerText.x = x;
    centerText.y = 100;
    centerText.textAlign = 'center';

    // `textBaseline` tests
    const font = '18px Verdana';
    const baselines = [ // all possible baselines excluding 'alphabetic'
        'top',
        'hanging',
        'middle',
        'ideographic',
        'bottom'
    ] as CanvasTextBaseline[];

    const alphabeticTextY = 140;
    const alphabeticText = new Text();
    alphabeticText.text = 'alphabetic ' + testText;
    alphabeticText.x = x;
    alphabeticText.y = alphabeticTextY;
    alphabeticText.textAlign = 'center';
    alphabeticText.font = font;
    // assuming `textBaseline = 'alphabetic'` default
    const alphabeticTextLine = Line.create(50, alphabeticTextY, 350, alphabeticTextY);

    const baselineNodes: Node[] = [];
    baselines.forEach((baseline, i) => {
        const y = alphabeticTextY + (i + 1) * 40;
        const text = new Text();
        text.text = baseline + ' ' + testText;
        text.x = x;
        text.y = y;
        text.font = font;
        text.textAlign = 'center';
        text.textBaseline = baseline;
        const textLine = Line.create(50, y, 350, y);
        baselineNodes.push(text, textLine);
    });

    // `strokeStyle` test
    const strokeText = new Text();
    strokeText.text = 'Lorem Ipsum';
    strokeText.x = 400;
    strokeText.y = 100;
    strokeText.font = 'italic bold 44px Tahoma';
    strokeText.strokeStyle = 'red';
    strokeText.lineWidth = 3;
    // strokeText.translationX = 50;
    // strokeText.rotation = Math.PI / 8;

    group.addAll([
        verticalLine,
        startText,
        endText,
        centerText,
        alphabeticText,
        alphabeticTextLine,
        ...baselineNodes,
        strokeText
    ]);

    scene.root = group;
});
