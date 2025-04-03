let difficultyLevel = 1; 
let damage = 10;

/**
 * Load the saved settings from the local storage
 */
function loadSettings() {
    loadSoundSettings();
    loadDifficultySettings();
}

/**
 * Load the sound settings from local storage and update the UI
 */
function loadSoundSettings() {
    const isSoundOn = localStorage.getItem('sound') !== 'false';  
    const soundButton = document.getElementById('music-toggle-button');
    const soundIcon = document.getElementById('sound-icon');  

    if (isSoundOn) {
        soundButton.textContent = "Sound On";
        soundIcon.src = "./img/controls/SOUND_ON_icon.png";
        isGameMuted = false; 
    } else {
        soundButton.textContent = "Sound Off";
        soundIcon.src = "./img/controls/SOUND_OFF_icon.png";
        isGameMuted = true; 
    }
}

/**
 * Load the difficulty settings from local storage
 */
function loadDifficultySettings() {
    const savedDifficulty = localStorage.getItem('difficultyLevel');
    if (savedDifficulty !== null) {
        difficultyLevel = parseInt(savedDifficulty, 10);
    }
    updateDifficultyStatus();
}

 

/**
 * Saves the settings in the Local Storage
 */
function saveSetting(key, value) {
    localStorage.setItem(key, value);
}

/**
 * Toggles sound and music and saves the new settings
 */
function toggleSoundAndImage() {
    const soundButton = document.getElementById('music-toggle-button');
    const soundIcon = document.getElementById('sound-icon');  

    if (isGameMuted) {
        enableSound(soundButton, soundIcon);
    } else {
        disableSound(soundButton, soundIcon);
    }

    saveSoundSetting();
    updateSoundStatus();
}

/**
 * Enable sound and update the button/icon
 */
function enableSound(soundButton, soundIcon) {
    soundButton.textContent = "Sound On";
    soundIcon.src = "./img/controls/SOUND_ON_icon.png";
    isGameMuted = false;
}

/**
 * Disable sound and update the button/icon
 */
function disableSound(soundButton, soundIcon) {
    soundButton.textContent = "Sound Off";
    soundIcon.src = "./img/controls/SOUND_OFF_icon.png";
    isGameMuted = true;
}

/**
 * Save the sound setting to local storage
 */
function saveSoundSetting() {
    saveSetting('sound', isGameMuted ? 'false' : 'true');
}

/**
 * Updates the sound-related status
 */

function updateSoundStatus() {
    updateSoundUI();
    muteSounds();
}

/**
 * Updates the sound-related UI (button and icon)
 */
function updateSoundUI() {
    let musicToggleButton = document.getElementById("music-toggle-button");
    let soundIcon = document.getElementById("sound-icon");

    if (isGameMuted) {
        musicToggleButton.innerText = "Sound Off";
        soundIcon.src = "./img/controls/SOUND_OFF_icon.png";
    } else {
        musicToggleButton.innerText = "Sound On";
        soundIcon.src = "./img/controls/SOUND_ON_icon.png";
    }
}

/**
 * Mutes the sounds in the game
 */
function muteSounds() {
    const sounds = [
        backgroundMusic, bossMusic, deathSound, plopSound, 
        gameWon, yeahSound, gameLost
    ];

    sounds.forEach(sound => {
        if (sound) {
            sound.muted = isGameMuted;
        }
    });

    muteChickenSounds();
    muteChickSounds();
    muteSnakeSounds();
    muteCharacterSounds();
    muteEndbossSounds();
}



/**
 * Toggles difficulty (0 = Easy, 1 = Normal, 2 = Hardcore) and saves the new settings
 */
function toggleDifficulty() {
    difficultyLevel = (difficultyLevel + 1) % 3; 
    saveDifficulty(); 
    updateDifficultyStatus();
}

/**
 * Saves the latest difficulty mode setting in the Local Storage
 */
function saveDifficulty() {
    localStorage.setItem('difficultyLevel', difficultyLevel);
}

/**
 * Updates the text of the difficulty toggle buttons based on the latest difficulty setting
 */
function updateDifficultyStatus() {
    let difficultyToggleButton = document.getElementById("toggle-boss-difficulty-button");

    if (difficultyLevel === 0) {
        difficultyToggleButton.innerText = "Boss: Easy";
    } else if (difficultyLevel === 1) {
        difficultyToggleButton.innerText = "Boss: Normal";
    } else if (difficultyLevel === 2) {
        difficultyToggleButton.innerText = "Boss: Hardcore";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadSettings();  
});