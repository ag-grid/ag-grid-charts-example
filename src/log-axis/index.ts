import * as d3 from "d3";
import { LogScale } from "ag-grid-enterprise/src/charts/scale/logScale";
import { Axis } from "ag-grid-enterprise/src/charts/axis";
import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Group } from "ag-grid-enterprise/src/charts/scene/group";

document.addEventListener('DOMContentLoaded', () => {
    // testConvert();
    // changeOfBase();
    createScene();
    testD3Axis();
});

function testTicks() {
    const scale = d3.scaleLog().domain([100, 1000000]);
    console.log(scale.ticks(10));
    console.log(scale.ticks(4));

    scale.domain([-100, 10000]);
    console.log(scale.ticks(10));

    scale.domain([-1000, -10]);
    console.log(scale.ticks(10));
}

function testConvert() {
    {
        const scale = d3.scaleLog();
        scale.domain([10, 1000]);

        console.log(scale(50));
    }

    {
        const scale = d3.scaleLog();
        scale.domain([-1000, -10]);

        console.log(scale(-50));
    }
}

function changeOfBase() {
    {
        const scale = d3.scaleLog();
        scale.domain([10, 1000]);

        console.log(scale.ticks());
        scale.base(Math.E);
        console.log(scale.ticks());
    }
}

function testNice() {
    const scale = d3.scaleLog();
    scale.domain([Math.E * 1.234, Math.E * 5.783]);
    scale.base(Math.E);
    scale.nice();
    console.log(scale.domain());
}

function createScene() {
    const scene = new Scene({
        width: 400,
        height: 1200
    });
    scene.parent = document.body;
    const root = new Group();

    testAxis(root);

    scene.root = root;
}

function testAxis(root: Group) {
    const scale = new LogScale();
    scale.domain = [10, 10000];
    scale.range = [1000, 0];
    const axis = new Axis(scale);

    axis.translationX = 150;
    axis.translationY = 50;
    // axis.tickCount = 3;
    axis.update();

    root.append(axis.group);
}

function testD3Axis() {
    const g = d3.select(document.body).append('svg')
        .attr('width', 400)
        .attr('height', 1200)
        .append('g')
        .attr('transform', 'translate(150,50)');

    const logScale = d3.scaleLog().domain([10, 10000]).range([1000, 0]);
    const axis = d3.axisLeft(logScale);
    g.call(axis);
}
