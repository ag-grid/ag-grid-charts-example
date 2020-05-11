import { Chart } from "ag-charts-community/src/chart/chart";

export function makeChartResizeable(chart: Chart) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let chartSize: [number, number];
    const scene = chart.scene;

    scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        chartSize = [chart.width, chart.height];
        isDragging = true;
    });
    scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging && e.shiftKey) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            chart.width = chartSize[0] + dx;
            chart.height = chartSize[1] + dy;
        }
    });
    scene.canvas.element.addEventListener('mouseup', () => {
        isDragging = false;
    });
}
