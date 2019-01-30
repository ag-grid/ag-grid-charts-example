import * as d3 from 'd3';
import {HdpiCanvas} from "ag-grid-enterprise/src/charts/canvas/hdpiCanvas";
import {Selection} from "ag-grid-enterprise/src/charts/scene/selection";
import {Node} from "ag-grid-enterprise/src/charts/scene/node";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Rect} from "ag-grid-enterprise/src/charts/scene/shape/rect";
import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";

document.addEventListener('DOMContentLoaded', () => {
    (window as any).HdpiCanvas = HdpiCanvas;

    const scene = new Scene(document.body, 800, 400);
    const rootGroup = new Group();
    scene.root = rootGroup;

    const rootSelection = Selection.select(rootGroup);

    rootSelection.append(Rect).setDatum(16)
        .attr('x', 20)
        .attr('y', 20)
        .attr('width', 100)
        .attr('height', 100)
        .attr('fillStyle', 'red')
        .attr('strokeStyle', 'blue')
        .attrFn('lineWidth', (_, datum) => Math.sqrt(datum));

    rootSelection.append(Rect).setDatum(16)
        .each((rect, datum) => {
            rect.x = 100;
            rect.y = 100;
            rect.width = 100;
            rect.height = 100;
            rect.fillStyle = 'magenta';
            rect.strokeStyle = 'black';
            rect.lineWidth = Math.sqrt(datum);
        });

    const data = [1, 2, 3, 4];

    // Note: without the `tr` we would get: Cannot read property `ownerDocument` of null.
    // d3.selectAll('tr').data(data).enter().append('tr')
    //     .style('display', 'inline-block')
    //     .style('border', '1px solid red')
    //     .style('padding', '5px')
    //     .selectAll('td').data(data).enter().append('td')
    //         .style('display', 'inline-block')
    //         .style('border', '1px solid blue')
    //         .style('min-width', '200px')
    //         .style('min-height', datum => datum * 10 + 'px');


    // Same as above, but with much fewer loops under the hood and much fewer function calls on the surface.
    // Not idiomatic D3 code, though. And won't work with transitions without creating a custom `tween`.
    d3.selectAll('tr').data(data).enter().append('tr').each(function () {
            this.style.display = 'inline-block';
            this.style.border = '1px solid red';
            this.style.padding = '5px';
        }).selectAll('td').data(data).enter().append('td').each(function (datum) {
                this.style.display = 'inline-block';
                this.style.border = '1px solid blue';
                this.style.minWidth = '200px';
                this.style.minHeight = datum * 10 + 'px';
            });
});
