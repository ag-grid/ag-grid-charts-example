import { gemStones } from "../mana/gemStonesData";
import { MiniLineChart } from "./miniLineChart";


const miniLineChart = new MiniLineChart()

miniLineChart.size = [500,500]
miniLineChart.data = [7, 8.3, 6.5, 9, 9.2, 10, 5.5, 6.75, 11.9]
// miniLineChart.data = gemStones
// miniLineChart.yKey = "hardness"
