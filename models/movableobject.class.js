class MoveableObject extends DrawableObject {
    speed = 0.5;
    otherDirection = false;
	
  moveRight() {
    this.x += this.speed;
  }

 
  moveLeft() {
    this.x -= this.speed;
  }
  
   playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
  }