class EndbossHealthbar extends DrawableObject {
    IMAGES_BOSS_HEALTH = [
        'img/statusbar/status_boss/0.png',
        'img/statusbar/status_boss/20.png',
        'img/statusbar/status_boss/40.png',
        'img/statusbar/status_boss/60.png',
        'img/statusbar/status_boss/80.png',
        'img/statusbar/status_boss/100.png',
    ];

    bossEnergy = 100;

    constructor() {
        super();
        this.id = EndbossHealthbar.counter;
        this.loadImages(this.IMAGES_BOSS_HEALTH);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.bossEnergy);
    }


    setPercentage(bossEnergy) {
        this.bossEnergy = bossEnergy;
        let percentage = (this.bossEnergy / 100) * 100;
        let path = this.IMAGES_BOSS_HEALTH[this.findIndexPerc(percentage)];
        this.img = this.imageCache[path];
    }
}