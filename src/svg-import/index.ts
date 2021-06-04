import { tiger } from "./tiger";
import { createButton } from "../../lib/ui";
import { Scene } from "../../charts/scene/scene";
import { Group } from "../../charts/scene/group";
import { Text } from "../../charts/scene/shape/text";
import { Shape } from "../../charts/scene/shape/shape";
import { Path } from "../../charts/scene/shape/path";
import { Node } from "../../charts/scene/node";

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
                    // @ts-ignore
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
    const scene = new Scene();
    scene.resize(width, height);
    scene.root = root;
    scene.container = document.body;

    importSvg(scene, tiger);

    function animate(node: Node, dx: number, dy: number) {
        if (!(node instanceof Group)) {
            node.translationX = dx;
            node.translationY = dy;
        }
        node.children.forEach((child, index) => {
            const deltaX = -2 * Math.random() * 4;
            const deltaY = -2 * Math.random() * 4;
            animate(child, deltaX, deltaY);
        });
    }

    const maxWords = 15;
    const words: Text[] = [];
    function shout() {
        for (let i = words.length - 1; i >= 0; i--) {
            const word = words[i];
            word.fontSize += 1;
            word.fillOpacity = Math.min(0.5, word.fillOpacity + 0.01);
            word.y -= 0.2;
            word.x += -2 + Math.random() * 4;
            if (word.fontSize >= 60) {
                scene.root.removeChild(word);
                words.splice(i, 1);
            }
        }
        if (words.length < maxWords) {
            const word = new Text();
            word.text = 'A';
            word.fontSize = Math.floor(Math.random() * 10);
            word.fill = 'black';
            word.stroke = 'white';
            word.strokeWidth = 1;
            word.fillOpacity = 0.05;
            word.x = -50 + Math.random() * 100;
            word.y = 190 + Math.random() * 100;
            words.push(word);
            scene.root.appendChild(word);
        }
    }

    let i = 0;
    const colors1 = ['#619fd5', '#65bbb8', '#b5c43d', '#f4d146', '#eaa93a', '#eaa93a', '#e16e2a', '#c7493a', '#db6e7a', '#9a5fd5'];
    const colors2 = ['#e6380d', '#ec8921', '#feff43', '#7bfe40', '#4d9cc5', '#1500f8', '#7600cd'];
    const colors = colors2;
    function colorize(node: Node) {
        if (node instanceof Shape) {
            i += 1;
            if (i % 20 === 0) {
                node.fill = colors[Math.floor(Math.random() * colors.length)];
            }
        }
        node.children.forEach(child => colorize(child));
    }

    function animate1() {
        animate(root, 0, 0);
        shout();
        requestAnimationFrame(animate1);
    }
    function animate2() {
        colorize(root);
        requestAnimationFrame(animate2);
    }

    document.body.appendChild(document.createElement('br'));
    createButton('Save', () => {
        scene.download();
    });
    createButton('Animate', () => {
        requestAnimationFrame(animate1);
    });
    createButton('Colorize', () => {
        requestAnimationFrame(animate2);
    });

    scene.canvas.element.style.border = '1px solid black';
    scene.debug.renderFrameIndex = true;
    scene.debug.renderBoundingBoxes = true;

    {
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let sceneSize: [number, number];

        scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
            startX = e.offsetX;
            startY = e.offsetY;
            sceneSize = [scene.width, scene.height];
            isDragging = true;
        });
        scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
            if (isDragging && e.shiftKey) {
                const dx = e.offsetX - startX;
                const dy = e.offsetY - startY;

                const { root } = scene;
                const scale = Math.min(scene.width / 600, scene.height / 600);
                root.scalingX = scale;
                root.scalingY = scale;
                root.translationX = 200 * scale;
                root.translationY = 200 * scale;

                scene.resize(sceneSize[0] + dx, sceneSize[1] + dy);
            }
        });
        scene.canvas.element.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
});
