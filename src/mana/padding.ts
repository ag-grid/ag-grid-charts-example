import { Observable, reactive } from "../../charts/util/observable"

export class Padding extends Observable {
    @reactive('paddingChange') top: number = 50;
    @reactive('paddingChange') right: number = 50;
    @reactive('paddingChange') bottom: number = 50;
    @reactive('paddingChange') left: number = 50;
}
