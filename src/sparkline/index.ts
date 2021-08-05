import { schemeBlues } from 'd3';
import { Padding } from '../../charts/main';
import { createButton, createSlider } from '../../lib/ui';
import { gemStones } from '../mana/gemStonesData';
import { Cardioid } from './cardioid';
import { MiniAreaChart } from './miniAreaChart';
import { MiniColumnChart } from './miniColumnChart';
import { MiniLineChart } from './miniLineChart';


const miniLineChart = new MiniLineChart();
miniLineChart.width = 100;
miniLineChart.height = 50;
miniLineChart.data = [7, 8.3, 6.5, 9, 9.2, 10, 5.5, 6.75, 11.9, -25, -3, 0, 2];
miniLineChart.marker.fill = 'skyBlue';
miniLineChart.marker.stroke = 'skyBlue';
miniLineChart.line.stroke = 'skyBlue';
miniLineChart.highlightStyle.size = 7;
miniLineChart.marker.shape = 'diamond';
miniLineChart.marker.enabled = false;
miniLineChart.padding = new Padding(5);

let animateLine: boolean = false;
let lineIntervalId: number;

createButton('Animate line', () => {
    animateLine = !animateLine
    if (animateLine) {
        lineIntervalId = window.setInterval(() => {
            const data = miniLineChart.data;
            data.shift();
            data.push(Math.random() * 50);
            miniLineChart.data = data;
        }, 1000)
    } else {
        clearInterval(lineIntervalId);
    }
})

createButton('toggle marker', () => {
    miniLineChart.marker.enabled = !miniLineChart.marker.enabled;
})

createSlider('marker shape', ['circle', 'square', 'diamond'], v => {
    miniLineChart.marker.shape = v;
});

createSlider('marker fill + stroke and line stroke', ['lavender', 'olive', 'cyan', 'mediumVioletRed'], v =>{
    miniLineChart.marker.fill = v;
    miniLineChart.marker.stroke = v;
    miniLineChart.line.stroke = v;
})

createSlider('highlight size', [6, 7, 8, 9, 10], v => {
    miniLineChart.highlightStyle.size = v;
})

createSlider('highlight fill', ['orange', 'orangeRed', 'plum', 'seaGreen'], v => {
    miniLineChart.highlightStyle.fill = v;
})

// mini column chart
const miniColumnChart = new MiniColumnChart();

miniColumnChart.width = 100;
miniColumnChart.height = 50;
miniColumnChart.data = [-10, 10, 20, -20, -35, 50, 26, 40, -70, -15, 56, 23];
miniColumnChart.yScaleDomain = [-50, 50];
miniColumnChart.fill = 'skyBlue';
miniColumnChart.axis.stroke = 'skyBlue';
miniColumnChart.highlightStyle.fill = 'orange';

createButton('change fill', () => {
    miniColumnChart.axis.stroke = miniColumnChart.fill === 'pink' ? 'lavender' : 'pink';
    miniColumnChart.stroke = miniColumnChart.fill === 'pink' ? 'lavender' : 'pink';
    miniColumnChart.fill = miniColumnChart.fill === 'pink' ? 'lavender' : 'pink';
})

let barIntervalId: number;
let increments: number = 100;
createButton('Animate bars', () => {
    if (barIntervalId) {
        return;
    }
    let i = 0;
    let data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0];
    let endData: number[] = [-10, 10, 20, -20, -35, 50, 26, 40, -70, -15, 56, 23];
    const incrementBy: number[] = endData.map(datum => datum / increments);

    function step() {
        for (let i=0; i< endData.length; i++ ) {
            data[i] += incrementBy[i];
        }
        
        miniColumnChart.data = data;

        if (i <= increments) {
            i++;
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);

    // barIntervalId = window.setInterval(() => {
    //     if (i <= increments) {
    //         step();
    //         i++
    //     } else {
    //         clearInterval(barIntervalId);
    //         barIntervalId = null;
    //         i = 0;
    //     }
    // }, 10)    

})


const miniAreaChart = new MiniAreaChart();

// miniAreaChart.data = [7, 8.3, 6.5, 9, 9.2, 10, 5.5, 6.75, 11.9, -10, -4, -9, 3, 18, 22, 5, -20, -19, -15, -4];
miniAreaChart.data = [7, 8.3, 6.5, 9, 9.2, 10, 5.5, 6.75, 11.9];
miniAreaChart.width = 100;
miniAreaChart.height = 50;
miniAreaChart.line.stroke = 'pink'
miniAreaChart.marker.size = 2;
miniAreaChart.marker.fill = 'pink';
miniAreaChart.marker.stroke = 'pink';

let animateArea: boolean = false;
let areaIntervalId: number;
createButton('Animate Area', () => {
    animateArea = animateArea ? false : true;
    if (animateArea) {
        areaIntervalId = window.setInterval(() => {
            const data = miniAreaChart.data;
            data.shift();
            data.push((Math.random() - 0.5) * 50);
            miniAreaChart.data = data;
        }, 1000)
    } else {
        clearInterval(areaIntervalId);
    }
})

/**
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
cardioidChart.lineStroke = 'red';
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
heart.fill = 'red';



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
bean.fill = 'rgb(103, 36, 34)';


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

*/
