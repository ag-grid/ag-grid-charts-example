import {Scene} from "ag-grid-enterprise/src/charts/scene/scene";
import {Group} from "ag-grid-enterprise/src/charts/scene/group";
import {Rect} from "ag-grid-enterprise/src/charts/scene/shape/rect";

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const scene1 = new Scene(document.body, 200, 200);
    const scene2 = new Scene(document.body, 200, 200);

    const rootGroup1 = new Group();
    const rootGroup2 = new Group();

    scene1.root = rootGroup1;

    // scene root group should never have a parent
    console.assert(rootGroup1.parent === undefined);
    console.assert(rootGroup1.scene === scene1);

    // Setting the `root` schedules a render for the next frame,
    // but nothing should render just yet.
    console.assert(scene1.frameIndex === 0);
    console.assert(scene2.frameIndex === 0);

    const parentGroup = new Group();
    const childGroup = new Group();

    const rect1 = new Rect();
    rect1.x = 10;
    rect1.y = 10;
    rect1.width = 10;
    rect1.height = 10;
    rect1.fillStyle = 'red';

    const rect2 = new Rect();
    rect2.x = 30;
    rect2.y = 10;
    rect2.width = 20;
    rect2.height = 20;
    rect2.fillStyle = 'orange';

    const rect3 = new Rect();
    rect3.x = 40;
    rect3.y = 20;
    rect3.width = 20;
    rect3.height = 20;
    rect3.fillStyle = 'magenta';

    // All newly created nodes shouldn't have a parent.
    console.assert(rect1.parent === undefined);
    console.assert(rect2.parent === undefined);
    console.assert(rect3.parent === undefined);
    console.assert(childGroup.parent === undefined);

    parentGroup.add(rect1);
    parentGroup.add(childGroup);

    childGroup.add(rect2);
    childGroup.add(rect3);

    // The `parent` properties should be updated accordingly
    // when the nodes are added to their respective groups.
    console.assert(rect1.parent === parentGroup);
    console.assert(rect2.parent === childGroup);
    console.assert(rect3.parent === childGroup);
    console.assert(childGroup.parent === parentGroup);

    // `rect3` (magenta) should render on top of `rect2`.
    console.assert(childGroup.children[0] === rect2);
    console.assert(childGroup.children[1] === rect3);

    // Nodes shouldn't have their `scene` property set
    // until they are added to a parent that belongs to a scene.
    console.assert(parentGroup.scene === undefined);
    console.assert(childGroup.scene === undefined);
    console.assert(rect1.scene === undefined);
    console.assert(rect2.scene === undefined);

    rootGroup1.add(parentGroup);

    // Now that the `parentGroup` has been added to the `rootGroup1`,
    // which belongs to a scene, it's `scene` property should get updated,
    // this change should also propagate down the subtree.
    console.assert(parentGroup.scene === scene1);
    console.assert(childGroup.scene === scene1);
    console.assert(rect1.scene === scene1);
    console.assert(rect2.scene === scene1);

    nextFrame().then(() => {
        // `scene1` should've rendered once.
        // `scene2` has no nodes, so it shouldn't have rendered.
        console.assert(scene1.frameIndex === 1);
        console.assert(scene2.frameIndex === 0);

        scene2.root = rootGroup2;
    })
    .then(nextFrame).then(() => {
        // The root of `scene2` has been set in the previous
        // requestAnimationFrame callback, so it should've rendered once now.
        console.assert(scene2.frameIndex === 1);
    });
});
