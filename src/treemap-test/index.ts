import { Group } from "../../charts/scene/group";
import { Scene } from "../../charts/scene/scene";
import { Selection } from "../../charts/scene/selection";
import { data } from "./data";
import { FinvizMapData } from "./finviz_data";
import { Rect } from "../../charts/scene/shape/rect";
import { Text, FontWeight } from "../../charts/scene/shape/text";
import { DropShadow } from "../../charts/scene/dropShadow";
import { convertGridTreeData, rowData } from "./convert";
import { createButton, createSlider } from "../../lib/ui";

import * as d3 from "d3";
import { HdpiCanvas } from "../../charts/canvas/hdpiCanvas";
import { Observable, reactive } from "../../charts/util/observable";
import { Chart, TooltipRendererResult, toTooltipHtml } from "../../charts/chart/chart";
import { ClipRect } from "../../charts/scene/clipRect";
import { BBox } from "../../charts/scene/bbox";
import { HighlightStyle, Series, SeriesNodeDatum, SeriesTooltip } from "../../charts/chart/series/series";
import { ChartAxisDirection } from "../../charts/chart/chartAxis";
import { LegendDatum } from "../../charts/chart/legend";
import { createId } from "../../charts/util/id";
import makeColorInterpolator from "../../charts/interpolate/color";
import { makeChartResizeable } from "../../lib/chart";
import { Caption, LinearScale } from "../../charts/main";
import { Label } from "../../charts/chart/label";
import { lab } from "d3";

export class HierarchyChart extends Chart {
    static className = 'HierarchyChart';
    static type = 'hierarchy';

    constructor(document = window.document) {
        super(document);

        // Prevent the scene from rendering chart components in an invalid state
        // (before first layout is performed).
        this.scene.root!!.visible = false;

        const root = this.scene.root!;
        root.append(this.seriesRoot);
        root.append(this.legend.group);
    }

    protected _data: any = {};

    private _seriesRoot = new ClipRect();
    get seriesRoot(): ClipRect {
        return this._seriesRoot;
    }

    performLayout(): void {
        if (this.dataPending) {
            return;
        }

        this.scene.root!!.visible = true;

        const { width, height, legend } = this;

        const shrinkRect = new BBox(0, 0, width, height);

        this.positionCaptions();
        this.positionLegend();

        if (legend.enabled && legend.data.length) {
            const { legendAutoPadding } = this;
            const legendPadding = this.legend.spacing;

            shrinkRect.x += legendAutoPadding.left;
            shrinkRect.y += legendAutoPadding.top;
            shrinkRect.width -= legendAutoPadding.left + legendAutoPadding.right;
            shrinkRect.height -= legendAutoPadding.top + legendAutoPadding.bottom;

            switch (this.legend.position) {
                case 'right':
                    shrinkRect.width -= legendPadding;
                    break;
                case 'bottom':
                    shrinkRect.height -= legendPadding;
                    break;
                case 'left':
                    shrinkRect.x += legendPadding;
                    shrinkRect.width -= legendPadding;
                    break;
                case 'top':
                    shrinkRect.y += legendPadding;
                    shrinkRect.height -= legendPadding;
                    break;
            }
        }

        const { captionAutoPadding, padding } = this;

        shrinkRect.x += padding.left;
        shrinkRect.width -= padding.left + padding.right;

        shrinkRect.y += padding.top + captionAutoPadding;
        shrinkRect.height -= padding.top + captionAutoPadding + padding.bottom;

        this.seriesRect = shrinkRect;
        this.series.forEach(series => {
            series.group.translationX = Math.floor(shrinkRect.x);
            series.group.translationY = Math.floor(shrinkRect.y);
            series.update(); // this has to happen after the `updateAxes` call
        });

        const { seriesRoot } = this;
        seriesRoot.x = shrinkRect.x;
        seriesRoot.y = shrinkRect.y;
        seriesRoot.width = shrinkRect.width;
        seriesRoot.height = shrinkRect.height;
    }
}

export abstract class HierarchySeries extends Series {
    chart?: HierarchyChart;

    @reactive('dataChange') data: any = undefined;
}

interface TreemapNodeDatum extends SeriesNodeDatum {
    data: any;
    parent?: TreemapNodeDatum;
    children?: TreemapNodeDatum[];
    value: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    depth: number;

    series: TreemapSeries;
    fill: string;
    label: string;
    hasTitle: boolean;
    $value: number;
}

export interface TreemapTooltipRendererParams {
    datum: TreemapNodeDatum;
    sizeKey: string;
    labelKey: string;
    valueKey: string;
    color: string;
}

export class TreemapSeriesTooltip extends SeriesTooltip {
    @reactive('change') renderer?: (params: TreemapTooltipRendererParams) => string | TooltipRendererResult;
}

export class TreemapSeriesLabel extends Label {
    @reactive('change') padding = 10;
}

export class TreemapSeries extends HierarchySeries {

    static className = 'TreemapSeries';
    static type = 'treemap';

    private groupSelection: Selection<Group, Group, TreemapNodeDatum, any> = Selection.select(this.group).selectAll<Group>();

    private colorMap = new Map<Rect, string>();
    private tickerMap = new Map<string, Text | undefined>();
    private layout = d3.treemap().round(true);
    private dataRoot?: d3.HierarchyNode<any>;

    constructor() {
        super();

        this.shadow.addEventListener('change', this.update, this);
        this.title.addEventListener('change', this.update, this);
        this.subtitle.addEventListener('change', this.update, this);
    }

    readonly title: TreemapSeriesLabel = (() => {
        const label = new TreemapSeriesLabel();
        label.fontWeight = 'bold';
        label.fontSize = 12;
        label.fontFamily = 'Verdana, sans-serif';
        label.padding = 15;
        return label;
    })();

    readonly subtitle: TreemapSeriesLabel = (() => {
        const label = new TreemapSeriesLabel();
        label.fontSize = 9;
        label.fontFamily = 'Verdana, sans-serif';
        label.padding = 13;
        return label;
    })();

    readonly labels = {
        large: (() => {
            const label = new Label();
            label.fontWeight = 'bold';
            label.fontSize = 18;
            return label;
        })(),
        medium: (() => {
            const label = new Label();
            label.fontWeight = 'bold';
            label.fontSize = 14;
            return label;
        })(),
        small: (() => {
            const label = new Label();
            label.fontWeight = 'bold';
            label.fontSize = 10;
            return label;
        })()
    }

    protected _nodePadding = 2;
    set nodePadding(value: number) {
        if (this._nodePadding !== value) {
            this._nodePadding = value;
            this.updateLayoutPadding();
            this.update();
        }
    }
    get nodePadding(): number {
        return this._nodePadding;
    }

    @reactive('dataChange') labelKey: string = 'label';
    @reactive('dataChange') sizeKey: string = 'size';
    @reactive('dataChange') valueKey: string = 'value';
    @reactive('dataChange') valueDomain: [number, number] = [-5, 5];
    @reactive('dataChange') valueRange: [string, string] = ['#cb4b3f', '#6acb64'];

    valueName: string = 'Value';

    private _shadow?: DropShadow = (() => {
        const shadow = new DropShadow();
        shadow.color = 'rgba(0, 0, 0, 0.4)';
        shadow.xOffset = 1.5;
        shadow.yOffset = 1.5;
        return shadow;
    })();
    set shadow(value: DropShadow | undefined) {
        if (this._shadow !== value) {
            this._shadow = value;
            this.update();
        }
    }
    get shadow(): DropShadow | undefined {
        return this._shadow;
    }

    highlightStyle: HighlightStyle = { fill: 'yellow' };

    readonly tooltip = new TreemapSeriesTooltip();

    onHighlightChange() {
        this.updateNodes();
    }

    private updateLayoutPadding() {
        const { title, subtitle, nodePadding } = this;

        this.layout
            .paddingRight(nodePadding)
            .paddingBottom(nodePadding)
            .paddingLeft(nodePadding)
            .paddingTop(node => {
                let name = (node.data as any).name;
                if (node.children) {
                    name = name.toUpperCase();
                }
                const font = node.depth > 1 ? subtitle : title;
                const textSize = HdpiCanvas.getTextSize(
                    name, [font.fontWeight, font.fontSize + 'px', font.fontFamily].join(' ').trim()
                );
                const innerNodeWidth = node.x1 - node.x0 - nodePadding * 2;
                const hasTitle = node.depth > 0 && node.children && textSize.width <= innerNodeWidth;
                (node as any).hasTitle = hasTitle;

                return hasTitle ? textSize.height + nodePadding * 2 : nodePadding;
            });
    }

    processData(): boolean {
        const { labelKey, valueKey, valueDomain, valueRange } = this;

        this.dataRoot = d3.hierarchy(this.data)
            .sum(datum => datum.children ? 1 : datum[this.sizeKey]);

        const colorScale = new LinearScale();
        colorScale.domain = valueDomain;
        colorScale.range = [0, 1];
        const colorInterpolator = makeColorInterpolator(valueRange[0], valueRange[1]);

        const series = this;
        function traverse(root: any) {
            const { children, data } = root;

            root.series = series;
            root.fill = children ? '#272931' : colorInterpolator(colorScale.convert(data[valueKey]));
            root.label = children ? data[labelKey].toUpperCase() : data[labelKey];
            root.$value = data[valueKey];

            if (children) {
                children.forEach((child: any) => traverse(child));
            }
        }
        traverse(this.dataRoot);

        return true;
    }

    protected getLabelCenterX(datum: any): number {
        return (datum.x0 + datum.x1) / 2;
    }

    protected getLabelCenterY(datum: any): number {
        return (datum.y0 + datum.y1) / 2 + 2;
    }

    update(): void {
        const seriesRect = this.chart.getSeriesRect();

        this.layout = this.layout.size([seriesRect.width, seriesRect.height]).round(true);
        this.updateLayoutPadding();

        const descendants = this.layout(this.dataRoot).descendants();

        const updateGroups = this.groupSelection.setData(descendants);
        updateGroups.exit.remove();

        const enterGroups = updateGroups.enter.append(Group);
        enterGroups.append(Rect);
        enterGroups.append(Text).each(node => node.tag = TextNodeTag.Label);
        enterGroups.append(Text).each(node => node.tag = TextNodeTag.Value);

        this.groupSelection = updateGroups.merge(enterGroups) as any;

        this.updateNodes();
    }

    updateNodes() {
        const { highlightedDatum } = this.chart;
        const { fill: highlightFill, stroke: highlightStroke } = this.highlightStyle;
        const { tickerMap, nodePadding, title, subtitle, labels, shadow } = this;

        this.groupSelection.selectByClass(Rect).each((rect, datum) => {
            const highlighted = datum === highlightedDatum;
            const fill = highlighted && highlightFill !== undefined ? highlightFill : datum.fill;
            const stroke = highlighted && highlightStroke !== undefined ? highlightStroke : datum.depth < 2 ? undefined : 'black';

            // let fill = colorMap.get(rect);
            // if (!fill) {
            //     fill = isParent ? '#272931' : colorInterpolator(colorScale.convert(-5 + Math.random() * 10));
            //     colorMap.set(rect, fill);
            // }

            rect.fill = fill;
            rect.stroke = stroke;
            rect.strokeWidth = 1;
            rect.crisp = true;

            debugger;
            rect.x = datum.x0;
            rect.y = datum.y0;
            rect.width = datum.x1 - datum.x0;
            rect.height = datum.y1 - datum.y0;
        });

        this.groupSelection.selectByTag<Text>(TextNodeTag.Label).each((text, datum, index) => {
            const isLeaf = !datum.children;
            const innerNodeWidth = datum.x1 - datum.x0 - nodePadding * 2;
            const innerNodeHeight = datum.y1 - datum.y0 - nodePadding * 2;
            const hasTitle = datum.hasTitle;
            const isParent = !!datum.children;
            const name = datum.data.name;
            const highlighted = datum === highlightedDatum;

            let label;
            if (isLeaf) {
                if (innerNodeHeight > 40 && innerNodeWidth > 40) {
                    label = labels.large;
                } else if (innerNodeHeight > 20 && innerNodeHeight > 20) {
                    label = labels.medium;
                } else {
                    label = labels.small;
                }
            } else {
                if (datum.depth > 1) {
                    label = subtitle;
                } else {
                    label = title;
                }
            }

            text.fontWeight = label.fontWeight;
            text.fontSize = label.fontSize;
            text.fontFamily = label.fontFamily;
            text.textBaseline = isLeaf ? 'bottom' : (hasTitle ? 'top' : 'middle');
            text.textAlign = hasTitle ? 'left' : 'center';
            text.text = datum.label;

            const textBBox = text.computeBBox();

            const hasLabel = isLeaf && textBBox
                && textBBox.width <= innerNodeWidth
                && textBBox.height * 2 + 8 <= innerNodeHeight;

            tickerMap.set(name, hasLabel ? text : undefined);

            text.fill = highlighted ? 'black' : 'white';
            text.fillShadow = hasLabel ? shadow : undefined;
            text.visible = hasTitle || hasLabel;

            if (hasTitle) {
                text.x = datum.x0 + nodePadding;
                text.y = datum.y0 + nodePadding;
            } else {
                text.x = this.getLabelCenterX(datum);
                text.y = this.getLabelCenterY(datum);
            }
        });

        this.groupSelection.selectByTag<Text>(TextNodeTag.Value).each((text, datum) => {
            const isLeaf = !datum.children;
            const innerNodeWidth = datum.x1 - datum.x0 - nodePadding * 2;
            const highlighted = datum === highlightedDatum;
            // const innerNodeHeight = datum.y1 - datum.y0 - nodePadding * 2;
            // const font = innerNodeHeight > 40 && innerNodeWidth > 40 ? fonts.label.big : innerNodeHeight > 20  && innerNodeHeight > 20 ? fonts.label.medium : fonts.label.small

            text.fontSize = 12;
            text.fontFamily = 'Verdana, sans-serif';
            text.textBaseline = 'top';
            text.textAlign = 'center';
            text.text = String(datum.$value.toFixed(2)) + '%';

            const textBBox = text.computeBBox();
            const tickerNode = tickerMap.get(datum.data.name);
            const hasLabel = !!tickerNode || false;

            text.fill = highlighted ? 'black' : 'white';
            text.fillShadow = shadow;
            const isVisible = hasLabel && !!textBBox && textBBox.width < innerNodeWidth;
            text.visible = isVisible;
            if (isVisible) {
                text.x = this.getLabelCenterX(datum);
                text.y = this.getLabelCenterY(datum);
            } else {
                if (tickerNode) {
                    tickerNode.textBaseline = 'middle';
                    tickerNode.y = this.getLabelCenterY(datum);
                }
            }
        });
    }

    getDomain(direction: ChartAxisDirection): any[] {
        return [0, 1];
    }

    getTooltipHtml(datum: TreemapNodeDatum): string {
        const { tooltip, sizeKey, labelKey, valueKey, valueName } = this;
        const { data } = datum;
        const { renderer: tooltipRenderer } = tooltip;

        const title: string | undefined = data[labelKey];
        let content: string | undefined = undefined;
        const color = datum.fill || 'gray';

        if (valueKey && valueName) {
            content = `<b>${valueName}</b>: ${data[valueKey].toFixed(2)}`;
        }

        const defaults: TooltipRendererResult = {
            title,
            backgroundColor: color,
            content
        };

        if (tooltipRenderer) {
            return toTooltipHtml(tooltipRenderer({
                datum,
                sizeKey,
                labelKey,
                valueKey,
                color
            }), defaults);
        }

        return toTooltipHtml(defaults);
    }

    listSeriesItems(legendData: LegendDatum[]): void {
    }
}

function processFinVizData() {
    console.log(FinvizMapData);

    function process(obj: any): any {
        return {
            name: obj.name,
            description: obj.description,
            size: obj.dx * obj.dy,
            children: obj.children && obj.children.map((child: any) => process(child))
        };
    }

    console.log(JSON.stringify(process(FinvizMapData), null, 4));
}

function makeResizeable(scene: Scene, update: () => void) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let size: [number, number];

    scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        size = [scene.width, scene.height];
        isDragging = true;
    });
    scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            scene.resize(size[0] + dx, size[1] + dy);
            update();
        }
    });
    scene.canvas.element.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

enum TextNodeTag {
    Label,
    Value
}

function createOrgTreeMap() {
    const fontName = '12px Verdana, sans-serif';
    const fontSize = 12;
    const fontFamily = 'Verdana, sans-serif';

    const data = convertGridTreeData(rowData);

    const scene = new Scene();
    scene.resize(1200, 800);
    scene.container = document.body;

    const rootGroup = new Group();

    scene.root = rootGroup;

    let groupSelection: Selection<Group, Group, any, any> = Selection.select(rootGroup).selectAll<Group>();

    function update() {
        const { width, height } = scene;
        const dataRoot = d3.hierarchy(data).sum(datum => datum.children ? 0 : 1);
        const treemapLayout = d3.treemap().size([width, height]).round(true)
            .paddingRight(4).paddingBottom(4).paddingLeft(4).paddingTop(node => {
                const name = (node.data as any).orgHierarchy;
                const nameSize = HdpiCanvas.getTextSize(name, fontName);
                const width = node.x1 - node.x0;
                const hasTitlePadding = node.depth > 0 && node.children && nameSize.width - 4 < width;
                (node as any).hasTitle = hasTitlePadding;
                return hasTitlePadding ? 15 : 4;
            });
        const descendants = treemapLayout(dataRoot).descendants();

        // console.log(dataRoot);
        // console.log(descendants);

        const updateGroups = groupSelection.setData(descendants);
        updateGroups.exit.remove();

        const enterGroups = updateGroups.enter.append(Group);
        enterGroups.append(Rect);
        enterGroups.append(Text);

        groupSelection = updateGroups.merge(enterGroups);

        // @ts-ignore
        const colorScale = new LinearScale();
        colorScale.domain = [0, 2, 4];
        colorScale.range = ['#d73027', '#fee08b', '#1a9850'];

        groupSelection.selectByClass(Rect).each((rect, datum, index) => {
            rect.fill = colorScale.convert(datum.depth) as any;
            rect.stroke = 'black';
            rect.strokeWidth = 1;
            rect.crisp = true;

            rect.x = datum.x0;
            rect.y = datum.y0;
            rect.width = datum.x1 - datum.x0;
            rect.height = datum.y1 - datum.y0;
        });

        groupSelection.selectByClass(Text).each((text, datum) => {
            text.fontSize = fontSize;
            text.fontFamily = fontFamily;
            text.textBaseline = 'top';

            const isRoot = !datum.depth;

            text.text = datum.data.orgHierarchy;
            const bbox = text.computeBBox();
            if (bbox) {
                text.visible = !isRoot && (datum.x1 - datum.x0) - 2 * 2 > bbox.width && (datum.y1 - datum.y0) - 2 * 2 > bbox.height || datum.hasTitle;
            }
            text.x = datum.x0 + 3;
            text.y = datum.y0 + 4;
        });
    }

    update();
    makeResizeable(scene, update);
}

function createStockTreeMapChart() {
    const chart = new HierarchyChart();
    const series = new TreemapSeries();
    series.labelKey = 'name';

    series.tooltip.renderer = params => {
        const { datum } = params;
        const title = datum.parent ? datum.parent.data[params.labelKey] || datum.parent.label : undefined;
        let content = '<div>';
        let ellipsis = false;

        if (datum.parent) {
            const maxCount = 5;
            ellipsis = datum.parent.children.length > maxCount;
            datum.parent.children.slice(0, maxCount).forEach(child => {
                content += `<div style="font-weight: bold; color: white; background-color: ${child.fill}; padding: 5px;"><strong>${child.data.name || child.label}</strong>: ${String(child.$value.toFixed(2))}%</div>`;
            });
        }
        if (ellipsis) {
            content += `<div style="text-align: center;">...</div>`;
        }
        content += '</div>';
        return {
            title,
            content,
            backgroundColor: 'gray'
        };
    };

    function traverse(root: any) {
        const { children } = root;

        root.value = -5 + Math.random() * 10;

        if (children) {
            children.forEach((child: any) => traverse(child));
        }
    }
    traverse(data);

    chart.title = new Caption();
    chart.title.text = 'Standard and Poor\'s 500 index stocks categorized by sectors and industries.';
    chart.title.color = 'rgb(50, 50, 50)';
    chart.title.fontSize = 18;
    chart.title.fontWeight = 'bold';
    chart.title.fontFamily = 'Verdana, sans-serif';

    chart.subtitle = new Caption();
    chart.subtitle.text = 'Size represents market cap.';
    chart.title.color = 'rgb(50, 50, 50)';
    chart.subtitle.fontSize = 14;
    chart.subtitle.fontFamily = 'Verdana, sans-serif';

    chart.width = 800;
    chart.height = 600;
    chart.series = [series];
    chart.data = data;
    chart.container = document.body;

    createButton('Alter data', () => {
        function traverse(root: any) {
            root.size = Math.random() * 1000;
            if (root.children) {
                root.children.forEach((child: any) => traverse(child));
            }
        }
        traverse(data);
        chart.data = data;
    });

    createButton('Alter data 2', () => {
        function traverse(root: any, index = 0) {
            root.size = Math.random() * 1000;
            root.test = Math.log(index + 1) * 1000 * Math.random();
            if (root.children) {
                root.children.forEach((child: any, index: number) => traverse(child, index));
            }
        }
        traverse(data);
        chart.data = data;
        series.sizeKey = 'test';
    });

    createSlider('Shadow Blur', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], value => {
        series.shadow.blur = value;
    });
    createSlider('Title Size', [8, 10, 12, 14, 16, 18, 20, 22, 24], value => {
        series.title.fontSize = value;
    });
    createSlider('Subtitle Size', [5, 6, 7, 8, 9, 10, 11, 12], value => {
        series.subtitle.fontSize = value;
    });
    createSlider('Node padding', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], value => {
        series.nodePadding = value;
    });

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createButton('Create Stock TreeMap Chart', () => {
        document.body.appendChild(document.createElement('br'));
        createStockTreeMapChart();
    });

    createButton('Create Org TreeMap', () => {
        document.body.appendChild(document.createElement('br'));
        createOrgTreeMap();
    });
});
