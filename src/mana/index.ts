import { Arc, Group, Scene } from "../../charts/main";
import { Selection } from "../../charts/scene/selection"

const scene = new Scene(document, 400, 400)

const group = new Group()

group.translationX = 200
group.translationY = 200

scene.root = group

scene.container = document.body

type Coordinates = {
    x: number,
    y: number
}

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

console.log("selection", selection)





const update = (data: Coordinates[]): void => {
    const update = selection.setData(data)

    console.log("update", update)

    const enter = update.enter.append(Arc)
    update.exit.remove()

    console.log("enter", enter)

    selection = update.merge(enter)

    console.log("Updated Selection", selection)

    selection.each((arc, datum, index) => {
        arc.centerX = datum.x
        arc.centerY = datum.y
        arc.radiusX = arc.radiusY = 5
        arc.fill = "red"
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

startAnimation()
