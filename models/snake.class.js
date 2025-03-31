/**
 * Class representing a snake character in the game.
 * @extends MoveableObject
 */

class Snake extends MoveableObject {
  y = 370;
  height = 50;
  width = 90;
  energy = 1;

  IMAGES_ATTACKING = [
    "img/enemies/enemies_snake/snake_attack/snake1.png",
    "img/enemies/enemies_snake/snake_attack/snake2.png",
    "img/enemies/enemies_snake/snake_attack/snake3.png",
    "img/enemies/enemies_snake/snake_attack/snake4.png",
    "img/enemies/enemies_snake/snake_attack/snake5.png",
    "img/enemies/enemies_snake/snake_attack/snake6.png",
    "img/enemies/enemies_snake/snake_attack/snake7.png",
  ];

  IMAGES_DEAD = ["img/enemies/enemies_snake/snake_dead/snake_dead.png"];

  death_sound = new Audio("sound/snake-hiss.mp3");

  constructor(x) {
    super().loadImage(
      "img/enemies/enemies_snake/snake_attack/snake1.png"
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
      right: -5,
      bottom: -50,
      left: 15,
    };
  }

  /**
   * Initiates intervals for snake movement and animation.
   */
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

  /**
   * Stops the snakes movement and animation intervals.
   */
  stopIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  /**
   * Initiates the death animation for the snake.
   * Stops movement and plays the death animation and sound.
   */
  triggerDeathAnimation() {
    this.stopIntervals();
    this.playAnimation(this.IMAGES_DEAD);
    this.death_sound.play().catch(error => {});
  }
}
