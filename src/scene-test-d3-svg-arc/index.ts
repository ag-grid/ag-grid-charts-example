import * as d3 from 'd3';
import {FpsCounter} from "ag-grid-enterprise/src/charts/scene/fpsCounter";

document.addEventListener('DOMContentLoaded', () => {
    (window as any).d3 = d3;
    const width = 800;
    const height = 400;
    let data = [];
    const n = 1000;

    for (let i = 0; i < n; i++) {
        data.push({
            x: width * Math.random(),
            y: height * Math.random(),
            dx: Math.random() - 0.5,
            dy: Math.random() - 0.5
        });
    }

    let svg = d3.select(document.body).append('svg')
        .attr('width', width)
        .attr('height', height);

    const makeArc = d3.arc();
    const arcPath = makeArc({
        startAngle: 0,
        endAngle: 3 * Math.PI / 2,
        innerRadius: 0,
        outerRadius: 7
    }); // creates an arc at origin, so we have to apply the translation transform
        // to move arcs around

    let arcs = svg.append('g')
        .selectAll()
        .data(data)
        .enter()
        .append('path')
        // Unlike with Canvas based implementations, we don't re-render the arc
        // each time, we generate the `arcPath` string once, assign it here
        // to all `path` elements once and inside the animation timer merely
        // change the translation of each `path` element. And it still ends up
        // only just as fast as the native Path2D and slower than custom Path
        // Canvas implementations.
        .attr('d', arcPath!)
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('stroke-width', 3);

    const svgEl = svg.node()!;
    svgEl.addEventListener('mousemove', (e: MouseEvent) => {
        if (e.target instanceof SVGCircleElement) {
            d3.select(e.target).attr('fill', 'yellow');
        }
    });

    const fpsCounter = new FpsCounter(document.body);

    d3.timer(() => {
        fpsCounter.countFrame();

        arcs
            .attr('transform', d => {
                d.x += d.dx;
                if (d.x > width) {
                    d.x -= width
                } else if (d.x < 0) {
                    d.x += width;
                }

                d.y += d.dy;
                if (d.y > height) {
                    d.y -= height
                } else if (d.y < 0) {
                    d.y += height;
                }

                return `translate(${d.x},${d.y})`;
            });
    });
});
