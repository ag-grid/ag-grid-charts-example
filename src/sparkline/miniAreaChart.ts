import { reactive } from '../../charts/util/observable';
import { MiniLineChart } from './miniLineChart';

export class MiniAreaChart extends MiniLineChart {

    @reactive('update') fill: string = 'mistyRose';
    
    constructor() {
        super();

        this.addEventListener('update', this.scheduleLayout, this);
    }

    updateLine() {
        const { linePath, yData, xData, xScale, yScale, line, fill } = this;

        if (yData.length < 2) {
            return;
        }

        const path = linePath.path
        const n = yData.length
        const offsetX = xScale.bandwidth / 2

        let hasNegativeValue = false;

        path.clear();

        for (let i = 0; i < n; i++) {
            if (yData[i] < 0) {
                hasNegativeValue = true;
            }

            const x = xScale.convert(xData[i]) + offsetX;
            const y = yScale.convert(yData[i]);

            if (i > 0) {
                path.lineTo(x, y);
            } else {
                path.moveTo(x, y);
            }
        }
        
        const yZero = hasNegativeValue ? yScale.convert(0) : yScale.range[1];
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