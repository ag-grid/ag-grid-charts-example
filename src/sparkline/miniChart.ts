import { Group, Padding, Scene } from '../../charts/main';
import { Observable, reactive } from '../../charts/util/observable';

export interface SeriesNodeDatum {
    readonly point?: {
        readonly x: number,
        readonly y: number
    }
}

interface SeriesRect {
    x: number, 
    y:number 
    width: number, 
    height: number, 
}

class MiniChartAxis extends Observable {
    @reactive('update') stroke: string = 'black'; 
    @reactive('update') strokeWidth: number = 1;
}
export abstract class MiniChart extends Observable {

    protected scene: Scene = new Scene();
    protected rootGroup: Group = new Group();
    protected seriesRect: SeriesRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    @reactive() data?: number[] = undefined;
    @reactive() padding?: Padding = new Padding(3);

    readonly axis = new MiniChartAxis();
    readonly highlightStyle = {
        size: 6,
        fill: 'yellow',
        stroke: 'yellow',
        strokeWidth: 0
    }

    constructor() {
        super();

        this.scene.canvas.element.style.border = '1px solid black';
        this.scene.container = document.body;
        this.scene.root = this.rootGroup;
        this.scene.resize(this.width, this.height);
        this.seriesRect.width = this.width;
        this.seriesRect.height = this.height;

        this.addPropertyListener('data', this.processData, this);
        this.addPropertyListener('padding', this.scheduleLayout, this);
        this.axis.addEventListener('update', this.scheduleLayout, this);

        this.setupDomEventListeners(this.scene.canvas.element);
    }

    private _width: number = 100;
    set width(value: number) {
        if (this._width !== value) {
            this._width = value;
            this.scene.resize(value, this.height);
            this.scheduleLayout();
        }
    }
    get width(): number {
        return this._width;
    }

    private _height: number = 100;
    set height(value: number) {
        if (this._height !== value) {
            this._height = value;
            this.scene.resize(this.width, value);
            this.scheduleLayout();
        }
    }
    get height(): number {
        return this._height;
    }

    protected yData: number[] = [];
    protected xData: number[] = [];

    update() { }
    generateNodeData(): SeriesNodeDatum[]  { return []; }
    getNodeData(): readonly SeriesNodeDatum[] { return [];}
    highlightDatum(closestDatum: SeriesNodeDatum) { }
    dehighlightDatum() { }
    
    onMouseMove(event: MouseEvent) { 
        const closestDatum: SeriesNodeDatum | undefined = this.pickClosestSeriesNodeDatum(event.offsetX, event.offsetY);
        this.highlightDatum(closestDatum);
    }
    
    onMouseOut(event: MouseEvent) { 
        this.dehighlightDatum()
    }

    processData() { 
        const { data, yData, xData } = this;

        if (!data) {
            return;
        };

        yData.length = 0;
        xData.length = 0;

        for (let i = 0, n = data.length; i < n; i++) {
            const y = data[i];
            yData.push(y);
            xData.push(i);
        }

        this.update();
    }

    findMinAndMax(data: number[]): [number, number] {
        let min: number = Math.min(...data);
        let max: number = Math.max(...data);
        return [min, max];
    }

    private layoutId: number = 0;
    get layoutScheduled(): boolean {
        return !!this.layoutId;
    }
    scheduleLayout() {
        if (this.layoutId) {
            cancelAnimationFrame(this.layoutId);    
        }
        this.layoutId = requestAnimationFrame(() => {
            const { width, height, padding } = this;
            const  shrunkWidth = width - padding.left - padding.right;
            const shrunkHeight = height - padding.top - padding.bottom;

            this.seriesRect.width = shrunkWidth;
            this.seriesRect.height = shrunkHeight;
            this.seriesRect.x = padding.left;
            this.seriesRect.y = padding.top;
           
            this.update();
            
            this.layoutId = 0;
        })
    }

    pickClosestSeriesNodeDatum(x: number, y: number): SeriesNodeDatum | undefined {
        type Point = {
            x: number,
            y: number
        }

        function getDistance(p1: Point, p2: Point): number {
            return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
        }

        let minDistance = Infinity;
        let closestDatum: SeriesNodeDatum | undefined;
        const hitPoint = this.rootGroup.transformPoint(x, y)

        this.getNodeData().forEach(datum => {
            if (!datum.point) {
                return;
            }
            const distance = getDistance(datum.point, hitPoint);
            if (distance < minDistance) {
                minDistance = distance;
                closestDatum = datum;
            }
        })

        return closestDatum && closestDatum;
    }

    private _onMouseMove = this.onMouseMove.bind(this);
    private _onMouseOut = this.onMouseOut.bind(this);
    setupDomEventListeners(chartElement: HTMLCanvasElement): void {
        chartElement.addEventListener('mousemove', this._onMouseMove);
        chartElement.addEventListener('mouseout', this._onMouseOut);
    }

    cleanupDomEventListerners(chartElement: HTMLCanvasElement): void {
        chartElement.removeEventListener('mousemove', this._onMouseMove);
        chartElement.removeEventListener('mouseout', this._onMouseOut);
    }

    destroy() {
        this.scene.container = undefined;
        this.cleanupDomEventListerners(this.scene.canvas.element);
    }
}