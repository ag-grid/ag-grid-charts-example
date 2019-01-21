import * as d3 from 'd3';
import {HdpiCanvas} from "ag-grid-enterprise/src/charts/canvas/hdpiCanvas";

document.addEventListener('DOMContentLoaded', () => {
    (window as any).d3 = d3;
    const width = 800;
    const height = 400;

    let svg = d3.select(document.body).append('svg')
        .attr('width', width)
        .attr('height', height);

    (window as any).svg = svg;
    const mainGroup = svg.append('g');
    (window as any).mainGroup = mainGroup;

    const data = [1, 2, 3, 4];

    d3.selectAll('tr').data(data).enter().append('tr').call(selection => {
        selection.append('td');
        selection.append('td');
        selection.append('td');
        selection.append('td');
    });

    const scale = d3.scaleLinear().domain([0, 10]).range([0, 200]);
    svg.append('rect').datum(10)
        .attr('y', 0)
        .attr('height', 50)
        .attr('x', scale)
        .attr('width', 50)
        .transition().duration(1000)
        .attr('width', 200);

    (window as any).HdpiCanvas = HdpiCanvas;
});
