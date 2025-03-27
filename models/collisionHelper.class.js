class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    handleCharacterEnemyCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.isColliding(enemy) && enemy.energy > 0) {
                if (this.world.character.isAboveGround() && this.world.character.speedY < 0) {
                    this.handleCollisionAboveGround(enemy);
                } else if (this.world.character.energy > 0) {
                    this.handleCollision();
                }
            }
        });
        this.handleBottleEnemyCollisions();
    }

    handleBottleEnemyCollisions() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            this.world.level.enemies.forEach((enemy) => {
                if (!bottle.hasCollided && enemy.energy > 0 && enemy.isColliding(bottle)) {
                    this.processBottleEnemyCollision(bottle, bottleIndex, enemy);
                }
            });
        });
    }

    processBottleEnemyCollision(bottle, bottleIndex, enemy) {
        bottle.hasCollided = true;
        enemy.energy--;
        this.world.playEnemyDeathAnimation(enemy);
        bottle.animateBottleSplash();
        this.removeBottleAndEnemyAfterCollision(bottleIndex, enemy);
    }

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

    handleCharacterEndbossCollision() {
        if (this.world.level.endboss && this.world.level.endboss.length > 0) {
            this.world.level.endboss.forEach(boss => {
                if (this.world.character.isColliding(boss)) {
                    this.handleCollision();
                }
            });
        }
    }

    handleCollision() {
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

    handleCollisionAboveGround(enemy) {
        enemy.energy--;
        this.world.character.jump();
        if (enemy.energy === 0) {
            enemy.playDeathAnimation();
            setTimeout(() => {
                this.world.removeEnemyFromLevel(enemy);
            }, 500);
        }
    }

    isBottleCollidingWithEndboss(bottle) {
        return !bottle.hasCollided && this.world.level.endboss[0].isColliding(bottle);
    }

    handleBottleEndbossCollision(bottle, index) {
        bottle.hasCollided = true;
        this.world.level.endboss[0].bossIsHit();
        bottle.animateBottleSplash();
        setTimeout(() => {
            this.world.removeBottleAfterCollision(index);
        }, 1000);
    }
}

// Stelle die Klasse global zur Verfügung
window.CollisionHandler = CollisionHandler;
