import * as d3 from 'd3';
import {FpsCounter} from "ag-charts-community/src/scene/fpsCounter";

document.addEventListener('DOMContentLoaded', () => {
    (window as any).d3 = d3;
    const width = 800;
    const height = 400;
    let data = [];
    const n = 1000;

    for (let i = 0; i < n; i++) {
        data.push({
            centerX: width * Math.random(),
            centerY: height * Math.random(),
            dx: Math.random() - 0.5,
            dy: Math.random() - 0.5
        });
    }

    let svg = d3.select(document.body).append('svg')
        .attr('width', width)
        .attr('height', height);

    let circles = svg.append('g')
        .selectAll()
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 7)
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

        circles
            .attr('cx', d => {
                d.centerX += d.dx;
                if (d.centerX > width) {
                    d.centerX -= width
                } else if (d.centerX < 0) {
                    d.centerX += width;
                }
                return d.centerX;
            })
            .attr('cy', d => {
                d.centerY += d.dy;
                if (d.centerY > height) {
                    d.centerY -= height
                } else if (d.centerY < 0) {
                    d.centerY += height;
                }
                return d.centerY;
            });
    });
});
