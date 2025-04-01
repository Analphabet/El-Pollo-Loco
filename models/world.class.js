let requestAnimationFrameId = 0;

/**
 * Represents the game world where characters and objects interact.
 * @class
 */
class World {
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossHealthbar = new EndbossHealthbar();
  statusBar = new Statusbar();
  gameOver = false;
  bossEscaped = false;
  throwableObjects = [];
  level = level1;
  canvas;
  ctx;
  character = new Character();
  keyboard;
  camera_x = 0;
  collectedCoins = 0;
  DKeyPressed = false;
  showEndbossHealthbar = false;
  canThrowBottle = true;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.collisionHandler = new CollisionHandler(this); 
    this.run();
  }

  /**
   * Sets the reference to the game world for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop that checks for collisions.
   */
  run() {
    setInterval(() => {
      this.handleCoinCollection();
      this.handleBottleCollection();
      this.checkThrowBottlePossible();
      this.checkCollisions();
      this.handleBottleHitEndbossCollision();
      this.checkEndbossEscaped();
    }, 10);
  }

  /**
   * Plays the death animation for an enemy if its energy reaches zero.
   */
  triggerEnemyDeathAnimation(enemy) {
    if (enemy.energy === 0) {
      enemy.triggerDeathAnimation();
    }
  }

  /**
   * Checks collisions between the character and other objects (enemies and endboss).
   * This function calls methods of the CollisionHandler to handle specific collisions.
   *
   */
  checkCollisions() {
    this.collisionHandler.handleCharacterEnemyCollisions();
    this.collisionHandler.handleCharacterEndbossCollision();
  }

  /**
   * Checks collisions between the character and coins, updates collected coins, and plays a sound.
   */
  handleCoinCollection() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.handleCollision(coin)) {
        this.level.coins.splice(index, 1);
        this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
        if (!isGameMuted) {
          this.playGameSound("sound/coin-recieved.mp3", 0.1);
        }
        coin.stopAnimation();
      }
    });
  }

  /**
   * Checks collisions between the character and bottles, updates collected bottles, and plays a sound.
   */
  handleBottleCollection() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.handleCollision(bottle)) {
        this.level.bottles.splice(index, 1);
        this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles + 1);
        if (!isGameMuted) {
          this.playGameSound("sound/bottle-clink.mp3", 1);
        }
      }
    });
  }

  /**
   * Checks if the character can throw a bottle and adds a throwable object to the game.
   */
  checkThrowBottlePossible() {
    if (
      this.keyboard.D &&
      this.canThrowBottle &&
      this.bottleBar.collectedBottles > 0 &&
      !this.character.otherDirection
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles - 1);
      this.canThrowBottle = false;
      setTimeout(() => {
        this.canThrowBottle = true;
      }, 650);
    }
  }

  /**
   * Checks collisions between throwable objects (bottles) and the endboss.
   */
  handleBottleHitEndbossCollision() {
    this.throwableObjects.forEach((bottle, index) => {
      if (this.handleBottleCollisionWithEndboss(bottle)) {
        this.handleBottleEndbossCollision(bottle, index);
      }
    });
  }

  /**
   * Checks if a bottle is colliding with the endboss.
   * @param {ThrowableObject} bottle - The throwable object (bottle) to check for collision.
   */
  handleBottleCollisionWithEndboss(bottle) {
    return !bottle.hasCollided && this.level.endboss[0].handleCollision(bottle);
  }

  /**
   * Handles the collision between a bottle and the end boss.
   * @param {ThrowableObject} bottle - The bottle that collided with the end boss.
   * @param {number} index - The index of the bottle in the throwable objects array.
   */
  handleBottleEndbossCollision(bottle, index) {
    bottle.hasCollided = true;
    this.level.endboss[0].bossIsHit();
    this.playBottleShatterSound();
    bottle.animateBottleSplash();
    setTimeout(() => {
      this.removeBottleAfterCollision(index);
    }, 1000);
  }

  /**
   * Removes a bottle from the throwable objects array after a collision.
   * @param {number} index - The index of the bottle to remove from the array.
   */
  removeBottleAfterCollision(index) {
    this.throwableObjects.splice(index, 1);
  }

  /**
   * Removes an enemy from the level.
   * @param {Enemy} enemy - The enemy to remove from the level.
   */
  removeEnemyFromLevel(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  /**
   * Check collisions between the character and enemies or end boss, reducing character's energy and updating the status bar.
   */
  checkPepeEnemyCollisionKind() {
    if (!this.character.PepeisAboveGround() && this.character.speedY < 0) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    } else {
      this.removeEnemyFromLevel();
    }
  }

  /**
   * Checks if the endboss is defeated.
   */
  checkEndbossDefeated() {
    return this.level.endboss[0] && this.level.endboss[0].isDead;
  }

  /**
   * Checks if the endboss has crossed the left screen boundary.
   * If the endboss leaves the screen, it is reset and its properties are updated.
   */
  checkEndbossEscaped() {
    const endboss = this.level.endboss[0];

    if (endboss.x <= 0) {
      endboss.x = 5000;
      endboss.y = 55;
      endboss.isDead = false;
      endboss.hadFirstContact = true;
      endboss.alertAnimationPlayed = true;
    }
  }

  /**
   * Checks if Pepe is dead (out of energy).
   */
  checkPepeDead() {
    return this.character && this.character.energy <= 0;
  }

  /**
   * Ends the game by setting the game over state, resetting collected bottles, clearing throwable objects and displaying the end screen.
   */
  terminateGame() {
    if (!this.gameOver) {
      this.gameOver = true;
      this.bottleBar.setCollectedBottles(0);
      this.throwableObjects = [];

      setTimeout(() => {
        showEndScreen();
      }, 250);
    }
  }

  /**
   * Draws the entire game including background, characters, UI, and game objects.
   */
  draw() {
    if (!gameActive) return;
    this.clearCanvas();
    this.drawBackground();
    this.drawMainCharacter();
    this.drawGameObjects();
    this.drawUI();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Clears the canvas by erasing its contents.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the background of the game world, including background objects.
   */
  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.renderMultipleObjects(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws the main character on the game screen.
   */
  drawMainCharacter() {
    this.ctx.translate(this.camera_x, 0);
    this.renderObject(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws the status bar, bottle bar, coin bar, and endboss health bar.
   */
  drawUI() {
    this.renderObject(this.statusBar);
    this.renderObject(this.bottleBar);
    this.renderObject(this.coinBar);
    this.updateEndbossHealthbarVisibility();
    if (this.showEndbossHealthbar) {
      this.renderObject(this.endbossHealthbar);
    }
  }

  /**
   * Updates the visibility of the endboss health bar based on the character's position in the game world.
   */
  updateEndbossHealthbarVisibility() {
    if (this.character.x > 4500) {
      this.showEndbossHealthbar = true;
    }
  }

  /**
   * Draws game objects including enemies, coins, endboss, bottles, clouds, and throwable objects.
   */
  drawGameObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.renderMultipleObjects(this.level.clouds);
    this.renderMultipleObjects(this.level.enemies);
    this.renderMultipleObjects(this.level.coins);
    this.renderMultipleObjects(this.level.endboss);
    this.renderMultipleObjects(this.level.bottles);
    this.renderMultipleObjects(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds multiple objects to the game map for drawing.
   * @param {Object[]} objects - An array of objects to add to the map.
   */
  renderMultipleObjects(objects) {
    objects.forEach((o) => {
      this.renderObject(o);
    });
  }

  /**
   * Adds a single object to the game map for drawing and handles flipping the image if needed.
   * @param {DrawableObject} mo - The object to add to the map.
   */
  renderObject(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageRestore(mo);
    }
  }

  /**
   * Flips the image horizontally for a given drawable object and adjusts its position.
   * @param {DrawableObject} mo - The object for which the image is flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image to its original orientation after being flipped.
   * @param {DrawableObject} mo - The object for which the image is restored.
   */
  flipImageRestore(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Plays a game sound with the given file path.
   * @param {string} soundFilePath
   * @param {number} [volume=0.2]
   */
  playGameSound(soundFilePath, volume = 0.3) {
    let gameSound = new Audio(soundFilePath);
    gameSound.volume = volume;
    gameSound.play().catch(error => {});
  }

  /**
   * Plays the bottle shatter sound effect if the game is not muted.
   */
  playBottleShatterSound() {
    if (!isGameMuted) {
      this.playGameSound("sound/broken-bottle-191998.mp3");
    }
  }
}
