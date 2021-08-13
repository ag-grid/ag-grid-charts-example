import { BandScale, Group, Line, LinearScale, Path } from '../../charts/main';
import { Selection } from '../../charts/scene/selection'
import { reactive } from '../../charts/util/observable';
import { MiniChart, SeriesNodeDatum } from './miniChart';
import { toTooltipHtml } from './miniChartTooltip';
import { Rectangle } from './rectangle';

interface ColumnNodeDatum extends SeriesNodeDatum {
    x: number,
    y: number,
    width: number,
    height: number,
    fill?: string,
    stroke?: string,
    strokeWidth: number
}
export class MiniColumnChart extends MiniChart {
    
    static className = 'MiniColumnChart';

    private miniColumnChartGroup: Group = new Group();
    private yScale: LinearScale = new LinearScale();
    private xScale: BandScale<number> = new BandScale<number>();
    private xAxisLine: Line = new Line();
    private columns: Group = new Group();
    private columnSelection: Selection<Rectangle, Group, ColumnNodeDatum, ColumnNodeDatum> = Selection.select(this.columns).selectAll<Rectangle>();
    private columnSelectionData: ColumnNodeDatum[] = [];
    @reactive('update') fill: string = 'black';
    @reactive('update') stroke: string = 'black';
    @reactive('update') strokeWidth: number = 4;
    @reactive('update') yScaleDomain: [number, number] = undefined;

    constructor() {
        super();

        this.rootGroup.append(this.miniColumnChartGroup);
        this.miniColumnChartGroup.append([this.columns, this.xAxisLine]);

        this.addEventListener('update', this.scheduleLayout, this);

        this.xAxisLine.lineCap = 'square';
        // this.xAxisLine.crisp = true;
    }

    protected getNodeData() : ColumnNodeDatum[] {
        return this.columnSelectionData;
    }

    protected update() {
        const { seriesRect } = this;
        this.rootGroup.translationX = seriesRect.x;
        this.rootGroup.translationY = seriesRect.y;

        this.updateYScale();
        this.updateXScale();
        this.updateXAxisLine();

        const nodeData = this.generateNodeData();
        this.columnSelectionData = nodeData;
        
        this.updateRectNodesSelection(nodeData);
        this.updateRectNodes();
    }

    private updateYScale() {
        const { yScale, seriesRect, yData, yScaleDomain } = this;

        yScale.range = [seriesRect.height, 0];

        let [minY, maxY] = this.findMinAndMax(yData);
        
        minY = minY < 0 ? minY : 0;

        if (minY === maxY) {
            // if minY and maxY are equal and negative, maxY should be set to 0?
            const padding = Math.abs(minY * 0.01);
            minY -= padding;
            maxY = 0 + padding;
        }

        if (yScaleDomain) {
            if (yScaleDomain[1] < maxY) {
                yScaleDomain[1] = maxY;
            }
            if (yScaleDomain[0] > minY) {
                yScaleDomain[0] = minY;
            }
        }

        yScale.domain = yScaleDomain ? yScaleDomain : [minY, maxY];
    }

    private updateXScale() {
        const { xScale, seriesRect, xData } = this;

        xScale.range = [0, seriesRect.width];
        xScale.domain = xData;
        xScale.paddingInner = 0.2;
        xScale.paddingOuter = 0.1;
    }

    private updateXAxisLine() {
        const { xScale, yScale, axis, xAxisLine } = this;

        xAxisLine.x1 = xScale.range[0];
        xAxisLine.x2 = xScale.range[1];
        xAxisLine.y1 = xAxisLine.y2 = 0;
        xAxisLine.stroke = axis.stroke;
        xAxisLine.strokeWidth = axis.strokeWidth;

        const yZero: number = yScale.convert(0);
        xAxisLine.translationY = yZero;
    }

    protected generateNodeData(): ColumnNodeDatum[] {
        const { yData, xData, xScale, yScale, fill, stroke, strokeWidth } = this;

        const nodeData: ColumnNodeDatum[] = [];
        
        const yZero: number = yScale.convert(0);
        const width: number = xScale.bandwidth;

        for (let i = 0, n = yData.length; i < n; i++) {
            let yDatum = yData[i];
            let xDatum = xData[i];

            let invalidDatum = yDatum === undefined;
            
            if (invalidDatum) {
                yDatum = 0;
            }

            const y: number = Math.min(yScale.convert(yDatum), yZero);
            const yBottom: number = Math.max(yScale.convert(yDatum), yZero);
            const height: number = yBottom - y;
            const x: number = xScale.convert(xDatum);

            const midPoint = {
                x: x + (width / 2),
                y: yZero
            }

            nodeData.push({ 
                x, 
                y, 
                width, 
                height, 
                fill, 
                stroke, 
                strokeWidth,
                seriesDatum: { x: xDatum, y: invalidDatum ? undefined : yDatum },
                point: midPoint
            });
        }
        return nodeData;
    }

    private updateRectNodesSelection(selectionData: ColumnNodeDatum[]) {
        const updateColumnsSelection = this.columnSelection.setData(selectionData);

        const enterColumnsSelection = updateColumnsSelection.enter.append(Rectangle);

        updateColumnsSelection.exit.remove();

        this.columnSelection = updateColumnsSelection.merge(enterColumnsSelection);
    }

    private updateRectNodes() {
        this.columnSelection.each((column, datum, index) => {
            const { x, y, width, height, fill, stroke, strokeWidth } = datum;
            column.x = x;
            column.y = y;
            column.width = width;
            column.height = height;
            column.fill = fill;
            column.stroke = stroke;
            column.strokeWidth = strokeWidth;
            column.visible = column.height > 0;
        });
    }

    protected highlightDatum(closestDatum: SeriesNodeDatum): void {
        const { fill, highlightStyle } = this;
        this.columnSelection.each((node, datum) => {
            if (closestDatum) {
            const isClosest = datum.point.x === closestDatum.point.x && datum.point.y === closestDatum.point.y;
            node.fill = isClosest ? highlightStyle.fill : fill;
            }
        })
    }

    protected dehighlightDatum() : void {
        const { fill} = this;
        this.columnSelection.each(node => {
            node.fill =fill;
        })
    }

    getTooltipHtml(datum: SeriesNodeDatum): string | undefined {
        const { title, fill } = this;
        const seriesDatum = datum.seriesDatum;
        const yValue = datum.seriesDatum.y;
        const xValue = datum.seriesDatum.x;
        const backgroundColor = fill;
        const content = typeof xValue !== 'number' ? `${this.formatDatum(seriesDatum.x)}: ${this.formatDatum(seriesDatum.y)}` : `${this.formatDatum(seriesDatum.y)}`;

        const defaults = {
            backgroundColor,
            title,
            content
        }

        if (this.tooltip.renderer) {
            return toTooltipHtml(this.tooltip.renderer({
                datum: seriesDatum,
                title,
                backgroundColor,
                yValue,
                xValue,
            }), defaults);
        }

        return toTooltipHtml(defaults);
    }
}