/**
 * Scatter plot with clover markers
 */

import { BandScale, Group, Line, LinearScale, Scene } from "../../charts/main"
import { Selection } from "../../charts/scene/selection"
import { Text } from "../../charts/scene/shape/text"
import { Observable, reactive } from "../../charts/util/observable"
import { Padding } from "./padding"
import { VanCleef } from "./vanCleef"


export class VanCleefChart extends Observable {

    padding = new Padding()

    private _size: [number, number] = [800, 600]
    set size(value: [number, number]) {
        this._size = value
        this.scene.resize(this._size[0], this._size[1])  
        this.processData()
    }
    get size(): [number, number] {
        return this._size
    }

    // private _data: any
    // set data(value: any) {
    //     if (value !== this._data) {
    //         this._data = value
    //     }
    //     this.processData()
    // }
    // get data(): any {
    //     return this._data
    // }

    @reactive("change") data: any = []
    @reactive("change") xKey: string
    @reactive("change") yKey: string

    // private _xKey: string
    // set xKey(value: string) {
    //     if (value !== this._xKey) {
    //         this._xKey = value
    //         this.processData()
    //     }
    // }
    // get xKey(): string {
    //     return this._xKey
    // }

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

    // private _padding: Padding = { 
    //     top: 50, 
    //     right: 50, 
    //     bottom: 50, 
    //     left: 50 
    // }
    // set padding(value: Padding) {
    //     this._padding = value
    //     this.updateSelections()
    // }
    // get padding(): Padding {
    //     return this._padding
    // }

    private _markerFill: string = "black"
    set markerFill(value: string) {
        if (this._markerFill !== value) {
            this._markerFill = value
            this.updateMarkerSelection()
        }
    }
    get markerFill(): string {
        return this._markerFill
    }

    private scene: Scene
    private group: Group = new Group()
    private xAxis: Group = new Group()
    private yAxis: Group = new Group()
    private markers: Group = new Group()
    private xAxisLine: Line = new Line()
    private yAxisLine: Line = new Line()
    private bandScaleSelection: Selection<Text, Group, string, any> = Selection.select(this.xAxis).selectAll<Text>()
    private bandScaleGroupSelection: Selection<Group, Group, string, any> = Selection.select(this.xAxis).selectAll<Group>()
    private linearScaleSelection: Selection<Text, Group, number, any> = Selection.select(this.yAxis).selectAll<Text>()
    private linearScaleGroupSelection: Selection<Group, Group, number, any> = Selection.select(this.yAxis).selectAll<Group>()
    private markersSelection: Selection<VanCleef, Group, any, any> = Selection.select(this.markers).selectAll<VanCleef>()

    constructor() {
        super()
        this.scene = new Scene(document, this.size[0], this.size[1])
        this.scene.root = this.group
        this.scene.container = document.body
        this.scene.canvas.element.style.border = '1px solid black';

        this.group.append([this.xAxis, this.yAxis, this.markers])
        this.yAxis.append(this.yAxisLine)
        this.xAxis.append(this.xAxisLine)


        this.makeSceneResizable()

        this.addEventListener("change", this.processData, this)
        this.padding.addEventListener("paddingChange", this.processData, this)
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
        this.xBandScale.domain = [...this.data.map((datum: any )=> datum[this.xKey])]
        this.xBandScale.range = [this.padding.left, this.size[0] - this.padding.right - this.padding.left]
        this.xBandScaleTicks = this.xBandScale.ticks()
    }

    makeLinearScale = (): void => {
        const { min: yMin, max: yMax } = this.findMinAndMax()
        this.yLinearScale.domain = [yMax, yMin]
        this.yLinearScale.range = [this.padding.top, this.size[1] - this.padding.bottom - 20 ]
        this.yLinearScaleTicks = this.yLinearScale.ticks()
    }


    findMinAndMax = (): { min: number, max: number}  => {
        this.data.map((datum: any) => {
            return datum[this.yKey]
        })
        let min: number = this.data[0][this.yKey]
        let max: number = 0
    
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][this.yKey] < min) {
                min = this.data[i][this.yKey]
            }
            if (this.data[i][this.yKey] > max) {
                max = this.data[i][this.yKey]
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
        // let updateBandScaleSelection = this.bandScaleSelection.setData(this.xBandScaleTicks)
        // let enterBandScaleSelection = updateBandScaleSelection.enter.append(Text)
        // updateBandScaleSelection.exit.remove()


        // this.bandScaleSelection = updateBandScaleSelection.merge(enterBandScaleSelection)

        // this.bandScaleSelection.each((text, datum, index) => {
        //     text.x = this.xBandScale.convert(datum) + (this.xBandScale.bandwidth / 2)
        //     text.fill = "black"
        //     text.y = this.size[1] - this.padding.bottom
        //     text.text = String(datum)
        //     text.textAlign = "center"
        // })

        // line for xAxis

        
        // this.xAxisLine.x1 = this.padding.left
        // this.xAxisLine.x2 = this.size[0] - this.padding.right - this.padding.left
        // this.xAxisLine.y1 = this.xAxisLine.y2 = this.size[1] - this.padding.bottom - 20
        // this.xAxisLine.strokeWidth = 1
        // this.xAxisLine.stroke = "black"


        // Redo axis with group selection and position using translation
        let updateBandScaleGroupSelection = this.bandScaleGroupSelection.setData(this.xBandScaleTicks)

        let enterBandScaleGroupSelection = updateBandScaleGroupSelection.enter.append(Group)

        updateBandScaleGroupSelection.exit.remove()


        enterBandScaleGroupSelection.append(Text)

        enterBandScaleGroupSelection.append(Line)

        enterBandScaleGroupSelection.selectByClass(Text).each((text, datum, index) => {
            text.x = 0
            text.y = 20 
            text.fill = "black"
            text.text = String(datum)
            text.textAlign = "center"
        })

        enterBandScaleGroupSelection.selectByClass(Line).each((tick, datum, index) => {
            tick.y1 = 0
            tick.y2 = 6
            tick.x1 = tick.x2 = 0
            tick.stroke = "black"
            tick.strokeWidth = 1
        })

        this.bandScaleGroupSelection = updateBandScaleGroupSelection.merge(enterBandScaleGroupSelection)

        this.bandScaleGroupSelection.each((group, datum, index) => {
            group.translationX = this.xBandScale.convert(datum) + (this.xBandScale.bandwidth / 2)
        })


        this.xAxisLine.x1 = this.padding.left
        this.xAxisLine.x2 = this.size[0] - this.padding.right - this.padding.left
        this.xAxisLine.y1 = 0
        this.xAxisLine.strokeWidth = 1
        this.xAxisLine.stroke = "black"

        this.xAxis.translationY = this.size[1] - this.padding.bottom


    }

    updateYAxisSelection = (): void => {
        let updateLinearScaleSelection = this.linearScaleSelection.setData(this.yLinearScaleTicks)
        let enterLinearScaleSelection = updateLinearScaleSelection.enter.append(Text)

        updateLinearScaleSelection.exit.remove()

        this.linearScaleSelection = updateLinearScaleSelection.merge(enterLinearScaleSelection)

        this.linearScaleSelection.each((text, datum, index) => {
            text.text = String(datum)
            text.x = this.padding.left - 20
            text.y = this.yLinearScale.convert(datum)
            text.textAlign = "end"
            text.textBaseline = "middle"
        })

        // line for y-axis

        this.yAxisLine.x1 = this.yAxisLine.x2 = this.padding.left
        this.yAxisLine.y1 = this.padding.top
        this.yAxisLine.y2 = this.size[1] - this.padding.bottom
        this.yAxisLine.strokeWidth = 1
        this.yAxisLine.stroke = "black"


    }

    updateMarkerSelection = (): void => {
        let updateMarkersSelection = this.markersSelection.setData(this.data)
        let enterMarkersSelection = updateMarkersSelection.enter.append(VanCleef)

        updateMarkersSelection.exit.remove()
        
        this.markersSelection = updateMarkersSelection.merge(enterMarkersSelection)

        this.markersSelection.each((clover, datum, index) => {
            clover.size = Math.round(this.size[0] / this.data.length / 10)
            clover.x = this.xBandScale.convert(datum[this.xKey]) + (this.xBandScale.bandwidth / 2)
            clover.y = this.yLinearScale.convert(datum[this.yKey])
            clover.fill = this.markerFill
        })

    }

    makeSceneResizable = (): void => {
        let startX = 0
        let startY = 0
        let isDragging = false
        let sceneSize: [number, number]

        this.scene.canvas.element.addEventListener("mousedown", (event: MouseEvent): void => {
            startX = event.offsetX
            startY = event.offsetY
            sceneSize = [this.scene.width, this.scene.height]
            isDragging = true
        })
        this.scene.canvas.element.addEventListener("mousemove", (event: MouseEvent): void => {
            if (isDragging) {
                const dx = event.offsetX - startX
                const dy = event.offsetY - startY
                this.scene.resize(sceneSize[0] + dx, sceneSize[1] + dy)
                this.onResize(this.scene.width, this.scene.height)
            }
        })
        this.scene.canvas.element.addEventListener("mouseup", (): void => {
            isDragging = false
        })
    }

    onResize = (width: number, height: number): void => {
        this.size = [width, height]
        // this.updateSelections()
    }
}

