let requestAnimationFrameId = 0;

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
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
		        this.collisionHandler = new CollisionHandler(this); // Zugriff auf die global definierte Klasse
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

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


    triggerEnemyDeathAnimation(enemy) {
        if (enemy.energy === 0) {
            enemy.triggerDeathAnimation();
        }
    }

    checkCollisions() {
        this.collisionHandler.handleCharacterEnemyCollisions();
        this.collisionHandler.handleCharacterEndbossCollision();
    }


    handleCoinCollection() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.handleCollision(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
                coin.stopAnimation();
            }
        });
    }

    handleBottleCollection() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.handleCollision(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles + 1);
            }
        });
    }

    checkThrowBottlePossible() {
        if (this.keyboard.D && this.canThrowBottle && this.bottleBar.collectedBottles > 0 && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles - 1);
            this.canThrowBottle = false;
            setTimeout(() => {
                this.canThrowBottle = true;
            }, 650);
        }
    }

    handleBottleHitEndbossCollision() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.handleBottleCollisionWithEndboss(bottle)) {
                this.handleBottleEndbossCollision(bottle, index);
            }
        });
    }

    handleBottleCollisionWithEndboss(bottle) {
        return !bottle.hasCollided && this.level.endboss[0].handleCollision(bottle);
    }

    handleBottleEndbossCollision(bottle, index) {
        bottle.hasCollided = true;
        this.level.endboss[0].bossIsHit();
        bottle.animateBottleSplash();
        setTimeout(() => {
            this.removeBottleAfterCollision(index);
        }, 1000);
    }

    removeBottleAfterCollision(index) {
        this.throwableObjects.splice(index, 1);
    }

    handleCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }


    removeEnemyFromLevel(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }

    checkEndbossDefeated() {
        return this.level.endboss[0] && this.level.endboss[0].isDead;
    }

    checkEndbossEscaped() {
        const endboss = this.level.endboss[0];
    
        // Wenn der Endboss den Bildschirm verlassen hat (x <= 0)
        if (endboss.x <= 0) {
            // Setze die Position des Endbosses zurück auf x = 5000
            endboss.x = 4900;
            endboss.y = 55;  // Falls du auch die y-Position zurücksetzen möchtest
            endboss.isDead = false;  // Wenn der Endboss wieder lebendig sein soll
            endboss.hadFirstContact = true;  // Wenn der erste Kontakt zurückgesetzt werden soll
            endboss.alertAnimationPlayed = true;  // Animation zurücksetzen
        }
    }

    /**
     * Checks if Pepe is dead (out of energy).
     */
    checkPepeDead() {
        return this.character && this.character.energy <= 0;
    }

    terminateGame() { 
    if (!this.gameOver) {
        this.gameOver = true;
        this.bottleBar.setCollectedBottles(0);
        this.throwableObjects = [];


        // Verwende setTimeout, um showEndScreen verzögert auszuführen
        setTimeout(() => {
            showEndScreen();
        }, 250); // 250 Millisekunden
    }
}


    draw() {
        if (!gameActive) return;
        this.clearCanvas();
        this.drawBackground();
        this.drawMainCharacter();
        this.drawGameObjects();
        this.drawUI();
        requestAnimationFrame(() => this.draw());
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.renderMultipleObjects(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawMainCharacter() {
        this.ctx.translate(this.camera_x, 0);
        this.renderObject(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawUI() {
        this.renderObject(this.statusBar);
        this.renderObject(this.bottleBar);
        this.renderObject(this.coinBar);
        this.updateEndbossHealthbarVisibility();
        if (this.showEndbossHealthbar) {
            this.renderObject(this.endbossHealthbar);
        }
    }

    updateEndbossHealthbarVisibility() {
        if (this.character.x > 4500) {
            this.showEndbossHealthbar = true;
        }
    }

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

    renderMultipleObjects(objects) {
        objects.forEach(o => {
            this.renderObject(o);
        })
    }

    renderObject(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageRestore(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageRestore(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}