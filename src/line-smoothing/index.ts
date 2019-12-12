import { Scene } from "ag-charts-community/src/scene/scene";
import { Group } from "ag-charts-community/src/scene/group";
import { Path } from "ag-charts-community/src/scene/shape/path";
import { Arc } from "ag-charts-community/src/scene/shape/arc";
import { createButton, createSlider, createSliderValues } from "../../lib/ui";

import * as d3 from 'd3';

export function basis(t1: number, v0: number, v1: number, v2: number, v3: number) {
    const t2 = t1 * t1;
    const t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0
        + (4 - 6 * t2 + 3 * t3) * v1
        + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
        + t3 * v3) / 6;
}

export function interpolateBasis(values: number[]) {
    const n = values.length - 1;
    return (t: number) => {
        let i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
            v1 = values[i],
            v2 = values[i + 1],
            v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
            v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return basis((t - i / n) * n, v0, v1, v2, v3);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const scene = new Scene();
    scene.width = 1200;
    scene.height = 900;
    scene.parent = document.body;
    const rootGroup = new Group();

    const starPath = 'M 54.479341,8.93861 63.990133,35.839945 65.664178,40.57499 99.20847,41.43623 72.576788,61.8498 82.123461,94.0185 54.47934,74.9984 26.835216,94.0185 36.381891,61.8498 9.7502099,41.43623 43.294501,40.575 z';

    const star = new Path();
    star.fill = 'red';
    star.stroke = 'purple';
    star.strokeWidth = 4;
    star.lineJoin = 'round';
    star.svgPath = starPath;
    star.scalingX = 5;
    star.scalingY = 5;
    star.translationX = 300;
    star.translationY = 100;

    rootGroup.append(star);
    scene.root = rootGroup;

    // const xx = [100, 200, 300];
    // const yy = [300, 100, 200];

    const coords = [54.479341,8.93861,63.990133,35.839945,65.664178,40.57499,99.20847,41.43623,72.576788,61.8498,82.123461,94.0185,54.47934,74.9984,26.835216,94.0185,36.381891,61.8498,9.7502099,41.43623,43.294501,40.575];
    const xx: number[] = [];
    const yy: number[] = [];
    const xy: [number, number][] = [];
    let p: any;
    for (let i = 0; i < coords.length; i++) {
        if (i % 2 === 0) {
            const x = coords[i] * star.scalingX + star.translationX;
            xx.push(x);
            p = [x];
        } else {
            const y = coords[i] * star.scalingY + star.translationY;
            yy.push(y);
            p.push(y);
            xy.push(p);
        }
    }
    const xt = interpolateBasis(xx);
    const yt = interpolateBasis(yy);

    const point = new Arc();
    point.centerX = 0;
    point.centerY = 0;
    point.radiusX = 5;
    point.radiusY = 5;
    point.startAngle = 0;
    point.endAngle = Math.PI * 2;
    point.fill = 'black';
    point.stroke = undefined;

    rootGroup.appendChild(point);

    document.body.appendChild(document.createElement('br'));

    const sliderValues = createSliderValues(0, 1, 200);

    createSlider('t', createSliderValues(0, 1, 200), v => {
        point.centerX = xt(v);
        point.centerY = yt(v);
    });

    createButton('Smooth star', () => {
        const smoothStar = new Path();
        smoothStar.fill = undefined;
        smoothStar.stroke = 'green';
        smoothStar.strokeWidth = 2;
        smoothStar.lineJoin = 'round';

        sliderValues.forEach((v, i) => {
            if (!i) {
                smoothStar.path.moveTo(xt(v), yt(v));
            } else {
                smoothStar.path.lineTo(xt(v), yt(v));
            }
            // point.centerX = xt(v);
            // point.centerY = yt(v);
        });

        rootGroup.appendChild(smoothStar);
    });

    // d3.interpolateBasis();
    // d3.interpolateBasisClosed();
    // d3.curveBasis();
    // d3.curveBasisClosed();

    createButton('D3 Smooth star', () => {
        const smoothStar = new Path();
        smoothStar.fill = undefined;
        smoothStar.stroke = 'green';
        smoothStar.strokeWidth = 2;
        smoothStar.lineJoin = 'round';

        // const curve = d3.line().curve(d3.curveBasisClosed).x(p => p[0]).y(p => p[1]);
        // const curve = d3.line().curve(d3.curveCardinal).x(p => p[0]).y(p => p[1]);
        const curve = d3.line().curve(d3.curveCatmullRom).x(p => p[0]).y(p => p[1]);
        console.log(xy);
        const svgPath = curve(xy);
        if (svgPath) {
            console.log(svgPath);
            smoothStar.svgPath = svgPath;
        }

        rootGroup.appendChild(smoothStar);
    });
});
