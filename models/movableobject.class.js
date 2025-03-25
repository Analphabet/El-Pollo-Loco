class MoveableObject extends DrawableObject {

  moveRight() {
    this.x += this.speed;
  }

 
  moveLeft() {
    this.x -= this.speed;
  }
  }