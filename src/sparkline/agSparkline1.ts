import { AreaSparkline } from "./areaSparkline";
import { ColumnSparkline } from "./columnSparkline";
import { LineSparkline } from "./lineSparkline";

import {
    SparklineOptions,
    LineSparklineOptions,
    AreaSparklineOptions,
    ColumnSparklineOptions,
} from './agSparklineOptions'

export type AgSparklineType<T> =
    T extends LineSparklineOptions ? LineSparkline :
    T extends AreaSparklineOptions ? AreaSparkline :
    T extends ColumnSparklineOptions ? ColumnSparkline :
    never;

export abstract class AgSparkline {
    static create<T extends SparklineOptions>(options: T): AgSparklineType<T> {

        const { type, data, width, height } = options;

        const sparkline = getSparklineInstance(options.type);
        initSparkline(options, undefined, sparkline);


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

const initSparkline = (options: any, path?: string, target?: any) => {
    const setAsIs = ['data'];
    const skipKeys = ['type'];
    for (const key in options) {
        if (skipKeys.indexOf(key) < 0) {
            const value = options[key];
            if (value && setAsIs.indexOf(key) < 0) {
                if (typeof value === 'object') {
                    initSparkline(value, path ? `${path}.${key}` : key, target)
                } else {
                    initPropertyIfExists(path ? `${path}.${key}` : key, value, target);
                }
            } else {
                target[key] = value;
            }
        }
    }
}

function initPropertyIfExists(path: string, value: any, target: any) {
    let t = target;
    let keys = path.split('.');
    let n = keys.length;

    for (let i = 0; i < n - 1; i++) {
        let key = keys[i];
        if (key in t) {
            if (!t[key]) {
                break;
            } else {
                t = t[key];
            }
        } else {
            console.warn(`Property ${key} does not exist on the target object.`);
        }
    }

    if (keys[n - 1] in t) {
        t[keys[n - 1]] = value;
    } else {
        console.warn(`Property ${keys[n - 1]} does not exist on the target object.`);
    }
}

