/**
 * Scatter plot with clover markers
 */

import { BandScale, Group, LinearScale, Scene } from "../../charts/main"
import { Selection } from "../../charts/scene/selection"
import { Text } from "../../charts/scene/shape/text"
import { VanCleef } from "./vanCleef"



export class VanCleefChart {

    private _size: [number, number] = [800, 600]
    set size(value: [number, number]) {
        if(value !== this._size) {
            this._size = value
            this.updateSelections()
        }
    }
    get size(): [number, number] {
        return this._size
    }

    private _data: any
    set data(value: any) {
        if (value !== this._data) {
            this._data = value
        }
        this.processData()
    }
    get data(): any {
        return this._data
    }

    private _xKey: string
    set xKey(value: string) {
        if (value !== this._xKey) {
            this._xKey = value
        }
    }
    get xKey(): string {
        return this._xKey
    }

    private _yKey: string
    set yKey(value: string) {
        if(value !== this._yKey) {
            this._yKey = value
        }
    }
    get yKey(): string {
        return this._yKey
    }

    private scene: Scene
    private group: Group = new Group()
    private xAxis: Group = new Group()
    private yAxis: Group = new Group()
    private markers: Group = new Group()
    private bandScaleSelection: Selection<Text, Group, string, any> = Selection.select(this.xAxis).selectAll<Text>()
    private linearScaleSelection: Selection<Text, Group, number, any> = Selection.select(this.yAxis).selectAll<Text>()
    private markersSelection: Selection<VanCleef, Group, any, any> = Selection.select(this.markers).selectAll<VanCleef>()

    constructor() {
        this.scene = new Scene(document, this.size[0], this.size[1])
        this.scene.root = this.group

        this.group.append([this.xAxis, this.yAxis, this.markers])
    }


    private xBandScale = new BandScale<string>()
    private xBandScaleTicks: string[]

    private yLinearScale = new LinearScale()
    private yLinearScaleTicks: number[]

    processData = (): void => {

        if (!this.xKey || !this.yKey) {
            return
        }

        this.makeBandScale()
        this.makeLinearScale()
        this.updateSelections()
    }

    makeBandScale = (): void => {
        this.xBandScale.domain = [...this._data.map((datum: any )=> datum[this.xKey])]
        this.xBandScale.range = [0, this.size[0]]
        this.xBandScaleTicks = this.xBandScale.ticks()
    }

    makeLinearScale = (): void => {
        const { min: yMin, max: yMax } = this.findMinAndMax()
        this.yLinearScale.domain = [yMax, yMin]
        this.yLinearScale.range = [0, this.size[1]]
        this.yLinearScaleTicks = this.yLinearScale.ticks()
    }


    findMinAndMax = (): { min: number, max: number}  => {
        this.data.map((datum: any) => {
            return datum[this.yKey]
        })
        let min: number = this._data[0][this.yKey]
        let max: number = 0
    
        for (let i = 0; i < this._data.length; i++) {
            if (this._data[i][this.yKey] < min) {
                min = this._data[i][this.yKey]
            }
            if (this._data[i][this.yKey] > max) {
                max = this._data[i][this.yKey]
            }
        }
    
        return {
            min,
            max
        }
    }

    updateSelections = (): void => {
        if (!this.data) {
            return
        }
        this.updateXAxisSelection()
        this.updateYAxisSelection()
        this.updateMarkerSelection()
    }

    updateXAxisSelection = (): void => {
        let updateBandSelection = this.bandScaleSelection.setData(this.xBandScaleTicks)
        let enterBandSelection = updateBandSelection.enter.append(Text)
        updateBandSelection.exit.remove()

        console.log("updateBandSelection", updateBandSelection)
        console.log("enterBandSelection", enterBandSelection)
        console.log("this.bandScaleSelection", this.bandScaleSelection)

        this.bandScaleSelection = updateBandSelection.merge(enterBandSelection)

        this.bandScaleSelection.each((text, datum, index) => {
            text.x = this.xBandScale.convert(datum)
            text.fill = "black"
            text.y = this.size[1]
            text.text = String(datum)
            text.textAlign = "center"
            console.log("text.text", text.text)
        })


    }

    updateYAxisSelection = (): void => {

    }

    updateMarkerSelection = (): void => {

    }
}

