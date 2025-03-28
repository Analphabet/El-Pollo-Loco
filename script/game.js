
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
    hideScreens();
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


function returnToMenu() {
    stopAllIntervals();
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('menu-buttons').style.display = 'flex';
}

function hideScreens() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('endScreen').style.display = 'none';
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

function showGameWonScreen(endScreen, mobileButtonContainer) {
    endScreen.style.backgroundImage = "url('img/winlose/you win.jpg')";
}

function showGameLostScreen(endScreen, mobileButtonContainer) {
    endScreen.style.backgroundImage = "url('img/winlose/You_lost_a.png')";
}

function openControls() {
    document.getElementById('controlsScreen').style.display = 'block';
    document.getElementById('menu-buttons').style.display = 'none';
}

function closeControls() {
    document.getElementById('controlsScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
}

function openSettings() {
    document.getElementById('settingsScreen').style.display = 'block';
    document.getElementById('menu-buttons').style.display = 'none';
}

function closeSettings() {
    document.getElementById('settingsScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
}

function openItems() {
    document.getElementById('itemsScreen').style.display = 'flex';
    document.getElementById('menu-buttons').style.display = 'none';
}

function closeItems() {
    document.getElementById('itemsScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
}


