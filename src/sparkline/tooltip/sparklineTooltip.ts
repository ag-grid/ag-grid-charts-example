
import { Color } from "../../../charts/util/color";
import { Observable, reactive } from "../../../charts/util/observable";
import { Sparkline } from "../sparkline";

export interface TooltipMeta {
    pageX: number;
    pageY: number;
}

export interface TooltipRendererResult {
    enabled?: boolean;
    content?: string;
    title?: string;
    color?: string;
    backgroundColor?: string;
    opacity?: number;
}

export interface TooltipRendererParams {
    readonly datum: any;
    readonly context?: any;
    readonly title?: string;
    readonly backgroundColor?: string;
    readonly xValue: any;
    readonly yValue: any;
}

export function toTooltipHtml(input: string | TooltipRendererResult, defaults?: TooltipRendererResult): string {
    if (typeof input === 'string') {
        return input;
    }

    defaults = defaults || {};

    const {
        content = defaults.content || '',
        title = defaults.title || undefined,
        color = defaults.color || 'rgba(0,0,0, 0.67)',
        backgroundColor = defaults.backgroundColor || 'rgb(255, 255, 255)',
        opacity = defaults.opacity || 1
    } = input;

    const bgColor = Color.fromString(backgroundColor.toLowerCase());
    const { r, g, b, a } = bgColor;

    // TODO: combine a and opacity for alpha?
    const alpha = opacity;

    const bgColorWithAlpha = Color.fromArray([r, g, b, alpha]);
    const bgColorRgbaString = bgColorWithAlpha.toRgbaString();

    // TODO: allow title color to be customisable?
    const titleHtml = title ? `<span class="${Sparkline.defaultTooltipClass}-title";
    style="color: ${color}">${title}</span>` : '';

    return `<div class="${Sparkline.defaultTooltipClass}-content" style="background-color: ${bgColorRgbaString}">
                ${titleHtml}
                <span style="color: ${color}">${content}</span>
            </div>`;
}
export class SparklineTooltip extends Observable {
    chart: Sparkline;
    element: HTMLElement = document.createElement('div');

    @reactive() class: string = Sparkline.defaultTooltipClass;
    @reactive() enabled: boolean = true;
    @reactive() container?: HTMLElement;
    @reactive() xOffset: number = 10;
    @reactive() yOffset: number = 0;
    @reactive('change') renderer?: (params: TooltipRendererParams) => string | TooltipRendererResult;

    constructor(chart: Sparkline) {
        super();

        this.chart = chart;

        const tooltipRoot = document.body;
        tooltipRoot.appendChild(this.element);
    }

    isVisible(): boolean {
        const { element } = this;
        if (element.classList) {
            return !element.classList.contains(`${Sparkline.defaultTooltipClass}-hidden`);
        }

        // IE11
        const classes = element.getAttribute('class');
        if (classes) {
            return classes.split(' ').indexOf(`${Sparkline.defaultTooltipClass}-hidden`) < 0;
        }

        return false;
    }

    updateClass(visible?: boolean) {
        const classList = [Sparkline.defaultTooltipClass];

        if (visible !== true) {
            classList.push(`${Sparkline.defaultTooltipClass}-hidden`);
        }

        this.element.setAttribute('class', classList.join(' '));
    }

    show(meta: TooltipMeta, html?: string) {
        this.toggle(false);

        const { element } = this;

        if (html !== undefined) {
            element.innerHTML = html;
        } else if (!element.innerHTML) {
            return;
        }

        let left = meta.pageX + this.xOffset;
        let top = meta.pageY + this.yOffset;

        const tooltipRect = element.getBoundingClientRect();

        let maxLeft = window.innerWidth - tooltipRect.width;

        if (this.container) {
            const containerRect = this.container.getBoundingClientRect();

            maxLeft = containerRect.left + (containerRect.width - tooltipRect.width);
        }

        if (left > maxLeft) {
            left = meta.pageX - element.clientWidth - this.xOffset;
        }

        element.style.left = `${Math.round(left)}px`;
        element.style.top = `${Math.round(top)}px`;

        this.toggle(true);
    }

    toggle(visible?: boolean) {
        this.updateClass(visible);
    }

    destroy() {
        const { parentNode } = this.element;

        if (parentNode) {
            parentNode.removeChild(this.element);
        }

    }
}