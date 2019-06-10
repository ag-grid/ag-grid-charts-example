import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Selection } from "ag-grid-enterprise/src/charts/scene/selection";
import { data } from "./data";
import { FinvizMapData } from "./finviz_data";
import { HdpiCanvas } from "ag-grid-enterprise/src/charts/canvas/hdpiCanvas";
import { Rect } from "ag-grid-enterprise/src/charts/scene/shape/rect";
import { Text } from "ag-grid-enterprise/src/charts/scene/shape/text";
import { DropShadow, Offset } from "ag-grid-enterprise/src/charts/scene/dropShadow";
import { convertGridTreeData, rowData } from "./convert";
import { createButton } from "../../lib/ui";

import * as d3 from "d3";

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

    scene.hdpiCanvas.canvas.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        size = scene.size;
        isDragging = true;
    });
    scene.hdpiCanvas.canvas.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            scene.size = [size[0] + dx, size[1] + dy];
            update();
        }
    });
    scene.hdpiCanvas.canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function createStockTreeMap() {
    const fonts = {
        title: {
            name: 'bold 12px Verdana, sans-serif',
            padding: 15
        },
        subtitle: {
            name: '9px Verdana, sans-serif',
            padding: 13
        },
        label: {
            big: {
                name: 'bold 18px Verdana, sans-serif'
            },
            medium: {
                name: 'bold 14px Verdana, sans-serif'
            },
            small: {
                name: 'bold 10px Verdana, sans-serif'
            }
        }
    };

    const scene = new Scene(1200, 800);
    scene.parent = document.body;

    const rootGroup = new Group();

    scene.root = rootGroup;

    let groupSelection: Selection<Group, Group, any, any> = Selection.select(rootGroup).selectAll<Group>();

    const colorMap = new Map<Rect, string>();
    const nodePadding = 2;

    const labelShadow = new DropShadow('rgba(0,0,0,0.4)', new Offset(1.5,1.5), 0);

    function update() {
        const [width, height] = scene.size;
        const dataRoot = d3.hierarchy(data).sum(datum => datum.children ? 1 : datum.size);
        const treemapLayout = d3.treemap().size([width, height]).round(true)
            .paddingRight(nodePadding).paddingBottom(nodePadding).paddingLeft(nodePadding).paddingTop(node => {
                let name = (node.data as any).name;
                if (node.children) {
                    name = name.toUpperCase();
                }
                const font = node.depth > 1 ? fonts.subtitle : fonts.title;
                const textSize = HdpiCanvas.getTextSize(name, font.name);
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
        enterGroups.append(Text);

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

        groupSelection.selectByClass(Text).each((text, datum, index) => {
            const isLeaf = !datum.children;
            const innerNodeWidth = datum.x1 - datum.x0 - nodePadding * 2;
            const innerNodeHeight = datum.y1 - datum.y0 - nodePadding * 2;
            const hasTitle = datum.hasTitle;
            const font = isLeaf
                ? innerNodeHeight > 40 ? fonts.label.big : innerNodeHeight > 20 ? fonts.label.medium : fonts.label.small
                : (datum.depth > 1 ? fonts.subtitle : fonts.title);
            const isParent = !!datum.children;
            const name = datum.data.name;

            text.font = font.name;
            text.textBaseline = hasTitle ? 'top' : 'middle';
            text.textAlign = hasTitle ? 'left' : 'center';
            text.text = isParent ? name.toUpperCase() : name;

            const textBBox = text.getBBox();

            const hasLabel = isLeaf
                && textBBox.width <= innerNodeWidth
                && textBBox.height <= innerNodeHeight;

            // text.fill = isParent ? 'white' : 'black';
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
    }

    update();
    makeResizeable(scene, update);
}

function createOrgTreeMap() {
    const fontName = '12px Verdana, sans-serif';

    const data = convertGridTreeData(rowData);

    const scene = new Scene(1200, 800);
    scene.parent = document.body;

    const rootGroup = new Group();

    scene.root = rootGroup;

    let groupSelection: Selection<Group, Group, any, any> = Selection.select(rootGroup).selectAll<Group>();

    const colorMap = new Map<Rect, string>();

    function update() {
        const [width, height] = scene.size;
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
            text.font = fontName;
            text.textBaseline = 'top';

            const isRoot = !datum.depth;
            const isParent = !!datum.children;

            text.text = datum.data.orgHierarchy;
            const bbox = text.getBBox();
            text.visible = !isRoot && (datum.x1 - datum.x0) - 2 * 2 > bbox.width && (datum.y1 - datum.y0) - 2 * 2 > bbox.height || datum.hasTitle;
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
