let plopSound = new Audio("sound/plopp-84863.mp3"); 
let hasCollidedWithEnemy = false;

class CollisionHandler {
  constructor(world) {
    this.world = world;
  }

  /**
   * Handles collisions between the character and enemies.
   */

  handleCharacterEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.handleCollision(enemy) && enemy.energy > 0) {
        if (!this.world.character.hasCollidedWithEnemy) {
          if (
            this.world.character.handleAboveGround() &&
            this.world.character.speedY < 0
          ) {
            this.handleCollisionAboveGround(enemy);
          } else if (this.world.character.energy > 0) {
            this.world.checkPepeEnemyCollisionKind();
          }
        }
      }
    });
    this.handleBottleEnemyCollisions();
  }

  /**
   * Checks if the character collides with the boss.
   * @method handleCollision
   * @param {Object} boss - The boss object to check collision with.
   * @returns {boolean} - Returns true if a collision occurs, otherwise false.
   */
  handleCollision(boss) {
    if (
      this.x < boss.x + boss.width &&
      this.x + this.width > boss.x &&
      this.y < boss.y + boss.height &&
      this.y + this.height > boss.y
    ) {
      return true;
    } else return false;
  }

  /**
   * Handles collision between the character and the endboss.
   */
  handleCharacterEndbossCollision() {
    if (this.world.level.endboss && this.world.level.endboss.length > 0) {
      this.world.level.endboss.forEach((boss) => {
        if (this.world.character.handleCollision(boss)) {
          this.handleBossCollision();
        }
      });
    }
  }

  /**
   * Handles the boss collision when the character hits the boss.
   */
  handleBossCollision() {
    this.world.character.bossHitsCharacter();
    this.world.statusBar.setPercentage(this.world.character.energy);
  }

  /**
   * Handles collisions between throwable bottles and enemies.
   */
  handleBottleEnemyCollisions() {
    this.world.throwableObjects.forEach((bottle, bottleIndex) => {
      this.world.level.enemies.forEach((enemy) => {
        if (
          !bottle.hasCollided &&
          enemy.energy > 0 &&
          enemy.handleCollision(bottle)
        ) {
          this.processBottleEnemyCollision(bottle, bottleIndex, enemy);
        }
      });
    });
  }

  /**
   * Processes the collision between a bottle and an enemy.
   * @param {Object} bottle - The bottle object involved in the collision.
   * @param {number} bottleIndex - The index of the bottle.
   * @param {Object} enemy - The enemy object involved in the collision.
   */
  processBottleEnemyCollision(bottle, bottleIndex, enemy) {
    bottle.hasCollided = true;
    enemy.energy--;
    this.world.triggerEnemyDeathAnimation(enemy);
    this.world.playBottleShatterSound();
    bottle.animateBottleSplash();
    this.removeBottleAndEnemyAfterCollision(bottleIndex, enemy);
  }

  /**
   * Removes the bottle and enemy from the level after a collision.
   * @param {number} bottleIndex - The index of the bottle.
   * @param {Object} enemy - The enemy object to be removed.
   */
  removeBottleAndEnemyAfterCollision(bottleIndex, enemy) {
    if (enemy.energy === 0) {
      setTimeout(() => {
        this.world.removeEnemyFromLevel(enemy);
      }, 500);
    }
    setTimeout(() => {
      this.world.removeBottleAfterCollision(bottleIndex);
    }, 1000);
  }

  /**
   * Handles a collision when the character is above ground and collides with an enemy.
   * @param {Object} enemy - The enemy object the character collides with.
   */
  handleCollisionAboveGround(enemy) {
    enemy.energy--;
    this.world.character.hasCollidedWithEnemy = true;
    this.world.character.jump();
    if (enemy.energy === 0) {
      if (!isGameMuted) {
        plopSound.play().catch(error => {});
      }
      enemy.triggerDeathAnimation();
      this.triggerDeathAnimationForSurroundingEnemies(enemy);

      setTimeout(() => {
        this.world.removeEnemyFromLevel(enemy);
        this.world.character.hasCollidedWithEnemy = false;
      }, 500);
    }
  }

  /**
   * Triggers death animations for enemies near the affected enemy.
   * @param {Object} enemy - The enemy whose surrounding enemies will be affected.
   */
  triggerDeathAnimationForSurroundingEnemies(enemy) {
    const surroundingEnemies = this.world.level.enemies.filter((otherEnemy) => {
      return otherEnemy !== enemy && Math.abs(otherEnemy.x - enemy.x) <= 20;
    });

    surroundingEnemies.forEach((surroundingEnemy) => {
      surroundingEnemy.energy--;
      if (surroundingEnemy.energy === 0) {
        surroundingEnemy.triggerDeathAnimation();

        setTimeout(() => {
          this.world.removeEnemyFromLevel(surroundingEnemy);
        }, 500);
      }
    });
  }

  /**
   * Checks for bottle collision with the endboss.
   * @method handleBottleCollisionWithEndboss
   * @param {Object} bottle - The bottle object to check for collision.
   * @returns {boolean} - Returns true if a collision occurs, otherwise false.
   */
  handleBottleCollisionWithEndboss(bottle) {
    return (
      !bottle.hasCollided && this.world.level.endboss[0].handleCollision(bottle)
    );
  }

  /**
   * Handles a collision between a bottle and the endboss.
   * @param {Object} bottle - The bottle object involved in the collision.
   * @param {number} index - The index of the bottle.
   */
  handleBottleEndbossCollision(bottle, index) {
    bottle.hasCollided = true;
    this.world.level.endboss[0].bossIsHit();
    this.world.playBottleShatterSound();
    bottle.animateBottleSplash();
    setTimeout(() => {
      this.world.removeBottleAfterCollision(index);
    }, 1000);
  }
}
window.CollisionHandler = CollisionHandler;
