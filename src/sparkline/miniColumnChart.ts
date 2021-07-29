import { BandScale, Group, Line, LinearScale, Path } from '../../charts/main';
import { Selection } from '../../charts/scene/selection'
import { Observable, reactive } from '../../charts/util/observable';
import { MiniChart } from './miniChart';
import { Rectangle } from './rectangle';

type RectangleDatum = {
    x: number,
    y: number,
    width: number,
    height: number
}
class HighlightStyle extends Observable {
    fill: string = 'yellow';
    stroke: string = 'yellow';
    strokeWidth: number = 0;
}
export class MiniColumnChart extends MiniChart {
    
    private rectData: RectangleDatum[] = [];
    private miniColumnChartGroup: Group = new Group();
    private yScale: LinearScale = new LinearScale();
    private xScale: BandScale<number> = new BandScale<number>();
    private xAxisLine: Line = new Line();
    private columns: Group = new Group();
    private columnsSelection: Selection<Rectangle, Group, RectangleDatum, RectangleDatum> = Selection.select(this.columns).selectAll<Rectangle>();

    readonly highlightStyle = new HighlightStyle();

    @reactive('update') fill: string = 'black';
    @reactive('update') stroke: string = 'black'; 
    @reactive('update') strokeWidth: number = 0;
    @reactive('update') domain: [number, number] = undefined; 

    constructor() {
        super();
        
        this.rootGroup.append(this.miniColumnChartGroup);
        this.miniColumnChartGroup.append([this.columns, this.xAxisLine]);

        this.addEventListener('update', this.scheduleLayout, this);
    }

    update() {
        this.updateYScale();
        this.updateXScale();
        this.updateXAxisLine();
        this.generateNodeData();
        this.updateRectNodesSelection();
        this.updateRectNodes();
    }

    updateYScale() {
        const { padding, height, yData, domain } = this;
        
        this.yScale.range = [height - padding.bottom, padding.top];

        const [minY, maxY] = this.findMinAndMax(yData);
        this.yScale.domain = domain ? domain : [minY, maxY];
    }

    updateXScale() {
        const { padding, width, xData } = this;
        
        this.xScale.range = [padding.left, width - padding.right];
        this.xScale.domain = xData;
        this.xScale.paddingInner = 0.2;
        this.xScale.paddingOuter = 0.1;
    }

    updateXAxisLine() {
        const { xScale, yScale, axis, xAxisLine } = this;

            xAxisLine.x1 = xScale.range[0];
            xAxisLine.x1 = xScale.range[0];
            xAxisLine.x2 = xScale.range[1];
            xAxisLine.y1 = xAxisLine.y2 = 0;
            xAxisLine.stroke = axis.stroke;
            xAxisLine.strokeWidth = axis.strokeWidth;
    
            xAxisLine.translationY = yScale.convert(0);
    }

    generateNodeData() {
        const { yData, xData, xScale, yScale } = this;
        
        this.rectData = [];

        const yZero: number = yScale.convert(0);
        const width: number = xScale.bandwidth;

        for (let i = 0, n = yData.length ; i < n; i++) {
            const yDatum = yData[i];
            const xDatum = xData[i];
            
            const y: number = Math.min(yScale.convert(yDatum), yZero);
            const yBottom: number = Math.max(yScale.convert(yDatum), yZero);
            const height: number = yBottom - y;
            const x: number = xScale.convert(xDatum);

            this.rectData.push({ x, y, width, height});
        }
    }

    updateRectNodesSelection() {
        const updateColumnsSelection = this.columnsSelection.setData(this.rectData);

        const enterColumnsSelection = updateColumnsSelection.enter.append(Rectangle);

        updateColumnsSelection.exit.remove();

        this.columnsSelection = updateColumnsSelection.merge(enterColumnsSelection);
    }

    updateRectNodes() {
        const { fill, stroke, strokeWidth } = this;

        this.columnsSelection.each((column, datum, index) => {
            const { x, y, width, height } = datum;
            column.x = x;
            column.y = y;
            column.width = width;
            column.height = height;
            column.fill = fill;
            column.stroke = stroke;
            column.strokeWidth = strokeWidth;
        })
    }

    onHover(event: MouseEvent) {
        const { fill, highlightStyle } = this;
        this.columnsSelection.each((column, datum, index) => {
            const isInPath = column.isPointInPath(event.offsetX, event.offsetY);
            column.fill = isInPath ? highlightStyle.fill : fill;
        })
    }
}