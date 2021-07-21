import { Padding } from "../../charts/main";
import { createButton } from "../../lib/ui";
import { gemStones } from "../mana/gemStonesData";
import { Cardioid } from "./cardioid";
import { MiniLineChart } from "./miniLineChart";


const miniLineChart = new MiniLineChart();
miniLineChart.size = [100,50];
miniLineChart.data = [7, 8.3, 6.5, 9, 9.2, 10, 5.5, 6.75, 11.9];
miniLineChart.markerFill = undefined;
miniLineChart.markerStroke = "green";
miniLineChart.markerStrokeWidth = 0.5;
// miniLineChart.padding = new Padding(10);


let animate: boolean = false;
let intervalId: number;

createButton("Animate", () => {
    animate = animate ? false : true;
    if (animate) {
        intervalId = window.setInterval(() => {
            const data = miniLineChart.data;
            data.shift();
            data.push(Math.random() * 50);
            miniLineChart.data = data;
        }, 1000)
    } else {
        clearInterval(intervalId);
    }
})



// Cardioid
const generateCardioidData = () => {

let a = 1;
    const data = [];
    for (let t = -Math.PI; t <= Math.PI; t += 0.001) {
        let x = a * (Math.cos(t) * (1 - Math.cos(t)));
        let y = a * (Math.sin(t) * (1- Math.cos(t)));
    
        data.push({ x, y});
    }
    return data;
}


const cardioidChart = new Cardioid();
cardioidChart.size = [150,150];
cardioidChart.data = generateCardioidData();
cardioidChart.lineStroke = "red";
cardioidChart.fill = undefined;




// Heart
const generateHeartData = () => {
    let data = [];
    for (let t = -1; t <= 11 ; t +=0.01) {
        let x = 16 * (Math.sin(t) ** 3);
        let y = (13 * Math.cos(t)) - (5 * Math.cos(2*t)) - (2* Math.cos(3*t)) - (Math.cos(3 *t));
        data.push({ x, y});
    }
    return data;
}


const heart = new Cardioid();
heart.size = [100, 80];
heart.data = generateHeartData();
heart.lineStroke = undefined;
heart.fill = "red";



// Bean
const generateBeanData = () => {
    let data = [];
    for (let t = -Math.PI; t <= Math.PI; t += 0.01) {
        let x = Math.cos(t) * ((Math.sin(t) ** 3) + (Math.cos(t) ** 3));
        let y = Math.sin(t) * ((Math.sin(t) ** 3) + (Math.cos(t) ** 3));
        data.push({x, y});
    }
    return data;
}

const bean = new Cardioid();
bean.size = [100, 80];
bean.data = generateBeanData();
bean.fill = "rgb(103, 36, 34)";


// Failed Fibonacci Spiral
const generateFibonacciSpiralData = () => {
    let a = 1;
    let b = 1;
    let data = [];
    for (let t =  - 12 * Math.PI; t <= 0 ; t += 1) {
        let x = a * (Math.cos(t) * Math.exp(b * t));
        let y = a * (Math.sin(t) * Math.exp(b * t));
        data.push({x, y});
    }
    return data;
}

const FibonacciSpiral = new Cardioid();
FibonacciSpiral.size = [100, 80];
FibonacciSpiral.data = generateFibonacciSpiralData();
FibonacciSpiral.fill = undefined;


