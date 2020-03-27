export function createButton(text: string, action: EventListenerOrEventListenerObject, parent = document.body): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    parent.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

const wrapInLabel = (labelText: string, ele: HTMLElement) => {
    const label: HTMLLabelElement = document.createElement('label');

    label.appendChild( document.createTextNode( labelText ) );
    label.appendChild( ele );

    return label;
}

export function createDropdown<D>(
    labelText: string,
    values: D[] | {[label: string]: D},
    action: (value: D) => void
): void {

    const select : HTMLSelectElement = document.createElement('select');

    Object.entries(values).forEach( ([key, value]: [string, D]) => {
        const option = document.createElement('option');

        option.setAttribute('value', key);

        if( values instanceof Array ) {
            option.appendChild(document.createTextNode(String(value)));
        } else {
            option.appendChild(document.createTextNode(key));
        }

        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        const selectedKey: string | number = (e.target as HTMLInputElement).value;

        let selectionOption: D;

        if( values instanceof Array ) {
            selectionOption = values[Number(selectedKey)];
        } else {
            selectionOption = values[selectedKey];
        }

        action( selectionOption );
    });

    document.body.appendChild(
        wrapInLabel(
            labelText,
            select
        )
    );
}

export function createSliderValues(start: number, range: number, steps: number): number[] {
    const step = range / steps;
    const values: number[] = [];
    for (let i = 0; i <= steps; i++) {
        values.push(start + step * i);
    }
    return values;
}

export function createSlider<D>(text: string, values: D[], action: (value: D) => void): HTMLInputElement {
    const n = values.length;
    const id = String(Date.now());
    const sliderId = 'slider-' + id;
    const datalistId = 'slider-list-' + id;
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '300px';
    wrapper.style.padding = '5px';
    wrapper.style.margin = '5px';
    wrapper.style.border = '1px solid lightgray';
    wrapper.style.borderRadius = '5px';
    wrapper.style.backgroundColor = 'white';

    const slider = document.createElement('input');
    slider.setAttribute('id', sliderId);
    slider.setAttribute('list', datalistId);
    slider.style.height = '1.8em';
    slider.style.flex = '1';

    const label = document.createElement('label');
    label.setAttribute('for', sliderId);
    label.innerHTML = text;
    label.style.font = '12px sans-serif';
    label.style.marginRight = '5px';

    // Currently, no browser fully supports these features.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
    const datalist = document.createElement('datalist');
    datalist.setAttribute('id', datalistId);

    values.forEach((value, index) => {
        const option = document.createElement('option');
        option.setAttribute('value', String(index));
        option.setAttribute('label', String(value));
        datalist.appendChild(option);
    });

    slider.type = 'range';
    slider.min = '0';
    slider.max = String(n - 1);
    slider.step = '1';
    slider.value = '0';
    slider.style.width = '200px';

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
    wrapper.appendChild(datalist);
    document.body.appendChild(wrapper);

    slider.addEventListener('input', (e) => {
        const index = +(e.target as HTMLInputElement).value;
        action(values[index]);
    });
    return slider;
}

export function createSlider2(options = {} as any) {
    var values = options.values;
    var n = values && values.length;
    var id = String(Date.now());
    var sliderId = 'slider-' + id;

    var wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = (options.width || 300) + 'px';
    wrapper.style.padding = '5px 10px';
    wrapper.style.margin = '5px';
    wrapper.style.border = '1px solid lightgray';
    wrapper.style.borderRadius = '5px';
    wrapper.style.backgroundColor = 'white';

    var slider = document.createElement('input');
    slider.type = 'range';
    slider.setAttribute('id', sliderId);
    slider.style.height = '1.8em';
    slider.style.flex = '1';

    function updateValue(value: any) {
        if (options.showValue) {
            label.innerHTML = options.text + ': ' + String(value);
        }
    }

    var label = document.createElement('label');
    label.setAttribute('for', sliderId);
    label.style.font = '12px sans-serif';
    label.style.marginRight = '5px';

    if (values) {
        values.forEach((value: any, index: any) => {
            var option = document.createElement('option');
            option.setAttribute('value', String(index));
            option.setAttribute('label', String(value));
        });
        slider.min = '0';
        slider.max = String(n - 1);
        slider.step = '1';
        slider.value = '0';
    } else {
        slider.min = String(options.min || 0);
        slider.max = String(options.max || 100);
        slider.step = String(options.step || 1);
        slider.value = String(options.value || 0);
    }
    updateValue(slider.value);

    wrapper.appendChild(label);
    wrapper.appendChild(slider);
    document.body.appendChild(wrapper);

    var action = options.action;
    if (action) {
        slider.addEventListener('input', function (e: any) {
            var value = +e.target.value;
            if (values) {
                value = values[value];
            }
            action(value);
            if (options.showValue) {
                label.innerHTML = options.text + ': ' + String(value);
            }
        });
    }
    return slider;
}