
class Character extends MoveableObject {
    // Initial properties for the character
    y = -200;
    height = 275;
    width = 100;
    speed = 5;  // Initial speed
    idleTimer = 0;
    longIdle = 2500;

    IMAGES_WALKING = [
        'img/pepe/pepe_walk/W-21.png',
        'img/pepe/pepe_walk/W-22.png',
        'img/pepe/pepe_walk/W-23.png',
        'img/pepe/pepe_walk/W-24.png',
        'img/pepe/pepe_walk/W-25.png',
        'img/pepe/pepe_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/pepe/pepe_jump/J-31.png',
        'img/pepe/pepe_jump/J-32.png',
        'img/pepe/pepe_jump/J-33.png',
        'img/pepe/pepe_jump/J-34.png',
        'img/pepe/pepe_jump/J-35.png',
        'img/pepe/pepe_jump/J-36.png',
        'img/pepe/pepe_jump/J-37.png',
        'img/pepe/pepe_jump/J-38.png',
        'img/pepe/pepe_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/pepe/pepe_dead/D-51.png',
        'img/pepe/pepe_dead/D-52.png',
        'img/pepe/pepe_dead/D-53.png',
        'img/pepe/pepe_dead/D-54.png',
        'img/pepe/pepe_dead/D-55.png',
        'img/pepe/pepe_dead/D-56.png',
        'img/pepe/pepe_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/pepe/pepe_hurt/H-41.png',
        'img/pepe/pepe_hurt/H-42.png',
        'img/pepe/pepe_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/pepe/pepe_idle/idle/I-1.png',
        'img/pepe/pepe_idle/idle/I-2.png',
        'img/pepe/pepe_idle/idle/I-3.png',
        'img/pepe/pepe_idle/idle/I-4.png',
        'img/pepe/pepe_idle/idle/I-5.png',
        'img/pepe/pepe_idle/idle/I-6.png',
        'img/pepe/pepe_idle/idle/I-7.png',
        'img/pepe/pepe_idle/idle/I-8.png',
        'img/pepe/pepe_idle/idle/I-9.png',
        'img/pepe/pepe_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/pepe/pepe_idle/long_idle/I-11.png',
        'img/pepe/pepe_idle/long_idle/I-12.png',
        'img/pepe/pepe_idle/long_idle/I-13.png',
        'img/pepe/pepe_idle/long_idle/I-14.png',
        'img/pepe/pepe_idle/long_idle/I-15.png',
        'img/pepe/pepe_idle/long_idle/I-16.png',
        'img/pepe/pepe_idle/long_idle/I-17.png',
        'img/pepe/pepe_idle/long_idle/I-18.png',
        'img/pepe/pepe_idle/long_idle/I-19.png',
        'img/pepe/pepe_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('sound/Steps_dirt-003.ogg');
    hurt_sound = new Audio('sound/ouch.mp3');

    constructor() {
        super().loadImage('img/pepe/pepe_walk/W-21.png');
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
            left: 20
        };
    }

    bossHit() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastHitTime > this.hitCooldown) {
            this.lastHitTime = currentTime;
    
            // Schaden anpassen je nach Schwierigkeitsgrad
            const damage = isEasyMode ? 20 : 35;  // 20 Schaden im Easy Mode, 35 Schaden im Normal Mode
            this.energy -= damage;
    
            if (this.energy < 0) {
                this.energy = 0;
            }
    }
    }


    animate() {
        intervals.push(setInterval(() => {
            this.animatePepe();
        }, 1000 / 60));

        intervals.push(setInterval(() => {
            this.animatePepeState();
        }, 90));
    }

    animatePepe() {
        this.checkIdleTimer();
        this.pepeWalking();
        this.pepeJumping();
        this.positionCamera();
    }

    animatePepeState() {
        if (this.isDead()) {
            this.triggerDeath();
        } else if (this.isHurt() && !this.world.gameOver) {
            this.handleInjury();
        } else if (this.handleAboveGround()) {
            this.handleJumping();
        } else {
            if (!throwingBottle) { 
                if (this.idleTimer > this.longIdle) {
                    this.handleLongIdle();
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.handleWalking();
                } else {
                    this.handleIdle();
                }
            } else {
                this.loadImage('img/pepe/pepe_idle/idle/I-1.png');
                this.handleIdle();
                this.idleTimer = 0;
            }
        }
    }

   
    checkIdleTimer() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            this.idleTimer += 1000 / 120;
        } else {
            this.idleTimer = 0;
        }
    }

   

    pepeJumping() {
        if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.handleAboveGround()) {
            this.jump();
            this.idleTimer = 0;
        }
        if     (this.handleAboveGround()) {
			if (!this.walking_sound.paused) {
            this.walking_sound.pause();
        }
    }
}

  pepeWalking() {
    this.updateSpeed();  // Update speed based on collected coins

    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
}

    if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
}
}



    positionCamera() {
        this.world.camera_x = -this.x + 100;
    }


    triggerDeath() {

    this.playAnimation(this.IMAGES_DEAD);

    // Aufruf der terminateGame-Methode, die den Endscreen anzeigt
        if (this.world) {
		this.world.terminateGame();
		}
}

    handleInjury() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.play();
    }

    handleJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
    }

    handleLongIdle() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }


    handleWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    handleIdle() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    updateSpeed() {
        const speedIncreaseFactor = 0.3;  // Speed increases by 0.3 for each coin collected
        this.speed = 5 + this.world.coinBar.collectedCoins * speedIncreaseFactor;
    }
}

