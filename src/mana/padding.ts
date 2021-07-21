import { Observable, reactive } from "../../charts/util/observable"

export class Padding extends Observable {
    @reactive('paddingChange') top: number = 0;
    @reactive('paddingChange') right: number = 0;
    @reactive('paddingChange') bottom: number = 0;
    @reactive('paddingChange') left: number = 0;
}
