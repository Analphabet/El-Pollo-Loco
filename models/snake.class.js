
class Snake extends MoveableObject {
  y = 370;
  height = 50;
  width = 90;
  energy = 1;

  IMAGES_ATTACKING = [
    "img/enemies/enemies_snake/snake_attack/Barrel snake1 transparent.png",
    "img/enemies/enemies_snake/snake_attack/Barrel snake2 transparent.png",
    "img/enemies/enemies_snake/snake_attack/Barrel snake3 transparent.png",
    "img/enemies/enemies_snake/snake_attack/Barrel snake4 transparent.png",
    "img/enemies/enemies_snake/snake_attack/Barrel snake5 transparent.png",
    "img/enemies/enemies_snake/snake_attack/Barrel snake6 transparent.png",
    "img/enemies/enemies_snake/snake_attack/Barrel snake7 transparent.png",
  ];

  IMAGES_DEAD = ["img/enemies/enemies_snake/snake_dead/snake_dead.png"];
  constructor(x) {
    super().loadImage(
      "img/enemies/enemies_snake/snake_attack/Barrel snake1 transparent.png"
    );
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.speed = 0;
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
                this.playAnimation(this.IMAGES_ATTACKING);
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