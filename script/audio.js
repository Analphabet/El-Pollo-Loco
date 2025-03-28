let bossMusic = new Audio('sound/western-theme-162884.mp3'); 
let gameWon = new Audio('sound/win-sound.mp3');
let yeahSound = new Audio('sound/oh-yeah.mp3');
let gameLost = new Audio('sound/lost-sound.mp3');

let isGameMuted = false;
let backgroundMusicMuted = false;

function gameWonSound() {
    if (!isGameMuted) {
        gameWon.play();
        yeahSound.play();
    }
}

function gameLostSound() {
    if (!isGameMuted) {
        gameLost.play();
    }
}

function playBackgroundMusic() {
    backgroundMusic.volume = 0.1;
    backgroundMusic.muted = backgroundMusicMuted;
    backgroundMusic.loop = true;
    backgroundMusic.play();
}

function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function stopBossMusic() {
    bossMusic.pause();
    bossMusic.currentTime = 0;
}

function playCelebrationMusic() {
    // Check if the game is not muted before playing the celebration music
    if (!isGameMuted) {
        // Set a delay of 1.5 seconds before playing the celebration music
        setTimeout(() => {
            celebrationMusic.volume = 0.1; // Set the volume
            celebrationMusic.play(); // Play the celebration music
        }, 1500); // 1.5 seconds delay
    }
}