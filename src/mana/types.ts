import { extend } from "lodash";
import { BarSeries } from "../../charts/main";
import { Observable, reactive } from "../../charts/util/observable";

export type Coordinates = {
    x: number,
    y: number
}

export type Angles = {
    startAngle: number,
    endAngle: number
}

export type GemStone = {
    name: string,
    hardness: number
}

export type Padding = {
    top: number
    right: number,
    bottom: number,
    left: number,
}

class ReactivePadding {
    chart?: VanCleefChart;
    series: BarSeries;

    private _top: number = 0;
    set top(value: number) {
        this._top = value;
        if (this.chart) {
            this.chart.updateSelections();
        }
    }
    get top(): number {
        return this._top;
    }
}

class BetterReactivePadding extends Observable {
    @reactive('change') top: number = 0;
    @reactive('change') right: number = 0;
    @reactive('change') bottom: number = 0;
    @reactive('change') left: number = 0;
}

class VanCleefChart {
    padding = new BetterReactivePadding();

    constructor() {
        this.padding.addEventListener('change', this.updateSelections, this);
    }

    updateSelections() {
    }

}

const chart = new VanCleefChart();
chart.padding.top = 20;

export type OnResize = (width: number, height: number) =>  void