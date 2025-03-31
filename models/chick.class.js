/**
 * Class representing a small chicken character in the game.
 * @extends MoveableObject
 */

class Chick extends MoveableObject {
  y = 365;
  height = 55;
  width = 55;
  energy = 1;

  IMAGES_WALKING = [
    "img/enemies/enemies_chick/1_w.png",
    "img/enemies/enemies_chick/2_w.png",
    "img/enemies/enemies_chick/3_w.png",
  ];

  IMAGES_DEAD = ["img/enemies/enemies_chick/dead.png"];

  death_sound = new Audio("sound/chick-hurt.mp3");

  constructor(x) {
    super().loadImage("img/enemies/enemies_chick/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.speed = 0.2 + Math.random() * 0.25;
    this.movementInterval = null;
    this.animationInterval = null;
    this.animate();
    this.offset = {
      top: 5,
      right: 0,
      bottom: -55,
      left: 30,
    };
  }

  /**
   * Initiates intervals for small chicken movement and animation.
   */
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

  /**
   * Stops the small chickens movement and animation intervals.
   */
  stopIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  /**
   * Initiates the death animation for the small chicken.
   * Stops movement and plays the death animation and sound.
   */
  triggerDeathAnimation() {
    this.stopIntervals();
    this.playAnimation(this.IMAGES_DEAD);
    this.death_sound.play().catch(error => {});
  }
}
