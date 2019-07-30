import { Scene } from "ag-grid-enterprise/src/charts/scene/scene";
import { Group } from "ag-grid-enterprise/src/charts/scene/group";
import { Selection } from "ag-grid-enterprise/src/charts/scene/selection";
import { Text } from "ag-grid-enterprise/src/charts/scene/shape/text";
import { Line } from "ag-grid-enterprise/src/charts/scene/shape/line";

interface Tick {
    labels: string[];
}

// Every tree path has the same depth.
const chartData = [
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

const tempData = [
    {
        "x": -23.65625,
        "y": 5
    },
    {
        "x": -22.65625,
        "y": 5
    },
    {
        "x": -21.65625,
        "y": 5
    },
    {
        "x": -22.65625,
        "y": 4
    },
    {
        "x": -20.65625,
        "y": 5
    },
    {
        "x": -19.65625,
        "y": 5
    },
    {
        "x": -20.15625,
        "y": 4
    },
    {
        "x": -18.65625,
        "y": 5
    },
    {
        "x": -17.65625,
        "y": 5
    },
    {
        "x": -16.65625,
        "y": 5
    },
    {
        "x": -17.65625,
        "y": 4
    },
    {
        "x": -20.15625,
        "y": 3
    },
    {
        "x": -15.65625,
        "y": 5
    },
    {
        "x": -14.65625,
        "y": 5
    },
    {
        "x": -15.15625,
        "y": 4
    },
    {
        "x": -15.15625,
        "y": 3
    },
    {
        "x": -13.65625,
        "y": 5
    },
    {
        "x": -13.65625,
        "y": 4
    },
    {
        "x": -13.65625,
        "y": 3
    },
    {
        "x": -16.90625,
        "y": 2
    },
    {
        "x": -12.65625,
        "y": 5
    },
    {
        "x": -12.65625,
        "y": 4
    },
    {
        "x": -11.65625,
        "y": 5
    },
    {
        "x": -10.65625,
        "y": 5
    },
    {
        "x": -11.15625,
        "y": 4
    },
    {
        "x": -9.65625,
        "y": 5
    },
    {
        "x": -8.65625,
        "y": 5
    },
    {
        "x": -7.65625,
        "y": 5
    },
    {
        "x": -8.65625,
        "y": 4
    },
    {
        "x": -10.65625,
        "y": 3
    },
    {
        "x": -10.65625,
        "y": 2
    },
    {
        "x": -6.65625,
        "y": 5
    },
    {
        "x": -6.65625,
        "y": 4
    },
    {
        "x": -5.65625,
        "y": 5
    },
    {
        "x": -4.65625,
        "y": 5
    },
    {
        "x": -5.15625,
        "y": 4
    },
    {
        "x": -5.90625,
        "y": 3
    },
    {
        "x": -3.65625,
        "y": 5
    },
    {
        "x": -3.65625,
        "y": 4
    },
    {
        "x": -2.65625,
        "y": 5
    },
    {
        "x": -2.65625,
        "y": 4
    },
    {
        "x": -3.15625,
        "y": 3
    },
    {
        "x": -4.53125,
        "y": 2
    },
    {
        "x": -10.71875,
        "y": 1
    },
    {
        "x": -1.65625,
        "y": 5
    },
    {
        "x": -0.65625,
        "y": 5
    },
    {
        "x": -1.15625,
        "y": 4
    },
    {
        "x": 0.34375,
        "y": 5
    },
    {
        "x": 1.34375,
        "y": 5
    },
    {
        "x": 0.84375,
        "y": 4
    },
    {
        "x": 2.34375,
        "y": 5
    },
    {
        "x": 3.34375,
        "y": 5
    },
    {
        "x": 2.84375,
        "y": 4
    },
    {
        "x": 0.84375,
        "y": 3
    },
    {
        "x": 0.84375,
        "y": 2
    },
    {
        "x": 4.34375,
        "y": 5
    },
    {
        "x": 5.34375,
        "y": 5
    },
    {
        "x": 4.84375,
        "y": 4
    },
    {
        "x": 6.34375,
        "y": 5
    },
    {
        "x": 7.34375,
        "y": 5
    },
    {
        "x": 6.84375,
        "y": 4
    },
    {
        "x": 8.34375,
        "y": 5
    },
    {
        "x": 9.34375,
        "y": 5
    },
    {
        "x": 10.34375,
        "y": 5
    },
    {
        "x": 9.34375,
        "y": 4
    },
    {
        "x": 7.09375,
        "y": 3
    },
    {
        "x": 11.34375,
        "y": 5
    },
    {
        "x": 12.34375,
        "y": 5
    },
    {
        "x": 13.34375,
        "y": 5
    },
    {
        "x": 12.34375,
        "y": 4
    },
    {
        "x": 12.34375,
        "y": 3
    },
    {
        "x": 9.71875,
        "y": 2
    },
    {
        "x": 14.34375,
        "y": 5
    },
    {
        "x": 15.34375,
        "y": 5
    },
    {
        "x": 16.34375,
        "y": 5
    },
    {
        "x": 15.34375,
        "y": 4
    },
    {
        "x": 17.34375,
        "y": 5
    },
    {
        "x": 17.34375,
        "y": 4
    },
    {
        "x": 18.34375,
        "y": 5
    },
    {
        "x": 19.34375,
        "y": 5
    },
    {
        "x": 18.84375,
        "y": 4
    },
    {
        "x": 17.09375,
        "y": 3
    },
    {
        "x": 20.34375,
        "y": 5
    },
    {
        "x": 21.34375,
        "y": 5
    },
    {
        "x": 22.34375,
        "y": 5
    },
    {
        "x": 21.34375,
        "y": 4
    },
    {
        "x": 23.34375,
        "y": 5
    },
    {
        "x": 24.34375,
        "y": 5
    },
    {
        "x": 25.34375,
        "y": 5
    },
    {
        "x": 24.34375,
        "y": 4
    },
    {
        "x": 26.34375,
        "y": 5
    },
    {
        "x": 27.34375,
        "y": 5
    },
    {
        "x": 26.84375,
        "y": 4
    },
    {
        "x": 24.09375,
        "y": 3
    },
    {
        "x": 20.59375,
        "y": 2
    },
    {
        "x": 10.71875,
        "y": 1
    },
    {
        "x": 0,
        "y": 0
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
    const pathParts = tick.labels.reverse(); // path elements from root to leaf label
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

function secondWalk(v: TreeNode, m: number) {
    v.x = v.prelim + m;
    v.y = v.depth;
    v.children.forEach(w => secondWalk(w, m + v.mod));
}

function treeLayout(root: TreeNode) {
    firstWalk(root, 1);
    secondWalk(root, -root.prelim);
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
    const scene = new Scene(1500, 1200);
    scene.parent = document.body;
    const rootGroup = new Group();
    rootGroup.translationX = 600;

    scene.root = rootGroup;

    function renderTree(root: TreeNode) {
        const sf = 50; // scaling factor
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
                const line = Line.create(root.x * sf, root.y * sf, parent.x * sf, parent.y * sf);
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
            node.x = datum.x * sf;
            node.y = datum.y * sf;
        });
    }

    const root = ticksToTree(chartData);

    treeLayout(root);
    logTree(root);
    // logTree(root, n => `label: ${n.label}, number: ${n.number}, depth: ${n.depth}, prelim: ${n.prelim}`);

    renderTree(root);
});
