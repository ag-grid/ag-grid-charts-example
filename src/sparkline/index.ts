import { Padding } from '../../charts/main';
import { createButton, createSlider } from '../../lib/ui';
import { gemStones } from '../mana/gemStonesData';
import { Cardioid } from './cardioid';
import { AreaSparkline } from './areaSparkline';
import { ColumnSparkline } from './columnSparkline';
import { LineSparkline } from './lineSparkline';

const lineSparkline = new LineSparkline();
const chartContainer = document.createElement('div');
chartContainer.style.width = '100px';
chartContainer.style.height = '50px';
chartContainer.style.border = '1px solid black';
chartContainer.style.padding = '50px';
chartContainer.style.backgroundColor = '#343334';

document.body.appendChild(chartContainer)

chartContainer.appendChild(lineSparkline.getCanvasElement());
// document.body.appendChild(lineSparkline.getCanvasElement());
lineSparkline.width = 100;
lineSparkline.height = 50;
lineSparkline.data = [7, 8.3, 6.5, 9, 12, 10, 6, 6.75, 11.9, -25, -3, 0, 2, -8];
// lineSparkline.data = [7, 8.3, undefined, 9, '9.2', null, 5.5, Infinity, 6.75, 11.9, NaN, -Infinity, 5, 4, null, {}, 6] as any;
lineSparkline.marker.fill = 'skyblue';
lineSparkline.marker.stroke = 'skyblue';
lineSparkline.line.stroke = 'skyblue';
lineSparkline.highlightStyle.size = 7;
lineSparkline.marker.shape = 'diamond';
lineSparkline.marker.size = 3;
lineSparkline.title = 'mana';
lineSparkline.tooltip.container = chartContainer;
// lineSparkline.marker.enabled = false;
// lineSparkline.padding = new Padding(5);
lineSparkline.tooltip.renderer = (params) => {
    return {
        content: params.yValue,
        color: 'black',
        backgroundColor: params.backgroundColor,
        opacity: 0.8
    }
}
lineSparkline.marker.formatter = (params) => {
    return {
        size: !params.highlighted ? params.yValue < 0 ? 5 : 3 : undefined,
        fill: !params.highlighted ? params.yValue < 0 ? 'green' : 'skyblue': undefined,
        stroke: !params.highlighted ? params.yValue < 0 ? 'green' : 'skyblue' : undefined
    }
}

let animateLine: boolean = false;
let lineIntervalId: number;

createButton('Animate line', () => {
    animateLine = !animateLine
    if (animateLine) {
        lineIntervalId = window.setInterval(() => {
            const data = lineSparkline.data || [];
            data.shift();
            data.push(Math.random() * 50);
            lineSparkline.data = data;
        }, 1000)
    } else {
        clearInterval(lineIntervalId);
    }
})

createButton('toggle marker', () => {
    lineSparkline.marker.enabled = !lineSparkline.marker.enabled;
})

createSlider('marker shape', ['circle', 'square', 'diamond'], v => {
    lineSparkline.marker.shape = v;
});

createSlider('marker fill + stroke and line stroke', ['lavender', 'olive', 'cyan', 'mediumVioletRed'], v =>{
    lineSparkline.marker.fill = v;
    lineSparkline.marker.stroke = v;
    lineSparkline.line.stroke = v;
})

createSlider('highlight size', [6, 7, 8, 9, 10], v => {
    lineSparkline.highlightStyle.size = v;
})

createSlider('highlight fill', ['orange', 'orangeRed', 'plum', 'seaGreen'], v => {
    lineSparkline.highlightStyle.fill = v;
})

// mini column chart
const columnSparkline = new ColumnSparkline();
columnSparkline.container = document.body;
columnSparkline.width = 100;
columnSparkline.height = 50;
columnSparkline.data = [-10, 10, 20, -20, -35, 50, 26, undefined, -70, undefined, 56, 23] as any;
// columnSparkline.data = [7, 8.3, undefined, -9, '9.2', null, 5.5, Infinity, 6.75, -11.9, NaN, -Infinity, 5, 4, null, {}, 6, []] as any;
// columnSparkline.data = [5, 10, 20, 50, 26, 40, 56, 23];
columnSparkline.axis.strokeWidth = 1;
columnSparkline.yScaleDomain = [0, 50];
columnSparkline.formatter = (params) => {
    return {
        fill: !params.highlighted ? params.yValue < 0 ? 'rgb(145, 0, 0)' : 'rgb(124, 181, 236)' : undefined,
    }
}

createButton('change fill', () => {
    columnSparkline.stroke = columnSparkline.fill === 'pink' ? 'lavender' : 'pink';
    columnSparkline.axis.stroke = columnSparkline.fill === 'pink' ? 'lavender' : 'pink';
    columnSparkline.fill = columnSparkline.fill === 'pink' ? 'lavender' : 'pink';
});

let barIntervalId: number;
let increments: number = 100;
createButton('Animate bars', () => {
    if (barIntervalId) {
        return;
    }
    let i = 0;
    let data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let endData: number[] = columnSparkline.data || [];
    const incrementBy: number[] = endData.map(datum => datum / increments);

    function step() {
        for (let i=0; i< endData.length; i++ ) {
            data[i] += incrementBy[i];
        }

        columnSparkline.data = data;

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

});

createSlider('strokeWidth', [0, 1, 2, 3], v => {
    columnSparkline.strokeWidth = v;
});

createSlider('stroke', ['lavender', 'olive', 'cyan', 'mediumVioletRed'], v => {
    columnSparkline.stroke = v;
});

createSlider('paddingInner', [0, 0.2, 0.4, 0.5, 0.6, 0.8], v => {
    columnSparkline.paddingInner = v;
});

createSlider('paddingOuter', [0, 0.2, 0.4, 0.5, 0.6, 0.8], v => {
    columnSparkline.paddingOuter = v;
});

createSlider('axis stroke', ['lavender', 'olive', 'cyan', 'mediumVioletRed'], v => {
    columnSparkline.axis.stroke = v;
});

createSlider('column fill', ['lavender', 'olive', 'cyan', 'mediumVioletRed'], v =>{
    columnSparkline.fill = v;
});

createSlider('highlight fill', ['orange', 'orangeRed', 'plum', 'seaGreen'], v => {
    columnSparkline.highlightStyle.fill = v;
});




const areaSparkline = new AreaSparkline();
areaSparkline.container = document.body;
// areaSparkline.data = [7, 8.3, 6.5, 9, 9.2, 10, 5.5, 6.75, 11.9, -10, -4, -9, 3, 18, 22, 5, -20, -19, -15, -4];
// areaSparkline.data = [7, 8.3, undefined, 9, '9.2', null, 5.5, Infinity, 6.75, 11.9, NaN, -Infinity, 5, 4, null, {}, 6] as any;
areaSparkline.data = [1, 1, -3 , 1, 1];
// areaSparkline.data = [0, 0];
areaSparkline.width = 100;
areaSparkline.height = 50;
// areaSparkline.line.stroke = 'pink';
// areaSparkline.line.strokeWidth = 2;
areaSparkline.marker.size = 2;
// areaSparkline.marker.fill = 'pink';
// areaSparkline.marker.stroke = 'pink';
// areaSparkline.fill = undefined;

let animateArea: boolean = false;
let areaIntervalId: number;
createButton('Animate Area', () => {
    animateArea = animateArea ? false : true;
    if (animateArea) {
        areaIntervalId = window.setInterval(() => {
            const data = areaSparkline.data || [];
            data.shift();
            data.push((Math.random() - 0.5) * 50);
            areaSparkline.data = data;
        }, 1000)
    } else {
        clearInterval(areaIntervalId);
    }
});


createButton('toggle marker', () => {
    areaSparkline.marker.enabled = !areaSparkline.marker.enabled;
});

createSlider('marker shape', ['circle', 'square', 'diamond'], v => {
    areaSparkline.marker.shape = v;
});

createSlider('marker fill + stroke and line stroke', ['lavender', 'olive', 'cyan', 'mediumVioletRed'], v =>{
    areaSparkline.marker.fill = v;
    areaSparkline.marker.stroke = v;
    areaSparkline.line.stroke = v;
});

createSlider('highlight size', [6, 7, 8, 9, 10], v => {
    areaSparkline.highlightStyle.size = v;
});

createSlider('highlight fill', ['orange', 'orangeRed', 'plum', 'seaGreen'], v => {
    areaSparkline.highlightStyle.fill = v;
});

areaSparkline.marker.formatter = (params) => {
    return {
        size: !params.highlighted ? params.yValue < 0 ? 5 : 3 : undefined,
        fill: !params.highlighted ? params.yValue < 0 ? 'red' : 'skyblue': undefined,
        stroke: !params.highlighted ? params.yValue < 0 ? 'red' : 'skyblue' : undefined
    }
}

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
