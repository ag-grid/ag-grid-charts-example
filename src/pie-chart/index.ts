import { HdpiCanvas } from "../../charts/canvas/hdpiCanvas";
import { LinearScale } from "../../charts/scale/linearScale";
import { normalizeAngle180 } from "../../charts/util/angle";

// Q1'12 data
const data = [
    { label: 'Android', value: 56.9, other: 7 },
    { label: 'iOS', value: 22.5, other: 8 },
    { label: 'BlackBerry', value: 6.8, other: 9 },
    { label: 'Symbian', value: 8.5, other: 10 },
    { label: 'Bada', value: 2.6, other: 11 },
    { label: 'Windows', value: 1.9, other: 12 }
];

const colorTheme = [
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#E55934',
    '#FA7921',
    '#fa3081'
];

function renderChart(angleKey: string, labelKey?: string, radiusKey?: string) {
    const colors = colorTheme;

    const padding = {
        top: 30,
        right: 200,
        bottom: 30,
        left: 30
    };

    const n = data.length;
    const angleData = data.map(datum => (datum as any)[angleKey]);
    const angleDataTotal = angleData.reduce((a, b) => a + b, 0);
    const angleDataRatios = (() => {
        let sum = 0;
        return angleData.map(datum => sum += datum / angleDataTotal);
    })();

    let labelData: string[] = [];
    if (labelKey) {
        labelData = data.map(datum => (datum as any)[labelKey]);
    }

    let raduisData: number[] = [];
    if (radiusKey) {
        raduisData = data.map(datum => (datum as any)[radiusKey]);
    }

    const canvasWidth = document.body.getBoundingClientRect().width;
    const canvasHeight = 480;
    const seriesWidth = canvasWidth - padding.left - padding.right;
    const seriesHeight = canvasHeight - padding.top - padding.bottom;
    // Not adding left/top padding to the center here as the `ctx` will be translated
    // by that amount already.
    const centerX = seriesWidth / 2;
    const centerY = seriesHeight / 2;
    const fullRadius = Math.min(seriesWidth, seriesHeight) / 2;

    const xScale = new LinearScale(); // angle
    xScale.domain = [0, 1];
    // Add 90 deg to start the first pie at 12 o'clock.
    xScale.range = [-Math.PI, Math.PI].map(angle => angle + Math.PI / 2);

    const yScale = new LinearScale(); // radius
    yScale.domain = [0, Math.max(...raduisData, 1)];
    yScale.range = [0, fullRadius];

    const canvas = new HdpiCanvas(document, canvasWidth, canvasHeight);;
    document.body.append(canvas.element);

    const ctx = canvas.element.getContext('2d')!;
    ctx.font = '14px Verdana';

    const calloutLength = 10;
    const labelGap = 3;
    const minLabelAngle = Math.PI / 9; // 20 degrees
    // Showing callout labels for smaller sectors is likely to result in overlapping,
    // which we want to avoid.

    let isDragging = false;
    let startAngle = 0;
    canvas.element.addEventListener('mousedown', (e: any) => {
        const x = e.offsetX;
        const y = e.offsetY;

        const dx = x - centerX;
        const dy = y - centerY;

        startAngle = Math.atan2(dy, dx);

        isDragging = true;
    });
    canvas.element.addEventListener('mousemove', (e: any) => {
        if (isDragging) {
            const x = e.offsetX;
            const y = e.offsetY;

            const dx = x - centerX;
            const dy = y - centerY;

            const angle = Math.atan2(dy, dx);
            const angleOffset = angle - startAngle;

            xScale.range = [-Math.PI, Math.PI].map(angle => angle + Math.PI / 2 + angleOffset);
            draw();
        }
    });
    canvas.element.addEventListener('mouseup', (e: any) => {
        isDragging = false;
    });

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.save();

        // Pie.
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.translate(padding.left, padding.top);

        const calloutData: {
            start: [number, number],
            end: [number, number],
            label?: [number, number],
            angle: number
        }[] = [];

        let sectorIndex = 0;
        // Simply use reduce here to pair up adjacent ratios.
        angleDataRatios.reduce((start, end) => {
            const radius = radiusKey ? yScale.convert(raduisData[sectorIndex]) : fullRadius;
            const startAngle = xScale.convert(start);
            const endAngle = xScale.convert(end);

            // Sectors.
            ctx.fillStyle = colors[sectorIndex % colors.length];

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Callouts.
            // We can't draw callout labels here, as they may be overlapped
            // by subsequently rendered sectors, so we simply store the callout
            // data here, that we'll need later.
            const midAngle = (startAngle + endAngle) / 2;
            const span = Math.abs(endAngle - startAngle);
            const midCos = Math.cos(midAngle);
            const midSin = Math.sin(midAngle);

            calloutData.push({
                start: [
                    centerX + midCos * radius,
                    centerY + midSin * radius
                ],
                end: [
                    centerX + midCos * (radius + calloutLength),
                    centerY + midSin * (radius + calloutLength)
                ],
                label: (span > minLabelAngle) ? [
                    centerX + midCos * (radius + calloutLength + labelGap),
                    centerY + midSin * (radius + calloutLength + labelGap)
                ] : undefined,
                angle: normalizeAngle180(midAngle)
            });

            sectorIndex++;
            return end;
        }, 0);

        // Callouts.
        calloutData.forEach((callout, i) => {
            if (!callout.label) {
                return;
            }

            ctx.beginPath();
            ctx.moveTo(...callout.start);
            ctx.lineTo(...callout.end);
            ctx.stroke();

            ctx.fillStyle = 'black';

            // `callout.angle` here is in the [-180, 180] range
            const angle = callout.angle;
            const halfPi = Math.PI / 2;
            let quadrantStart = -3 * Math.PI / 4;

            if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
            }
            else if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
            }
            else if (angle >= quadrantStart && angle < (quadrantStart += halfPi)) {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'hanging';
            }
            else {
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
            }

            ctx.fillText(labelData[i], ...callout.label);
        });

        // Legend.
        const markerRadius = 5;
        if (labelData.length) {
            const legendLeft = canvasWidth - padding.right;
            const legendItemHeight = 30;
            const legendMarkerPadding = 20;
            const legendTop = padding.top + (seriesHeight - legendItemHeight * n) / 2;
            ctx.strokeStyle = 'black';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 2;
            labelData.forEach((label, i) => {
                const itemY = i * legendItemHeight + legendTop;
                ctx.fillStyle = colors[i % colors.length];
                ctx.beginPath();
                ctx.arc(legendLeft, itemY, markerRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = 'black';
                ctx.fillText(label, legendLeft + legendMarkerPadding, itemY);
            });
        }

        ctx.restore();
    }

    draw();
}

document.addEventListener('DOMContentLoaded', () => {
    renderChart('value', 'label');
    renderChart('value', 'label', 'other');
});
