import { Padding } from "../../charts/main";
import { createButton } from "../../lib/ui";
import { MiniLineChart } from "./miniLineChart";


const miniLineChart = new MiniLineChart()

miniLineChart.size = [100,50]
miniLineChart.data = [7, 8.3, 6.5, 9, 9.2, 10, 5.5, 6.75, 11.9]
miniLineChart.markerFill = undefined
miniLineChart.markerStroke = "green"
miniLineChart.markerStrokeWidth = 0.5
// miniLineChart.padding = new Padding(10)


let animate: boolean = false
let intervalId: number

createButton("Animate", () => {
    animate = animate ? false : true
    if (animate) {
        intervalId = window.setInterval(() => {
            const data = miniLineChart.data
            data.shift()
            data.push(Math.random() * 50)
            miniLineChart.data = data
        }, 1000)
    } else {
        clearInterval(intervalId)
    }
})




