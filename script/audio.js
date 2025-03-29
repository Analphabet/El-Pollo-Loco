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
    backgroundMusic.loop = true;  // Musik in einer Endlosschleife abspielen
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

function updateSoundStatus() {
    backgroundMusicMuted = !backgroundMusicMuted;
    backgroundMusic.muted = backgroundMusicMuted;
    let musicToggleButton = document.getElementById('music-toggle-button');
    let soundIcon = document.getElementById('sound-icon');
    if (backgroundMusicMuted) {
        musicToggleButton.innerText = 'Sound Off';
        soundIcon.src = './img/controls/SOUND_OFF_icon.png';
    } else {
        musicToggleButton.innerText = 'Sound On';
        soundIcon.src = './img/controls/SOUND_ON_icon.png';
    }
    if (gameActive) {
        muteSounds();
    }
}

function toggleSoundAndImage() {
    isGameMuted = !isGameMuted;
    updateSoundStatus();
    muteSounds();
}

function muteSounds() {
    if (backgroundMusic) {
        backgroundMusic.muted = isGameMuted;
    }
    muteChickenSounds();
	muteChickSounds();
	muteSnakeSounds();
    muteCharacterSounds();
    muteEndbossSounds();
}

function muteChickenSounds() {
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken) {
                enemy.death_sound.muted = isGameMuted;
            }
        });
    }
}

function muteChickSounds() {
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chick) {
                enemy.death_sound.muted = isGameMuted;
            }
        });
    }
}

function muteSnakeSounds() {
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach((enemy) => {
            if (enemy instanceof Snake) {
                enemy.death_sound.muted = isGameMuted;
            }
        });
    }
}

function muteEndbossSounds() {
    if (world && world.level && world.level.endboss) {
        world.level.endboss.forEach((endboss) => {
            endboss.alert_sound.muted = isGameMuted;
            endboss.hurt_sound.muted = isGameMuted;
            endboss.dead_sound.muted = isGameMuted;
        });
    }
}

function muteCoinSounds() {
    if (world && world.level && world.level.coins) {
        world.level.coins.forEach((coin) => {
            coin.collect_sound.muted = isGameMuted;
        });
    }
}

function muteBottleSounds() {
    if (world && world.level && world.level.bottles) {
        world.level.bottles.forEach((bottle) => {
            bottle.collect_sound.muted = isGameMuted;
        });
    }
}

function muteCharacterSounds() {
    if (world && world.character) {
        world.character.walking_sound.muted = isGameMuted;
        world.character.hurt_sound.muted = isGameMuted;
    }
}