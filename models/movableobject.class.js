class MoveableObject extends DrawableObject {
    speed = 0.5;
    otherDirection = false;
    energy = 100;
	
  moveRight() {
    this.x += this.speed;
  }

 
  moveLeft() {
    this.x -= this.speed;
  }
  
   jump() {
        this.speedY = 30;
    }
  
   playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
	
	 isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }
  }