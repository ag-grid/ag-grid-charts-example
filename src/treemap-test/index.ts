import { Group } from "../../charts/scene/group";
import { Scene } from "../../charts/scene/scene";
import { Selection } from "../../charts/scene/selection";
import { data } from "./data";
import { FinvizMapData } from "./finviz_data";
import { Rect } from "../../charts/scene/shape/rect";
import { Text } from "../../charts/scene/shape/text";
import { convertGridTreeData, rowData } from "./convert";
import { createButton, createSlider } from "../../lib/ui";

import * as d3 from "d3";
import { HdpiCanvas } from "../../charts/canvas/hdpiCanvas";
import { makeChartResizeable } from "../../lib/chart";
import { AgChart, AgChartOptions, Caption, LinearScale } from "../../charts/main";
import { HierarchyChart } from "../../charts/chart/hierarchyChart";
import { TreemapSeries } from "../../charts/chart/series/hierarchy/treemapSeries";

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

function traverse(root: any) {
    const { children } = root;

    root.color = -5 + Math.random() * 10;

    if (children) {
        children.forEach((child: any) => traverse(child));
    }
}

function createStockTreeMapChart() {
    const chart = new HierarchyChart();
    const series = new TreemapSeries();

    function setupStockTreemap() {
        series.labelKey = 'name';
        series.colorParents = false;
        series.gradient = true;
        series.tooltip.renderer = params => {
            const { datum } = params;
            const customRootText = 'Custom Root Text';
            const title = datum.parent ?
                datum.parent.depth ? datum.parent.data[params.labelKey] : customRootText
                : customRootText;
            let content = '<div>';
            let ellipsis = false;

            if (datum.parent) {
                const maxCount = 5;
                ellipsis = datum.parent.children.length > maxCount;
                datum.parent.children.slice(0, maxCount).forEach(child => {
                    content += `<div style="font-weight: bold; color: white; background-color: ${child.fill}; padding: 5px;"><strong>${child.data.name || child.label}</strong>: ${String(isFinite(child.colorValue) ? child.colorValue.toFixed(2) : '')}%</div>`;
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
    }

    setupStockTreemap();

    traverse(data);

    // chart.padding = new Padding(40);

    chart.title = new Caption();
    chart.title.enabled = true;
    chart.title.text = 'Standard and Poor\'s 500 index stocks categorized by sectors and industries.';
    chart.title.color = 'red';
    chart.title.fontSize = 18;
    chart.title.fontWeight = 'bold';
    chart.title.fontFamily = 'Verdana, sans-serif';

    chart.subtitle = new Caption();
    chart.subtitle.enabled = true;
    chart.subtitle.text = 'Size represents market cap.';
    chart.subtitle.color = 'red';
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
            root.color = -5 + Math.random() * 10;
            if (root.children) {
                root.children.forEach((child: any) => traverse(child));
            }
        }
        traverse(data);
        chart.data = data;
        setupStockTreemap();
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
        setupStockTreemap();
    });

    createButton('Org Data', () => {
        const data = convertGridTreeData(rowData);

        chart.title.text = 'Organizational Chart';
        chart.subtitle.text = 'of yet another big company';
        chart.data = data;

        series.labelKey = 'orgHierarchy';
        series.sizeKey = '';
        series.colorKey = ''; // if empty, depth will be used an the value, where root has 0 depth
        series.colorDomain = [0, 2, 4];
        series.colorRange = ['#d73027', '#fee08b', '#1a9850'];
        series.tooltip.renderer = undefined;
        series.nodePadding = 3;
        series.colorParents = true;
        series.gradient = false;
    });

    createSlider('Shadow Blur', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], value => {
        series.shadow.blur = value;
    });
    createSlider('Title Size', [8, 10, 12, 14, 16, 18, 20, 22, 24], value => {
        series.title.fontSize = value;
    });
    createSlider('Value label size', [8, 10, 12, 14, 16, 18, 20, 22, 24], value => {
        series.labels.color.fontSize = value;
    });
    createSlider('Subtitle Size', [5, 6, 7, 8, 9, 10, 11, 12], value => {
        series.subtitle.fontSize = value;
    });
    createSlider('Node padding', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], value => {
        series.nodePadding = value;
    });

    makeChartResizeable(chart);
}

function createStockTreeMapChartViaFactory() {
    traverse(data);

    AgChart.create({
        type: 'hierarchy',
        // theme: 'ag-default-dark',
        theme: {
            baseTheme: 'ag-default-dark',
            overrides: {
                hierarchy: {
                    series: {
                        treemap: {
                            colorRange: ['red', 'green'],
                            gradient: false,
                            colorParents: true
                        }
                    }
                }
            }
        },
        container: document.body,
        autoSize: false,
        width: 800,
        height: 600,
        data,
        series: [{
            type: 'treemap',
            labelKey: 'name',
            // colorParents: false,
            // gradient: true,
            tooltip: {
                renderer: params => {
                    const { datum } = params;
                    const customRootText = 'Custom Root Text';
                    const title = datum.parent ?
                        datum.parent.depth ? datum.parent.data[params.labelKey] : customRootText
                        : customRootText;
                    let content = '<div>';
                    let ellipsis = false;

                    if (datum.parent) {
                        const maxCount = 5;
                        ellipsis = datum.parent.children.length > maxCount;
                        datum.parent.children.slice(0, maxCount).forEach((child: any) => {
                            content += `<div style="font-weight: bold; color: white; background-color: ${child.fill}; padding: 5px;"><strong>${child.data.name || child.label}</strong>: ${String(isFinite(child.$value) ? child.$value.toFixed(2) : '')}%</div>`;
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
                }
            }
        }],
        title: {
            text: 'Standard and Poor\'s 500 index stocks categorized by sectors and industries.'
        },
        subtitle: {
            text: 'Size represents market cap.'
        }
    } as AgChartOptions);
}

function createOrgChartViaFactory() {
    const chart = AgChart.create({
        type: 'hierarchy',
        container: document.body,
        autoSize: false,
        width: 800,
        height: 600,
        data: convertGridTreeData(rowData),
        series: [{
            type: 'treemap',
            labelKey: 'orgHierarchy',
            colorParents: true,
            gradient: false,
            nodePadding: 5,
            sizeKey: undefined,
            colorKey: undefined, // if undefined, depth will be used an the value, where root has 0 depth
            colorDomain: [0, 2, 4],
            colorRange: ['#d73027', '#fee08b', '#1a9850']
        }],
        title: {
            text: 'Organizational Chart'
        },
        subtitle: {
            text: 'of a top secret startup'
        }
    });

    makeChartResizeable(chart);
}

document.addEventListener('DOMContentLoaded', () => {
    createButton('Create Stock TreeMap Chart', () => {
        document.body.appendChild(document.createElement('br'));
        createStockTreeMapChart();
    });

    createButton('Create Stock TreeMap Chart via factory', () => {
        document.body.appendChild(document.createElement('br'));
        createStockTreeMapChartViaFactory();
    });

    createButton('Create Org TreeMap', () => {
        document.body.appendChild(document.createElement('br'));
        createOrgTreeMap();
    });

    createButton('Create Org TreeMap via factory', () => {
        document.body.appendChild(document.createElement('br'));
        createOrgChartViaFactory();
    });
});
