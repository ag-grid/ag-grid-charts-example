import {Selection} from "ag-charts-community/src/scene/selection";
import {Node} from "ag-charts-community/src/scene/node";
import {Group} from "ag-charts-community/src/scene/group";
import {Rect} from "ag-charts-community/src/scene/shape/rect";
import {Scene} from "ag-charts-community/src/scene/scene";
import Scale from "ag-charts-community/src/scale/scale";
import {Line} from "ag-charts-community/src/scene/shape/line";
import {Text} from "ag-charts-community/src/scene/shape/text";
import {normalizeAngle360} from "ag-charts-community/src/util/angle";
import scaleLinear from "ag-charts-community/src/scale/linearScale";
import {BandScale} from "ag-charts-community/src/scale/bandScale";
import {DropShadow} from "ag-charts-community/src/scene/dropShadow";

document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});

class NodeAxis<D> {
    constructor(scale: Scale<D, number>) {
        this.scale = scale;
    }

    scale: Scale<D, number>;

    translation: [number, number] = [0, 0];
    rotation: number = 0; // radians

    lineWidth: number = 1;
    tickWidth: number = 1;
    tickSize: number = 6;
    tickPadding: number = 5;
    lineColor: string = 'black';
    tickColor: string = 'black';
    labelFontSize: number = 14;
    labelFontFamily: string = 'Verdana';
    labelColor: string = 'black';
    flippedLabels: boolean = false;
    mirroredLabels: boolean = false;

    render(group: Group) {
        const nodes: Node[] = [];
        const scale = this.scale;

        group.translationX = this.translation[0];
        group.translationY = this.translation[1];
        group.rotation = this.rotation;

        // Render ticks and labels.
        {
            const ticks = scale.ticks!(10) as any[];
            const bandwidth = (scale.bandwidth || 0) / 2;
            const tickCount = ticks.length;
            const pxShift = Math.floor(this.tickWidth) % 2 / 2;
            const sideFlag = this.mirroredLabels ? 1 : -1;

            for (let i = 0; i < tickCount; i++) {
                const r = scale.convert(ticks[i]) - this.tickWidth / 2 + bandwidth;
                const tick = new Line();
                tick.x1 = sideFlag * this.tickSize;
                tick.y1 = r + pxShift;
                tick.x2 = 0;
                tick.y2 = r + pxShift;
                tick.strokeWidth = this.tickWidth;
                tick.stroke = this.tickColor;
                nodes.push(tick);

                let label: Text;
                if (this.flippedLabels) {
                    const rotation = normalizeAngle360(this.rotation);
                    let flipFlag = (rotation >= 0 && rotation <= Math.PI) ? -1 : 1;

                    label = new Text();
                    label.text = ticks[i].toString();
                    label.x = 0;
                    label.y = -sideFlag * flipFlag * this.tickPadding;
                    label.translationX = sideFlag * (this.tickSize + this.tickPadding);
                    label.translationY = r;
                    label.rotation = flipFlag * Math.PI / 2;
                    label.textAlign = 'center';
                } else {
                    label = new Text();
                    label.text = ticks[i].toString();
                    label.x = sideFlag * (this.tickSize + this.tickPadding);
                    label.y = r;
                    label.textAlign = sideFlag === -1 ? 'end' : 'start';
                }
                label.fontSize = this.labelFontSize;
                label.fontFamily = this.labelFontFamily;
                label.fill = this.labelColor;
                label.textBaseline = 'middle';
                nodes.push(label);
            }
        }

        // Render axis line.
        {
            const delta = Math.floor(this.lineWidth) % 2 / 2;
            const line = new Line();
            line.x1 = delta;
            line.y1 = scale.range[0];
            line.x2 = delta;
            line.y2 = scale.range[scale.range.length - 1];
            line.strokeWidth = this.lineWidth;
            line.stroke = this.lineColor;
            nodes.push(line);
        }

        group.append(nodes);
    }
}

function renderChart() {
    const colors = [
        '#53AFD6',
        '#FDE95C',
        '#A4CA4E',
        '#E76846',
        '#FA8535',
    ];

    const data = [
        {
            category: 'Coffee',

            q1Budget: 500,
            q2Budget: 500,
            q3Budget: 500,
            q4Budget: 500,

            q1Actual: 450,
            q2Actual: 560,
            q3Actual: 600,
            q4Actual: 700
        },
        {
            category: 'Tea',

            q1Budget: 350,
            q2Budget: 400,
            q3Budget: 450,
            q4Budget: 500,

            q1Actual: 270,
            q2Actual: 380,
            q3Actual: 450,
            q4Actual: 520
        },
        {
            category: 'Milk',

            q1Budget: 200,
            q2Budget: 180,
            q3Budget: 180,
            q4Budget: 180,

            q1Actual: 180,
            q2Actual: 170,
            q3Actual: 190,
            q4Actual: 200
        },
    ];

    const yKeys = ['q1Actual', 'q2Actual', 'q3Actual', 'q4Actual'];
    const yNames = ['Q1', 'Q2', 'Q3', 'Q4'];

    const padding = {
        top: 20,
        right: 40,
        bottom: 40,
        left: 60
    };
    const xData = data.map(d => d.category);
    // For each category returns an array of values representing the height
    // of each bar in the group.
    const yData = data.map(datum => {
        const values: number[] = [];
        yKeys.forEach(key => values.push((datum as any)[key]));
        return values;
    });

    const chartWidth = document.body.getBoundingClientRect().width;
    const chartHeight = 480;
    const seriesWidth = chartWidth - padding.left - padding.right;
    const seriesHeight = chartHeight - padding.top - padding.bottom;

    const yScale = scaleLinear();
    // Find the tallest bar in each group, then the tallest bar overall.
    yScale.domain = [0, Math.max(...yData.map(values => Math.max(...values)))];
    yScale.range = [seriesHeight, 0];

    const xGroupScale = new BandScale<string>();
    xGroupScale.domain = xData;
    xGroupScale.range = [0, seriesWidth];
    xGroupScale.paddingInner = 0.1;
    xGroupScale.paddingOuter = 0.3;
    const groupWidth = xGroupScale.bandwidth;

    const xBarScale = new BandScale<string>();
    xBarScale.domain = yKeys;
    xBarScale.range = [0, groupWidth];
    xBarScale.padding = 0.1;
    xBarScale.round = true;
    const barWidth = xBarScale.bandwidth;

    const scene = new Scene();
    scene.width = chartWidth;
    scene.height = chartHeight;
    scene.parent = document.body;
    const rootGroup = new Group();

    // bars
    const barGroup = new Group();
    barGroup.translationX = padding.left;
    barGroup.translationY = padding.top;

    const shadow = new DropShadow();
    shadow.color = 'rgba(0,0,0,0.2)';
    shadow.blur = 15;

    Selection.select(barGroup).selectAll().setData(data, (node, datum) => datum.category)
        .enter.append(Group).each((group, datum) => {
            group.translationX = xGroupScale.convert(datum.category)
        }).selectAll().setData((parent, datum, i) => {
            return yData[i];
        }).enter.call(enter => enter.append(Rect).each((rect, datum, i) => {
            rect.x = xBarScale.convert(yKeys[i]);
            rect.y = yScale.convert(datum);
            rect.width = barWidth;
            rect.height = seriesHeight - rect.y;
            rect.fill = colors[i % colors.length];
            rect.stroke = 'black';
            rect.fillShadow = shadow;
        })).call(enter => enter.append(Text).each((label, datum, i) => {
            label.text = yNames[i];
            label.textAlign = 'center';
            label.x = xBarScale.convert(yKeys[i]) + barWidth / 2;
            label.y = yScale.convert(datum) + 20;
            label.fill = 'black';
            label.fontSize = 14;
            label.fontFamily = 'Verdana';
        }));

    // y-axis
    const yAxisGroup = new Group();
    const yAxis = new NodeAxis<number>(yScale);
    yAxis.translation = [padding.left, padding.top];
    yAxis.render(yAxisGroup);

    // x-axis
    const xAxisGroup = new Group();
    const xAxis = new NodeAxis<string>(xGroupScale);
    xAxis.rotation = -Math.PI / 2;
    xAxis.translation = [padding.left, padding.top + seriesHeight];
    xAxis.flippedLabels = true;
    xAxis.render(xAxisGroup);

    rootGroup.append([barGroup, xAxisGroup, yAxisGroup]);
    scene.root = rootGroup;
}
