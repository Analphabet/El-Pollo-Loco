
class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    handleCharacterEnemyCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.handleCollision(enemy) && enemy.energy > 0) {
                if (this.world.character.handleAboveGround() && this.world.character.speedY < 0) {
                    this.handleCollisionAboveGround(enemy);
                } else if (this.world.character.energy > 0) {
                    this.handleCollision();
                }
            }
        });
        this.handleBottleEnemyCollisions();
    }


    handleCollision(boss) {
        // Überprüfen, ob der Endboss und der Charakter sich überlappen (Kollision)
        if (
            this.x < boss.x + boss.width &&
            this.x + this.width > boss.x &&
            this.y < boss.y + boss.height &&
            this.y + this.height > boss.y
        ) {
            return true; // Eine Kollision ist aufgetreten
        }
        return false; // Keine Kollision
    }

    handleCharacterEndbossCollision() {
        if (this.world.level.endboss && this.world.level.endboss.length > 0) {
            this.world.level.endboss.forEach(boss => {
                if (this.world.character.handleCollision(boss)) {
                    this.handleBossCollision();
                }
            });
        }
    }

    handleBossCollision() {
        this.world.character.bossHit();
        this.world.statusBar.setPercentage(this.world.character.energy);
    }


    handleBottleEnemyCollisions() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            this.world.level.enemies.forEach((enemy) => {
                if (!bottle.hasCollided && enemy.energy > 0 && enemy.handleCollision(bottle)) {
                    this.processBottleEnemyCollision(bottle, bottleIndex, enemy);
                }
            });
        });
    }

    processBottleEnemyCollision(bottle, bottleIndex, enemy) {
        bottle.hasCollided = true;
        enemy.energy--;
        this.world.triggerEnemyDeathAnimation(enemy);
        this.world.playBottleShatterSound();
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


    handleCollision() {
        this.world.character.hit();
        this.world.statusBar.setPercentage(this.world.character.energy);
    }

    handleCollisionAboveGround(enemy) {
        enemy.energy--;
        this.world.character.jump();
        if (enemy.energy === 0) {
            enemy.triggerDeathAnimation();
            setTimeout(() => {
                this.world.removeEnemyFromLevel(enemy);
            }, 500);
        }
    }

    handleBottleCollisionWithEndboss(bottle) {
        return !bottle.hasCollided && this.world.level.endboss[0].handleCollision(bottle);
    }

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

// Stelle die Klasse global zur Verfügung
window.CollisionHandler = CollisionHandler;
