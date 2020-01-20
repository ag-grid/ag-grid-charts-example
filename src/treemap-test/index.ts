import { Group } from "ag-charts-community/src/scene/group";
import { Scene } from "ag-charts-community/src/scene/scene";
import { Selection } from "ag-charts-community/src/scene/selection";
import { data } from "./data";
import { FinvizMapData } from "./finviz_data";
import { Rect } from "ag-charts-community/src/scene/shape/rect";
import { Text, FontWeight } from "ag-charts-community/src/scene/shape/text";
import { DropShadow } from "ag-charts-community/src/scene/dropShadow";
import { convertGridTreeData, rowData } from "./convert";
import { createButton } from "../../lib/ui";

import * as d3 from "d3";
import { HdpiCanvas } from "ag-charts-community/dist/cjs/canvas/hdpiCanvas";

function processFinVizData() {
    console.log(FinvizMapData);

    function process(obj: any): any {
        return {
            name: obj.name,
            description: obj.description,
            size: obj.dx * obj.dy,
            children: obj.children && obj.children.map((child: any) => process(child))
        };
    }

    console.log(JSON.stringify(process(FinvizMapData), null, 4));
}

function makeResizeable(scene: Scene, update: () => void) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let size: [number, number];

    scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        size = [scene.width, scene.height];
        isDragging = true;
    });
    scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            scene.resize(size[0] + dx, size[1] + dy);
            update();
        }
    });
    scene.canvas.element.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

enum TextNodeTag {
    Name,
    Change
}

function createStockTreeMap() {
    const fonts = {
        title: {
            fontWeight: 'bold',
            fontSize: 12,
            fontFamily: 'Verdana, sans-serif',
            padding: 15
        },
        subtitle: {
            fontWeight: '',
            fontSize: 9,
            fontFamily: 'Verdana, sans-serif',
            padding: 13
        },
        label: {
            big: {
                fontWeight: 'bold',
                fontSize: 18,
                fontFamily: 'Verdana, sans-serif'
            },
            medium: {
                fontWeight: 'bold',
                fontSize: 14,
                fontFamily: 'Verdana, sans-serif'
            },
            small: {
                fontWeight: 'bold',
                fontSize: 10,
                fontFamily: 'Verdana, sans-serif'
            }
        }
    };

    const scene = new Scene();
    scene.resize(1200, 800);
    scene.container = document.body;

    const rootGroup = new Group();

    scene.root = rootGroup;

    let groupSelection: Selection<Group, Group, any, any> = Selection.select(rootGroup).selectAll<Group>();

    const colorMap = new Map<Rect, string>();
    const nodePadding = 2;
    const tickerMap = new Map<string, Text | undefined>();

    const labelShadow = new DropShadow();
    labelShadow.color = 'rgba(0,0,0,0.4)';
    labelShadow.xOffset = 1.5;
    labelShadow.yOffset = 1.5;

    function update() {
        const { width, height } = scene;
        const dataRoot = d3.hierarchy(data).sum(datum => datum.children ? 1 : datum.size);
        const treemapLayout = d3.treemap().size([width, height]).round(true)
            .paddingRight(nodePadding).paddingBottom(nodePadding).paddingLeft(nodePadding).paddingTop(node => {
                let name = (node.data as any).name;
                if (node.children) {
                    name = name.toUpperCase();
                }
                const font = node.depth > 1 ? fonts.subtitle : fonts.title;
                const textSize = HdpiCanvas.getTextSize(
                    name, [font.fontWeight, font.fontSize + 'px', font.fontFamily].join(' ').trim()
                );
                const innerNodeWidth = node.x1 - node.x0 - nodePadding * 2;
                const hasTitle = node.depth > 0 && node.children && textSize.width <= innerNodeWidth;
                (node as any).hasTitle = hasTitle;

                if (name === 'Property & Casualty Insurance') {
                    console.log(`node.depth: ${node.depth}, textSize.width: ${textSize.width}, innerNodeWidth: ${innerNodeWidth}`);
                }

                return hasTitle ? font.padding : nodePadding;
            });
        const descendants = treemapLayout(dataRoot).descendants();

        // console.log(dataRoot);
        // console.log(descendants);

        const updateGroups = groupSelection.setData(descendants);
        updateGroups.exit.remove();

        const enterGroups = updateGroups.enter.append(Group);
        enterGroups.append(Rect);
        enterGroups.append(Text).each(node => node.tag = TextNodeTag.Name);
        enterGroups.append(Text).each(node => node.tag = TextNodeTag.Change);

        groupSelection = updateGroups.merge(enterGroups);

        const colorScale = d3.scaleLinear().domain([-5,5]).range([0, 1]);
        const colorInterpolator = d3.interpolate('#cb4b3f', '#6acb64');

        groupSelection.selectByClass(Rect).each((rect, datum, index) => {
            const isParent = !!datum.children;

            let fill = colorMap.get(rect);
            if (!fill) {
                fill = isParent ? '#272931' : colorInterpolator(colorScale(-5 + Math.random() * 10));
                colorMap.set(rect, fill);
            }
            rect.fill = fill;
            rect.stroke = datum.depth < 2 ? undefined : 'black';
            rect.strokeWidth = 1;
            rect.crisp = true;

            rect.x = datum.x0;
            rect.y = datum.y0;
            rect.width = datum.x1 - datum.x0;
            rect.height = datum.y1 - datum.y0;
        });

        groupSelection.selectByTag<Text>(TextNodeTag.Name).each((text, datum, index) => {
            const isLeaf = !datum.children;
            const innerNodeWidth = datum.x1 - datum.x0 - nodePadding * 2;
            const innerNodeHeight = datum.y1 - datum.y0 - nodePadding * 2;
            const hasTitle = datum.hasTitle;
            const font = isLeaf
                ? innerNodeHeight > 40 && innerNodeWidth > 40 ? fonts.label.big : innerNodeHeight > 20  && innerNodeHeight > 20 ? fonts.label.medium : fonts.label.small
                : (datum.depth > 1 ? fonts.subtitle : fonts.title);
            const isParent = !!datum.children;
            const name = datum.data.name;

            text.fontWeight = font.fontWeight as FontWeight;
            text.fontSize = font.fontSize;
            text.fontFamily = font.fontFamily;
            text.textBaseline = isLeaf ? 'bottom' : (hasTitle ? 'top' : 'middle');
            text.textAlign = hasTitle ? 'left' : 'center';
            text.text = isParent ? name.toUpperCase() : name;

            const textBBox = text.computeBBox();

            const hasLabel = isLeaf && textBBox
                && textBBox.width <= innerNodeWidth
                && textBBox.height * 2 + 4 <= innerNodeHeight;

            tickerMap.set(name, hasLabel ? text : undefined);

            text.fill = 'white';
            text.fillShadow = hasLabel ? labelShadow : undefined;
            text.visible = hasTitle || hasLabel;
            if (hasTitle) {
                text.x = datum.x0 + 3;
                text.y = datum.y0 + 2;
            } else {
                text.x = (datum.x0 + datum.x1) / 2;
                text.y = (datum.y0 + datum.y1) / 2;
            }
        });

        groupSelection.selectByTag<Text>(TextNodeTag.Change).each((text, datum, index) => {
            const isLeaf = !datum.children;
            const innerNodeWidth = datum.x1 - datum.x0 - nodePadding * 2;
            // const innerNodeHeight = datum.y1 - datum.y0 - nodePadding * 2;
            // const font = innerNodeHeight > 40 && innerNodeWidth > 40 ? fonts.label.big : innerNodeHeight > 20  && innerNodeHeight > 20 ? fonts.label.medium : fonts.label.small

            text.fontSize = 12;
            text.fontFamily = 'Verdana, sans-serif';
            text.textBaseline = 'top';
            text.textAlign = 'center';
            text.text = '+1.43%';

            const textBBox = text.computeBBox();
            const tickerNode = tickerMap.get(datum.data.name);

            const hasLabel = !!tickerNode || false;

            text.fill = 'white';
            text.fillShadow = labelShadow;
            const isVisible = hasLabel && !!textBBox && textBBox.width < innerNodeWidth;
            text.visible = isVisible;
            if (isVisible) {
                text.x = (datum.x0 + datum.x1) / 2;
                text.y = (datum.y0 + datum.y1) / 2;
            } else {
                if (tickerNode) {
                    tickerNode.textBaseline = 'middle';
                    tickerNode.y = (datum.y0 + datum.y1) / 2;
                }
            }
        });
    }

    update();
    makeResizeable(scene, update);
    document.body.appendChild(document.createElement('br'));
    createButton('Save', () => {
        scene.download();
    });
}

function createOrgTreeMap() {
    const fontName = '12px Verdana, sans-serif';
    const fontSize = 12;
    const fontFamily = 'Verdana, sans-serif';

    const data = convertGridTreeData(rowData);

    const scene = new Scene();
    scene.resize(1200, 800);
    scene.container = document.body;

    const rootGroup = new Group();

    scene.root = rootGroup;

    let groupSelection: Selection<Group, Group, any, any> = Selection.select(rootGroup).selectAll<Group>();

    const colorMap = new Map<Rect, string>();

    function update() {
        const { width, height } = scene;
        const dataRoot = d3.hierarchy(data).sum(datum => datum.children ? 0 : 1);
        const treemapLayout = d3.treemap().size([width, height]).round(true)
            .paddingRight(4).paddingBottom(4).paddingLeft(4).paddingTop(node => {
                const name = (node.data as any).orgHierarchy;
                const nameSize = HdpiCanvas.getTextSize(name, fontName);
                const width = node.x1 - node.x0;
                const hasTitlePadding = node.depth > 0 && node.children && nameSize.width - 4 < width;
                (node as any).hasTitle = hasTitlePadding;
                return hasTitlePadding ? 15 : 4;
            });
        const descendants = treemapLayout(dataRoot).descendants();

        // console.log(dataRoot);
        // console.log(descendants);

        const updateGroups = groupSelection.setData(descendants);
        updateGroups.exit.remove();

        const enterGroups = updateGroups.enter.append(Group);
        enterGroups.append(Rect);
        enterGroups.append(Text);

        groupSelection = updateGroups.merge(enterGroups);

        // @ts-ignore
        const colorScale = d3.scaleLinear().domain([0, 2, 4]).range(['#d73027', '#fee08b', '#1a9850']);

        groupSelection.selectByClass(Rect).each((rect, datum, index) => {
            rect.fill = colorScale(datum.depth);
            rect.stroke = 'black';
            rect.strokeWidth = 1;
            rect.crisp = true;

            rect.x = datum.x0;
            rect.y = datum.y0;
            rect.width = datum.x1 - datum.x0;
            rect.height = datum.y1 - datum.y0;
        });

        groupSelection.selectByClass(Text).each((text, datum, index) => {
            text.fontSize = fontSize;
            text.fontFamily = fontFamily;
            text.textBaseline = 'top';

            const isRoot = !datum.depth;
            const isParent = !!datum.children;

            text.text = datum.data.orgHierarchy;
            const bbox = text.computeBBox();
            if (bbox) {
                text.visible = !isRoot && (datum.x1 - datum.x0) - 2 * 2 > bbox.width && (datum.y1 - datum.y0) - 2 * 2 > bbox.height || datum.hasTitle;
            }
            text.x = datum.x0 + 3;
            text.y = datum.y0 + 4;
        });
    }

    update();
    makeResizeable(scene, update);
}

document.addEventListener('DOMContentLoaded', () => {
    createButton('Create Stock TreeMap', () => {
        document.body.appendChild(document.createElement('br'));
        createStockTreeMap();
    });

    createButton('Create Org TreeMap', () => {
        document.body.appendChild(document.createElement('br'));
        createOrgTreeMap();
    });
});
