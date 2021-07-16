import { Arc, BandScale, Group, Line, LinearScale, Scene } from "../../charts/main";
import { Selection } from "../../charts/scene/selection"
import { gemStones } from "./gemStonesData";
import { VanCleef } from "./vanCleef";
import { Text } from "../../charts/scene/shape/text"
import { Coordinates } from "./types";
import { VanCleefChart } from "./vanCleefChart";
import { createButton, createSlider } from "../../lib/ui";
import { Circle } from "../sparkline/circle";

const vanCleefChart = new VanCleefChart()

vanCleefChart.size = [1000, 1000]
vanCleefChart.data = gemStones
vanCleefChart.xKey = "name"
vanCleefChart.yKey = "hardness"
vanCleefChart.markerFill = "green"

createSlider("change padding", [10, 20, 30, 40, 50, 60, 70, 80, 100], (value: number) => {

    vanCleefChart.padding.right = value
    vanCleefChart.padding.top = value
    vanCleefChart.padding.bottom = value
    vanCleefChart.padding.left = value

    console.log(vanCleefChart.padding)
})

createButton("change data", () => {
    const randomIndex = Math.floor(Math.random() * 6)
    vanCleefChart.data = gemStones.slice(randomIndex)
})


const scene = new Scene(document, 1000, 1000)

const group = new Group()

group.translationX = 200
group.translationY = 200

scene.root = group

scene.container = document.body

scene.canvas.element.style.border = "1px solid black"



const generateCoordinates = (r: number = 100, steps: number = 30 ) : Coordinates[] => {
    let data: Coordinates[] = []

    let alpha: number = 0
    const increment = ( (360 / steps) / 360) * 2 * Math.PI
    for (let i =0; i < steps ; i ++) {
        const coordinates = {
            x: r * Math.cos(alpha),
            y: r * Math.sin(alpha),
        }
        data.push(coordinates)

        alpha += increment
    }
    return data
}


const startCoordinates = generateCoordinates(200);


const generateTransitionCoordinates = (t: number) : Coordinates[] => {

    const endCoordinates = generateCoordinates(100, Math.round(t * 30));

    let data: Coordinates[] = []

    for (let i =0; i < endCoordinates.length ; i ++) {
        let x0 = startCoordinates[i].x
        let y0 = startCoordinates[i].y
        let x1 = endCoordinates[i].x
        let y1 = endCoordinates[i].y
        const coordinates = {
            // x: ((x1 * (1-t)) + (x0 * t)),
            // y: ((y1 * (1-t)) + (y0 * t)),
            // x: ((x1 * (1-t))),
            // y: ((y1 * (1-t))),
            // x: x1 * t,
            // y: y1 * t,
            x: ((x1 * (t-1)) + (x1 * t)),
            y: ((y1 * (t-1)) + (y1 * t)),
        }
        data.push(coordinates)
    }
    return data
}




let selection = Selection.select(group).selectAll<Arc>()

// console.log("selection", selection)





const update = (data: Coordinates[]): void => {
    const update = selection.setData(data)

    // console.log("update", update)

    const enter = update.enter.append(Arc)
    update.exit.remove()

    // console.log("enter", enter)

    selection = update.merge(enter)

    // console.log("Updated Selection", selection)

    selection.each((arc, datum, index) => {
        arc.centerX = datum.x
        arc.centerY = datum.y
        arc.radiusX = arc.radiusY = 5
        arc.fill = "rgb(212, 175, 55)"
    })


}

let start: number
const duration: number = 10000

const next = (): void => {

    const now: number = Date.now()
    const timeElapsed: number = now - start

    const t: number = timeElapsed / duration

    // console.log(t)

    if (timeElapsed > duration) {
        start = now
    }

    const data = generateTransitionCoordinates(t)
    update(data)
    window.requestAnimationFrame(next)
}

const startAnimation = () : void => {
    start = Date.now()
    next()
}

// startAnimation()


// const clover = new VanCleef()

// clover.x = 0
// clover.y = 0

// clover.size = 50
// clover.fill = "rgb(1, 57, 12)"
// clover.stroke = "rgb(212, 175, 55)"
// clover.strokeWidth = 3
// clover.lineDash = [3, 1]

// group.append(clover)

const chain = new Arc()

chain.centerX = 0
chain.centerY = 0
chain.radiusY = chain.radiusX = 100
chain.stroke = "rgb(212, 175, 55)"
chain.fill = undefined
chain.strokeWidth = 6
chain.lineDash = [3, 1]


group.append(chain)


let cloverSelection = Selection.select(group).selectAll<VanCleef>()

let cloverUpdate = cloverSelection.setData(generateCoordinates(100, 5))

let cloverEnter = cloverUpdate.enter.append(VanCleef)

cloverUpdate.exit.remove()

cloverSelection = cloverUpdate.merge(cloverEnter)

cloverSelection.each((clover, datum, index) => {
    clover.x = datum.x
    clover.y = datum.y

    clover.size = 50
    clover.fill = "rgb(1, 57, 12)"
    clover.stroke = "rgb(212, 175, 55)"
    clover.strokeWidth = 3
    clover.lineDash = [3, 1]
})


const changeCloverColor = (event: MouseEvent): void => {
    for (let element of group.children) {
        if (element instanceof VanCleef) {
            if (element.isPointInPath(event.clientX, event.clientY)) {
                // console.log(element)
                element.fill = element.fill === "rgb(1, 57, 12)" ? "rgb(3, 37, 76)" : "rgb(1, 57, 12)"
            }
        }
    }
}

// scene.canvas.element.onclick = changeCloverColor

scene.canvas.element.addEventListener("click", changeCloverColor)



// /**
//  * chart with axes
//  */

// const cloverChart = new Group()
// group.append(cloverChart)

// /**
//  * x-axis
//  */

// const xAxis = new Group()
// cloverChart.append(xAxis)

// const bandScale = new BandScale()
// bandScale.domain = [...gemStones.map(gemStone => gemStone.name)]
// bandScale.range = [0, 400]
// bandScale.paddingOuter = 0.2

// const bandTicks = bandScale.ticks()
// // console.log(bandTicks)

// let bandScaleSelection = Selection.select(xAxis).selectAll<Text>()

// let updateBandScaleSelection = bandScaleSelection.setData(bandTicks)

// updateBandScaleSelection.enter.append(Text).each((text, datum, index) => {
//     text.x = bandScale.convert(datum) + bandScale.bandwidth / 2
//     text.y = 300
//     text.textAlign = "center"
//     text.text = datum as string
// })

// // line for xAxis
// const xAxisLine = new Line()

// xAxisLine.x1 = bandScale.range[0]
// xAxisLine.x2 = bandScale.range[1]
// xAxisLine.y1 = xAxisLine.y2 = 250
// xAxisLine.strokeWidth = 1
// xAxisLine.stroke = "black"

// xAxis.append(xAxisLine)

// /**
//  * y-axis
//  */


// const yAxis = new Group()
// cloverChart.append(yAxis)


// // const maxHardness: number = gemStones.reduce((prev, curr) => {
// //     return prev.hardness > curr.hardness ? prev : curr
// // }, {hardness: 0}).hardness
// const findMinAndMax = (): { min: number, max: number}  => {
//     let min: number = gemStones[0].hardness
//     let max: number = 0

//     for (let i = 0; i < gemStones.length; i++) {
//         if (gemStones[i].hardness < min) {
//             min = gemStones[i].hardness
//         }
//         if (gemStones[i].hardness > max) {
//             max = gemStones[i].hardness
//         }
//     }

//     return {
//         min,
//         max
//     }
// }

// const hardness : { min: number, max: number} = findMinAndMax()

// const linearScale = new LinearScale()
// linearScale.domain = [hardness.min, hardness.max]
// linearScale.range = [250, 0]
// const linearTicks = linearScale.ticks()

// let linearScaleSelection = Selection.select(yAxis).selectAll<Text>()
// let updateLinearScaleSelection = linearScaleSelection.setData(linearTicks)

// updateLinearScaleSelection.enter.append(Text).each((text, datum, index) => {
//     text.text = String(datum)
//     text.textAlign = 'end';
//     text.textBaseline = 'middle';
//     text.x = bandScale.range[0] - 10
//     text.y = linearScale.convert(datum)
// })

// // line for y-axis
// const yAxisLine = new Line()

// yAxisLine.x1 = yAxisLine.x2 = bandScale.range[0]
// yAxisLine.y1 = linearScale.range[0]
// yAxisLine.y2 = linearScale.range[1]
// yAxisLine.stroke = "black"
// yAxisLine.strokeWidth = 1

// yAxis.append(yAxisLine)



// /**
//  * Data nodes
//  */

// let cloverChartSelection = Selection.select(cloverChart).selectAll<VanCleef>()

// let updateCloverChartSelection = cloverChartSelection.setData(gemStones)

// updateCloverChartSelection.enter.append(VanCleef).each((clover, datum, index) => {
//     clover.size = 15,
//     clover.fill = "green"
//     clover.x = bandScale.convert(datum.name) + bandScale.bandwidth / 2
//     clover.y = linearScale.convert(datum.hardness)
// })






// checking isPointInPath

// const circle = new Circle()

// circle.centerY = 50
// circle.centerX = 50
// circle.radius = 25

// group.append(circle)

// const handleClick = (event: MouseEvent) => {
//     const isInPath = circle.isPointInPath(event.offsetX, event.offsetY)
//     if (isInPath) {
//         circle.radius = 100
//     }
// }
// scene.canvas.element.addEventListener("click", handleClick)




