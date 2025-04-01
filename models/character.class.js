let deathSound = new Audio("sound/male-death-sound-128357.mp3");

/**
 * Represents the main character in the game.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
  y = -100;
  height = 275;
  width = 100;
  idleTimer = 0;
  longIdle = 2500;

  IMAGES_WALKING = [
    "img/pepe/pepe_walk/W-21.png",
    "img/pepe/pepe_walk/W-22.png",
    "img/pepe/pepe_walk/W-23.png",
    "img/pepe/pepe_walk/W-24.png",
    "img/pepe/pepe_walk/W-25.png",
    "img/pepe/pepe_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/pepe/pepe_jump/J-31.png",
    "img/pepe/pepe_jump/J-32.png",
    "img/pepe/pepe_jump/J-33.png",
    "img/pepe/pepe_jump/J-34.png",
    "img/pepe/pepe_jump/J-35.png",
    "img/pepe/pepe_jump/J-36.png",
    "img/pepe/pepe_jump/J-37.png",
    "img/pepe/pepe_jump/J-38.png",
    "img/pepe/pepe_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/pepe/pepe_dead/D-51.png",
    "img/pepe/pepe_dead/D-52.png",
    "img/pepe/pepe_dead/D-53.png",
    "img/pepe/pepe_dead/D-54.png",
    "img/pepe/pepe_dead/D-55.png",
    "img/pepe/pepe_dead/D-56.png",
    "img/pepe/pepe_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/pepe/pepe_hurt/H-41.png",
    "img/pepe/pepe_hurt/H-42.png",
    "img/pepe/pepe_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/pepe/pepe_idle/idle/I-1.png",
    "img/pepe/pepe_idle/idle/I-2.png",
    "img/pepe/pepe_idle/idle/I-3.png",
    "img/pepe/pepe_idle/idle/I-4.png",
    "img/pepe/pepe_idle/idle/I-5.png",
    "img/pepe/pepe_idle/idle/I-6.png",
    "img/pepe/pepe_idle/idle/I-7.png",
    "img/pepe/pepe_idle/idle/I-8.png",
    "img/pepe/pepe_idle/idle/I-9.png",
    "img/pepe/pepe_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/pepe/pepe_idle/long_idle/I-11.png",
    "img/pepe/pepe_idle/long_idle/I-12.png",
    "img/pepe/pepe_idle/long_idle/I-13.png",
    "img/pepe/pepe_idle/long_idle/I-14.png",
    "img/pepe/pepe_idle/long_idle/I-15.png",
    "img/pepe/pepe_idle/long_idle/I-16.png",
    "img/pepe/pepe_idle/long_idle/I-17.png",
    "img/pepe/pepe_idle/long_idle/I-18.png",
    "img/pepe/pepe_idle/long_idle/I-19.png",
    "img/pepe/pepe_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("sound/Steps_dirt-003.ogg");
  hurt_sound = new Audio("sound/ouch.mp3");

  constructor() {
    super().loadImage("img/pepe/pepe_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.animate();
    this.applyGravity();
    this.jumping = false;
    this.offset = {
      top: 40,
      right: 20,
      bottom: 20,
      left: 20,
    };
  }

  /**
   * Handles the event when the character is hit by the Endboss.
   * This method calculates the damage taken by the character based on the difficulty level (easy, normal, hardcore)
   * and updates the characters energy.
   */
  bossHitsCharacter() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastHitTime > this.hitCooldown) {
      this.lastHitTime = currentTime;
      let damage;
      if (difficultyLevel === 0) {
        damage = 20; 
      } else if (difficultyLevel === 1) {
        damage = 35; 
      } else if (difficultyLevel === 2) {
        damage = 50; 
      }
      this.energy -= damage;
      if (this.energy < 0) {
        this.energy = 0;
      }
    }
  }

  /**
   * Animates the character's movements and state transitions.
   */
  animate() {
    intervals.push(
      setInterval(() => {
        this.animatePepe();
      }, 1000 / 60)
    );

    intervals.push(
      setInterval(() => {
        this.animatePepeState();
      }, 90)
    );
  }

  /**
   * Pepe's basic movements.
   */
  animatePepe() {
    this.checkIdleTimer();
    this.pepeWalking();
    this.pepeJumping();
    this.positionCamera();
  }

  /**
   * Handles the animation of Pepe when idle, walking, or performing a long idle.
   * If Pepe is not throwing bottles, it checks if he's walking or idling.
   * If Pepe has been idle for too long, it triggers the long idle animation.
   * If Pepe is throwing a bottle, it sets the idle image and resets the idle timer.
   *
   */

  handleIdleAnimation() {
    if (!throwingBottle) {
      if (this.idleTimer > this.longIdle) {
        this.handleLongIdle();
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.handleWalking();
      } else {
        this.handleIdle();
      }
    } else {
      this.loadImage("img/pepe/pepe_idle/idle/I-1.png");
      this.handleIdle();
      this.idleTimer = 0;
    }
  }

  /**
   * It manages state changes depending on the current state of Pepe.
   */
  animatePepeState() {
    if (this.isDead()) {
      this.triggerDeath();
    } else if (this.isHurt() && !this.world.gameOver) {
      this.handleInjury();
    } else if (this.handleAboveGround()) {
      this.handleJumping();
    } else {
      this.handleIdleAnimation();
    }
  }

  /**
   * Updates the idle timer based on user input.
   */
  checkIdleTimer() {
    if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
      this.idleTimer += 1000 / 120;
    } else {
      this.idleTimer = 0;
    }
  }

  /**
   * Pepe jumping.
   */
  pepeJumping() {
    if (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.handleAboveGround()
    ) {
      this.jump();
      this.idleTimer = 0;
    }
    if (this.handleAboveGround()) {
      if (!this.walking_sound.paused) {
        this.walking_sound.pause();
      }
    }
  }

  /**
   * Pepe movement (walking) - now uses dynamic speed based on collected coins.
   */
  pepeWalking() {
    this.updateCharacterSpeed(); 
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.handleAboveGround()) {
        this.walking_sound.play().catch(error => {});
      }
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      if (!this.handleAboveGround()) {
        this.walking_sound.play().catch(error => {});
      }
    }
  }

  /**
   * Camera position based on character's x-coordinate.
   */
  positionCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Check if character's state when dead.
   */
  triggerDeath() {
    if (!isGameMuted) {
      deathSound.play().catch(error => {}); 
    }

    this.playPepeDeathAnimation(this.IMAGES_DEAD);

    if (this.world) {
      this.world.terminateGame();
    }
  }

  /**
   * Plays the Pepe death animation using the provided images.
   * The animation will only play once and will not repeat after it finishes.
   *
   * This function cycles through the provided image frames at a specified interval
   * and updates the character's image to simulate the death animation. Once the
   * animation is complete, it stops and does not repeat.
   * 
   * It sets flag and prevents playing if the animation is already in process.
   *
   * @param {Array} images - An array of image paths representing the frames of the animation.
   *
   */
  playPepeDeathAnimation(images) {
    if (this.isAnimationPlaying) return; 
    this.isAnimationPlaying = true; 
    const totalFrames = images.length;
    let currentFrame = 0;
    const animationInterval = setInterval(() => {
      const path = images[currentFrame];
      this.img = this.imageCache[path];
      currentFrame++;

      if (currentFrame >= totalFrames) {
        clearInterval(animationInterval); 
        this.isAnimationPlaying = false; 
      }
    }, 30);
  }

  /**
   * Check pepe's state when hurt.
   */
  handleInjury() {
    this.playAnimation(this.IMAGES_HURT);
    this.hurt_sound.play().catch(error => {});
  }

  /**
   * Check Pepe's state when jumping.
   */
  handleJumping() {
    this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
   * Check Pepe's state during long idle periods.
   */
  handleLongIdle() {
    this.playAnimation(this.IMAGES_LONG_IDLE);
  }

  /**
   * Check Pepe's state during walking periods.
   */
  handleWalking() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Check Pepe's state when idle.
   */
  handleIdle() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Update character's speed based on collected coins.
   * The more coins, the faster Pepe moves.
   */
  updateCharacterSpeed() {
    const speedIncreaseFactor = 0.3; 
    this.speed = 5 + this.world.coinBar.collectedCoins * speedIncreaseFactor;
  }

  /**
   * Checks if the character (Pepe) is above the ground based on its vertical position.
   * Returns true if the character's y-coordinate is less than 150, indicating it is above ground.
   *
   *
   * @returns {boolean} Returns true if the character is above the ground (y < 150), otherwise false.
   */
  PepeisAboveGround() {
    if (this instanceof Character && this.y < 150) {
      return true;
    }
  }
}
