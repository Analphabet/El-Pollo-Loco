
let canvas; 
let world;
let gameActive = true;
let bossEscaped = false;
let throwingBottle = false;
let keyboard = new Keyboard();
let intervals = [];
let gameTimeout;  // Variable to store the timeout reference.
let timer = 99;  // Start the timer at 99 seconds
let timerDisplay = document.getElementById('timerDisplay');  // The element where the timer will be displayed
let celebrationMusic = new Audio('sound/Mariachi Nuevo Tecalitlan - El Jarabe Tapatio.mp3');


function init() {
    timerDisplay = document.getElementById('timerDisplay');  // Hier wird das Element jetzt initialisiert
    resetGame();
    gameActive = true;
    initLevel();
    playBackgroundMusic();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    hideScreens();
    muteSounds();
	
	// Mache den Timer sichtbar, wenn das Spiel startet
    document.getElementById('timerDisplay').style.display = 'block';
	
    startGame();  // Starte das Spiel und den Timer
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
    timer = 99;  // Reset the timer to 100 seconds when the game resets
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


function LostTimeout() {
    stopGameTimer();  // Spiel-Timer stoppen
    showEndScreen();  // Zeige den Game Over-Bildschirm

}

function startGame() {
    updateTimerDisplay();  // Zeige den initialen Timerwert an
    gameTimeout = setInterval(() => {
        if (gameActive) {
            timer--;  // Verringere den Timer jede Sekunde
            updateTimerDisplay();  // Aktualisiere die Timeranzeige
            if (timer <= 0) {
                LostTimeout();
                clearInterval(gameTimeout);  // Stoppe den Timer, wenn er 0 erreicht
            }
        }
    }, 1000);  // Aktualisiere alle 1000 Millisekunden (1 Sekunde)
}

function updateTimerDisplay() {
    if (timerDisplay) {
        timerDisplay.textContent = `Time Left: ${timer} seconds`;  // Update the timer display
    }
}

function stopGameTimer() {
    clearInterval(gameTimeout);  // Clears the interval timer
}

function stopCelebrationMusic() {
    celebrationMusic.pause();
    celebrationMusic.currentTime = 0;
}

function returnToMenu() {
    stopAllIntervals();
    stopGameTimer();  // Stop the timeout timer when returning to the menu
    stopCelebrationMusic();
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('menu-buttons').style.display = 'flex';
    document.getElementById('ig-menu').style.display = 'none';
	document.getElementById('timerDisplay').style.display = 'none';  // Timer ausblenden
}

function hideScreens() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('endScreen').style.display = 'none';
}

function showEndScreen() {
    gameActive = false;
    stopGameTimer();  // Stop the timeout timer when game ends
    const endScreen = document.getElementById('endScreen');
    if (world.checkEndbossDefeated()) {
        showGameWonScreen(endScreen);
    } else {
        showGameLostScreen(endScreen);
    }
    endScreen.style.display = 'flex';
    stopBackgroundMusic();
    stopBossMusic();
    stopAllIntervals();
}

function showGameWonScreen(endScreen, mobileButtonContainer) {
    gameWonSound();
    playCelebrationMusic();
    endScreen.style.backgroundImage = "url('img/winlose/you win.jpg')";
}

function showGameLostScreen(endScreen, mobileButtonContainer) {
    gameLostSound();
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