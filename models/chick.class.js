
class Chick extends MoveableObject {
    y = 350;
    height = 70;
    width = 65;
    energy = 1;

    IMAGES_WALKING = [
        'img/enemies/enemies_chick/1_w.png',
        'img/enemies/enemies_chick/2_w.png',
        'img/enemies/enemies_chick/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/enemies/enemies_chick/dead.png'
    ];


    constructor(x) {
        super().loadImage('img/enemies/enemies_chick/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.25;
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


    playDeathAnimation() {
        this.stopIntervals();
        this.playAnimation(this.IMAGES_DEAD);
    }
}