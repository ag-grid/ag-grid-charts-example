import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Selection } from "ag-grid-enterprise/src/charts/scene/selection";
import * as d3 from "d3";
import { data } from "./data";
import { FinvizMapData } from "./finviz_data";
import { Rect } from "ag-grid-enterprise/src/charts/scene/shape/rect";
import { Text } from "ag-grid-enterprise/src/charts/scene/shape/text";
import { createButton } from "../../lib/ui";

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

document.addEventListener('DOMContentLoaded', () => {
    const width = 1200;
    const height = 800;
    const scene = new Scene(width, height);
    scene.parent = document.body;

    const rootGroup = new Group();

    scene.root = rootGroup;

    const dataRoot = d3.hierarchy(data).sum(datum => datum.children ? 1 : datum.size);
    const treemapLayout = d3.treemap().size([width, height]).round(true).padding(4);
    const descendants = treemapLayout(dataRoot).descendants();

    // console.log(dataRoot);
    // console.log(descendants);

    let groupSelection: Selection<Group, Group, any, any> = Selection.select(rootGroup).selectAll<Group>();

    const updateGroups = groupSelection.setData(descendants);
    updateGroups.exit.remove();

    const enterGroups = updateGroups.enter.append(Group);
    enterGroups.append(Rect);
    enterGroups.append(Text);

    groupSelection = updateGroups.merge(enterGroups);

    const colorScale = d3.scaleLinear().domain([-5,5]).range([0, 1]);
    const colorInterpolator = d3.interpolate('#cb4b3f', '#6acb64');

    groupSelection.selectByClass(Rect).each((rect, datum, index) => {
        // console.log(datum);

        rect.fill = datum.children ? 'white' : colorInterpolator(colorScale(-5 + Math.random() * 10));
        rect.stroke = 'black';
        rect.strokeWidth = 1;
        rect.crisp = true;

        rect.x = datum.x0;
        rect.y = datum.y0;
        rect.width = datum.x1 - datum.x0;
        rect.height = datum.y1 - datum.y0;
    });

    groupSelection.selectByClass(Text).each((text, datum, index) => {
        // console.log(datum);

        // text.fill = 'black';
        text.font = '12px Verdana, sans-serif';

        text.text = datum.data.name;
        const bbox = text.getBBox();
        text.visible = !datum.children && (datum.x1 - datum.x0) - 4 * 2 > bbox.width && (datum.y1 - datum.y0) - 4 * 2 > bbox.height;
        text.x = datum.x0 + 5;
        text.y = datum.y0 + 13;
    });

    createButton('Save', () => {
        scene.download();
    });
});
