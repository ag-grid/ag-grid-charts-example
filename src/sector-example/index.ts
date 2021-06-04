import { ChartTheme, DropShadow, Group, Scene, Sector } from "../../charts/main";

document.addEventListener('DOMContentLoaded', () => {
    testSector();
});

function testSector() {
    const scene = new Scene();
    scene.resize(500, 500);
    scene.container = document.body;
    const rootGroup = new Group();

    const theme = new ChartTheme();

    const shadow = new DropShadow();
    shadow.blur = 10;

    const sector1 = new Sector();
    sector1.fill = '#DE5145';
    sector1.stroke = undefined;
    sector1.strokeWidth = 2;
    sector1.centerX = 200;
    sector1.centerY = 200;
    sector1.innerRadius = 50;
    sector1.outerRadius = 100;
    sector1.endAngle = Math.PI * 3 / 4;
    sector1.fillShadow = shadow;

    const sector2 = new Sector();
    sector2.fill = '#FFCD41';
    sector2.stroke = undefined;
    sector2.centerX = 200;
    sector2.centerY = 200;
    sector2.innerRadius = 50;
    sector2.outerRadius = 100;
    sector2.startAngle = Math.PI * 3 / 4;
    sector2.endAngle = Math.PI * 4 / 3;
    sector2.strokeWidth = 2;
    sector2.fillShadow = shadow;

    const sector3 = new Sector();
    sector3.fill = '#1DA261';
    sector3.stroke = undefined;
    sector3.strokeWidth = 2;
    sector3.centerX = 200;
    sector3.centerY = 200;
    sector3.innerRadius = 50;
    sector3.outerRadius = 100;
    sector3.startAngle = Math.PI * 4 / 3;
    sector3.fillShadow = shadow;

    const sector4 = new Sector();
    sector4.fill = '#4D8CF5';
    sector4.stroke = undefined;
    sector4.strokeWidth = 2;
    sector4.centerX = 200;
    sector4.centerY = 200;
    sector4.innerRadius = 0;
    sector4.outerRadius = 40;
    sector4.startAngle = Number.EPSILON;
    sector4.endAngle = Math.PI * 2;

    rootGroup.append(sector1);
    rootGroup.append(sector2);
    rootGroup.append(sector3);
    rootGroup.append(sector4);

    scene.root = rootGroup;

    document.body.appendChild(document.createElement('br'));
    const centerOffsetSlider = document.createElement('input');
    centerOffsetSlider.type = 'range';
    centerOffsetSlider.min = '0';
    centerOffsetSlider.max = '50';
    centerOffsetSlider.step = '1';
    centerOffsetSlider.value = '0';
    centerOffsetSlider.style.width = '400px';
    document.body.appendChild(centerOffsetSlider);
    centerOffsetSlider.addEventListener('input', (e) => {
        const value = +(e.target as HTMLInputElement).value;
        sector1.centerOffset = value;
        sector2.centerOffset = value;
        sector3.centerOffset = value;
    });

    document.body.appendChild(document.createElement('br'));
    const innerRadiusSlider = document.createElement('input');
    innerRadiusSlider.type = 'range';
    innerRadiusSlider.min = '0';
    innerRadiusSlider.max = '50';
    innerRadiusSlider.step = '1';
    innerRadiusSlider.value = '50';
    innerRadiusSlider.style.width = '400px';
    document.body.appendChild(innerRadiusSlider);
    innerRadiusSlider.addEventListener('input', (e) => {
        const value = +(e.target as HTMLInputElement).value;
        sector1.innerRadius = value;
        sector2.innerRadius = value;
        sector3.innerRadius = value;
    });

    document.body.appendChild(document.createElement('br'));
    const angleOffsetSlider = document.createElement('input');
    angleOffsetSlider.type = 'range';
    angleOffsetSlider.min = '0';
    angleOffsetSlider.max = (Math.PI * 2).toString();
    angleOffsetSlider.step = (Math.PI * 2 / 360).toString();
    angleOffsetSlider.value = '0';
    angleOffsetSlider.style.width = '400px';
    document.body.appendChild(angleOffsetSlider);
    angleOffsetSlider.addEventListener('input', (e) => {
        const value = +(e.target as HTMLInputElement).value;
        sector1.angleOffset = value;
        sector2.angleOffset = value;
        sector3.angleOffset = value;
    });

    scene.canvas.element.addEventListener('click', event => {
        const node = rootGroup.pickNode(event.offsetX, event.offsetY);
        if (node) {
            window.alert(node.id);
        } else {
            window.alert('No node was clicked.');
        }
    });
}
