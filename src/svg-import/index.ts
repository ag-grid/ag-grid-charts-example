import { tiger } from "./tiger";
import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Path } from "ag-grid-enterprise/src/charts/scene/shape/path";
import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Node } from "ag-grid-enterprise/src/charts/scene/node";
import { createButton } from "../../lib/ui";

function importSvg(scene: Scene, svg: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');

    (window as any).pp = doc.documentElement;

    const svgRoot = doc.documentElement.children[0] as any;

    console.log(svgRoot);

    const root = scene.root;

    if (!root) {
        return;
    }

    function createNodes(parent: Node, svgParent: any) {
        const n = svgParent.childElementCount;
        for (let i = 0; i < n; i++) {
            const svgChild = svgParent.children[i];
            const svgChildName = svgChild.nodeName;
            switch (svgChildName) {
                case 'g':
                    const group = new Group();
                    // transform="matrix(1.7656463,0,0,1.7656463,324.90716,255.00942)"
                    const transformValue = svgChild.getAttribute('transfrom');
                    if (transformValue) {
                        const elements = transformValue.slice(7, -1).split(',').map((v: string) => +v);
                        group.matrix.setElements(elements);
                    }
                    parent.append(group);
                    createNodes(group, svgChild);
                    break;
                case 'path':
                    const pathString = svgChild.getAttribute('d');
                    const styleString = svgChild.getAttribute('style');
                    const styles = new Map<string, string>(styleString.split(';').map((v: string) => v.split(':')));
                    // const fill = svgChild.getAttribute('fill') || svgParent.getAttribute('fill') || 'black';
                    // const stroke = svgChild.getAttribute('stroke') || svgParent.getAttribute('stroke') || 'black';
                    // const strokeWidth = svgChild.getAttribute('stroke-width') || svgParent.getAttribute('stroke-width') || 1;
                    const fill = styles.get('fill') || 'black';
                    const stroke = styles.get('stroke') || 'black';
                    const strokeWidth = styles.get('stroke-width');
                    const path = new Path();
                    path.fill = fill;
                    path.stroke = stroke;
                    path.strokeWidth = strokeWidth;
                    path.svgPath = pathString;
                    parent.append(path);
                    break;
            }
        }
    }

    createNodes(root, svgRoot);
}

document.addEventListener('DOMContentLoaded', () => {
    const width = 600;
    const height = 600;
    const root = new Group();
    root.translationX = 200;
    root.translationY = 200;
    const scene = new Scene(width, height);
    scene.root = root;
    scene.parent = document.body;

    importSvg(scene, tiger);

    function slide(node: Node, dx: number, dy: number) {
        if (!(node instanceof Group)) {
            node.translationX += dx;
            node.translationY += dy;
        }
        node.children.forEach((child, index) => {
            const deltaX = -0.5 * Math.random();
            const deltaY = -0.5 * Math.random();
            slide(child, deltaX, deltaY);
        });
    }
    function animate() {
        slide(root, 0, 0);
        requestAnimationFrame(animate);
    }

    document.body.appendChild(document.createElement('br'));
    createButton('Animate', () => {
        requestAnimationFrame(animate);
    });
});