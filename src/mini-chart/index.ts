import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Sector } from "ag-grid-enterprise/src/charts/scene/shape/sector";
import colors, { material, nord, office } from "ag-grid-enterprise/src/charts/chart/colors";
import { Color } from "ag-grid-enterprise/src/charts/util/color";
import java from "ag-grid-enterprise/src/charts/chart/colors";

function createButton(text: string, action: EventListenerOrEventListenerObject): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    document.body.appendChild(button);
    button.addEventListener('click', action);
    return button;
}

const scene = new Scene(60, 60);
scene.parent = document.body;
const rootGroup = new Group();

const sector1 = Sector.create(30, 30, 0, 25, 0, Math.PI * 3 / 4);
sector1.fillStyle = colors[0];
sector1.strokeStyle = Color.fromHexString(colors[0]).darker().toHexString();
sector1.lineWidth = 2;

const sector2 = Sector.create(30, 30, 0, 25, Math.PI * 3 / 4, Math.PI * 4 / 3);
sector2.fillStyle = colors[1];
sector2.strokeStyle = Color.fromHexString(colors[1]).darker().toHexString();
sector2.lineWidth = 2;

const sector3 = Sector.create(30, 30, 0, 25, Math.PI * 4 / 3, Math.PI * 2);
sector3.fillStyle = colors[2];
sector3.strokeStyle = Color.fromHexString(colors[2]).darker().toHexString();
sector3.lineWidth = 2;

rootGroup.append(sector1);
rootGroup.append(sector2);
rootGroup.append(sector3);

scene.root = rootGroup;

function updateColors(colors: string[]) {
    sector1.fillStyle = colors[0];
    sector1.strokeStyle = Color.fromHexString(colors[0]).darker().toHexString();
    sector2.fillStyle = colors[1];
    sector2.strokeStyle = Color.fromHexString(colors[1]).darker().toHexString();
    sector3.fillStyle = colors[2];
    sector3.strokeStyle = Color.fromHexString(colors[2]).darker().toHexString();
}

document.body.appendChild(document.createElement('br'));
createButton('Material', () => {
    updateColors(material);
});

createButton('Nord', () => {
    updateColors(nord);
});

createButton('Office', () => {
    updateColors(office);
});

createButton('Java', () => {
    updateColors(java);
});
