function test() {
    const dummyDiv = document.createElement('div');

    const n = 10000;
    const test1Canvases = [];
    const test2Canvases = [];

    let then = performance.now();
    for (let i = 0; i < n; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = 1600;
        canvas.height = 1200;
        test1Canvases.push(canvas);
    }
    let now = performance.now();
    console.log('code', now - then);

    then = performance.now();
    for (let i = 0; i < n; i++) {
        dummyDiv.innerHTML = '<canvas width="1600" height="1200"></canvas>';
        test2Canvases.push(dummyDiv.firstChild);
    }
    now = performance.now();
    console.log('innerHTML', now - then);
}


document.addEventListener('DOMContentLoaded', () => {
    test();
});
