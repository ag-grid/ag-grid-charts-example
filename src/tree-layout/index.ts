import { Scene } from "@ag-grid-enterprise/charts/src/charts/scene/scene";
import { Group } from "@ag-grid-enterprise/charts/src/charts/scene/group";
import { Selection } from "@ag-grid-enterprise/charts/src/charts/scene/selection";
import { Text } from "@ag-grid-enterprise/charts/src/charts/scene/shape/text";
import { Line } from "@ag-grid-enterprise/charts/src/charts/scene/shape/line";
import { createSlider } from "../../lib/ui";

interface Tick {
    labels: string[];
}

// Every tree path has the same depth.
const tickData = [
    {
        "labels": [
            "A",
            "B",
            "F",
            "O"
        ]
    },
    {
        "labels": [
            "C",
            "E",
            "F",
            "O"
        ]
    },
    {
        "labels": [
            "D",
            "E",
            "F",
            "O"
        ]
    },
    {
        "labels": [
            "G",
            "I",
            "N",
            "O"
        ]
    },
    {
        "labels": [
            "H",
            "I",
            "N",
            "O"
        ]
    },
    {
        "labels": [
            "J",
            "M",
            "N",
            "O"
        ]
    },
    {
        "labels": [
            "K",
            "M",
            "N",
            "O"
        ]
    },
    {
        "labels": [
            "L",
            "M",
            "N",
            "O"
        ]
    }
];

class TreeNode {
    label: string;
    x: number;
    y: number;
    parent?: TreeNode;
    children = [] as TreeNode[];
    depth: number;
    prelim: number;
    mod: number;
    thread?: TreeNode;
    ancestor = this;
    change: number;
    shift: number;
    number: number; // current number in sibling group (index)

    constructor(label = '', parent?: any, number = 0) {
        this.label = label;
        this.x = 0;
        this.y = 0;
        this.parent = parent;
        this.depth = parent ? parent.depth + 1 : 0;
        this.prelim = 0;
        this.mod = 0;
        this.change = 0;
        this.shift = 0;
        this.number = number;
    }

    getLeftSibling(): TreeNode | undefined {
        return this.number > 0  && this.parent ? this.parent.children[this.number - 1] : undefined;
    }

    getLeftmostSibling(): TreeNode | undefined {
        return this.number > 0 && this.parent ? this.parent.children[0] : undefined;
    }

    // traverse the left contour of a subtree, return the successor of v on this contour
    nextLeft(): TreeNode | undefined {
        return this.children ? this.children[0] : this.thread;
    }
    // traverse the right contour of a subtree, return the successor of v on this contour
    nextRight(): TreeNode | undefined {
        return this.children ? this.children[this.children.length - 1] : this.thread;
    }

    getSiblings(): TreeNode[] {
        return this.parent ? this.parent.children.filter((_, i) => i !== this.number) : [];
    }
}

function ticksToTree(ticks: Tick[]): TreeNode {
    const root: any = new TreeNode();

    ticks.forEach(tick => insertTick(root, tick));

    return root;
}

function insertTick(root: TreeNode, tick: Tick) {
    const pathParts = tick.labels.slice().reverse(); // path elements from root to leaf label
    const lastPartIndex = pathParts.length - 1;

    pathParts.forEach((pathPart, partIndex) => {
        const children = root.children;
        const find = children.find(child => child.label === pathPart);
        if (find) {
            root = find;
        } else {
            const node = new TreeNode(pathPart, root);
            node.number = children.length;
            children.push(node);
            if (partIndex !== lastPartIndex) {
                root = node;
            }
        }
    });
}

// Shift the subtree.
function moveSubtree(wm: TreeNode, wp: TreeNode, shift: number) {
    const subtrees = wp.number - wm.number;
    const ratio = shift / subtrees;
    wp.change -= ratio;
    wp.shift += shift;
    wm.change += ratio;
    wp.prelim += shift;
    wp.mod += shift;
}

function ancestor(vim: TreeNode, v: TreeNode, defaultAncestor: TreeNode): TreeNode {
    return v.getSiblings().indexOf(vim.ancestor) >= 0 ? vim.ancestor : defaultAncestor;
}

// Spaces out the children.
function executeShifts(v: TreeNode) {
    const children = v.children;

    if (children) {
        let shift = 0;
        let change = 0;

        for (let i = children.length - 1; i >= 0; i--) {
            const w = children[i];
            w.prelim += shift;
            w.mod += shift;
            change += w.change;
            shift += w.shift + change;
        }
    }
}

// Moves current subtree with v as the root if some nodes are conflicting in space.
function apportion(v: TreeNode, defaultAncestor: TreeNode, distance: number) {
    const w = v.getLeftSibling();

    if (w) {
        let vop = v;
        let vip = v;
        let vim = w;
        let vom = vip.getLeftmostSibling()!;
        let sip = vip.mod;
        let sop = vop.mod;
        let sim = vim.mod;
        let som = vom.mod;

        while (vim.nextRight() && vip.nextLeft()) {
            vim = vim.nextRight()!;
            vip = vip.nextLeft()!;
            vom = vom.nextLeft()!;
            vop = vop.nextRight()!;
            vop.ancestor = v;
            const shift = (vim.prelim + sim) - (vip.prelim + sip) + distance;
            if (shift > 0) {
                moveSubtree(ancestor(vim, v, defaultAncestor), v ,shift);
                sip += shift;
                sop += shift;
            }
            sim += vim.mod;
            sip += vip.mod;
            som += vom.mod;
            sop += vop.mod;
        }

        if (vim.nextRight() && !vop.nextRight()) {
            vop.thread = vim.nextRight();
            vop.mod += sim - sop;
        } else {
            if (vip.nextLeft() && !vom.nextLeft()) {
                vom.thread = vip.nextLeft();
                vom.mod += sip - som;
            }
            defaultAncestor = v;
        }
    }

    return defaultAncestor;
}

// Compute the preliminary x-coordinate of node and its children (recursively).
function firstWalk(node: TreeNode, distance: number) {
    const children = node.children;

    if (children.length) {
        let defaultAncestor = children[0];
        children.forEach(child => {
            firstWalk(child, distance);
            defaultAncestor = apportion(child, defaultAncestor, distance);
        });

        executeShifts(node);

        const midpoint = (children[0].prelim + children[children.length - 1].prelim) / 2;
        const leftSibling = node.getLeftSibling();
        if (leftSibling) {
            node.prelim = leftSibling.prelim + distance;
            node.mod = node.prelim - midpoint;
        } else {
            node.prelim = midpoint;
        }
    } else {
        const leftSibling = node.getLeftSibling();
        node.prelim = leftSibling ? leftSibling.prelim + distance : 0;
    }
}

class Dimensions {
    top: number = Infinity;
    right: number = -Infinity;
    bottom: number = -Infinity;
    left: number = Infinity;

    update(v: TreeNode) {
        if (v.x > this.right) {
            this.right = v.x;
        }
        if (v.x < this.left) {
            this.left = v.x;
        }
        if (v.y > this.bottom) {
            this.bottom = v.y;
        }
        if (v.y < this.top) {
            this.top = v.y;
        }
    }
}

class TreeInfo {
    dimensions = new Dimensions;
    leafCount = 0;

    update(v: TreeNode) {
        this.dimensions.update(v);
        if (!v.children.length) {
            this.leafCount++;
        }
    }
}

interface TreeSize {
    width: number;
    height: number;
}

function secondWalk(v: TreeNode, m: number, info: TreeInfo) {
    v.x = v.prelim + m;
    v.y = v.depth;
    info.update(v);
    v.children.forEach(w => secondWalk(w, m + v.mod, info));
}

function thirdWalk(node: TreeNode, scalingX: number, scalingY: number) {
    node.children.forEach(child => thirdWalk(child, scalingX, scalingY));
    node.x *= scalingX;
    node.y *= scalingY;
}

function treeLayout(root: TreeNode, size: TreeSize) {
    firstWalk(root, 1);
    const info = new TreeInfo;
    secondWalk(root, -root.prelim, info);

    const spaceCount = info.leafCount - 1;
    const existingSpacingX = (info.dimensions.right - info.dimensions.left) / spaceCount;
    const desiredSpacingX = size.width / spaceCount;
    const scalingX = desiredSpacingX / existingSpacingX;
    const existingSpacingY = (info.dimensions.bottom - info.dimensions.top) / spaceCount;
    const desiredSpacingY = size.height / spaceCount;
    const scalingY = desiredSpacingY / existingSpacingY;
    thirdWalk(root, scalingX, scalingY);
    // console.log(info);
}

function logTree(root: TreeNode, msg?: (node: TreeNode) => string) {
    root.children.forEach(child => logTree(child, msg));
    if (msg) {
        console.log(msg(root));
    } else {
        console.log(root);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let width = 400;
    let height = 400;
    const sizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    createSlider('width', sizes, v => {
        fitTree(width = v, height);
    });
    createSlider('height', sizes, v => {
        fitTree(width, height = v);
    });

    const scene = new Scene();
    scene.width = 1500;
    scene.height = 1200;
    scene.parent = document.body;

    const rootGroup = new Group();
    rootGroup.translationX = 600;
    scene.root = rootGroup;

    function renderTree(root: TreeNode) {
        const nodes = [] as TreeNode[];
        function postTraverse(root: TreeNode) {
            root.children.forEach(child => postTraverse(child));
            nodes.push(root);
        }
        postTraverse(root);

        function createEdges(root: TreeNode, parent?: TreeNode) {
            const children = root.children;
            if (children) {
                children.forEach(child => createEdges(child, root));
            }
            if (parent) {
                const line = new Line();
                line.x1 = root.x;
                line.y1 = root.y;
                line.x2 = parent.x;
                line.y2 = parent.y;
                line.stroke = 'black';
                line.strokeWidth = 3;
                line.strokeOpacity = 0.3;
                rootGroup.append(line);
            }
        }
        createEdges(root);

        let nodeSelection = Selection.select(rootGroup).selectAll<Text>();
        const update = nodeSelection.setData(nodes);
        update.exit.remove();
        const enter = update.enter.append(Text);
        nodeSelection = update.merge(enter);
        nodeSelection.each((node, datum, index) => {
            node.text = datum.label;
            node.textAlign = 'center';
            node.fontSize = 16;
            node.fill = 'black';
            node.x = datum.x;
            node.y = datum.y;
        });
    }

    function fitTree(width: number, height: number) {
        while (rootGroup.children.length > 0) {
            rootGroup.removeChild(rootGroup.children[0]);
        }

        const root = ticksToTree(tickData);

        treeLayout(root, {width, height});
        // logTree(root);
        // logTree(root, n => `label: ${n.label}, number: ${n.number}, depth: ${n.depth}, prelim: ${n.prelim}`);

        renderTree(root);
    }

    fitTree(width, height);
});
