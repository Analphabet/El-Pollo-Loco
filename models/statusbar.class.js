class Statusbar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/statusbar/status_health/0.png',
        'img/statusbar/status_health/20.png',
        'img/statusbar/status_health/40.png',
        'img/statusbar/status_health/60.png',
        'img/statusbar/status_health/80.png',
        'img/statusbar/status_health/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 10;
        this.y = 0;
        this.width = 100;
        this.height = 50;
	}
}