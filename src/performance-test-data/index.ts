import { NumberAxis } from "ag-charts-community/src/chart/axis/numberAxis";
import { ChartAxisPosition } from "ag-charts-community/src/chart/chartAxis";
import { CartesianChart } from "ag-charts-community/src/chart/cartesianChart";
import { LineSeries } from "ag-charts-community/src/chart/series/cartesian/lineSeries";
import { Circle } from "ag-charts-community/src/chart/marker/circle";

type NumericDatum = {
  xValue: number,
  yValue: number
};

// 2000 data points
const step = 0.05;
let domainStart = 0;
let domainEnd = 100;

function generateSineData(): NumericDatum[] {
  const data: NumericDatum[] = [];
  for (let x = domainStart; x < domainEnd; x += step) {
    const datum: NumericDatum = {
      xValue: x,
      yValue: Math.sin(x)
    };
    data.push(datum);
  }
  return data;
}

const sineData = generateSineData();

function createNumericLineChart() {
  document.body.appendChild(document.createElement('br'));

  const xAxis = new NumberAxis();
  xAxis.position = ChartAxisPosition.Bottom;
  xAxis.label.rotation = 45;

  const yAxis = new NumberAxis();
  yAxis.position = ChartAxisPosition.Left;

  const chart = new CartesianChart();
  chart.axes = [xAxis, yAxis];
  chart.container = document.body;
  chart.width = 600;
  chart.height = 600;

  const lineSeries = new LineSeries();
  lineSeries.marker.shape = Circle;
  lineSeries.marker.enabled = true;
  lineSeries.strokeWidth = 2;
  lineSeries.showInLegend = false;
  chart.addSeries(lineSeries);
  lineSeries.data = sineData;
  lineSeries.xKey = 'xValue';
  lineSeries.yKey = 'yValue';

  let bestTime = Infinity;
  let worstTime = 0;
  let bestTimeIndex = -1;
  let worstTimeIndex = -1;
  let totalTime = 0;
  let lastTime = performance.now();
  let i = 0;
  let x = domainEnd;

  chart.addEventListener('layoutDone', updateData);

  function updateData() {
    i++;
    const now = performance.now();
    const time = now - lastTime;
    lastTime = now;
    totalTime += time;

    if (time > worstTime) {
      worstTime = time;
      worstTimeIndex = i;
    }
    if (time < bestTime) {
      bestTime = time;
      bestTimeIndex = i;
    }

    if (i === 1000) {
      chart.removeEventListener('layoutDone', updateData);
      const averageTime = totalTime / i;
      const results = {
        description: 'Times between layouts on data changes, total time and number of frames rendered.',
        averageTime,
        bestTime,
        bestTimeIndex,
        worstTime,
        worstTimeIndex,
        totalTime,
        // this should be 999 (we don't wait for the frame after the last layout)
        frameCount: chart.scene.frameIndex
      };
      (window as any).chartTestResults = results;
      return;
    }

    x += step;
    const datum: NumericDatum = {
      xValue: x,
      yValue: Math.sin(x)
    };

    sineData.shift();
    sineData.push(datum);

    chart.data = sineData;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createNumericLineChart();
});