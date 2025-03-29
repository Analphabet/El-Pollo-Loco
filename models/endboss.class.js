 // Define background music variable
 let backgroundMusic = new Audio('sound/optimistic-latin-spanish-fiesta-siesta.mp3'); // Initial music


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

IMAGES_HURT = [
        'img/enemies/enemies_boss/boss_hurt/G21.png',
        'img/enemies/enemies_boss/boss_hurt/G22.png',
        'img/enemies/enemies_boss/boss_hurt/G23.png',
		'img/enemies/enemies_boss/boss_hurt/G24.png'
    ];

    IMAGES_DEAD = [
        'img/enemies/enemies_boss/boss_dead/G24.png',
        'img/enemies/enemies_boss/boss_dead/G25.png',
        'img/enemies/enemies_boss/boss_dead/G26.png',
    ];

    alert_sound = new Audio('sound/rooster-cry-chicken.mp3');
    hurt_sound = new Audio('sound/chicken-noise-196746.mp3');
    dead_sound = new Audio('sound/chicken-single-alarm-call-6056.mp3');

    constructor() {
        super().loadImage('img/enemies/enemies_boss/boss_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5000;
        this.speed = isEasyMode ? 25 : 40; // 20 für Easy, 40 für Normal
        this.offset = { top: 60, right: 20, bottom: 90, left: 20 };
        this.animationIntervals = [];
        this.animate();
    }



    animate() {
        const animationInterval = setInterval(() => {
            if (this.shouldStartAlert()) {
                this.startAlertAnimation(animationInterval);
            }
        }, 50);
        this.animationIntervals.push(animationInterval);

        addInterval(animationInterval);
    }


    shouldStartAlert() {
        return world && world.character.x > 4500 && !this.hadFirstContact;
    }


    startAlertAnimation(interval) {
        if (!this.alertAnimationPlayed) {
            this.alert_sound.play();
            this.alertAnimationInterval = this.startAnimationInterval(this.IMAGES_ALERT, 275, () => {
                clearInterval(this.alertAnimationInterval);
                this.alertAnimationPlayed = true;
                setTimeout(() => {
                    this.hadFirstContact = true;
                    this.startWalking();
					this.handleFirstContact(); // Handle background music change

                }, 1000);
            });
            clearInterval(interval);
        }
    }

   handleFirstContact() {
    // Stop the current background music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reset audio to the start

    // Check if the game is not muted
    if (!isGameMuted && !backgroundMusicMuted) {
        // Switch to the western theme music
        bossMusic = new Audio('sound/western-theme-162884.mp3');
        bossMusic.volume = 0.2; // Set volume if necessary
        bossMusic.play(); // Play the new music
        bossMusic.loop = true;
    }
}


    startHurtAnimation() {
        if (!this.hurtAnimationInterval) {
            this.stopMovement();
            this.hurt_sound.play();
            this.hurtAnimationInterval = this.startAnimationInterval(this.IMAGES_HURT, 300, () => {
                this.resetToWalkingState();
            });
        }
    }


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


    updateBossSpeed() {
        // Anpassung der Geschwindigkeit basierend auf dem Schwierigkeitsgrad
        if (this.energy < 60 && isEasyMode) {
            this.speed = 35 + Math.random(); 
        } else if (this.energy < 60) {
            this.speed = 50 + Math.random() * 1.15; // Normaler Modus, höhere Geschwindigkeit bei geringem Leben
        } else if (!isEasyMode) {
            this.speed = 40; // Standard-Geschwindigkeit im normalen Modus
        } else {
			this.speed = 25;
		}
    }

    bossIsHit() {
        this.reduceEnergy();
        this.startHurtAnimation();
        this.updateHealthBar();
    }

      reduceEnergy() {
        const damage = isEasyMode ? 20 : 10; // Schaden je nach Modus
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.updateHealthBar(); // Healthbar aktualisieren nach Schaden
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
            this.speed = 35 + Math.random() * 1.2;
        }, delay * 1000);
    }


    bossIsDead() {
        if (this.energy <= 0 && !this.isDead) {
            this.isDead = true;
            this.stopAllAnimations();
            this.dead_sound.play();
            this.startDeathAnimation();
            setTimeout(() => {
                showEndScreen();
            }, 1500);
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


isEasyMode = false; // Standardmäßig auf Normalmodus

function updateDifficultyStatus() {
    // Toggle den Schwierigkeitsgrad (zwischen Normal und Easy)    
    // Hole den Button für den Schwierigkeitsgrad
    let difficultyToggleButton = document.getElementById('toggle-boss-difficulty-button');
    
    // Ändere den Text des Buttons basierend auf dem aktuellen Schwierigkeitsgrad
    if (isEasyMode) {
        difficultyToggleButton.innerText = 'Boss: Easy'; // Wenn Easy aktiviert ist
    } else {
        difficultyToggleButton.innerText = 'Boss: Normal'; // Wenn Normal aktiviert ist
    }
}


 function toggleDifficulty() {
    isEasyMode = !isEasyMode; // Toggle zwischen Easy und Normal
    updateDifficultyStatus();
}