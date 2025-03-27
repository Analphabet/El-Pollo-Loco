class Character {
  y = 100;
  height = 200;
  width = 100;

  IMAGES_WALKING = [
    "img/pepe/pepe_walk/W-21.png",
    "img/pepe/pepe_walk/W-22.png",
    "img/pepe/pepe_walk/W-23.png",
    "img/pepe/pepe_walk/W-24.png",
    "img/pepe/pepe_walk/W-25.png",
    "img/pepe/pepe_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/pepe/pepe_jump/J-31.png",
    "img/pepe/pepe_jump/J-32.png",
    "img/pepe/pepe_jump/J-33.png",
    "img/pepe/pepe_jump/J-34.png",
    "img/pepe/pepe_jump/J-35.png",
    "img/pepe/pepe_jump/J-36.png",
    "img/pepe/pepe_jump/J-37.png",
    "img/pepe/pepe_jump/J-38.png",
    "img/pepe/pepe_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/pepe/pepe_dead/D-51.png",
    "img/pepe/pepe_dead/D-52.png",
    "img/pepe/pepe_dead/D-53.png",
    "img/pepe/pepe_dead/D-54.png",
    "img/pepe/pepe_dead/D-55.png",
    "img/pepe/pepe_dead/D-56.png",
    "img/pepe/pepe_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/pepe/pepe_hurt/H-41.png",
    "img/pepe/pepe_hurt/H-42.png",
    "img/pepe/pepe_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/pepe/pepe_idle/idle/I-1.png",
    "img/pepe/pepe_idle/idle/I-2.png",
    "img/pepe/pepe_idle/idle/I-3.png",
    "img/pepe/pepe_idle/idle/I-4.png",
    "img/pepe/pepe_idle/idle/I-5.png",
    "img/pepe/pepe_idle/idle/I-6.png",
    "img/pepe/pepe_idle/idle/I-7.png",
    "img/pepe/pepe_idle/idle/I-8.png",
    "img/pepe/pepe_idle/idle/I-9.png",
    "img/pepe/pepe_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/pepe/pepe_idle/long_idle/I-11.png",
    "img/pepe/pepe_idle/long_idle/I-12.png",
    "img/pepe/pepe_idle/long_idle/I-13.png",
    "img/pepe/pepe_idle/long_idle/I-14.png",
    "img/pepe/pepe_idle/long_idle/I-15.png",
    "img/pepe/pepe_idle/long_idle/I-16.png",
    "img/pepe/pepe_idle/long_idle/I-17.png",
    "img/pepe/pepe_idle/long_idle/I-18.png",
    "img/pepe/pepe_idle/long_idle/I-19.png",
    "img/pepe/pepe_idle/long_idle/I-20.png",
  ];

  constructor() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
  this.animate();
  }

  
 
  animate() {
    intervals.push(
      setInterval(() => {
        this.animatePepe();
      }, 1000 / 60)
    );

    intervals.push(
      setInterval(() => {
        this.animatePepeState();
      }, 90)
    );
  }

 
  animatePepe() {
    this.pepeWalking();
  }

  
  

  pepeWalking() {
    if (this.world.keyboard.RIGHT) {
      this.moveRight();
      this.otherDirection = false;
      }
    
    if (this.world.keyboard.LEFT) {
      this.moveLeft();
      this.otherDirection = true;
      }
    }
	
	  pepeJumping() {
        if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
            this.jump();
            this.idleTimer = 0;
        }
    }

    positionCamera() {
        this.world.camera_x = -this.x + 100;
    }
}