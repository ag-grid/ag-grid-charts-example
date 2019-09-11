import * as d3 from "d3";
// import timeScale from "../../../ag-grid-enterprise/src/charts/scale/timeScale";

document.addEventListener('DOMContentLoaded', () => {
    const testDate = new Date(Date.UTC(2015, 7, 23, 15, 21, 23, 700));

    // -------------------------------------------------------

    const scale = d3.scaleTime().domain([
        new Date(Date.UTC(2013, 7, 23, 15, 21, 23, 700)),
        new Date(Date.UTC(2019, 8, 5, 13, 11, 10, 300))
    ]).range([0, 100]);

    const val = scale(testDate);

    console.log(val);
    console.log(scale.ticks());

    // -------------------------------------------------------

    // const agTime = timeScale();
    // agTime.domain = [
    //     new Date(Date.UTC(2013, 7, 23, 15, 21, 23, 700)),
    //     new Date(Date.UTC(2019, 8, 5, 13, 11, 10, 300))
    // ];
    // agTime.range = [0, 100];
    //
    // {
    //     const val = agTime.convert(testDate);
    //     console.log(val);
    //     console.log(agTime.ticks());
    // }

    const date = new Date(Date.UTC(2019, 8, 3, 14, 50, 17, 300));
    const timeFormatter = d3.timeFormat('%c');
    console.log(timeFormatter(date));
});
