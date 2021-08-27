import { AreaSparkline } from "./areaSparkline";
import { SparklineAxis } from "./sparkline";
import { ColumnSparkline } from "./columnSparkline";
import { LineSparkline } from "./lineSparkline";

import {
    SparklineOptions,
    LineSparklineOptions,
    AreaSparklineOptions,
    ColumnSparklineOptions,
    HighlightStyle,
} from './agSparklineOptions'

export type AgSparklineType<T> =
    T extends LineSparklineOptions ? LineSparkline :
    T extends AreaSparklineOptions ? AreaSparkline :
    T extends ColumnSparklineOptions ? ColumnSparkline :
    never;

const baseSparklineKeys = [
    'data',
    'width',
    'height',
    'title',
    'padding',
];

const sparklineAxisKeys = [
    'stroke',
    'strokeWidth'
];

const highlightStyleKeys = [
    'size',
    'fill',
    'stroke',
    'strokeWidth',
];

const columnSparklineKeys = [
    'fill',
    'stroke',
    'strokeWidth',
    'paddingInner',
    'paddingOuter',
    'yScaleDomain',
    'formatter'
];

export abstract class AgSparkline {
    static create<T extends SparklineOptions>(options: T): AgSparklineType<T> {

        const sparkline = getSparklineInstance(options.type);

        switch (options.type) {
            case 'column':
                initColumnSparkline(sparkline, options);
                break;
            case 'area':
                // initAreaSparkline(sparkline, options);
                break;
            case 'line':
            default:
                // initLineSparkline(sparkline, options);
                break;
        }

        //TODO: don't want to test this feature yet
        sparkline.tooltip.enabled = false;

        return sparkline;
    }
}

function getSparklineInstance(type: string = 'line'): any {
    switch (type) {
        case 'line':
            return new LineSparkline();
        case 'column':
            return new ColumnSparkline();
        case 'area':
            return new AreaSparkline();
        default:
            return new LineSparkline();
    }
}

const initColumnSparkline = (sparkline: ColumnSparkline, options: any) => {

    baseSparklineKeys.forEach(property => {
        if (property in options) {
            setValueIfPropertyExists(sparkline, property, options[property]);
        }
    });

    columnSparklineKeys.forEach(property => {
        if (property in options) {
            setValueIfPropertyExists(sparkline, property, options[property]);
        }
    });

    if (options.axis) {
        initAxisOptions(sparkline.axis, options.axis);
    }

    if (options.highlightStyle) {
        initHighlightStyleOptions(sparkline.highlightStyle, options.highlightStyle);
    }

}

function setValueIfPropertyExists(target: any, property: string, value: any): void {
    if (property in target) {
        target[property] = value;
    } else {
        console.warn(`Property ${property} does not exist on the target object.`);
    }
}

function initAxisOptions(target: SparklineAxis , options: any) {
    sparklineAxisKeys.forEach(property => {
        setValueIfPropertyExists(target, property, options[property]);
    });
}

function initHighlightStyleOptions(target: HighlightStyle , options: any) {
    highlightStyleKeys.forEach(property => {
        setValueIfPropertyExists(target, property, options[property]);
    });
}

