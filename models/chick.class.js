class Chick {
  y = 300;
  height = 50;
  width = 50;
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
  
  }
}