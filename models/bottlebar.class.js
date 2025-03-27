	MAX_BOTTLES = 2;
	collectedBottles = 0;

class BottleBar extends DrawableObject {


    IMAGES_BOTTLES = [
        'img/statusbar/status_salsa/0.png',
        'img/statusbar/status_salsa/20.png',
        'img/statusbar/status_salsa/40.png',
        'img/statusbar/status_salsa/60.png',
        'img/statusbar/status_salsa/80.png',
        'img/statusbar/status_salsa/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 15;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setCollectedBottles(0);
    }

    
   
    setCollectedBottles(count) {
        this.collectedBottles = count;
        let percentage = (this.collectedBottles / MAX_BOTTLES) * 100;
        let path = this.IMAGES_BOTTLES[this.findIndexPerc(percentage)];
        this.img = this.imageCache[path];
    }
}