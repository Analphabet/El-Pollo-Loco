
let canvas; 
let world;
let gameActive = true;
let bossEscaped = false;
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



function showGameWonScreen(endScreen, mobileButtonContainer) {
    endScreen.style.backgroundImage = "url('img/layers_bg/you win.jpg')";
}


function showGameLostScreen(endScreen) {
    endScreen.style.backgroundImage = "url('img/layers_bg/you lost.png')";
}


function showEndScreen() {
    gameActive = false;
    const endScreen = document.getElementById('endScreen');
    if (world.checkEndbossDefeated()) {
        showGameWonScreen(endScreen);
    } else {
        showGameLostScreen(endScreen);
    }
    endScreen.style.display = 'flex';
    stopAllIntervals();
}