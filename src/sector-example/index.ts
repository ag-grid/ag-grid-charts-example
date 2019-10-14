import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Sector} from "ag-grid-enterprise/src/charts/scene/shape/sector";
import borneo from "ag-grid-enterprise/src/charts/chart/palettes";

document.addEventListener('DOMContentLoaded', () => {
    testSector();
});

function testSector() {
    const scene = new Scene({
        width: 500,
        height: 500
    });
    scene.parent = document.body;
    const rootGroup = new Group();

    const sector1 = new Sector();
    sector1.fill = borneo.fills[0];
    sector1.stroke = borneo.strokes[0];
    sector1.strokeWidth = 2;
    sector1.centerX = 200;
    sector1.centerY = 200;
    sector1.innerRadius = 50;
    sector1.outerRadius = 100;
    sector1.endAngle = Math.PI * 3 / 4;

    const sector2 = new Sector();
    sector2.centerX = 200;
    sector2.centerY = 200;
    sector2.innerRadius = 50;
    sector2.outerRadius = 100;
    sector2.startAngle = Math.PI * 3 / 4;
    sector2.endAngle = Math.PI * 4 / 3;
    sector2.fill = borneo.fills[1];
    sector2.stroke = borneo.strokes[1];
    sector2.strokeWidth = 2;

    const sector3 = new Sector();
    sector3.fill = borneo.fills[2];
    sector3.stroke = borneo.strokes[2];
    sector3.strokeWidth = 2;
    sector3.centerX = 200;
    sector3.centerY = 200;
    sector3.innerRadius = 50;
    sector3.outerRadius = 100;
    sector3.startAngle = Math.PI * 4 / 3;

    rootGroup.append(sector1);
    rootGroup.append(sector2);
    rootGroup.append(sector3);

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
}
