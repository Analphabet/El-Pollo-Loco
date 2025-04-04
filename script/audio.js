/**
 * Audio element for the initial ingame background music.
 * @type {HTMLAudioElement}
 */

let backgroundMusic = new Audio("sound/optimistic-latin-spanish-fiesta-siesta.mp3"); 


/**
 * Audio element for the boss theme.
 * @type {HTMLAudioElement}
 */

let bossMusic = new Audio("sound/western-theme-162884.mp3");

/**
 * Audio element for the death sound.
 * @type {HTMLAudioElement}
 */

let deathSound = new Audio("sound/male-death-sound-128357.mp3");

/**
 * Audio element for the plop sound.
 * @type {HTMLAudioElement}
 */

let plopSound = new Audio("sound/plopp-84863.mp3"); 

/**
 * Audio element for the game won sound.
 * @type {HTMLAudioElement}
 */
let gameWon = new Audio("sound/win-sound.mp3");

/**
 * Audio element for the yeah sound.
 * @type {HTMLAudioElement}
 */
let yeahSound = new Audio("sound/oh-yeah.mp3");

/**
 * Audio element for the game lost sound.
 * @type {HTMLAudioElement}
 */
let gameLost = new Audio("sound/lost-sound.mp3");


/**
 * Indicates whether the background music is muted.
 * @type {boolean}
 */
let backgroundMusicMuted = false;

/**
 * Plays the game won and yeah sound if the game is not muted.
 * The flags make sure the game won sound is only played once and does not repeat.
 */
let isWinSoundPlaying = false;
function gameWonSound() {
  if (!isGameMuted && !isWinSoundPlaying) {
	isWinSoundPlaying = true;
    gameWon.play().catch(error => {});
    yeahSound.play().catch(error => {});
	gameWon.onended = () => {
      isWinSoundPlaying = false;
	}; 
  }
}

/**
 * Plays the game lost sound if the game is not muted.
 */
function gameLostSound() {
  if (!isGameMuted) {
    gameLost.play().catch(error => {});
  }
}

/**
 * Sets the volume and mute status for the background music and plays it.
 */
function playBackgroundMusic() {
  backgroundMusic.volume = 0.1;
  backgroundMusic.muted = backgroundMusicMuted;
  backgroundMusic.loop = true;
  backgroundMusic.play().catch(error => {});
}

/**
 * Stops the background music and resets its playback position to the beginning.
 */
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

/**
 * Stops the boss music and resets its playback position to the beginning.
 */
function stopBossMusic() {
  bossMusic.pause();
  bossMusic.currentTime = 0;
}

/**
 * Plays the celebration music after a 1.5-second delay if the game is not muted.
 * The volume of the music is set to 0.1 before playing it. It starts with a delay of 1.5 seconds.
 *
 * @memberof Game
 * @this {Game} The current Game object.
 *
 * @returns {void} This function does not return any value.
 */
function playCelebrationMusic() {
  if (!isGameMuted) {
    setTimeout(() => {
      celebrationMusic.volume = 0.1;
      celebrationMusic.play().catch(error => {});
    }, 1500); 
  }
}

/**
 * Toggles the mute status of the background music and updates the UI accordingly.
 */
function updateSoundStatus() {
  backgroundMusicMuted = !backgroundMusicMuted;
  backgroundMusic.muted = backgroundMusicMuted;
  let musicToggleButton = document.getElementById("music-toggle-button");
  let soundIcon = document.getElementById("sound-icon");
  if (backgroundMusicMuted) {
    musicToggleButton.innerText = "Sound Off";
    soundIcon.src = "./img/controls/SOUND_OFF_icon.png";
  } else {
    musicToggleButton.innerText = "Sound On";
    soundIcon.src = "./img/controls/SOUND_ON_icon.png";
  }
  if (gameActive) {
    muteSounds();
  }
}

/**
 * Toggles the mute status of the game audio and updates the UI.
 */
function toggleSoundAndImage() {
  isGameMuted = !isGameMuted;
  updateSoundStatus();
  muteSounds();
}

/**
 * Mutes or unmutes all game audio elements based on the game mute status.
 */
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

/**
 * Mutes or unmutes chicken enemy sounds based on the game mute status.
 */
function muteChickenSounds() {
  if (world && world.level && world.level.enemies) {
    world.level.enemies.forEach((enemy) => {
      if (enemy instanceof Chicken) {
        enemy.death_sound.muted = isGameMuted;
      }
    });
  }
}

/**
 * Mutes or unmutes chicken enemy sounds based on the game mute status.
 */
function muteChickSounds() {
  if (world && world.level && world.level.enemies) {
    world.level.enemies.forEach((enemy) => {
      if (enemy instanceof Chick) {
        enemy.death_sound.muted = isGameMuted;
      }
    });
  }
}

/**
 * Mutes or unmutes chicken enemy sounds based on the game mute status.
 */
function muteSnakeSounds() {
  if (world && world.level && world.level.enemies) {
    world.level.enemies.forEach((enemy) => {
      if (enemy instanceof Snake) {
        enemy.death_sound.muted = isGameMuted;
      }
    });
  }
}

/**
 * Mutes or unmutes endboss enemy sounds based on the game mute status.
 */
function muteEndbossSounds() {
  if (world && world.level && world.level.endboss) {
    world.level.endboss.forEach((endboss) => {
      endboss.alert_sound.muted = isGameMuted;
      endboss.hurt_sound.muted = isGameMuted;
      endboss.dead_sound.muted = isGameMuted;
    });
  }
}

/**
 * Mutes or unmutes coin collect sounds based on the game mute status.
 */
function muteCoinSounds() {
  if (world && world.level && world.level.coins) {
    world.level.coins.forEach((coin) => {
      coin.collect_sound.muted = isGameMuted;
    });
  }
}

/**
 * Mutes or unmutes bottle collect sounds based on the game mute status.
 */
function muteBottleSounds() {
  if (world && world.level && world.level.bottles) {
    world.level.bottles.forEach((bottle) => {
      bottle.collect_sound.muted = isGameMuted;
    });
  }
}

/**
 * Mutes or unmutes character sounds based on the game mute status.
 */
function muteCharacterSounds() {
  if (world && world.character) {
    world.character.walking_sound.muted = isGameMuted;
    world.character.hurt_sound.muted = isGameMuted;
  }
}
