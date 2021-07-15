import value from "../../charts/interpolate/value";
import { Group, Line, LinearScale } from "../../charts/main";
import { MiniChart } from "./miniChart";

export class MiniLineChart extends MiniChart {

    private miniLineChartGroup: Group = new Group()
    private line: Line = new Line()
    private yScale: LinearScale = new LinearScale()
    

    // private _yKey: string
    // set yKey(value: string) {
    //     if(value !== this._yKey) {
    //         this._yKey = value
    //         this.processData()
    //     }
    // }
    // get yKey(): string {
    //     return this._yKey
    // }

    constructor() {
        super()
        
        this.addEventListener("dataChange", this.processData, this)

        this.scene.canvas.element.style.border = "1px solid black"
        this.rootGroup.append(this.miniLineChartGroup)
    }

    processData = (): void => {
        // if(!this.data || !this.yKey ) {
        //     return
        // }
        if(!this.data) {
            return
        }
        this.updateMarkerSelection()
        this.makeYScale()
    }

    makeYScale() {
        const [minY, maxY] = this.findMinAndMax()
        this.yScale.range = [this.padding.top, this.size[1] - this.padding.bottom]
        this.yScale.domain = [maxY, minY]
        console.log("this.yScale.ticks", this.yScale.ticks())
    }

    // findMinAndMax() {
    //     let n = this.data.length -1 
    //     let min: number
    //     let max: number
    //     let value: number
    //     let i: number = -1
    //     while (i++ < n) {
    //         value = this.data[i][this.yKey]
    //         console.log(value)
    //         if (value != null && isFinite(value) && value >= value) {
    //             min = max = value
    //         }
    //         while(i++ < n) {
    //             value = this.data[i][this.yKey]
    //             if (value < min) {
    //                 min = value
    //             }
    //             if (value > max) {
    //                 max = value
    //             }
    //         }
    //     }

    //     return min == undefined || max == undefined ? [undefined, undefined] : [min, max]
    // }

    findMinAndMax() {
        let min: number = Math.min(...this.data)
        let max: number = Math.max(...this.data)
        return [min, max]
    }

    updateMarkerSelection(): void {
    }

    updateLine(): void {
        
    }
}