import { AgSparkline } from "../../sparklines/sparkline/agSparkline";

AgSparkline.create({
    container: document.body,
    type: 'column',
    data: [1, 2, 3, 4, 2, -2, -3, -4, 2, 3, 4],
    highlightStyle: {

    }
});