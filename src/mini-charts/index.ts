import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Sector } from "ag-grid-enterprise/src/charts/scene/shape/sector";
import { palettes } from "ag-grid-enterprise/src/charts/chart/palettes";
import { Color } from "ag-grid-enterprise/src/charts/util/color";
import { toRadians } from "ag-grid-enterprise/src/charts/util/angle";
import { Path } from "ag-grid-enterprise/src/charts/scene/shape/path";
import { Line } from "ag-grid-enterprise/src/charts/scene/shape/line";
import linearScale from "ag-grid-enterprise/src/charts/scale/linearScale";
import { BandScale } from "ag-grid-enterprise/src/charts/scale/bandScale";
import { Rect } from "ag-grid-enterprise/src/charts/scene/shape/rect";

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

abstract class MiniChart {
    protected scene: Scene;
    protected root = new Group();
    element: HTMLElement;

    protected size = 120;
    protected padding = 5;

    constructor(parent: HTMLElement, colors: string[]) {
        this.scene = new Scene(this.size, this.size);
        this.scene.parent = document.body;
        this.scene.root = this.root;
        this.scene.parent = parent;
        this.element = this.scene.hdpiCanvas.canvas;
        this.init();
        this.updateColors(colors);
    }

    protected abstract init(): void;

    abstract updateColors(colors: string[]): void;
}

class MiniPie extends MiniChart {
    // private static angles = [
    //     [toRadians(-90), toRadians(-20)],
    //     [toRadians(-20), toRadians(60)],
    //     [toRadians(60), toRadians(135)],
    //     [toRadians(135), toRadians(235)],
    //     [toRadians(235), toRadians(270)]
    // ];

    // private static angles = [
    //     [toRadians(-30), toRadians(90)],
    //     [toRadians(90), toRadians(210)],
    //     [toRadians(210), toRadians(330)]
    // ];

    protected static angles = [
        [toRadians(-90), toRadians(30)],
        [toRadians(30), toRadians(120)],
        [toRadians(120), toRadians(180)],
        [toRadians(180), toRadians(210)],
        [toRadians(210), toRadians(240)],
        [toRadians(240), toRadians(270)]
    ];

    // protected sectors?: Sector[];

    init() {
        const radius = (this.size - this.padding * 2) / 2;
        const center = radius + this.padding;
        const sectors = MiniPie.angles.map(pair => {
            const sector = Sector.create(center, center, 0, radius, pair[0], pair[1]);
            sector.lineWidth = 0;
            return sector;
        });
        (this as any).sectors = sectors;
        this.root.append(sectors);
    }

    updateColors(colors: string[]) {
        ((this as any).sectors as Sector[]).forEach((sector, i) => {
            const color = colors[i];
            sector.fillStyle = color;
            sector.strokeStyle = Color.fromString(color).darker().toHexString();
        });
    }
}

class MiniDonut extends MiniPie {
    init() {
        const r1 = (this.size - this.padding * 2) / 2;
        const r0 = r1 * 0.6;
        const center = r1 + this.padding;
        const sectors = MiniPie.angles.map(pair => {
            const sector = Sector.create(center, center, r0, r1, pair[0], pair[1]);
            sector.lineWidth = 0;
            return sector;
        });
        (this as any).sectors = sectors;
        this.root.append(sectors);
    }
}

class MiniLine extends MiniChart {
    init() {
        const size = this.size;
        const padding = this.padding;

        const xScale = linearScale();
        xScale.domain = [0, 4];
        xScale.range = [padding, size - padding];

        const yScale = linearScale();
        yScale.domain = [0, 10];
        yScale.range = [size - padding, padding];

        const data = [
            [9, 7, 8, 4, 6],
            [5, 6, 3, 4, 1],
            [1, 3, 4, 8, 7]
        ];

        const leftAxis = Line.create(padding, padding, padding, size);
        leftAxis.strokeStyle = 'gray';
        leftAxis.lineWidth = 1;
        const bottomAxis = Line.create(0, size - padding, size - padding, size - padding);
        bottomAxis.strokeStyle = 'gray';
        bottomAxis.lineWidth = 1;
        (this as any).axes = [leftAxis, bottomAxis];

        (this as any).lines = data.map(series => {
            const line = new Path();
            line.lineWidth = 3;
            line.fillStyle = null;
            series.forEach((datum, i) => {
                line.path[i > 0 ? 'lineTo' : 'moveTo'](xScale.convert(i), yScale.convert(datum));
            });
            return line;
        });

        this.root.append((this as any).lines);
        this.root.append((this as any).axes);
    }

    updateColors(colors: string[]) {
        ((this as any).lines as Path[]).forEach((line, i) => {
            const color = colors[i];
            line.strokeStyle = Color.fromString(color).darker().toHexString();
        });
    }
}

class MiniBar extends MiniChart {
    init() {
        const size = this.size;
        const padding = this.padding;

        const data = [2, 3, 4];

        const xScale = new BandScale<number>();
        xScale.domain = [0, 1, 2];
        xScale.range = [padding, size - padding];
        xScale.paddingInner = 0.4;
        xScale.paddingOuter = 0.4;

        const yScale = linearScale();
        yScale.domain = [0, 4];
        yScale.range = [size - padding, padding];

        const leftAxis = Line.create(padding, padding, padding, size);
        leftAxis.strokeStyle = 'gray';
        leftAxis.lineWidth = 1;
        const bottomAxis = Line.create(0, size - padding, size - padding, size - padding);
        bottomAxis.strokeStyle = 'gray';
        bottomAxis.lineWidth = 1;
        (this as any).axes = [leftAxis, bottomAxis];

        const bottom = yScale.convert(0);
        (this as any).bars = data.map((datum, i) => {
            const top = yScale.convert(datum);
            const rect = new Rect();
            rect.lineWidth = 1;
            rect.x = xScale.convert(i);
            rect.y = top;
            rect.width = xScale.bandwidth;
            rect.height = bottom - top;
            return rect;
        });

        this.root.append((this as any).bars);
        this.root.append((this as any).axes);
    }

    updateColors(colors: string[]) {
        ((this as any).bars as Rect[]).forEach((bar, i) => {
            const color = colors[i];
            bar.fillStyle = color;
            bar.strokeStyle = Color.fromString(color).darker().toHexString();
        });
    }
}

class MiniStackedBar extends MiniChart {
    init() {
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
        xScale.paddingInner = 0.4;
        xScale.paddingOuter = 0.4;

        const yScale = linearScale();
        yScale.domain = [0, 16];
        yScale.range = [size - padding, padding];

        const leftAxis = Line.create(padding, padding, padding, size);
        leftAxis.strokeStyle = 'gray';
        leftAxis.lineWidth = 1;
        const bottomAxis = Line.create(0, size - padding, size - padding, size - padding);
        bottomAxis.strokeStyle = 'gray';
        bottomAxis.lineWidth = 1;
        (this as any).axes = [leftAxis, bottomAxis];

        const bottom = yScale.convert(0);
        (this as any).bars = data.map(series => {
            return series.map((datum, i) => {
                const top = yScale.convert(datum);
                const rect = new Rect();
                rect.lineWidth = 1;
                rect.x = xScale.convert(i);
                rect.y = top;
                rect.width = xScale.bandwidth;
                rect.height = bottom - top;
                return rect;
            });
        });

        // @ts-ignore
        this.root.append(Array.concat.apply(null, (this as any).bars));
        this.root.append((this as any).axes);
    }

    updateColors(colors: string[]) {
        ((this as any).bars as Rect[][]).forEach((series, i) => {
            series.forEach(bar => {
                const color = colors[i];
                bar.fillStyle = color;
                bar.strokeStyle = Color.fromString(color).darker().toHexString();
            })
        });
    }
}

// palettes.forEach(palette => {
//     new MiniPie(document.body, palette);
//     new MiniDonut(document.body, palette);
//     new MiniLine(document.body, palette);
// });

const miniPie = new MiniPie(document.body, palettes[0]);
const miniDonut = new MiniDonut(document.body, palettes[0]);
const miniLine = new MiniLine(document.body, palettes[0]);
const miniBar = new MiniBar(document.body, palettes[0]);
const miniStackedBar = new MiniStackedBar(document.body, palettes[0]);

document.body.appendChild(document.createElement('br'));

let i = 0;
createButton('Next', () => {
    if (i < palettes.length - 2) {
        i++;
    }
    miniPie.updateColors(palettes[i]);
    miniDonut.updateColors(palettes[i]);
    miniLine.updateColors(palettes[i]);
    miniBar.updateColors(palettes[i]);
    miniStackedBar.updateColors(palettes[i]);
});

function createSwatches() {
    return palettes.map(palette => {
        let divs = palette.slice(0, 6).map(color => {
            return `<div style="width: 24px; height: 24px; background: ${color}; margin: 2px;"></div>`;
        }).join('');
        return `<div class="swatch" style="padding: 5px; border: 1px solid gray; border-radius: 4px; margin: 5px; display: inline-flex;">${divs}</div>`;
    }).join('');
}

const swatchesDiv = document.createElement('div');
swatchesDiv.innerHTML = createSwatches();
document.body.appendChild(swatchesDiv);
