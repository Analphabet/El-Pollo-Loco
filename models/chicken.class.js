
class Chicken extends MoveableObject {
	multiplier = Math.random() * 25;
    width = 70;
    energy = 1;

    IMAGES_WALKING = [
        'img/enemies/enemies_chicken/chicken_walk/1_w.png',
        'img/enemies/enemies_chicken/chicken_walk/2_w.png',
        'img/enemies/enemies_chicken/chicken_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/enemies/enemies_chicken/chicken_dead/dead.png'
    ];

    death_sound = new Audio('sound/chicken-bawk-hurt.mp3');

    constructor(x) {
        super().loadImage('img/enemies/enemies_chicken/chicken_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 1.8 + Math.random() * 1.5;
		this.height = 70 + this.multiplier;
		this.y = 360 - this.multiplier;
        this.movementInterval = null;
        this.animationInterval = null;
        this.animate();
        this.offset = {
            top: 5,
            right: 5,
            bottom: -55,
            left: 5
        };
    }


    animate() {
        this.movementInterval = setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }


    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }


    triggerDeathAnimation() {
        this.stopIntervals();
        this.playAnimation(this.IMAGES_DEAD);
        this.death_sound.play();
    }
}