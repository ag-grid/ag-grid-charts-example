import {Scene} from "@ag-enterprise/grid-charts/src/charts/scene/scene";
import {Group} from "@ag-enterprise/grid-charts/src/charts/scene/group";
import {Line} from "@ag-enterprise/grid-charts/src/charts/scene/shape/line";
import {Text} from "@ag-enterprise/grid-charts/src/charts/scene/shape/text";
import {Node} from "@ag-enterprise/grid-charts/src/charts/scene/node";

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene({
        width: 800,
        height: 600
    });
    scene.parent = document.body;
    scene.renderFrameIndex = false;
    const group = new Group();

    const x = 200;
    const verticalLine = new Line();
    verticalLine.x1 = x;
    verticalLine.y1 = 0;
    verticalLine.x2 = x;
    verticalLine.y2 = 600;

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
    const fontSize = 18;
    const fontFamily = 'Papyrus';
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
    alphabeticText.fontSize = fontSize;
    alphabeticText.fontFamily = fontFamily;
    // assuming `textBaseline = 'alphabetic'` default
    const alphabeticTextLine = new Line();
    alphabeticTextLine.x1 = 50;
    alphabeticTextLine.y1 = alphabeticTextY;
    alphabeticTextLine.x2 = 350;
    alphabeticTextLine.y2 = alphabeticTextY;

    const baselineNodes: Node[] = [];
    baselines.forEach((baseline, i) => {
        const y = alphabeticTextY + (i + 1) * 60;
        const text = new Text();
        text.text = baseline + ' ' + testText;
        text.x = x;
        text.y = y;
        text.fontSize = fontSize;
        text.fontFamily = fontFamily;
        text.textAlign = 'center';
        text.textBaseline = baseline;
        const textLine = new Line();
        textLine.x1 = 50;
        textLine.y1 = y;
        textLine.x2 = 350;
        textLine.y2 = y;
        baselineNodes.push(text, textLine);
    });

    // `strokeStyle` test
    const strokeText = new Text();
    strokeText.text = 'Lorem Ipsum';
    strokeText.x = 400;
    strokeText.y = 100;
    strokeText.fontStyle = 'italic';
    strokeText.fontWeight = 'bold';
    strokeText.fontSize = 44;
    strokeText.fontFamily = 'Verdana';
    strokeText.stroke = 'red';
    strokeText.strokeWidth = 3;
    // strokeText.translationX = 50;
    // strokeText.rotation = Math.PI / 8;

    group.append([
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
