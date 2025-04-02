
let canvas; 
let world;
let gameActive = true;
let bossEscaped = false;
let throwingBottle = false;
let keyboard = new Keyboard();
let intervals = [];
let gameTimeout;  
let timer = 99;  
let timerDisplay = document.getElementById('timerDisplay');  
let celebrationMusic = new Audio('sound/Mariachi Nuevo Tecalitlan - El Jarabe Tapatio.mp3');


/**
 * Initialize the game.
 */
function init() {
	stopCelebrationMusic();
    timerDisplay = document.getElementById('timerDisplay'); 
    resetGame();
    gameActive = true;
    initLevel();
    playBackgroundMusic();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level1);
    hideScreens();
    toggleRotateScreen();
    mobileButtonTouch();
    toggleInGameMenu();
    toggleMobileButtonContainer();
    muteSounds();
	
    document.getElementById('timerDisplay').style.display = 'block';
	
    startGame();  
}

/**
 * Reset the requestAnimationFrame ID.
 */
function resetAnimationFrameId() {
    if (requestAnimationFrameId !== 0) {
        cancelAnimationFrame(requestAnimationFrameId);
    }
    requestAnimationFrameId = 0;
}

/**
 * Reset the game.
 */
function resetGame() {
    keyboard = new Keyboard();
    intervals = [];
    world = null;
    timer = 99;  
}

/**
 * Add an interval to the intervals array.
 * @param {number} interval - The ID of the interval.
 */
function addInterval(interval) {
    intervals.push(interval);
}

/**
 * Stop all intervals and requestAnimationFrame.
 */
function stopAllIntervals() {
    resetAnimationFrameId();
    intervals.forEach((intervalId) => {
        clearInterval(intervalId);
    });
    intervals = [];
}


/**
 * This function is shown, when the timer reaches 0.
 * It shows the Game Over-Bildschirm and stops the game.
 */
function LostTimeout() {
    stopGameTimer();  
    showEndScreen();  
}

/**
 * Start the game and start the timer.
 */
function startGame() {
    updateTimerDisplay();  
    gameTimeout = setInterval(() => {
        if (gameActive) {
            timer--;  
            updateTimerDisplay();  
            if (timer <= 0) {
                LostTimeout();
                clearInterval(gameTimeout);  
            }
        }
    }, 1000);  
}


/**
 * Update the timer display on the screen.
 */
function updateTimerDisplay() {
    if (timerDisplay) {
        timerDisplay.textContent = `Time Left: ${timer} seconds`; 
    }
}

/**
 * Stop the game timeout timer.
 */
function stopGameTimer() {
    clearInterval(gameTimeout);  
}

/**
 * Stop the celebrationMusic.
 */

function stopCelebrationMusic() {
    celebrationMusic.pause();
    celebrationMusic.currentTime = 0;
}

/**
 * Return to the main menu.
 */
function returnToMenu() {
    stopAllIntervals();
    stopGameTimer();  
    stopCelebrationMusic();
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('menu-buttons').style.display = 'flex';
    document.getElementById('ig-menu').style.display = 'none';
	document.getElementById('timerDisplay').style.display = 'none';  
}

/**
 * Hide various screens.
 */
function hideScreens() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    document.getElementById('endScreen').style.display = 'none';
}

/**
 * Show the end game screen.
 */
function showEndScreen() {
    gameActive = false;
    stopGameTimer();  
    const endScreen = document.getElementById('endScreen');
    const mobileButtonContainer = document.querySelector('.mobile-button-container');
    if (world.checkEndbossDefeated()) {
        showGameWonScreen(endScreen, mobileButtonContainer);
    } else {
        showGameLostScreen(endScreen, mobileButtonContainer);
    }
    endScreen.style.display = 'flex';
    stopBackgroundMusic();
    stopBossMusic();
    stopAllIntervals();
}

/**
 * Show the game won screen.
 * @param {HTMLElement} endScreen - The end screen element.
 * @param {HTMLElement} mobileButtonContainer - The mobile button container element.
 */
function showGameWonScreen(endScreen, mobileButtonContainer) {
    gameWonSound();
    playCelebrationMusic();
    endScreen.style.backgroundImage = "url('img/winlose/you win.jpg')";
    mobileButtonContainer.style.display = 'none';
}

/**
 * Show the game lost screen.
 * @param {HTMLElement} endScreen - The end screen element.
 * @param {HTMLElement} mobileButtonContainer - The mobile button container element.
 */
function showGameLostScreen(endScreen, mobileButtonContainer) {
    gameLostSound();
    endScreen.style.backgroundImage = "url('img/winlose/You_lost_a.png')";
    mobileButtonContainer.style.display = 'none';
}

/**
 * Open the controls screen.
 */
function openControls() {
    document.getElementById('controlsScreen').style.display = 'block';
    document.getElementById('menu-buttons').style.display = 'none';
}

/**
 * Close the controls screen.
 */
function closeControls() {
    document.getElementById('controlsScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
}

/**
 * Open the settings screen.
 */
function openSettings() {
    document.getElementById('settingsScreen').style.display = 'block';
    document.getElementById('menu-buttons').style.display = 'none';
}

/**
 * Close the settings screen.
 */
function closeSettings() {
    document.getElementById('settingsScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
}

/**
 * Open the items screen.
 */
function openItems() {
    document.getElementById('itemsScreen').style.display = 'flex';
    document.getElementById('menu-buttons').style.display = 'none';
}

/**
 * Close the items screen.
 */
function closeItems() {
    document.getElementById('itemsScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
}

/**
 * Open the legal notice screen.
 */
 function openLegalNotice() {
    document.getElementById('legalNoticeScreen').style.display = 'flex';
    document.getElementById('menu-buttons').style.display = 'none';
	document.querySelector('.imprint-container').style.display = 'none';
}

/**
 * Close the legal notice screen.
 */
function closeLegalNotice() {
    document.getElementById('legalNoticeScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
	document.querySelector('.imprint-container').style.display = 'flex';
}

/**
 * Open the legal notice screen.
 */
 function openLegalNoticeNext() {
	document.getElementById('legalNoticeScreenNext').style.display = 'flex';
	document.getElementById('legalNoticeScreen').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'none';
}

/**
 * Close the legal notice screen.
 */
function closeLegalNoticeNext() {
    document.getElementById('legalNoticeScreenNext').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
	document.querySelector('.imprint-container').style.display = 'flex';
}

/**
 * Open the legal notice screen.
 */
 function openLegalNoticeLast() {
    document.getElementById('legalNoticeScreenLast').style.display = 'flex';
	document.getElementById('legalNoticeScreenNext').style.display = 'none';	
    document.getElementById('menu-buttons').style.display = 'none';
}

/**
 * Close the legal notice screen.
 */
function closeLegalNoticeLast() {
    document.getElementById('legalNoticeScreenLast').style.display = 'none';
    document.getElementById('menu-buttons').style.display = 'flex';
	document.querySelector('.imprint-container').style.display = 'flex';
}

/**
 * Toggle fullscreen mode.
 */
function toggleFullScreen() {
    let container = document.getElementById('canvas-container');
    let canvas = document.getElementById('canvas');
    let fullscreenButton = document.querySelector('.fullscreen-toggle');

    if (!document.fullscreenElement) {
        requestFullscreen(container);
        setCanvasSize(canvas, '100vw', '100vh');
        fullscreenButton.innerText = 'Turn Fullscreen Off';
    } else {
        exitFullscreen();
        resetCanvasSize(canvas);
        fullscreenButton.innerText = 'Turn Fullscreen On';
    }
}

/**
 * Set the canvas size.
 * @param {HTMLElement} canvas - The canvas element.
 * @param {string} width - The width of the canvas.
 * @param {string} height - The height of the canvas.
 */
function setCanvasSize(canvas, width, height) {
    canvas.style.width = width;
    canvas.style.height = height;
}

/**
 * Reset the canvas size to default.
 * @param {HTMLElement} canvas - The canvas element.
 */
function resetCanvasSize(canvas) {
    setCanvasSize(canvas, '720px', '480px');
}

/**
 * Request fullscreen mode.
 * @param {HTMLElement} element - The element to make fullscreen.
 */
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * Exit fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Adjust canvas size based on fullscreen state.
 */
function adjustCanvasSize() {
    let canvas = document.getElementById('canvas');
    if (document.fullscreenElement) {
        setCanvasSize(canvas, '100vw', '100vh');
    } else {
        resetCanvasSize(canvas);
    }
}