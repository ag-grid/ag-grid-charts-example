import * as _ from 'lodash';
import {EnterNode, Selection} from "ag-grid-enterprise/src/charts/scene/selection";
import {Node} from "ag-grid-enterprise/src/charts/scene/node";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Rect} from "ag-grid-enterprise/src/charts/scene/shape/rect";
import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";

function test_SelectionSelect() {
    const scene = new Scene(document.body, 100, 100);
    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection: Selection<Group, Node | EnterNode, any, any> = Selection.select(rootGroup);
    console.assert(Group.isGroup(rootSelection.node()) === true);

    scene.remove();
}

function test_append_setDatum_attr_each() {
    const scene = new Scene(document.body, 100, 100);
    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection = Selection.select(rootGroup);


    rootSelection.append(Rect).setDatum(16)
        .attr('x', 20)
        .attr('y', 20)
        .attr('width', 30)
        .attr('height', 30)
        .attr('fillStyle', 'red')
        .attr('strokeStyle', 'blue')
        .attrFn('lineWidth', (_, datum) => Math.sqrt(datum));

    console.assert(rootGroup.countChildren() === 1);
    console.assert((rootGroup.children[0] as Rect).fillStyle === 'red');


    rootSelection.append(Rect).setDatum(16)
        .each((rect, datum) => {
            rect.x = 40;
            rect.y = 40;
            rect.width = 30;
            rect.height = 30;
            rect.fillStyle = 'magenta';
            rect.strokeStyle = 'black';
            rect.lineWidth = Math.sqrt(datum);
        });

    console.assert(rootGroup.countChildren() === 2);
    console.assert((rootGroup.children[1] as Rect).fillStyle === 'magenta');

    scene.remove();
}

function test_selectAll_setData_enter() {
    const scene = new Scene(document.body, 300, 150);
    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection = Selection.select(rootGroup);

    const data = [1, 2, 3, 4];

    const selection: Selection<Rect, EnterNode, number, number> = rootSelection.selectAll()
        .setData(data).enter.append(Rect).each((rect, datum, index) => {
            rect.x = index * 80;
            rect.y = 50;
            rect.width = 50;
            rect.height = 50;
            rect.fillStyle = 'lime';
            rect.strokeStyle = 'orange';
            rect.lineWidth = datum;
        });

    console.assert(rootGroup.countChildren() === 4);

    rootGroup.children.forEach((value, index) => {
        console.assert((value as Rect).lineWidth === index + 1);
        console.assert((value as Rect).x === index * 80);
    });

    console.assert(_.isEqual(selection.data, data) === true);

    scene.remove();
}

function test_call_merge() {
    const scene = new Scene(document.body, 500, 250);
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
            rect.fillStyle = 'cyan';
            rect.strokeStyle = 'blue';
            rect.lineWidth = datum;
        });
    }

    function style2(selection: Selection<Rect, Node | EnterNode, number, number>) {
        selection.each((rect, datum, index) => {
            rect.x = index * 70;
            rect.y = 150;
            rect.width = 50;
            rect.height = 50;
            rect.fillStyle = 'gold';
            rect.strokeStyle = 'orange';
            rect.lineWidth = datum * 2;
        });
    }

    const selection = rootSelection.selectAll().setData(data1).enter.append(Rect).call(style1);

    console.assert(rootGroup.countChildren() === 4);

    rootGroup.children.forEach((value, index) => {
        console.assert((value as Rect).x === index * 80);
        console.assert((value as Rect).fillStyle === 'cyan');
        console.assert((value as Rect).lineWidth === index + 1);
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
        console.assert((value as Rect).lineWidth === (index + 1) * 2);
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
            console.assert((value as Rect).lineWidth === (value as Rect).datum as number);
        });
    }

    scene.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    test_SelectionSelect();
    test_append_setDatum_attr_each();
    test_selectAll_setData_enter();
    test_call_merge();
});
