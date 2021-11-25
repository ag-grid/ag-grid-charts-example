import { Padding } from '../../charts/main';
import { createButton, createSlider } from '../../lib/ui';
import { gemStones } from '../mana/gemStonesData';
import { Cardioid } from './cardioid';
import { AreaSparkline } from './area/areaSparkline';
import { ColumnSparkline } from './bar-column/columnSparkline';
import { LineSparkline } from './line/lineSparkline';
import { line } from 'd3-shape';
import { BarSparkline } from './bar-column/barSparkline';
import { BarColumnLabelPlacement } from './bar-column/barColumnSparkline';

const lineSparkline = new LineSparkline();
const chartContainer = document.createElement('div');
chartContainer.style.width = '200px';
chartContainer.style.height = '100px';
chartContainer.style.border = '1px solid black';
chartContainer.style.padding = '20px';
chartContainer.style.backgroundColor = '#343334';
chartContainer.style.backgroundColor = 'white';

document.body.appendChild(chartContainer)

chartContainer.appendChild(lineSparkline.getCanvasElement());
// document.body.appendChild(lineSparkline.getCanvasElement());
lineSparkline.width = 200;
lineSparkline.height = 100;
lineSparkline.data = [7, 8.3, 6.5, 9, 12, 10, 6, 6.75, 11.9, -25, -3, 0, 2, -8];
// lineSparkline.data = [7, 8.3, undefined, 9, '9.2', null, 5.5, Infinity, 6.75, 11.9, NaN, -Infinity, 5, 4, null, {}, 6] as any;
lineSparkline.marker.fill = 'skyblue';
lineSparkline.marker.stroke = 'skyblue';
lineSparkline.line.stroke = 'skyblue';
lineSparkline.highlightStyle.size = 7;
lineSparkline.marker.shape = 'circle';
lineSparkline.marker.size = 3;
lineSparkline.title = 'mana';
lineSparkline.tooltip.container = chartContainer;
// lineSparkline.marker.enabled = false;
lineSparkline.padding = new Padding(5);
// lineSparkline.padding.bottom = 30;
lineSparkline.tooltip.renderer = (params) => {
    return {
        content: params.yValue,
        // color: 'black',
        title: 'title',
        backgroundColor: 'rgb(255, 255, 255)',
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
lineSparkline.crosshairs.xLine.enabled = true;
lineSparkline.crosshairs.xLine.stroke = 'black';
// lineSparkline.crosshairs.xLine.stroke = 'pink';

lineSparkline.crosshairs.yLine.enabled = true;
lineSparkline.crosshairs.yLine.stroke = 'pink';
lineSparkline.crosshairs.yLine.stroke = 'black';

createSlider('crosshair dash style', ['solid', 'dash', 'dashDot', 'dashDotDot', 'dot', 'longDash' , 'longDashDot', 'longDashDotDot', 'shortDash',  'shortDashDot', 'shortDashDotDot', 'shortDot'], v => {
    lineSparkline.crosshairs.xLine.lineDash = v;
    lineSparkline.crosshairs.yLine.lineDash = v;
});

createSlider('crosshair line cap', ['round', 'square', 'butt'], v  => {
    lineSparkline.crosshairs.xLine.lineCap = v as "round" | "square" | "butt" | undefined;
    lineSparkline.crosshairs.yLine.lineCap = v as "round" | "square" | "butt" | undefined;
});

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

createSlider('sparkline padding', [4, 8, 15, 20, 25], v => {
    lineSparkline.padding.top = v;
    lineSparkline.padding.right = v;
    lineSparkline.padding.bottom = v;
    lineSparkline.padding.left = v;
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
columnSparkline.data = [0,-10, 10, 20, -20, -35, 50, 26, undefined, -70, undefined, 56, 23] as any;
// columnSparkline.data = [7, 8.3, undefined, -9, '9.2', null, 5.5, Infinity, 6.75, -11.9, NaN, -Infinity, 5, 4, null, {}, 6, []] as any;
// columnSparkline.data = [5, 10, 20, 50, 26, 40, 56, 23];
columnSparkline.axis.strokeWidth = 1;
columnSparkline.valueAxisDomain = [-70, 56];
columnSparkline.label.enabled = true;
columnSparkline.label.fontSize = 2;
columnSparkline.label.fontWeight = 'bold';
columnSparkline.label.formatter = (params) =>  {
    const { value } = params;
    return `${value}%`
}
columnSparkline.label.color = 'black';
// columnSparkline.label.placement = BarColumnLabelPlacement.Outside;
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


// mini bar chart
const barSparkline = new BarSparkline();
barSparkline.container = document.body
barSparkline.width = 100;
barSparkline.height = 50;
barSparkline.data = [1, 3, 5, 9 ,2, - 3, - 5];
barSparkline.formatter = (params) => {
    const { yValue, highlighted } = params;
    return { fill: !highlighted ? yValue < 0 ? 'rgb(145, 0, 0)' : 'rgb(124, 181, 236)' : undefined }
}
barSparkline.label.enabled = true;
barSparkline.label.fontSize = 3;
barSparkline.label.fontWeight = "bold";
barSparkline.label.formatter =(params) => {
    const { value } = params;
    return `${value}`
}
barSparkline.label.color = '#fac858'
barSparkline.label.placement = BarColumnLabelPlacement.Outside;

// // mini bar chart with only one data point - setting yScale domain
const barSparkline2 = new BarSparkline();
barSparkline2.container = document.body
barSparkline2.width = 100;
barSparkline2.height = 50;
barSparkline2.data = [1];
barSparkline2.formatter = (params) => {
    const { yValue, highlighted } = params;
    return { fill: !highlighted ? yValue < 0 ? 'rgb(145, 0, 0)' : 'rgb(124, 181, 236)' : undefined }
}
barSparkline2.valueAxisDomain = [-5, 9]

barSparkline2.label.enabled = true;
barSparkline2.label.fontSize = 10;
barSparkline2.label.fontWeight = "bold";
barSparkline2.label.formatter =(params) => {
    const { value } = params;
    return `${value}%`
}
barSparkline2.label.color = '#fac858'
barSparkline2.label.placement =  BarColumnLabelPlacement.Outside;
barSparkline2.padding.right = 20;


const barSparkline3 = new BarSparkline();
barSparkline3.container = document.body
barSparkline3.width = 100;
barSparkline3.height = 50;
barSparkline3.data = [-3];
barSparkline3.formatter = (params) => {
    const { yValue, highlighted } = params;
    return { fill: !highlighted ? yValue < 0 ? 'rgb(145, 0, 0)' : 'rgb(124, 181, 236)' : undefined }
}
barSparkline3.valueAxisDomain= [-5, 9];

barSparkline3.padding.left = 25;
barSparkline3.label.enabled = true;
barSparkline3.label.fontSize = 10;
barSparkline3.label.fontWeight = "bold";
barSparkline3.label.formatter =(params) => {
    const { value } = params;
    return `${value}%`
}
barSparkline3.label.color = '#fac858'
barSparkline3.label.placement =  BarColumnLabelPlacement.Outside;

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

areaSparkline.crosshairs.xLine.enabled = true;
areaSparkline.crosshairs.xLine.stroke = 'black';

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
