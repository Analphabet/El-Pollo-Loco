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

function showGameWonScreen(endScreen, mobileButtonContainer) {
    endScreen.style.backgroundImage = "url('img/layers_bg/you win.jpg')";
    mobileButtonContainer.style.display = 'none';
}

function showGameLostScreen(endScreen, mobileButtonContainer) {
    endScreen.style.backgroundImage = "url('img/layers_bg/you lost.png')";
    mobileButtonContainer.style.display = 'none';
}

function showEndScreen() {
    gameActive = false;
    const endScreen = document.getElementById('endScreen');
    const mobileButtonContainer = document.querySelector('.mobile-button-container');
    if (world.isEndbossDefeated()) {
        showGameWonScreen(endScreen, mobileButtonContainer);
    } else {
        showGameLostScreen(endScreen, mobileButtonContainer);
    }
    endScreen.style.display = 'flex';
    stopAllIntervals();
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