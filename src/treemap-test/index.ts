import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Selection } from "ag-grid-enterprise/src/charts/scene/selection";
import * as d3 from "d3";
import { data } from "./data";
import { FinvizMapData } from "./finviz_data";
import { HdpiCanvas } from "ag-grid-enterprise/src/charts/canvas/hdpiCanvas";
import { Rect } from "ag-grid-enterprise/src/charts/scene/shape/rect";
import { Text } from "ag-grid-enterprise/src/charts/scene/shape/text";
import { convertGridTreeData, rowData } from "./convert";

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

const fontName = '12px Verdana, sans-serif';

function createStockTreeMap() {
    const scene = new Scene(1200, 800);
    scene.parent = document.body;

    const rootGroup = new Group();

    scene.root = rootGroup;

    let groupSelection: Selection<Group, Group, any, any> = Selection.select(rootGroup).selectAll<Group>();

    const colorMap = new Map<Rect, string>();

    function update() {
        const [width, height] = scene.size;
        const dataRoot = d3.hierarchy(data).sum(datum => datum.children ? 1 : datum.size);
        const treemapLayout = d3.treemap().size([width, height]).round(true)
            .paddingRight(2).paddingBottom(2).paddingLeft(2).paddingTop(node => {
                const name = (node.data as any).name;
                const nameSize = HdpiCanvas.getTextSize(name, fontName);
                const width = node.x1 - node.x0;
                const hasTitlePadding = node.depth > 0 && node.children && nameSize.width - 4 < width;
                (node as any).hasTitle = hasTitlePadding;
                return hasTitlePadding ? 15 : 2;
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
                fill = isParent ? 'white' : colorInterpolator(colorScale(-5 + Math.random() * 10));
                colorMap.set(rect, fill);
            }
            rect.fill = fill;
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

            text.text = datum.data.name;
            const bbox = text.getBBox();
            text.visible = !isRoot && (datum.x1 - datum.x0) - 2 * 2 > bbox.width && (datum.y1 - datum.y0) - 2 * 2 > bbox.height || datum.hasTitle;
            text.x = datum.x0 + 3;
            text.y = datum.y0 + 4;
        });
    }

    update();
    makeResizeable(scene, update);
}

function createOrgTreeMap() {
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
    createStockTreeMap();
    document.body.appendChild(document.createElement('br'));
    createOrgTreeMap();
});
