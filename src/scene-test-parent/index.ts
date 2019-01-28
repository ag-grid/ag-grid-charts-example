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
    console.assert(rootGroup1.parent === null);
    console.assert(rootGroup1.scene === scene1);

    // Setting the `root` schedules a render for the next frame,
    // but nothing should render just yet.
    console.assert(scene1.frameIndex === 0);
    console.assert(scene2.frameIndex === 0);

    const parentGroup = new Group();
    const childGroup = new Group();

    const redRect = new Rect();
    redRect.x = 20;
    redRect.y = 0;
    redRect.width = 20;
    redRect.height = 20;
    redRect.fillStyle = 'red';

    const orangeRect = new Rect();
    orangeRect.x = 30;
    orangeRect.y = 10;
    orangeRect.width = 20;
    orangeRect.height = 20;
    orangeRect.fillStyle = 'orange';

    const magentaRect = new Rect();
    magentaRect.x = 40;
    magentaRect.y = 20;
    magentaRect.width = 20;
    magentaRect.height = 20;
    magentaRect.fillStyle = 'magenta';

    const cyanRect = new Rect();
    cyanRect.x = 50;
    cyanRect.y = 30;
    cyanRect.width = 20;
    cyanRect.height = 20;
    cyanRect.fillStyle = 'cyan';

    const blueRect = new Rect();
    blueRect.x = 50;
    blueRect.y = 50;
    blueRect.width = 100;
    blueRect.height = 100;
    blueRect.fillStyle = 'blue';

    // All newly created nodes shouldn't have a parent.
    console.assert(redRect.parent === null);
    console.assert(orangeRect.parent === null);
    console.assert(magentaRect.parent === null);
    console.assert(cyanRect.parent === null);
    console.assert(childGroup.parent === null);

    parentGroup.append(redRect);
    parentGroup.append(childGroup);

    childGroup.append(orangeRect);
    childGroup.append(magentaRect);
    childGroup.append(cyanRect);

    // The `parent` properties should be updated accordingly
    // when the nodes are added to their respective groups.
    console.assert(redRect.parent === parentGroup);
    console.assert(orangeRect.parent === childGroup);
    console.assert(magentaRect.parent === childGroup);
    console.assert(cyanRect.parent === childGroup);
    console.assert(childGroup.parent === parentGroup);

    // The index in the group determined the order of rendering.
    // `magentaRect` (magenta) should render on top of `orangeRect`.
    // `cyanRect` (cyan) on top of `magentaRect`.
    console.assert(childGroup.children[0] === orangeRect);
    console.assert(childGroup.children[1] === magentaRect);
    console.assert(childGroup.children[2] === cyanRect);

    // Nodes shouldn't have their `scene` property set
    // until they are added to a parent that belongs to a scene.
    console.assert(parentGroup.scene === null);
    console.assert(childGroup.scene === null);
    console.assert(redRect.scene === null);
    console.assert(orangeRect.scene === null);

    rootGroup1.append(parentGroup);

    // Now that the `parentGroup` has been added to the `rootGroup1`,
    // which belongs to a scene, it's `scene` property should get updated,
    // this change should also propagate down the subtree.
    console.assert(parentGroup.scene === scene1);
    console.assert(childGroup.scene === scene1);
    console.assert(redRect.scene === scene1);
    console.assert(orangeRect.scene === scene1);

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
        // `scene1` shouldn't have rendered, as we didn't change anything there.
        console.assert(scene1.frameIndex === 1);

        // The `cyanRect` renders on top of the `magentaRect` ATM,
        // but `magentaRect` should render of top of the `cyanRect`
        // on the next frame. The `cyanRect` is already in the `childGroup`
        // but this should not throw, as the `cyanRect` is first removed
        // from the tree before being re-inserted.
        childGroup.insertBefore(cyanRect, magentaRect);
    }).then(nextFrame).then(() => {
        console.assert(scene1.frameIndex === 2);
        console.assert(scene2.frameIndex === 1);

        console.assert(childGroup.children[0] === orangeRect);
        console.assert(childGroup.children[1] === cyanRect);
        console.assert(childGroup.children[2] === magentaRect);

        // `redRect` belongs to the `parentGroup` at this point and we are moving
        // it to the `childGroup`.
        childGroup.insertBefore(redRect, cyanRect);
    }).then(nextFrame).then(() => {
        console.assert(scene1.frameIndex === 3);
        console.assert(scene2.frameIndex === 1);

        console.assert(childGroup.children[0] === orangeRect);
        console.assert(childGroup.children[1] === redRect);
        console.assert(childGroup.children[2] === cyanRect);
        console.assert(childGroup.children[3] === magentaRect);

        console.assert(redRect.parent === childGroup);
        console.assert(parentGroup.children.length === 1);
        console.assert(parentGroup.children[0] === childGroup);

        // Move the `redRect` back to the `parentGroup`, and the
        // `childGroup` to the root of another scene (`scene2`).
        // Both scenes should re-render.
        parentGroup.insertBefore(redRect);
        rootGroup2.insertBefore(childGroup);
    }).then(nextFrame).then(() => {
        console.assert(scene1.frameIndex === 4);
        console.assert(scene2.frameIndex === 2);

        console.assert(redRect.parent === parentGroup);
        console.assert(childGroup.parent === rootGroup2);
        console.assert(childGroup.scene === scene2);

        // Same as we did before, but this time the `redRect` is moved over
        // from another scene.
        childGroup.insertBefore(redRect, cyanRect);
    }).then(nextFrame).then(() => {
        console.assert(scene1.frameIndex === 5);
        console.assert(scene2.frameIndex === 3);

        console.assert(childGroup.children[0] === orangeRect);
        console.assert(childGroup.children[1] === redRect);
        console.assert(childGroup.children[2] === cyanRect);
        console.assert(childGroup.children[3] === magentaRect);

        console.assert(redRect.parent === childGroup);
        console.assert(redRect.scene === scene2);

        // Test that swapping roots resets the other scene's root automatically,
        // and the `scene` properties of affected nodes are updated accordingly.
        scene1.root = scene2.root;
    }).then(nextFrame).then(() => {
        console.assert(scene1.frameIndex === 6);
        console.assert(scene2.frameIndex === 4);

        console.assert(scene1.root === rootGroup2);
        console.assert(scene2.root === null);

        console.assert(rootGroup1.scene === null);
        console.assert(parentGroup.scene === null);

        console.assert(rootGroup2.scene === scene1);
        console.assert(childGroup.scene === scene1);
        console.assert(magentaRect.scene === scene1);

        console.assert(childGroup.parent === rootGroup2);

        // Test that non-parent nodes can be used as scene roots too.
        scene2.root = blueRect;
    }).then(nextFrame).then(() => {
        console.assert(scene1.frameIndex === 6);
        console.assert(scene2.frameIndex === 5);

        console.assert(blueRect.scene === scene2);
        console.assert(blueRect.parent === null);
    });
});
