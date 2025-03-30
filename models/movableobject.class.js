class MoveableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHitTime = 0;
  hitCooldown = 250;

  /**
   * Applies gravity to the moveable object, causing it to fall or move upwards.
   * @function
   */

  applyGravity() {
    setInterval(() => {
      if (this.handleAboveGround() || this.speedY > 0) this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 40);
  }

  /**
   * Checks if the moveable object is above the ground or falling.
   * @function
   * @returns {boolean} True if above the ground, otherwise false.
   */
  handleAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      if (this instanceof Character && this.y > 150) {
        // Keeping Pepe above the ground
        this.y = 150;
      }
      return this.y < 150;
    }
  }

  /**
   * Moves the moveable object to the right.
   * @function
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the moveable object to the left.
   * @function
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the moveable object jump.
   * @function
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the moveable object is colliding with another moveable object.
   * @function
   * @param {MoveableObject} mo - The other moveable object to check collision with.
   * @returns {boolean} True if colliding, otherwise false.
   */
  handleCollision(mo) {
    return (
      this.x + this.width + 20 - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height + 20 - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - 20 - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - 20 - mo.offset.bottom
    );
  }

  /**
   * Handles the hit event on the moveable object, reducing its energy.
   * @function
   */
  hit() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastHitTime > this.hitCooldown) {
      this.lastHitTime = currentTime;
      this.energy -= 10;

      if (this.energy < 0) {
        this.energy = 0;
      }
    }
  }

  /**
   * Checks if the moveable object is hurt based on the hit cooldown.
   * @function
   * @returns {boolean} True if hurt, otherwise false.
   */
  isHurt() {
    const timePassed = (Date.now() - this.lastHitTime) / 1000; // Time in seconds
    return timePassed < 1;
  }

  /**
   * Checks if the moveable object is dead based on energy.
   * @function
   * @returns {boolean} True if dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays an animation on the moveable object by updating its image.
   * @function
   * @param {string[]} images - An array of image paths to use for animation.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
