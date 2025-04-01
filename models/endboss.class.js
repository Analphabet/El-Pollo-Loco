let backgroundMusic = new Audio("sound/optimistic-latin-spanish-fiesta-siesta.mp3"); 

let difficultyLevel = 1; 
let damage = 10; 

/**
 * Switches between Easy, Normal, and Hard modes and updates the UI.
 */
function toggleDifficulty() {
  difficultyLevel = (difficultyLevel + 1) % 3;
  updateDifficultyStatus();
}

class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 55;
  energy = 120;
  isDead = false;
  hadFirstContact = false;
  alertAnimationPlayed = false;

  IMAGES_WALKING = [
    "img/enemies/enemies_boss/boss_walk/G1.png",
    "img/enemies/enemies_boss/boss_walk/G2.png",
    "img/enemies/enemies_boss/boss_walk/G3.png",
    "img/enemies/enemies_boss/boss_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/enemies/enemies_boss/boss_alert/G5.png",
    "img/enemies/enemies_boss/boss_alert/G6.png",
    "img/enemies/enemies_boss/boss_alert/G7.png",
    "img/enemies/enemies_boss/boss_alert/G8.png",
    "img/enemies/enemies_boss/boss_alert/G9.png",
    "img/enemies/enemies_boss/boss_alert/G10.png",
    "img/enemies/enemies_boss/boss_alert/G11.png",
    "img/enemies/enemies_boss/boss_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/enemies/enemies_boss/boss_attack/G13.png",
    "img/enemies/enemies_boss/boss_attack/G14.png",
    "img/enemies/enemies_boss/boss_attack/G15.png",
    "img/enemies/enemies_boss/boss_attack/G16.png",
    "img/enemies/enemies_boss/boss_attack/G17.png",
    "img/enemies/enemies_boss/boss_attack/G18.png",
    "img/enemies/enemies_boss/boss_attack/G19.png",
    "img/enemies/enemies_boss/boss_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/enemies/enemies_boss/boss_hurt/G21.png",
    "img/enemies/enemies_boss/boss_hurt/G22.png",
    "img/enemies/enemies_boss/boss_hurt/G23.png",
    "img/enemies/enemies_boss/boss_hurt/G24.png",
  ];

  IMAGES_DEAD = [
    "img/enemies/enemies_boss/boss_dead/G24.png",
    "img/enemies/enemies_boss/boss_dead/G25.png",
    "img/enemies/enemies_boss/boss_dead/G26.png",
  ];

  alert_sound = new Audio("sound/rooster-cry-chicken.mp3");
  hurt_sound = new Audio("sound/chicken-noise-196746.mp3");
  dead_sound = new Audio("sound/chicken-single-alarm-call-6056.mp3");

  constructor() {
    super().loadImage("img/enemies/enemies_boss/boss_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 5000;
    this.offset = { top: 60, right: 20, bottom: 90, left: 20 };
    this.animationIntervals = [];
    this.animate();
  }

  /**
   * Animate the endboss's behavior, including starting an alert animation.
   */
  animate() {
    const animationInterval = setInterval(() => {
      if (this.shouldStartAlert()) {
        this.startAlertAnimation(animationInterval);
      }
    }, 50);
    this.animationIntervals.push(animationInterval);

    addInterval(animationInterval);
  }

  /**
   * Checks if the alert animation should start based on specific conditions.
   *
   * @returns {boolean} True if the alert animation should start, false otherwise.
   */
  shouldStartAlert() {
    return world && world.character.x > 4500 && !this.hadFirstContact;
  }

  /**
   * Start the alert animation for the endboss character.
   *
   * @param {number} interval - The interval at which to check for starting the alert animation.
   */
  startAlertAnimation(interval) {
    if (!this.alertAnimationPlayed) {
      this.alert_sound.play().catch(error => {});
      this.alertAnimationInterval = this.startAnimationInterval(
        this.IMAGES_ALERT,
        275,
        () => {
          clearInterval(this.alertAnimationInterval);
          this.alertAnimationPlayed = true;
          setTimeout(() => {
            this.hadFirstContact = true;
            this.startWalking();
            this.handleFirstContact();
          }, 1000);
        }
      );
      clearInterval(interval);
    }
  }

  /**
   * Handle the background music switch after the first contact.
   */
  handleFirstContact() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    if (!isGameMuted && !backgroundMusicMuted) {
      bossMusic = new Audio("sound/western-theme-162884.mp3");
      bossMusic.volume = 0.2;
      bossMusic.play().catch(error => {});
      bossMusic.loop = true;
    }
  }

  /**
   * Start the hurt animation for the endboss character.
   * This animation occurs when the endboss is hit.
   */
  startHurtAnimation() {
    if (!this.hurtAnimationInterval) {
      this.stopMovement();
      this.hurt_sound.play().catch(error => {});
      this.hurtAnimationInterval = this.startAnimationInterval(
        this.IMAGES_HURT,
        300,
        () => {
          this.resetToWalkingState();
        }
      );
    }
  }

  /**
   * Start the walking behavior for the endboss character.
   * The endboss will move left while alive.
   */
  startWalking() {
    const walkingInterval = setInterval(() => {
      if (this.energy > 0 && !this.isDead) {
        this.updateBossSpeed();
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
      } else if (this.bossIsDead()) {
        clearInterval(walkingInterval);
      }
    }, 99);
  }

  /**
   * Update the endboss's speed based on its energy level.
   * The boss' lower energy results in increased speed incl. speed variation.
   * The speed differs on each difficulty level (easy, normal, hardcore).
   */
  updateBossSpeed() {
    if (this.energy < 60) {
      if (difficultyLevel === 0) {
        this.speed = 35 + Math.random(); 
      } else if (difficultyLevel === 1) {
        this.speed = 50 + Math.random() * 1.15; 
      } else if (difficultyLevel === 2) {
        this.speed = 60 + Math.random() * 0.5; 
      }
    } else {
      if (difficultyLevel === 0) {
        this.speed = 25; 
      } else if (difficultyLevel === 1) {
        this.speed = 40; 
      } else if (difficultyLevel === 2) {
        this.speed = 50; 
      }
    }
  }

  /**
   * Handle when the endboss is hit.
   * Reduces the endboss's energy, starts the hurt animation, and updates the health bar.
   */
  bossIsHit() {
    this.reduceEnergy();
    this.startHurtAnimation();
    this.updateHealthBar();
  }

  /**
   * Update the health bar of the endboss in the game world.
   */
  updateHealthBar() {
    world.endbossHealthbar.setPercentage(this.energy);
  }

  /**
   * Reduces the boss' energy and does not let it decrease below the value 0. 
   * The amount of the reduction differs according to the difficulty level (easy, normal, hardcore).
   */
  reduceEnergy() {
    if (difficultyLevel === 0) {
      damage = 20; 
    } else if (difficultyLevel === 1) {
      damage = 10; 
    } else if (difficultyLevel === 2) {
      damage = 8;
    }
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.updateHealthBar();
  }

  /**
   * Reset the endboss to its walking state after the hurt animation.
   */
  resetToWalkingState() {
    clearInterval(this.hurtAnimationInterval);
    this.hurtAnimationInterval = null;
    this.playAnimation(this.IMAGES_WALKING);
    this.resumeMovementAfterDelay(0.05);
  }

  /**
   * Stop the endboss's movement by setting its speed to 0.
   */
  stopMovement() {
    this.speed = 0;
  }

  /**
   * Resume the endboss's movement after a specified delay.
   * Adjusts the endboss's speed based on energy.
   *
   * @param {number} delay - The delay in seconds before resuming movement.
   */
  resumeMovementAfterDelay(delay) {
    setTimeout(() => {
      this.speed = 35 + Math.random() * 1.2;
    }, delay * 1000);
  }

  /**
   * Check if the endboss is dead based on its energy level.
   * If the energy is zero or below and the endboss is not already dead,
   * initiate the death process.
   */
  bossIsDead() {
    if (this.energy <= 0 && !this.isDead) {
      this.isDead = true;
      this.stopAllAnimations();
      this.dead_sound.play().catch(error => {});
      this.startDeathAnimation();
      setTimeout(() => {
        showEndScreen();
      }, 1500);
      this.clearIntervals();
    }
  }

  /**
   * Clear all animation intervals associated with the endboss.
   */
  clearIntervals() {
    this.animationIntervals.forEach((interval) => clearInterval(interval));
    this.animationIntervals = [];
    this.animationIntervals.forEach((interval) => {
      const index = intervals.indexOf(interval);
      if (index !== -1) {
        intervals.splice(index, 1);
      }
    });
  }

  /**
   * Stop all animations for the endboss, including hurt animation and movement.
   */
  stopAllAnimations() {
    clearInterval(this.hurtAnimationInterval);
    this.stopMovement();
  }

  /**
   * Start the death animation for the endboss.
   */
  startDeathAnimation() {
    this.deathAnimationInterval = this.startAnimationInterval(
      this.IMAGES_DEAD,
      250,
      () => {
        this.endDeathAnimation();
      }
    );
  }

  /**
   * End the death animation for the endboss and load the final image.
   */
  endDeathAnimation() {
    clearInterval(this.deathAnimationInterval);
    this.deathAnimationInterval = null;
    this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
  }

  /**
   * Update the health bar of the endboss in the game world.
   */
  updateHealthBar() {
    world.endbossHealthbar.setPercentage(this.energy);
  }

  /**
   * Start an animation interval for a set of images.
   * This function plays the animation and triggers the onComplete callback when finished.
   *
   * @param {Array<string>} images - Array of image paths for the animation frames.
   * @param {number} intervalTime - The time interval between each frame in milliseconds.
   * @param {function|null} onComplete - Callback function to execute when the animation is complete.
   * @returns {number} - The ID of the animation interval.
   */
  startAnimationInterval(images, intervalTime, onComplete = null) {
    let animationCounter = 0;
    const animationLength = images.length;
    return setInterval(() => {
      this.playAnimation(images);
      animationCounter++;
      if (animationCounter / animationLength >= 1) {
        clearInterval(this.deathAnimationInterval);
        if (onComplete) onComplete();
      }
    }, intervalTime);
  }
}

/**
 * Updates the difficulty status displayed on the difficulty toggle button.
 * It changes the text of the button based on the current difficulty level.
 */
function updateDifficultyStatus() {
  let difficultyToggleButton = document.getElementById(
    "toggle-boss-difficulty-button"
  );

  if (difficultyLevel === 0) {
    difficultyToggleButton.innerText = "Boss: Easy";
  } else if (difficultyLevel === 1) {
    difficultyToggleButton.innerText = "Boss: Normal";
  } else if (difficultyLevel === 2) {
    difficultyToggleButton.innerText = "Boss: Hardcore";
  }
}
