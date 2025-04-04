/**
 * Represents a cloud object that moves across the screen.
 * Extends the MoveableObject class.
 */

class Cloud extends MoveableObject {
  y = 10;
  width = 300;
  height = 200;

  constructor() {
    super().loadImage("img/layers_bg/third_layer/clouds1.png");
    this.x = 0 + Math.random() * 2000;
    this.animate();
  }

  /**
   * Animates the cloud's movement across the screen by periodically calling the moveLeft() method.
   * If the cloud moves completely off the screen to the left, it repositions it to the far right.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.x + this.width < 0) {
        this.x = window.innerWidth + 3000;
      }
    }, 1000 / 60);
  }
}
