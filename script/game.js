let canvas;
let world;
let gameActive = true;
let throwingBottle = false;
let keyboard = new Keyboard();
let intervals = [];


function init() {
    resetGame();
    gameActive = true;
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
}


function resetAnimationFrameId() {
    if (requestAnimationFrameId !== 0) {
        cancelAnimationFrame(requestAnimationFrameId);
    }
    requestAnimationFrameId = 0;
}

function resetGame() {
    keyboard = new Keyboard();
    intervals = [];
    world = null;
}


function addInterval(interval) {
    intervals.push(interval);
}

function stopAllIntervals() {
    resetAnimationFrameId();
    intervals.forEach((intervalId) => {
        clearInterval(intervalId);
    });
    intervals = [];
}