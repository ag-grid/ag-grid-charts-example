
import { Group } from '../../charts/scene/group';
import { Scene } from '../../charts/scene/scene';
import { createId } from '../../charts/util/id';
import { Observable, reactive } from '../../charts/util/observable';
import { Padding } from '../../charts/util/padding';
import { defaultTooltipCss } from './tooltip/defaultTooltipCss';
import { SparklineTooltip } from './tooltip/sparklineTooltip';
import { isContinuous, isDate, isNumber, isString, isStringObject } from '../../charts/util/value';
import { LinearScale } from '../../charts/scale/linearScale';
import { TimeScale } from '../../charts/scale/timeScale';
import { BandScale } from '../../charts/scale/bandScale';
import { extent } from '../../charts/util/array';
import { locale } from "../../charts/util/time/format/defaultLocale";

export interface SeriesNodeDatum {
    readonly seriesDatum: any;
    readonly point?: Point;
}

export interface Point {
    readonly x: number;
    readonly y: number;
}

interface SeriesRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Container = HTMLElement | undefined | null;
type Data = any[] | undefined | null;
type DataType = 'number' | 'array' | 'object' | undefined;
type AxisType = 'number' | 'category' | 'time';
export type ScaleType = LinearScale | TimeScale | BandScale<string>;

export interface HighlightStyle {
    size?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}

export class SparklineAxis extends Observable {
    @reactive('update') type: AxisType = 'category';
    @reactive('update') stroke: string = 'rgb(204, 214, 235)';
    @reactive('update') strokeWidth: number = 1;
}
export abstract class Sparkline extends Observable {

    readonly id: string = createId(this);

    readonly scene: Scene;
    readonly canvasElement: HTMLCanvasElement;
    readonly rootGroup: Group;

    readonly tooltip: SparklineTooltip;
    static readonly defaultTooltipClass = 'ag-sparkline-tooltip';

    private static tooltipDocuments: Document[] = [];
    private static tooltipInstances: Map<Document, SparklineTooltip> = new Map();

    protected seriesRect: SeriesRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    private _context: { data: any } | undefined = undefined;
    set context(value: { data: any } | undefined) {
        if (this._context !== value) {
            this._context = value;
        }
    }
    get context(): { data: any } | undefined {
        return this._context;
    }

    private _container: Container = undefined;
    set container(value: Container) {
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
    get container(): Container {
        return this._container;
    }

    @reactive() data?: Data = undefined;
    @reactive() title?: string = undefined;
    padding: Padding = new Padding(3);

    xKey: string = 'x';
    yKey: string = 'y';

    protected dataType: DataType = undefined;
    protected xData: any[] = [];
    protected yData: (number | undefined)[] = [];

    // Minimum y value in provided data.
    protected min: number | undefined = undefined;
    // Maximum y value in provided data.
    protected max: number | undefined = undefined;

    protected xScale!: ScaleType;
    protected yScale: LinearScale = new LinearScale();

    readonly axis = new SparklineAxis();
    readonly highlightStyle: HighlightStyle = {
        size: 6,
        fill: 'yellow',
        stroke: 'silver',
        strokeWidth: 1
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
        if (Sparkline.tooltipDocuments.indexOf(document) === -1) {
            const styleElement = document.createElement('style');
            styleElement.innerHTML = defaultTooltipCss;

            document.head.insertBefore(styleElement, document.head.querySelector('style'));
            Sparkline.tooltipDocuments.push(document);

            this.tooltip = new SparklineTooltip(this);
            this.tooltip.addEventListener('class', () => this.tooltip.toggle());

            Sparkline.tooltipInstances.set(document, this.tooltip);
        } else {
            this.tooltip = Sparkline.tooltipInstances.get(document)!;
        }

        this.addPropertyListener('data', this.processData, this);
        this.padding.addEventListener('padding', this.scheduleLayout, this);
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

    /**
     * Generate node data from processed data.
     * Produce data joins.
     * Update selection's nodes using node data.
     */
    protected update() { }

    // Update y scale based on processed data.
    protected updateYScale(): void {
        this.updateYScaleRange();
        this.updateYScaleDomain();
    }

    // Update y scale domain based on processed data.
    protected updateYScaleDomain() { }

    // Update y scale range based on height and padding (seriesRect).
    protected updateYScaleRange(): void {
        const { yScale, seriesRect } = this;
        yScale.range = [seriesRect.height, 0];
    }

    // Update x scale based on processed data.
    protected updateXScale(): void {
        const { type } = this.axis;

        this.xScale = this.getXScale(type);

        this.updateXScaleRange();
        this.updateXScaleDomain();
    }

    // Update x scale range based on width and padding (seriesRect).
    protected updateXScaleRange(): void {
        const { seriesRect } = this;
        this.xScale.range = [0, seriesRect.width];
    }

    // Update x scale domain based on processed data and type of scale.
    protected updateXScaleDomain(): void {
        const { xData, xScale } = this;

        let xMinMax;

        if (xScale instanceof LinearScale) {
            xMinMax = extent(xData, isNumber);
        } else if (xScale instanceof TimeScale) {
            xMinMax = extent(xData, isContinuous);
        }

        this.xScale.domain = xMinMax ? xMinMax.slice() : xData;
    }

    /**
    * Return xScale instance based on the provided type or return a `BandScale` by default.
    * The default type is `category`.
    * @param type
    */
    protected getXScale(type: AxisType = 'category'): ScaleType {
        switch (type) {
            case 'number':
                return new LinearScale();
            case 'time':
                return new TimeScale();
            case 'category':
            default:
                return new BandScale();
        }
    }

    // Update axis line.
    protected updateAxisLine() { }

    protected updateAxes() {
        this.updateYScale();
        this.updateXScale();
        this.updateAxisLine();
    }

    // Using processed data, generate data that backs visible nodes.
    protected generateNodeData(): { nodeData: SeriesNodeDatum[], fillData: SeriesNodeDatum[], strokeData: SeriesNodeDatum[] } | SeriesNodeDatum[] | undefined { return []; }

    // Returns persisted node data associated with the sparkline's data.
    protected getNodeData(): readonly SeriesNodeDatum[] { return []; }

    // Update the selection's nodes.
    protected updateNodes(): void { }

    // Efficiently update sparkline nodes on hightlight changes.
    protected highlightedDatum?: SeriesNodeDatum;
    protected highlightDatum(closestDatum: SeriesNodeDatum): void {
        this.updateNodes();
    }

    protected dehighlightDatum(): void {
        this.highlightedDatum = undefined;
        this.updateNodes();
    }

    abstract getTooltipHtml(datum: SeriesNodeDatum): string | undefined;

    /**
     * Highlight closest datum and display tooltip if enabled.
     * Only update if necessary, i.e. only update if the highlighted datum is different from previously highlighted datum,
     * or if there is no previously highlighted datum.
     * @param event
     */
    private onMouseMove(event: MouseEvent) {
        const closestDatum: SeriesNodeDatum | undefined = this.pickClosestSeriesNodeDatum(event.offsetX, event.offsetY);

        if (!closestDatum) {
            return;
        }

        const oldHighlightedDatum = this.highlightedDatum;
        this.highlightedDatum = closestDatum;

        if ((this.highlightedDatum && !oldHighlightedDatum) ||
            (this.highlightedDatum && oldHighlightedDatum && this.highlightedDatum !== oldHighlightedDatum)) {
            this.highlightDatum(closestDatum);
            if (this.tooltip.enabled) {
                this.handleTooltip(closestDatum);
            }
        }
    }

    /**
     * Dehighlight all nodes and remove tooltip.
     * @param event
     */
    private onMouseOut(event: MouseEvent) {
        this.dehighlightDatum();
        this.tooltip.toggle(false);
    }

    // Fetch required values from the data object and process them.
    private processData() {
        const { data, yData, xData } = this;

        if (!data) {
            return;
        }

        yData.length = 0;
        xData.length = 0;

        const n = data.length;

        const dataType = this.getDataType(data);
        this.dataType = dataType;

        const { type: xValueType } = this.axis;
        const xType = xValueType !== 'number' && xValueType !== 'time' ? 'category' : xValueType;

        if (dataType === 'number') {
            for (let i = 0; i < n; i++) {
                const xDatum = i;
                const yDatum = data[i];

                const x = this.getDatum(xDatum, xType);
                const y = this.getDatum(yDatum, 'number');

                xData.push(x);
                yData.push(y);
            }
        } else if (dataType === 'array') {
            for (let i = 0; i < n; i++) {
                const datum = data[i];
                if (Array.isArray(datum)) {
                    const xDatum = datum[0];
                    const yDatum = datum[1];

                    const x = this.getDatum(xDatum, xType);
                    const y = this.getDatum(yDatum, 'number');

                    if (x == undefined) {
                        continue;
                    }

                    xData.push(x);
                    yData.push(y);
                }
            }
        } else if (dataType === 'object') {
            const { yKey, xKey } = this;

            for (let i = 0; i < n; i++) {
                const datum = data[i];

                if (typeof datum === 'object' && !Array.isArray(datum)) {
                    const xDatum = datum[xKey];
                    const yDatum = datum[yKey];

                    const x = this.getDatum(xDatum, xType);
                    const y = this.getDatum(yDatum, 'number');

                    if (x == undefined) {
                        continue;
                    }

                    xData.push(x);
                    yData.push(y);
                }
            }
        }

        // update axes
        this.updateAxes();

        // produce data joins and update selection's nodes
        this.update();
    }

    /**
    * Return the type of data provided to the sparkline based on the first truthy value in the data array.
    * If the value is not a number, array or object, return `undefined`.
    * @param data
    */
    private getDataType(data: any): DataType {
        for (let datum of data) {
            if (datum) {
                if (isNumber(datum)) {
                    return 'number';
                } else if (Array.isArray(datum)) {
                    return 'array';
                } else if (typeof datum === 'object') {
                    return 'object';
                }
            }
        }
    }

    /**
    * Return the given value depending on the type of axis.
    * Return `undefined` if the value is invalid for the given axis type.
    * @param value
    */
    private getDatum(value: any, type: AxisType): any {
        if (type === 'number' && isNumber(value) || type === 'time' && (isNumber(value) || isDate(value))) {
            return value;
        } else if (type === 'category') {
            if (isString(value) || isDate(value) || isNumber(value)) {
                return { toString: () => String(value) };
            } else if (isStringObject(value)) {
                return value;
            }
        }
    }

    private layoutId: number = 0;

    /**
     * Only `true` while we are waiting for the layout to start.
     * This will be `false` if the layout has already started and is ongoing.
     */
    get layoutScheduled(): boolean {
        return !!this.layoutId;
    }

    /**
     * Execute update method on the next available screen repaint to make changes to the canvas.
     * If we are waiting for a layout to start and a new layout is requested,
     * cancel the previous layout using the non 0 integer (this.layoutId) returned from requestAnimationFrame.
     */
    protected scheduleLayout() {
        if (this.layoutId) {
            cancelAnimationFrame(this.layoutId);
        }
        this.layoutId = requestAnimationFrame(() => {
            const { width, height, padding, seriesRect, rootGroup } = this;

            const shrunkWidth = width - padding.left - padding.right;
            const shrunkHeight = height - padding.top - padding.bottom;

            seriesRect.width = shrunkWidth;
            seriesRect.height = shrunkHeight;
            seriesRect.x = padding.left;
            seriesRect.y = padding.top;

            rootGroup.translationX = seriesRect.x;
            rootGroup.translationY = seriesRect.y;

            // update axes ranges
            this.updateXScaleRange();
            this.updateYScaleRange();

            // update axis line
            this.updateAxisLine();

            // produce data joins and update selection's nodes
            this.update();

            this.layoutId = 0;
        })
    }

    /**
     * Return the closest data point to x/y canvas coordinates.
     * @param x
     * @param y
     */
    private pickClosestSeriesNodeDatum(x: number, y: number): SeriesNodeDatum | undefined {
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
            const distance = getDistance(hitPoint, datum.point);
            if (distance < minDistance) {
                minDistance = distance;
                closestDatum = datum;
            }
        });

        return closestDatum;
    }

    /**
     * calculate x/y coordinates for tooltip based on coordinates of highlighted datum, position of canvas and page offset.
     * @param datum
     */
    private handleTooltip(datum: SeriesNodeDatum): void {
        const { seriesDatum } = datum;
        const { canvasElement } = this;
        const canvasRect = canvasElement.getBoundingClientRect();
        const { pageXOffset, pageYOffset } = window;
        // pickClosestSeriesNodeDatum only returns datum with point
        const point = this.rootGroup.inverseTransformPoint(datum.point!.x, datum.point!.y);

        const meta = {
            pageX: (point.x + canvasRect.left + pageXOffset),
            pageY: (point.y + canvasRect.top + pageYOffset)
        }

        const yValue = seriesDatum.y;
        const xValue = seriesDatum.x;

        // check if tooltip is enabled for this specific data point
        let enabled = this.tooltip.enabled;

        if (this.tooltip.renderer) {
            let tooltipRendererResult = this.tooltip.renderer({
                datum: seriesDatum,
                yValue,
                xValue,
            });
            enabled = typeof tooltipRendererResult !== 'string' && tooltipRendererResult.enabled !== undefined ? tooltipRendererResult.enabled : enabled;
        }

        const html = enabled && seriesDatum.y !== undefined && this.getTooltipHtml(datum);

        if (html) {
            this.tooltip.show(meta, html);
        }
    }

    protected formatNumericDatum(datum: number): string {
        return String(Math.round(datum * 10) / 10);
    }

    private defaultDateFormatter = locale.format('%m/%d/%y, %H:%M:%S');

    protected formatDatum(datum: any): string {
        const type = this.axis.type || 'category';

        if (type === 'number' && typeof datum === 'number') {
            return this.formatNumericDatum(datum);
        } else if (type === 'time' && (datum instanceof Date || isNumber(datum))) {
            return this.defaultDateFormatter(datum);
        } else return String(datum);
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

    /**
     * Cleanup and remove canvas element from the DOM.
     */
    destroy() {
        this.scene.container = undefined;
        // remove canvas element from the DOM
        this.container = undefined;
        this.cleanupDomEventListerners(this.scene.canvas.element);
    }

    /**
     * @returns this.scene.canvas.element
     */
    public getCanvasElement(): HTMLCanvasElement {
        return this.canvasElement;
    }
}