import { Group, Padding, Scene } from '../../charts/main';
import { Color } from '../../charts/util/color';
import { createId } from '../../charts/util/id';
import { Observable, reactive } from '../../charts/util/observable';
import { defaultTooltipCss } from './defaultTooltipCss';

export interface TooltipMeta {
    pageX: number;
    pageY: number;
}

export interface TooltipRendererResult {
    content: string;
    title?: string;
    color?: string;
    backgroundColor?: string;
    opacity?: number;
}

export interface TooltipRendererParams {
    readonly datum: any;
    readonly title?: string;
    readonly backgroundColor?: string;
    readonly xValue: any;
    readonly yValue: any;
}

export function toTooltipHtml(input: string | TooltipRendererResult, defaults?: TooltipRendererResult) : string {
    if (typeof input === 'string') {
        return input;
    }

    const { content = defaults?.content || '', title = defaults?.title || undefined, color = defaults?.color || 'black', backgroundColor = defaults?.backgroundColor || 'rgb(136, 136, 136)', opacity = defaults?.opacity || 0.2} = input;

    const titleBgColor = Color.fromString(backgroundColor.toLowerCase());
    const { r, g, b, a } = titleBgColor;

    // TODO: combine a and opacity for alpha?
    const alpha = opacity
    
    const titleBgColorWithAlpha = Color.fromArray([r, g, b, alpha]);
    const titleBgColorRgbaString = titleBgColorWithAlpha.toRgbaString();


    const contentBgColor = `rgba(244, 244, 244, ${opacity})`

    const titleHtml = title ? `<div class="${MiniChart.defaultTooltipClass}-title"
    style="color: ${color}; background-color: ${titleBgColorRgbaString}">${title}</div>` : '';

    return `${titleHtml}<div class="${MiniChart.defaultTooltipClass}-content" style="background-color: ${contentBgColor}">${content}</div>`;

}

export class MiniChartTooltip extends Observable {
    chart: MiniChart;
    element: HTMLElement = document.createElement('div');

    @reactive() class: string = MiniChart.defaultTooltipClass;
    @reactive() enabled: boolean = true;
    @reactive('change') renderer?: (params: TooltipRendererParams) => string | TooltipRendererResult;

    constructor(chart: MiniChart) {
        super();

        this.chart = chart;

        const tooltipRoot = document.body;
        tooltipRoot.appendChild(this.element);
    }

    updateClass(visible?: boolean) {
        const classList = [MiniChart.defaultTooltipClass];

        if (visible !== true) {
            classList.push(`${MiniChart.defaultTooltipClass}-hidden`);
        }

        classList.push(`${MiniChart.defaultTooltipClass}-arrow`);

        this.element.setAttribute('class', classList.join(' '));
    }
    show(meta: TooltipMeta, html?: string) {
        const { element } = this;
        
        if (html !== undefined) {
            element.innerHTML = html
        } else if (!element.innerHTML) {
            return;
        }

        let left = meta.pageX - element.clientWidth / 2;
        let top = meta.pageY - element.clientHeight - 6;
        
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;

        this.toggle(true);
    }

    toggle(visible?: boolean) {
        this.updateClass(visible);
    }

    destroy() {
        const { parentNode } = this.element;

        if (parentNode) {
            parentNode.removeChild(this.element);
        }

    }
}


export interface SeriesNodeDatum {
    readonly seriesDatum: any;
    readonly point?: {
        readonly x: number;
        readonly y: number;
    }
}

interface SeriesRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

class MiniChartAxis extends Observable {
    @reactive('update') stroke: string = 'black';
    @reactive('update') strokeWidth: number = 1;
}
export abstract class MiniChart extends Observable {

    readonly id: string = createId(this);
    
    readonly scene: Scene;
    readonly canvasElement: HTMLCanvasElement;
    readonly rootGroup: Group;

    readonly tooltip: MiniChartTooltip;
    static readonly defaultTooltipClass = 'ag-sparkline-tooltip';

    private static tooltipDocuments: Document[] = [];
    private static tooltipInstances: Map<Document, MiniChartTooltip> = new Map();

    protected seriesRect: SeriesRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    private _container: HTMLElement | undefined | null = undefined;
    set container(value: HTMLElement | undefined | null) {
        if (this._container !== value) {
            const { parentNode } = this.canvasElement;

            if (parentNode != null) {
                parentNode.removeChild(this.canvasElement);
            }

            if (value) {
                value.appendChild(this.canvasElement);
            }

            this._container = value;
        }
    }
    get container(): HTMLElement | undefined | null {
        return this._container;
    }

    @reactive() data?: number[] = undefined;
    @reactive() title?: string = undefined;
    @reactive() padding?: Padding = new Padding(3);

    readonly axis = new MiniChartAxis();
    readonly highlightStyle = {
        size: 6,
        fill: 'yellow',
        stroke: 'yellow',
        strokeWidth: 0
    }

    protected constructor(document = window.document) {
        super();

        const root = new Group();
        this.rootGroup = root;

        const element = document.createElement('div');
        element.setAttribute('class', 'ag-sparkline-wrapper');

        const scene = new Scene(document);
        this.scene = scene;
        this.canvasElement = scene.canvas.element;
        scene.root = root;
        scene.container = element;
        scene.resize(this.width, this.height);
        
        this.seriesRect.width = this.width;
        this.seriesRect.height = this.height;

        // one tooltip instance per document
        if (MiniChart.tooltipDocuments.indexOf(document) === -1) {
            const styleElement = document.createElement('style');
            styleElement.innerHTML = defaultTooltipCss;
        
            document.head.insertBefore(styleElement, document.head.querySelector('style'));
            MiniChart.tooltipDocuments.push(document);
        
            this.tooltip = new MiniChartTooltip(this);
            this.tooltip.addEventListener('class', () => this.tooltip.toggle());
        
            MiniChart.tooltipInstances.set(document, this.tooltip);
        } else {
            this.tooltip = MiniChart.tooltipInstances.get(document);
        }

        this.addPropertyListener('data', this.processData, this);
        this.addPropertyListener('padding', this.scheduleLayout, this);
        this.axis.addEventListener('update', this.scheduleLayout, this);
        this.tooltip.addEventListener('change', this.update, this);

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

    protected update() { }
    protected generateNodeData(): SeriesNodeDatum[] { return []; }
    protected getNodeData(): readonly SeriesNodeDatum[] { return []; }
    protected highlightDatum(closestDatum: SeriesNodeDatum) { }
    protected dehighlightDatum() { }

    private onMouseMove(event: MouseEvent) {
        const closestDatum: SeriesNodeDatum | undefined = this.pickClosestSeriesNodeDatum(event.offsetX, event.offsetY);
        this.highlightDatum(closestDatum);

        if (this.tooltip.enabled) {
            this.handleTooltip(event, closestDatum);
        }
    }

    private onMouseOut(event: MouseEvent) {
        this.dehighlightDatum();
        this.tooltip.toggle(false);
    }

    private processData() {
        const { data, yData, xData } = this;

        if (!data) {
            return;
        };

        yData.length = 0;
        xData.length = 0;

        for (let i = 0, n = data.length; i < n; i++) {
            const y = data[i];
            const yDatum = this.getYDatum(y);
            yData.push(yDatum);
            xData.push(i);
        }

        this.update();
    }

    private getYDatum(y: any): number | undefined {
        const noDatum = !this.isNumber(y);
        return noDatum ? undefined : y;
    }

    private isNumber(value: any): boolean {
        return value != undefined && !this.isString(value) && isFinite(value) && !isNaN(value);
    }

    private isString(value: any) {
        return typeof value === 'string';
    }

    protected findMinAndMax(values: number[]): [number, number] {
        const n = values.length;
        let value;
        let i = -1;
        let min;
        let max;

        while (++i < n) {
            if ((value = values[i]) != undefined) {
                min = max = value;
                while (++i < n) {
                    if ((value = values[i]) != undefined) {
                        if (value < min) {
                            min = value;
                        }
                        if (value > max) {
                            max = value;
                        }
                    }
                }
            }

        }
        return [min, max];
    }

    private layoutId: number = 0;
    get layoutScheduled(): boolean {
        return !!this.layoutId;
    }

    protected scheduleLayout() {
        if (this.layoutId) {
            cancelAnimationFrame(this.layoutId);
        }
        this.layoutId = requestAnimationFrame(() => {
            const { width, height, padding } = this;
            const shrunkWidth = width - padding.left - padding.right;
            const shrunkHeight = height - padding.top - padding.bottom;

            this.seriesRect.width = shrunkWidth;
            this.seriesRect.height = shrunkHeight;
            this.seriesRect.x = padding.left;
            this.seriesRect.y = padding.top;

            this.update();

            this.layoutId = 0;
        })
    }

    private pickClosestSeriesNodeDatum(x: number, y: number): SeriesNodeDatum | undefined {
        type Point = {
            x: number,
            y: number
        }

        function getDistance(p1: Point, p2: Point): number {
            return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        }

        let minDistance = Infinity;
        let closestDatum: SeriesNodeDatum | undefined;
        const hitPoint = this.rootGroup.transformPoint(x, y);

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

    private handleTooltip(event: MouseEvent, datum: SeriesNodeDatum): void {
        const { canvasElement } = this;
        const canvasRect = canvasElement.getBoundingClientRect();
        const { pageXOffset, pageYOffset } = window;
        const point = this.rootGroup.inverseTransformPoint(datum.point.x, datum.point.y);

        const meta = {
            pageX: (point.x + canvasRect.x + pageXOffset),
            pageY: (point.y + canvasRect.y + pageYOffset)
        }

        const html = this.tooltip.enabled && this.getTooltipHtml(datum);
        
        if (html) {
            this.tooltip.show(meta, html);
        }
    }

    getTooltipHtml(datum: SeriesNodeDatum): string | undefined {
        const { title} = this; 
        const seriesDatum = datum.seriesDatum;
        const yValue = datum.seriesDatum.y;
        const xValue = datum.seriesDatum.x;

        const defaults = {
            content: this.formatDatum(seriesDatum.y)
        }

        if (this.tooltip.renderer) {
            return toTooltipHtml(this.tooltip.renderer({
                datum: seriesDatum,
                title,
                yValue,
                xValue,
            }), defaults);
        }
    
        return toTooltipHtml(defaults);
    }

    protected formatDatum(datum: any) : string {
        return datum.toFixed(1);
    }

    private _onMouseMove = this.onMouseMove.bind(this);
    private _onMouseOut = this.onMouseOut.bind(this);
    
    private setupDomEventListeners(chartElement: HTMLCanvasElement): void {
        chartElement.addEventListener('mousemove', this._onMouseMove);
        chartElement.addEventListener('mouseout', this._onMouseOut);
    }

    private cleanupDomEventListerners(chartElement: HTMLCanvasElement): void {
        chartElement.removeEventListener('mousemove', this._onMouseMove);
        chartElement.removeEventListener('mouseout', this._onMouseOut);
    }

    protected destroy() {
        this.tooltip.destroy();
        // remove tooltip instance
        MiniChart.tooltipInstances.delete(document);
        // remove document from documents list
        MiniChart.tooltipDocuments = MiniChart.tooltipDocuments.filter(d => d !== document);
        this.scene.container = undefined;
        this.cleanupDomEventListerners(this.scene.canvas.element);
    }

    public getCanvasElement(): HTMLCanvasElement {
        return this.canvasElement;
    }
}