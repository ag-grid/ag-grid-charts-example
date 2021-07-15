import { Observable, reactive } from "../../charts/util/observable"

export class Padding extends Observable {
    @reactive('update') top: number = 0
    @reactive('update') right: number = 0
    @reactive('update') bottom: number = 0
    @reactive('update') left: number = 0
}
