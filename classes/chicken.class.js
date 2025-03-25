class Chicken  {
  width = 70;
  energy = 1;

  IMAGES_WALKING = [
    "img/enemies/enemies_chicken/chicken_walk/1_w.png",
    "img/enemies/enemies_chicken/chicken_walk/2_w.png",
    "img/enemies/enemies_chicken/chicken_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/enemies/enemies_chicken/chicken_dead/dead.png"];

  death_sound = new Audio("sound/chicken-bawk-hurt.mp3");

  constructor(x) {
    super().loadImage("img/enemies/enemies_chicken/chicken_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
  }
}