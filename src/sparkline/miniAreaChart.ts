import { reactive } from '../../charts/util/observable';
import { MiniLineChart } from './miniLineChart';

export class MiniAreaChart extends MiniLineChart {

    @reactive('update') fill: string = 'mistyRose';
    
    constructor() {
        super();

        this.addEventListener('update', this.scheduleLayout, this);
    }

    updateYScaleDomain(): void {
        const { yData, yScale } = this;
        let [minY, maxY] = this.findMinAndMax(yData);

        if (yData.length > 1) {
            // if minY is positive, set minY to 0.
            minY = minY < 0 ? minY : 0;

            // if minY and maxY are equal and negative, maxY should be set to 0?
            if (minY === maxY) {
                const padding = Math.abs(minY * 0.01);
                maxY = 0 + padding;
                minY -= padding;
            }
        }

        yScale.domain = [minY, maxY];
    }

    updateLine() {
        const { linePath, yData, xData, xScale, yScale, line, fill } = this;

        const path = linePath.path;
        const n = yData.length;
        const offsetX = xScale.bandwidth / 2;

        path.clear();

        if (yData.length < 2) {
            return;
        }

        for (let i = 0; i < n; i++) {
            let xDatum = xData[i];
            let yDatum = yData[i];

            if (yDatum == undefined) {
                yDatum = 0;
            }

            const x = xScale.convert(xDatum) + offsetX;
            const y = yScale.convert(yDatum);

            if (i > 0) {
                path.lineTo(x, y);
            } else {
                path.moveTo(x, y);
            }
        }
        
        const yZero = yScale.convert(0);
        const firstX = xScale.convert(xData[0]) + offsetX;
        const lastX = xScale.convert(xData[n-1]) + offsetX;

        // line to phantom points to create closed area
        path.lineTo(lastX, yZero);
        path.lineTo(firstX, yZero);
        path.closePath();

        linePath.lineJoin = 'round';
        linePath.fill = fill;
        linePath.stroke = line.stroke;
        linePath.strokeWidth = line.strokeWidth;
    }
}