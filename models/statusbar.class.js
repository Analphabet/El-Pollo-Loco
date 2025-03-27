class Statusbar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/statusbar/status_health/0.png',
        'img/statusbar/status_health/20.png',
        'img/statusbar/status_health/40.png',
        'img/statusbar/status_health/60.png',
        'img/statusbar/status_health/80.png',
        'img/statusbar/status_health/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 15;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.findIndexPerc(this.percentage)];
        this.img = this.imageCache[path];
    }
}