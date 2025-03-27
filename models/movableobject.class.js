class MoveableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHitTime = 0;
    hitCooldown = 250;



    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 40);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            if(this instanceof Character && this.y > 150){ // Keeping Pepe above the ground
                this.y = 150;
            }
            return this.y < 150;  
        }
    }

    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }


    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }


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

 hitTimeout() {
        
            this.energy -= 100;

            if (this.energy < 0) {
                this.energy = 0;
            }
        }


    isHurt() {
        const timePassed = (Date.now() - this.lastHitTime) / 1000;  // Time in seconds
        return timePassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        const i = this.currentImage % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}