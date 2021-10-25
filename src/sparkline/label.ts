import { FontStyle, FontWeight, getFont } from "../../charts/scene/shape/text";
import { Observable, reactive } from "../../charts/util/observable";

export class Label extends Observable {
    @reactive('change', 'dataChange') enabled = true;
    @reactive('change') fontSize = 12;
    @reactive('change') fontFamily = 'Verdana, sans-serif';
    @reactive('change') fontStyle?: FontStyle;
    @reactive('change') fontWeight?: FontWeight;
    @reactive('change') color = 'rgba(70, 70, 70, 1)';

    getFont() : string {
        return getFont(this.fontSize, this.fontFamily, this.fontWeight);
    }

    constructor() {
        super();
    }
}