class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 120;
    isDead = false;
    hadFirstContact = false;
    alertAnimationPlayed = false;

    IMAGES_WALKING = [
        'img/enemies/enemies_boss/boss_walk/G1.png',
        'img/enemies/enemies_boss/boss_walk/G2.png',
        'img/enemies/enemies_boss/boss_walk/G3.png',
        'img/enemies/enemies_boss/boss_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/enemies/enemies_boss/boss_alert/G5.png',
        'img/enemies/enemies_boss/boss_alert/G6.png',
        'img/enemies/enemies_boss/boss_alert/G7.png',
        'img/enemies/enemies_boss/boss_alert/G8.png',
        'img/enemies/enemies_boss/boss_alert/G9.png',
        'img/enemies/enemies_boss/boss_alert/G10.png',
        'img/enemies/enemies_boss/boss_alert/G11.png',
        'img/enemies/enemies_boss/boss_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/enemies/enemies_boss/boss_hurt/G21.png',
        'img/enemies/enemies_boss/boss_hurt/G22.png',
        'img/enemies/enemies_boss/boss_hurt/G23.png',
		'img/enemies/enemies_boss/boss_hurt/G24.png'
    ];

    IMAGES_ATTACK = [
        'img/enemies/enemies_boss/boss_attack/G13.png',
        'img/enemies/enemies_boss/boss_attack/G14.png',
        'img/enemies/enemies_boss/boss_attack/G15.png',
        'img/enemies/enemies_boss/boss_attack/G16.png',
        'img/enemies/enemies_boss/boss_attack/G17.png',
        'img/enemies/enemies_boss/boss_attack/G18.png',
        'img/enemies/enemies_boss/boss_attack/G19.png',
        'img/enemies/enemies_boss/boss_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/enemies/enemies_boss/boss_dead/G24.png',
        'img/enemies/enemies_boss/boss_dead/G25.png',
        'img/enemies/enemies_boss/boss_dead/G26.png'
    ];

    constructor() {
        super().loadImage('img/enemies/enemies_boss/boss_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5000;
        this.speed = 18;
        this.offset = { top: 60, right: 20, bottom: 90, left: 20 };
        this.animationIntervals = [];
        this.animate();
    }


    animate() {
        const animationInterval = setInterval(() => {
            if (this.shouldStartAlert()) {
                this.startAlertAnimation(animationInterval);
            }
        }, 120);
        this.animationIntervals.push(animationInterval);

        addInterval(animationInterval);
    }


    shouldStartAlert() {
        return world && world.character.x > 4500 && !this.hadFirstContact;
    }

    startAlertAnimation(interval) {
        if (!this.alertAnimationPlayed) {
            this.alertAnimationInterval = this.startAnimationInterval(this.IMAGES_ALERT, 275, () => {
                clearInterval(this.alertAnimationInterval);
                this.alertAnimationPlayed = true;
                setTimeout(() => {
                    this.hadFirstContact = true;
                    this.startWalking();
                }, 1000);
            });
            clearInterval(interval);
        }
    }


    startHurtAnimation() {
        if (!this.hurtAnimationInterval) {
            this.stopMovement();
            this.hurtAnimationInterval = this.startAnimationInterval(this.IMAGES_HURT, 300, () => {
                this.resetToWalkingState();
            });
        }
    }


    startWalking() {
        const walkingInterval = setInterval(() => {
            if (this.energy > 0 && !this.isDead) {
                this.updateSpeed();
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.bossIsDead()) {
                clearInterval(walkingInterval);
            }
        }, 120);
    }


    updateSpeed() {
        if (this.energy < 60) {
            this.speed = 24 + Math.random() * 1.2;
        } else {
            this.speed;
        }
    }


    bossIsHit() {
        this.reduceEnergy();
        this.startHurtAnimation();
        this.updateHealthBar();
    }

    reduceEnergy() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }


 
    resetToWalkingState() {
        clearInterval(this.hurtAnimationInterval);
        this.hurtAnimationInterval = null;
        this.playAnimation(this.IMAGES_WALKING);
        this.resumeMovementAfterDelay(0.05);
    }


    stopMovement() {
        this.speed = 0;
    }


    resumeMovementAfterDelay(delay) {
        setTimeout(() => {
            this.speed = 16 + Math.random() * 1.2;
        }, delay * 1000);
    }

    bossIsDead() {
        if (this.energy <= 0 && !this.isDead) {
            this.isDead = true;
            this.stopAllAnimations();
            this.startDeathAnimation();
            setTimeout(() => {
                showEndScreen();
            }, 1000);
            this.clearIntervals();
        }
    }

    clearIntervals() {
        this.animationIntervals.forEach(interval => clearInterval(interval));
        this.animationIntervals = [];
        this.animationIntervals.forEach(interval => {
            const index = intervals.indexOf(interval);
            if (index !== -1) {
                intervals.splice(index, 1);
            }
        });
    }

    stopAllAnimations() {
        clearInterval(this.hurtAnimationInterval);
        this.stopMovement();
    }


    startDeathAnimation() {
        this.deathAnimationInterval = this.startAnimationInterval(this.IMAGES_DEAD, 250, () => {
            this.endDeathAnimation();
        });
    }


    endDeathAnimation() {
        clearInterval(this.deathAnimationInterval);
        this.deathAnimationInterval = null;
        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
    }


    updateHealthBar() {
        world.endbossHealthbar.setPercentage(this.energy);
    }


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