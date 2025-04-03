let difficultyLevel = 1; // Standardwert (Normal)
let damage = 10;

/**
 * Lädt die gespeicherten Einstellungen aus dem Local Storage
 */
function loadSettings() {
    // Musik (Sound)
    const isSoundOn = localStorage.getItem('sound') !== 'false';  // Wenn 'false', ist Sound aus
    const soundButton = document.getElementById('music-toggle-button');
    const soundIcon = document.getElementById('sound-icon');  // Für das Sound-Icon

    if (isSoundOn) {
        soundButton.textContent = "Sound On";
        soundIcon.src = "./img/controls/SOUND_ON_icon.png";
        isGameMuted = false; // Sound ist an
    } else {
        soundButton.textContent = "Sound Off";
        soundIcon.src = "./img/controls/SOUND_OFF_icon.png";
        isGameMuted = true;  // Sound ist aus
    }

    // Boss-Schwierigkeit
    const savedDifficulty = localStorage.getItem('difficultyLevel');
    if (savedDifficulty !== null) {
        difficultyLevel = parseInt(savedDifficulty, 10);
    }
    updateDifficultyStatus();  // Aktualisiert den Button-Text
}

/**
 * Speichert die Einstellungen im Local Storage
 */
function saveSetting(key, value) {
    localStorage.setItem(key, value);
}

/**
 * Schaltet Musik und Sound um und speichert die neue Einstellung
 */
function toggleSoundAndImage() {
    const soundButton = document.getElementById('music-toggle-button');
    const soundIcon = document.getElementById('sound-icon');  // Für das Sound-Icon

    // Wenn Sound aus ist, wird es an und umgekehrt
    if (isGameMuted) {
        soundButton.textContent = "Sound On";
        soundIcon.src = "./img/controls/SOUND_ON_icon.png";
        isGameMuted = false; // Sound an
        saveSetting('sound', 'true');
    } else {
        soundButton.textContent = "Sound Off";
        soundIcon.src = "./img/controls/SOUND_OFF_icon.png";
        isGameMuted = true;  // Sound aus
        saveSetting('sound', 'false');
    }

    // Alle Sounds (einschließlich Hintergrundmusik und Bossmusik) aktualisieren
    updateSoundStatus();
    muteSounds(); // Audio Elemente muten/unmuten je nach isGameMuted
}

/**
 * Aktualisiert den Sound-Status
 */
function updateSoundStatus() {
    backgroundMusic.muted = isGameMuted;
    backgroundMusicMuted = isGameMuted;
    let musicToggleButton = document.getElementById("music-toggle-button");
    let soundIcon = document.getElementById("sound-icon");
    if (isGameMuted) {
        musicToggleButton.innerText = "Sound Off";
        soundIcon.src = "./img/controls/SOUND_OFF_icon.png";
    } else {
        musicToggleButton.innerText = "Sound On";
        soundIcon.src = "./img/controls/SOUND_ON_icon.png";
    }
    // Mute alle anderen Sounds, wenn der Sound deaktiviert ist
    muteSounds(); 
}

/**
 * Mutes oder unmutes alle Spiel-Sounds basierend auf dem Game-Mute-Status.
 */
function muteSounds() {
    if (backgroundMusic) {
        backgroundMusic.muted = isGameMuted; // Hintergrundmusik muten
    }
    if (bossMusic) {
        bossMusic.muted = isGameMuted; // Bossmusik muten
    }
    if (deathSound) {
        deathSound.muted = isGameMuted; // Tod-Sound muten
    }
    if (plopSound) {
        plopSound.muted = isGameMuted; // Plop-Sound muten
    }
    if (gameWon) {
        gameWon.muted = isGameMuted; // Gewinn-Sound muten
    }
    if (yeahSound) {
        yeahSound.muted = isGameMuted; // Yeah-Sound muten
    }
    if (gameLost) {
        gameLost.muted = isGameMuted; // Verlust-Sound muten
    }

    // Auch die Feindgeräusche, falls vorhanden, werden gemutet
    muteChickenSounds();
    muteChickSounds();
    muteSnakeSounds();
    muteCharacterSounds();
    muteEndbossSounds();
}

/**
 * Schaltet den Schwierigkeitsgrad um und speichert die neue Einstellung
 */
function toggleDifficulty() {
    difficultyLevel = (difficultyLevel + 1) % 3; // 0 = Easy, 1 = Normal, 2 = Hardcore
    saveDifficulty();  // Speichert den aktuellen Schwierigkeitsgrad im Local Storage
    updateDifficultyStatus();  // Aktualisiert den Button-Text
}

/**
 * Speichert den aktuellen Schwierigkeitsgrad im Local Storage
 */
function saveDifficulty() {
    localStorage.setItem('difficultyLevel', difficultyLevel);
}

/**
 * Aktualisiert den Text des Difficulty Toggle Buttons basierend auf dem aktuellen Schwierigkeitsgrad
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

// Wird aufgerufen, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();  // Lädt die gespeicherten Einstellungen
});
