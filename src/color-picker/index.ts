import './picker.css';
import './checker.png';
import { Color } from "ag-grid-enterprise/src/charts/util/color";

class ColorPicker {
    private readonly element: HTMLElement;
    private readonly spectrumColor: HTMLDivElement;
    private readonly spectrumVal: HTMLDivElement;
    private readonly spectrumDragger: HTMLDivElement;
    private readonly spectrumHue: HTMLDivElement;
    private readonly spectrumHueSlider: HTMLDivElement;
    private readonly spectrumAlpha: HTMLDivElement;
    private readonly spectrumAlphaSlider: HTMLDivElement;
    private readonly spectrumTextValue: HTMLInputElement;
    private readonly doneButton: HTMLButtonElement;

    private H = 1; // in the [0, 1] range
    private S = 1; // in the [0, 1] range
    private B = 1; // in the [0, 1] range
    private A = 1; // in the [0, 1] range

    private spectrumValRect?: ClientRect | DOMRect;
    private isSpectrumDragging = false;

    private spectrumHueRect?: ClientRect | DOMRect;
    private isSpectrumHueDragging = false;

    private spectrumAlphaRect?: ClientRect | DOMRect;
    private isSpectrumAlphaDragging = false;

    private newDiv(): HTMLDivElement {
        return document.createElement('div');
    }

    constructor() {
        const newDiv = this.newDiv;

        const el = newDiv();
        el.className = 'color-picker';

        document.body.appendChild(this.element = el);

        this.spectrumColor = newDiv();
        this.spectrumVal = newDiv();
        this.spectrumDragger = newDiv();
        this.spectrumHue = newDiv();
        this.spectrumHueSlider = newDiv();
        this.spectrumAlpha = newDiv();
        this.spectrumAlphaSlider = newDiv();
        this.spectrumTextValue = document.createElement('input');
        this.doneButton = document.createElement('button');

        this.init();

        // this.setSpectrumValue(1, 1);
    }

    private init() {
        const newDiv = this.newDiv;
        const spectrumColor = this.spectrumColor;
        const spectrumSat = newDiv();
        const spectrumVal = this.spectrumVal;
        const spectrumDragger = this.spectrumDragger;
        const spectrumTools = newDiv();
        const spectrumHue = this.spectrumHue;
        const spectrumHueBackground = newDiv();
        const spectrumHueSlider = this.spectrumHueSlider;
        const spectrumAlpha = this.spectrumAlpha;
        const spectrumAlphaBackground = newDiv();
        const spectrumAlphaSlider = this.spectrumAlphaSlider;
        const spectrumTextValue = this.spectrumTextValue;
        const doneButton = this.doneButton;

        spectrumColor.className = 'spectrum-color';
        spectrumSat.className = 'spectrum-sat fill';
        spectrumVal.className = 'spectrum-val fill';
        spectrumDragger.className = 'spectrum-dragger';
        spectrumTools.className = 'spectrum-tools';
        spectrumHue.className = 'spectrum-hue hue-alpha';
        spectrumHueBackground.className = 'spectrum-hue-background';
        spectrumHueSlider.className = 'spectrum-slider';
        spectrumAlpha.className = 'spectrum-alpha hue-alpha';
        spectrumAlphaBackground.className = 'spectrum-alpha-background';
        spectrumAlphaSlider.className = 'spectrum-slider';
        spectrumTextValue.className = 'spectrum-text-value';
        doneButton.className = 'color-picker-done-button';
        doneButton.textContent = 'Done';

        spectrumVal.appendChild(spectrumDragger);
        spectrumSat.appendChild(spectrumVal);
        spectrumColor.appendChild(spectrumSat);

        spectrumHue.appendChild(spectrumHueBackground);
        spectrumHue.appendChild(spectrumHueSlider);
        spectrumAlpha.appendChild(spectrumAlphaBackground);
        spectrumAlpha.appendChild(spectrumAlphaSlider);
        spectrumTools.appendChild(spectrumHue);
        spectrumTools.appendChild(spectrumAlpha);
        spectrumTools.appendChild(spectrumTextValue);

        const el = this.element;
        el.appendChild(spectrumColor);
        el.appendChild(spectrumTools);
        el.appendChild(doneButton);

        spectrumVal.addEventListener('mousedown', this.onSpectrumDraggerDown);
        document.addEventListener('mousemove', this.onSpectrumDraggerMove);

        spectrumHue.addEventListener('mousedown', this.onSpectrumHueDown);
        document.addEventListener('mousemove', this.onSpectrumHueMove);

        spectrumAlpha.addEventListener('mousedown', this.onSpectrumAlphaDown);
        document.addEventListener('mousemove', this.onSpectrumAlphaMove);

        document.addEventListener('mouseup', this.onMouseUp);
    }

    destroy() {
        this.spectrumVal.removeEventListener('mousedown', this.onSpectrumDraggerDown);
        document.removeEventListener('mousemove', this.onSpectrumDraggerMove);

        this.spectrumHue.removeEventListener('mousedown', this.onSpectrumHueDown);
        document.removeEventListener('mousemove', this.onSpectrumHueMove);

        this.spectrumAlpha.removeEventListener('mousedown', this.onSpectrumAlphaDown);
        document.removeEventListener('mousemove', this.onSpectrumAlphaMove);

        document.removeEventListener('mouseup', this.onMouseUp);
    }

    private onSpectrumDraggerDown = (e: MouseEvent) => {
        this.spectrumValRect = this.spectrumVal.getBoundingClientRect();
        this.isSpectrumDragging = true;

        this.moveDragger(e);
    };

    private onSpectrumDraggerMove = (e: MouseEvent) => {
        if (this.isSpectrumDragging) {
            this.moveDragger(e);
        }
    };

    private onSpectrumHueDown = (e: MouseEvent) => {
        this.spectrumHueRect = this.spectrumHue.getBoundingClientRect();
        this.isSpectrumHueDragging = true;

        this.moveHueSlider(e);
    };

    private onSpectrumHueMove = (e: MouseEvent) => {
        if (this.isSpectrumHueDragging) {
            this.moveHueSlider(e);
        }
    };

    private onSpectrumAlphaDown = (e: MouseEvent) => {
        this.spectrumAlphaRect = this.spectrumAlpha.getBoundingClientRect();
        this.isSpectrumAlphaDragging = true;

        this.moveAlphaSlider(e);
    };

    private onSpectrumAlphaMove = (e: MouseEvent) => {
        if (this.isSpectrumAlphaDragging) {
            this.moveAlphaSlider(e);
        }
    };

    private onMouseUp = (e: MouseEvent) => {
        this.isSpectrumDragging = false;
        this.isSpectrumHueDragging = false;
        this.isSpectrumAlphaDragging = false;
    };

    private moveDragger(e: MouseEvent) {
        const valRect = this.spectrumValRect;

        if (valRect) {
            let x = e.clientX - valRect.left;
            let y = e.clientY - valRect.top;

            x = Math.max(x, 0);
            x = Math.min(x, valRect.width);
            y = Math.max(y, 0);
            y = Math.min(y, valRect.height);

            this.setSpectrumValue(x / valRect.width, 1 - y / valRect.height);
        }
    }

    private moveHueSlider(e: MouseEvent) {
        const hueRect = this.spectrumHueRect;

        if (hueRect) {
            const slider = this.spectrumHueSlider;
            const sliderRect = slider.getBoundingClientRect();

            let x = e.clientX - hueRect.left;

            x = Math.max(x, 0);
            x = Math.min(x, hueRect.width);

            const H = this.H = 1 - x / hueRect.width;

            slider.style.left = (x + sliderRect.width / 2) + 'px';

            this.update();
        }
    }

    private moveAlphaSlider(e: MouseEvent) {
        const alphaRect = this.spectrumAlphaRect;

        if (alphaRect) {
            const slider = this.spectrumAlphaSlider;
            const sliderRect = slider.getBoundingClientRect();

            let x = e.clientX - alphaRect.left;

            x = Math.max(x, 0);
            x = Math.min(x, alphaRect.width);

            const A = this.A = x / alphaRect.width;

            slider.style.left = (x + sliderRect.width / 2) + 'px';

            this.update();
        }
    }

    private update() {
        const color = Color.fromHSB(this.H * 360, this.S, this.B, this.A);
        const spectrumColor = Color.fromHSB(this.H * 360, 1, 1);
        const hexColor = color.toHexString();

        this.spectrumColor.style.backgroundColor = spectrumColor.toString();
        this.spectrumTextValue.value = hexColor.toUpperCase();
        this.spectrumDragger.style.backgroundColor = hexColor;
    }

    /**
     * @param saturation In the [0, 1] interval.
     * @param brightness In the [0, 1] interval.
     */
    setSpectrumValue(saturation: number, brightness: number) {
        const valRect = this.spectrumValRect;

        if (valRect) {
            const dragger = this.spectrumDragger;
            const draggerRect = dragger.getBoundingClientRect();

            saturation = Math.max(0, saturation);
            saturation = Math.min(1, saturation);
            brightness = Math.max(0, brightness);
            brightness = Math.min(1, brightness);

            this.S = saturation;
            this.B = brightness;

            dragger.style.left = (saturation * valRect.width - draggerRect.width / 2) + 'px';
            dragger.style.top = ((1 - brightness) * valRect.height - draggerRect.height / 2) + 'px';

            this.update();
        }
    }

    /**
     * @param hue In the [0, 1] interval.
     */
    private setHueSliderValue(hue: number) {

    }

    /**
     * @param alpha In the [0, 1] interval.
     */
    private setAlphaSliderValue(alpha: number) {

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ColorPicker();
});
