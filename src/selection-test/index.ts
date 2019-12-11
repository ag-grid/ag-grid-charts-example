import * as _ from 'lodash';
import {EnterNode, Selection} from "ag-charts-community/src/scene/selection";
import {Node} from "ag-charts-community/src/scene/node";
import {Group} from "ag-charts-community/src/scene/group";
import {Rect} from "ag-charts-community/src/scene/shape/rect";
import {Scene} from "ag-charts-community/src/scene/scene";

function test_SelectionSelect() {
    const scene = new Scene();
    scene.width = 100;
    scene.height = 100;
    scene.parent = document.body;
    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection: Selection<Group, Node | EnterNode, any, any> = Selection.select(rootGroup);
    console.assert(rootSelection.node() instanceof Group === true);

    scene.parent = undefined;
}

function test_append_setDatum_attr_each() {
    const scene = new Scene();
    scene.width = 100;
    scene.height = 100;
    scene.parent = document.body;

    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection = Selection.select(rootGroup);


    rootSelection.append(Rect).setDatum(16)
        .attr('x', 20)
        .attr('y', 20)
        .attr('width', 30)
        .attr('height', 30)
        .attr('fill', 'red')
        .attr('stroke', 'blue')
        .attrFn('strokeWidth', (_, datum) => Math.sqrt(datum));

    console.assert(rootGroup.countChildren() === 1);
    console.assert((rootGroup.children[0] as Rect).fill === 'red');


    rootSelection.append(Rect).setDatum(16)
        .each((rect, datum) => {
            rect.x = 40;
            rect.y = 40;
            rect.width = 30;
            rect.height = 30;
            rect.fill = 'magenta';
            rect.stroke = 'black';
            rect.strokeWidth = Math.sqrt(datum);
        });

    console.assert(rootGroup.countChildren() === 2);
    console.assert((rootGroup.children[1] as Rect).fill === 'magenta');

    scene.parent = undefined;
}

function test_selectAll_setData_enter() {
    const scene = new Scene();
    scene.width = 300;
    scene.height = 150;
    scene.parent = document.body;

    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection = Selection.select(rootGroup);

    const data = [1, 2, 3, 4];

    const selection: Selection<Rect, Group, number, number> = rootSelection.selectAll()
        .setData(data).enter.append(Rect).each((rect, datum, index) => {
            rect.x = index * 80;
            rect.y = 50;
            rect.width = 50;
            rect.height = 50;
            rect.fill = 'lime';
            rect.stroke = 'orange';
            rect.strokeWidth = datum;
        });

    console.assert(rootGroup.countChildren() === 4);

    rootGroup.children.forEach((value, index) => {
        console.assert((value as Rect).strokeWidth === index + 1);
        console.assert((value as Rect).x === index * 80);
    });

    console.assert(_.isEqual(selection.data, data) === true);

    scene.parent = undefined;
}

function test_call_merge() {
    const scene = new Scene();
    scene.width = 500;
    scene.height = 250;
    scene.parent = document.body;

    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection = Selection.select(rootGroup);

    const data1 = [1, 2, 3, 4];
    const data2 = [1, 2, 3, 4, 5, 6];
    const data3 = [2, 4, 6];

    function style1(selection: Selection<Rect, Node | EnterNode, number, number>) {
        selection.each((rect, datum, index) => {
            rect.x = index * 80;
            rect.y = 100;
            rect.width = 50;
            rect.height = 50;
            rect.fill = 'cyan';
            rect.stroke = 'blue';
            rect.strokeWidth = datum;
        });
    }

    function style2(selection: Selection<Rect, Node | EnterNode, number, number>) {
        selection.each((rect, datum, index) => {
            rect.x = index * 70;
            rect.y = 150;
            rect.width = 50;
            rect.height = 50;
            rect.fill = 'gold';
            rect.stroke = 'orange';
            rect.strokeWidth = datum * 2;
        });
    }

    const selection = rootSelection.selectAll().setData(data1).enter.append(Rect).call(style1);

    console.assert(rootGroup.countChildren() === 4);

    rootGroup.children.forEach((value, index) => {
        console.assert((value as Rect).x === index * 80);
        console.assert((value as Rect).fill === 'cyan');
        console.assert((value as Rect).strokeWidth === index + 1);
    });

    {
        const update = selection.setData(data2);
        console.assert(update.size === 4);
        console.assert(update.enter.size === 2);
        console.assert(update.exit.size === 0);
    }

    const update = selection.setData(data2);
    const updatePlusEnter = update.merge(update.enter.append(Rect));
    updatePlusEnter.call(style2);

    rootGroup.children.forEach((value, index) => {
        console.assert((value as Rect).x === index * 70);
        console.assert((value as Rect).strokeWidth === (index + 1) * 2);
    });

    console.assert(rootGroup.countChildren() === 6);


    {
        const update = updatePlusEnter.setData(data3);
        console.assert(update.size === 3);
        console.assert(update.enter.size === 0);
        console.assert(update.exit.size === 3);

        console.assert(update.exit.remove().size === 3);
        update.call(style1);

        rootGroup.children.forEach((value, index) => {
            console.assert((value as Rect).x === index * 80);
            console.assert((value as Rect).strokeWidth === (value as Rect).datum as number);
        });
    }

    scene.parent = undefined;
}

document.addEventListener('DOMContentLoaded', () => {
    test_SelectionSelect();
    test_append_setDatum_attr_each();
    test_selectAll_setData_enter();
    test_call_merge();
});
