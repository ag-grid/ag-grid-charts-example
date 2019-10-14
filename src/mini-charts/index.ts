import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Sector } from "ag-grid-enterprise/src/charts/scene/shape/sector";
import { palettes } from "ag-grid-enterprise/src/charts/chart/palettes";
import { toRadians } from "ag-grid-enterprise/src/charts/util/angle";
import { Path } from "ag-grid-enterprise/src/charts/scene/shape/path";
import { Line } from "ag-grid-enterprise/src/charts/scene/shape/line";
import linearScale from "ag-grid-enterprise/src/charts/scale/linearScale";
import { BandScale } from "ag-grid-enterprise/src/charts/scale/bandScale";
import { Rect } from "ag-grid-enterprise/src/charts/scene/shape/rect";
import { ClipRect } from "ag-grid-enterprise/src/charts/scene/clipRect";
import { Arc } from "ag-grid-enterprise/src/charts/scene/shape/arc";
import { Shape } from "ag-grid-enterprise/src/charts/scene/shape/shape";

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

export abstract class MiniChart {
    protected readonly size = 80;
    protected readonly padding = 5;
    protected readonly root = new Group();
    protected readonly scene: Scene = (() => {
        const scene = new Scene({
            width: this.size,
            height: this.size
        });
        scene.root = this.root;
        return scene;
    })();

    readonly element: HTMLElement = this.scene.canvas.element;

    abstract updateColors(fills: string[], strokes: string[]): void;
}

export class MiniPie extends MiniChart {
    static readonly angles = [
        [toRadians(-90), toRadians(30)],
        [toRadians(30), toRadians(120)],
        [toRadians(120), toRadians(180)],
        [toRadians(180), toRadians(210)],
        [toRadians(210), toRadians(240)],
        [toRadians(240), toRadians(270)]
    ];

    private readonly radius = (this.size - this.padding * 2) / 2;
    private readonly center = this.radius + this.padding;

    private readonly sectors = MiniPie.angles.map(pair => {
        const sector = new Sector();
        sector.centerX = this.center;
        sector.centerY = this.center;
        sector.innerRadius = 0;
        sector.outerRadius = this.radius;
        sector.startAngle = pair[0];
        sector.endAngle = pair[1];
        sector.stroke = undefined;
        return sector;
    });

    constructor(parent: HTMLElement, fills: string[], strokes: string[]) {
        super();

        this.scene.parent = parent;
        this.root.append(this.sectors);
        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.sectors.forEach((sector, i) => {
            sector.fill = fills[i];
            sector.stroke = strokes[i];
        });
    }
}

export class MiniDonut extends MiniChart {
    private readonly radius = (this.size - this.padding * 2) / 2;
    private readonly center = this.radius + this.padding;

    private readonly sectors = MiniPie.angles.map(pair => {
        const sector = new Sector();
        sector.centerX = this.center;
        sector.centerY = this.center;
        sector.innerRadius = this.radius * 0.6;
        sector.outerRadius = this.radius;
        sector.startAngle = pair[0];
        sector.endAngle = pair[1];
        sector.stroke = undefined;
        return sector;
    });

    constructor(parent: HTMLElement, fills: string[], strokes: string[]) {
        super();

        this.scene.parent = parent;
        this.root.append(this.sectors);
        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.sectors.forEach((sector, i) => {
            sector.fill = fills[i];
            sector.stroke = strokes[i];
        });
    }
}

class MiniLine extends MiniChart {
    private readonly lines: Path[];

    constructor(parent: HTMLElement, fills: string[], strokes: string[]) {
        super();

        this.scene.parent = parent;

        const size = this.size;
        const padding = this.padding;

        const xScale = linearScale();
        xScale.domain = [0, 4];
        xScale.range = [padding, size - padding];

        const yScale = linearScale();
        yScale.domain = [0, 10];
        yScale.range = [size - padding, padding];

        const data = [
            [9, 7, 8, 5, 6],
            [5, 6, 3, 4, 1],
            [1, 3, 4, 8, 7]
        ];

        const axisOvershoot = 3;

        const leftAxis = new Line();
        leftAxis.x1 = padding;
        leftAxis.y1 = padding;
        leftAxis.x2 = padding;
        leftAxis.y2 = size - padding + axisOvershoot;
        leftAxis.stroke = 'gray';
        leftAxis.strokeWidth = 1;

        const bottomAxis = new Line();
        bottomAxis.x1 = padding - axisOvershoot;
        bottomAxis.y1 = size - padding;
        bottomAxis.x2 = size - padding;
        bottomAxis.y2 = size - padding;
        bottomAxis.stroke = 'gray';
        bottomAxis.strokeWidth = 1;

        this.lines = data.map(series => {
            const line = new Path();
            line.strokeWidth = 3;
            line.lineCap = 'round';
            line.fill = undefined;
            series.forEach((datum, i) => {
                line.path[i > 0 ? 'lineTo' : 'moveTo'](xScale.convert(i), yScale.convert(datum));
            });
            return line;
        });

        const clipRect = new ClipRect();
        clipRect.x = padding;
        clipRect.y = padding;
        clipRect.width = size - padding * 2;
        clipRect.height = size - padding * 2;

        clipRect.append(this.lines);
        const root = this.root;
        root.append(clipRect);
        root.append(leftAxis);
        root.append(bottomAxis);

        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.lines.forEach((line, i) => {
            line.stroke = strokes[i];
        });
    }
}

class MiniScatter extends MiniChart {
    private readonly points: Shape[];

    constructor(parent: HTMLElement, fills: string[], strokes: string[]) {
        super();

        this.scene.parent = parent;

        const size = this.size;
        const padding = this.padding;

        // [x, y] pairs
        const data = [
            [[0.3, 3], [1.1, 0.9], [2, 0.4], [3.4, 2.4]],
            [[0, 0.3], [1, 2], [2.4, 1.4], [3, 0]]
        ];

        const xScale = linearScale();
        xScale.domain = [-0.5, 4];
        xScale.range = [padding * 2, size - padding];

        const yScale = linearScale();
        yScale.domain = [-0.5, 3.5];
        yScale.range = [size - padding, padding];

        const axisOvershoot = 3;

        const leftAxis = new Line();
        leftAxis.x1 = padding;
        leftAxis.y1 = padding;
        leftAxis.x2 = padding;
        leftAxis.y2 = size - padding + axisOvershoot;
        leftAxis.stroke = 'gray';
        leftAxis.strokeWidth = 1;

        const bottomAxis = new Line();
        bottomAxis.x1 = padding - axisOvershoot;
        bottomAxis.y1 = size - padding;
        bottomAxis.x2 = size - padding;
        bottomAxis.y2 = size - padding;
        bottomAxis.stroke = 'gray';
        bottomAxis.strokeWidth = 1;

        const points: Shape[] = [];
        data.forEach((series, i) => {
            series.forEach((datum, j) => {
                const arc = new Arc();
                arc.strokeWidth = 1;
                arc.centerX = xScale.convert(datum[0]);
                arc.centerY = yScale.convert(datum[1]);
                arc.radiusX = 3;
                arc.radiusY = 3;
                points.push(arc);
            });
        });
        this.points = points;

        const clipRect = new ClipRect();
        clipRect.x = padding;
        clipRect.y = padding;
        clipRect.width = size - padding * 2;
        clipRect.height = size - padding * 2;

        clipRect.append(this.points);
        const root = this.root;
        root.append(clipRect);
        root.append(leftAxis);
        root.append(bottomAxis);

        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.points.forEach((line, i) => {
            line.stroke = strokes[i % strokes.length];
            line.fill = fills[i % fills.length];
        });
    }
}

class MiniBar extends MiniChart {
    private readonly bars: Rect[];

    constructor(parent: HTMLElement, fills: string[], strokes: string[]) {
        super();

        this.scene.parent = parent;

        const size = this.size;
        const padding = this.padding;

        const data = [2, 3, 4];

        const xScale = new BandScale<number>();
        xScale.domain = [0, 1, 2];
        xScale.range = [padding, size - padding];
        xScale.paddingInner = 0.3;
        xScale.paddingOuter = 0.3;

        const yScale = linearScale();
        yScale.domain = [0, 4];
        yScale.range = [size - padding, padding];

        const axisOvershoot = 3;

        const leftAxis = new Line();
        leftAxis.x1 = padding;
        leftAxis.y1 = padding;
        leftAxis.x2 = padding;
        leftAxis.y2 = size - padding + axisOvershoot;
        leftAxis.stroke = 'gray';
        leftAxis.strokeWidth = 1;

        const bottomAxis = new Line();
        bottomAxis.x1 = padding - axisOvershoot;
        bottomAxis.y1 = size - padding;
        bottomAxis.x2 = size - padding;
        bottomAxis.y2 = size - padding;
        bottomAxis.stroke = 'gray';
        bottomAxis.strokeWidth = 1;
        (this as any).axes = [leftAxis, bottomAxis];

        const rectLineWidth = 1;
        const alignment = Math.floor(rectLineWidth) % 2 / 2;

        const bottom = yScale.convert(0);
        this.bars = data.map((datum, i) => {
            const top = yScale.convert(datum);
            const rect = new Rect();
            rect.strokeWidth = rectLineWidth;
            rect.x = Math.floor(xScale.convert(i)) + alignment;
            rect.y = Math.floor(top) + alignment;
            const width = xScale.bandwidth;
            const height = bottom - top;
            rect.width = Math.floor(width) + Math.floor(rect.x % 1 + width % 1);
            rect.height = Math.floor(height) + Math.floor(rect.y % 1 + height % 1);
            return rect;
        });

        const root = this.root;
        root.append(this.bars);
        root.append(leftAxis);
        root.append(bottomAxis);

        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.bars.forEach((bar, i) => {
            bar.fill = fills[i];
            bar.stroke = strokes[i];
        });
    }
}

class MiniStackedBar extends MiniChart {
    private readonly bars: Rect[][];

    constructor(parent: HTMLElement, fills: string[], strokes: string[]) {
        super();

        this.scene.parent = parent;

        const size = this.size;
        const padding = this.padding;

        const data = [
            [8, 12, 16],
            [6, 9, 12],
            [2, 3, 4]
        ];

        const xScale = new BandScale<number>();
        xScale.domain = [0, 1, 2];
        xScale.range = [padding, size - padding];
        xScale.paddingInner = 0.3;
        xScale.paddingOuter = 0.3;

        const yScale = linearScale();
        yScale.domain = [0, 16];
        yScale.range = [size - padding, padding];

        const axisOvershoot = 3;

        const leftAxis = new Line();
        leftAxis.x1 = padding;
        leftAxis.y1 = padding;
        leftAxis.x2 = padding;
        leftAxis.y2 = size - padding + axisOvershoot;
        leftAxis.stroke = 'gray';
        leftAxis.strokeWidth = 1;

        const bottomAxis = new Line();
        bottomAxis.x1 = padding - axisOvershoot;
        bottomAxis.y1 = size - padding;
        bottomAxis.x2 = size - padding;
        bottomAxis.y2 = size - padding;
        bottomAxis.stroke = 'gray';
        bottomAxis.strokeWidth = 1;

        const rectLineWidth = 1;
        const alignment = Math.floor(rectLineWidth) % 2 / 2;

        const bottom = yScale.convert(0);
        this.bars = data.map(series => {
            return series.map((datum, i) => {
                const top = yScale.convert(datum);
                const rect = new Rect();
                rect.strokeWidth = rectLineWidth;
                rect.x = Math.floor(xScale.convert(i)) + alignment;
                rect.y = Math.floor(top) + alignment;
                const width = xScale.bandwidth;
                const height = bottom - top;
                rect.width = Math.floor(width) + Math.floor(rect.x % 1 + width % 1);
                rect.height = Math.floor(height) + Math.floor(rect.y % 1 + height % 1);
                return rect;
            });
        });

        const root = this.root;
        root.append(([] as Rect[]).concat.apply([], this.bars));
        root.append(leftAxis);
        root.append(bottomAxis);

        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.bars.forEach((series, i) => {
            series.forEach(bar => {
                bar.fill = fills[i];
                bar.stroke = strokes[i];
            })
        });
    }
}

class MiniNormalizedBar extends MiniChart {
    private readonly bars: Rect[][];

    constructor(parent: HTMLElement, fills: string[], strokes: string[]) {
        super();

        this.scene.parent = parent;

        const size = this.size;
        const padding = this.padding;

        const data = [
            [10, 10, 10],
            [6, 7, 8],
            [2, 4, 6]
        ];

        const xScale = new BandScale<number>();
        xScale.domain = [0, 1, 2];
        xScale.range = [padding, size - padding];
        xScale.paddingInner = 0.3;
        xScale.paddingOuter = 0.3;

        const yScale = linearScale();
        yScale.domain = [0, 10];
        yScale.range = [size - padding, padding];

        const axisOvershoot = 3;

        const leftAxis = new Line();
        leftAxis.x1 = padding;
        leftAxis.y1 = padding;
        leftAxis.x2 = padding;
        leftAxis.y2 = size - padding + axisOvershoot;
        leftAxis.stroke = 'gray';
        leftAxis.strokeWidth = 1;

        const bottomAxis = new Line();
        bottomAxis.x1 = padding - axisOvershoot;
        bottomAxis.y1 = size - padding;
        bottomAxis.x2 = size - padding;
        bottomAxis.y2 = size - padding;
        bottomAxis.stroke = 'gray';
        bottomAxis.strokeWidth = 1;

        const rectLineWidth = 1;
        const alignment = Math.floor(rectLineWidth) % 2 / 2;

        const bottom = yScale.convert(0);
        this.bars = data.map(series => {
            return series.map((datum, i) => {
                const top = yScale.convert(datum);
                const rect = new Rect();
                rect.strokeWidth = rectLineWidth;
                rect.x = Math.floor(xScale.convert(i)) + alignment;
                rect.y = Math.floor(top) + alignment;
                const width = xScale.bandwidth;
                const height = bottom - top;
                rect.width = Math.floor(width) + Math.floor(rect.x % 1 + width % 1);
                rect.height = Math.floor(height) + Math.floor(rect.y % 1 + height % 1);
                return rect;
            });
        });

        const root = this.root;
        root.append(([] as Rect[]).concat.apply([], this.bars));
        root.append(leftAxis);
        root.append(bottomAxis);

        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.bars.forEach((series, i) => {
            series.forEach(bar => {
                bar.fill = fills[i];
                bar.stroke = strokes[i];
            })
        });
    }
}

class MiniArea extends MiniChart {
    private readonly areas: Path[];

    static readonly data = [
        [2, 3, 2],
        [3, 6, 5],
        [6, 2, 2]
    ];

    constructor(parent: HTMLElement, fills: string[], strokes: string[], data: number[][] = MiniArea.data) {
        super();

        this.scene.parent = parent;

        const size = this.size;
        const padding = this.padding;

        const xScale = new BandScale<number>();
        xScale.paddingInner = 1;
        xScale.paddingOuter = 0;
        xScale.domain = [0, 1, 2];
        xScale.range = [padding, size - padding];

        const yScale = linearScale();
        yScale.domain = [0, 16];
        yScale.range = [size - padding, padding];

        const axisOvershoot = 3;

        const leftAxis = new Line();
        leftAxis.x1 = padding;
        leftAxis.y1 = padding;
        leftAxis.x2 = padding;
        leftAxis.y2 = size - padding + axisOvershoot;
        leftAxis.stroke = 'gray';
        leftAxis.strokeWidth = 1;

        const bottomAxis = new Line();
        bottomAxis.x1 = padding - axisOvershoot;
        bottomAxis.y1 = size - padding;
        bottomAxis.x2 = size - padding;
        bottomAxis.y2 = size - padding;
        bottomAxis.stroke = 'gray';
        bottomAxis.strokeWidth = 1;

        const xCount = data.length;
        const last = xCount * 2 - 1;
        const pathData: {x: number, y: number}[][] = [];

        for (let i = 0; i < xCount; i++) {
            const yDatum = data[i];
            const yCount = yDatum.length;
            const x = xScale.convert(i);

            let prev = 0;
            let curr: number;
            for (let j = 0; j < yCount; j++) {
                curr = yDatum[j];

                const y = yScale.convert(prev + curr);
                const points = pathData[j] || (pathData[j] = []);

                points[i] = {
                    x,
                    y
                };
                points[last - i] = {
                    x,
                    y: yScale.convert(prev) // bottom y
                };

                prev += curr;
            }
        }

        this.areas = pathData.map(points => {
            const area = new Path();
            area.strokeWidth = 1;
            const path = area.path;
            path.clear();
            points.forEach((point, i) => {
                if (!i) {
                    path.moveTo(point.x, point.y);
                } else {
                    path.lineTo(point.x, point.y);
                }
            });
            path.closePath();
            return area;
        });

        const root = this.root;
        root.append(this.areas);
        root.append(leftAxis);
        root.append(bottomAxis);

        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.areas.forEach((area, i) => {
            area.fill = fills[i];
            area.stroke = strokes[i];
        });
    }
}

class MiniNormalizedArea extends MiniArea {
    static readonly data = MiniArea.data.map(stack => {
        const sum = stack.reduce((p, c) => p + c, 0);
        return stack.map(v => v / sum * 16);
    });

    constructor(parent: HTMLElement, fills: string[], strokes: string[], data: number[][] = MiniNormalizedArea.data) {
        super(parent, fills, strokes, data);
    }
}

const miniPie = new MiniPie(document.body, palettes[0].fills, palettes[0].strokes);
const miniDonut = new MiniDonut(document.body, palettes[0].fills, palettes[0].strokes);
const miniLine = new MiniLine(document.body, palettes[0].fills, palettes[0].strokes);
const miniBar = new MiniBar(document.body, palettes[0].fills, palettes[0].strokes);
const miniStackedBar = new MiniStackedBar(document.body, palettes[0].fills, palettes[0].strokes);
const miniNormalizedBar = new MiniNormalizedBar(document.body, palettes[0].fills, palettes[0].strokes);
const miniArea = new MiniArea(document.body, palettes[0].fills, palettes[0].strokes);
const miniNormalizedArea = new MiniNormalizedArea(document.body, palettes[0].fills, palettes[0].strokes);
const miniScatter = new MiniScatter(document.body, palettes[0].fills, palettes[0].strokes);

document.body.appendChild(document.createElement('br'));

let i = 0;
createButton('Next', () => {
    if (i < palettes.length - 2) {
        i++;
    }
    const fills = palettes[i].fills;
    const strokes = palettes[i].strokes;
    miniPie.updateColors(fills, strokes);
    miniDonut.updateColors(fills, strokes);
    miniLine.updateColors(fills, strokes);
    miniBar.updateColors(fills, strokes);
    miniStackedBar.updateColors(fills, strokes);
    miniNormalizedBar.updateColors(fills, strokes);
    miniArea.updateColors(fills, strokes);
    miniNormalizedArea.updateColors(fills, strokes);
    miniScatter.updateColors(fills, strokes);
});

function createSwatches() {
    return palettes.map(palette => {
        let divs = palette.fills.slice(0, 6).map(color => {
            return `<div style="width: 24px; height: 24px; background: ${color}; margin: 2px;"></div>`;
        }).join('');
        return `<div class="swatch" style="padding: 5px; border: 1px solid gray; border-radius: 4px; margin: 5px; display: inline-flex;">${divs}</div>`;
    }).join('');
}

const swatchesDiv = document.createElement('div');
swatchesDiv.innerHTML = createSwatches();
document.body.appendChild(swatchesDiv);
