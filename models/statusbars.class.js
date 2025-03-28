

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


class EndbossHealthbar extends DrawableObject {
    IMAGES_BOSS_HEALTH = [
        'img/statusbar/status_boss/0.png',
		'img/statusbar/status_boss/10.png',
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
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.bossEnergy);
    }

findBossIndexPerc(percentage) {
        if (percentage >= 100) {
            return 6;
        } else if (percentage >= 80) {
            return 5;
        } else if (percentage >= 60) {
            return 4;
        } else if (percentage >= 40) {
            return 3;
        } else if (percentage >= 20) {
            return 2;
        } else if (percentage > 0) {
            return 1;
        } else { 
			return 0;
		}	
    }


    setPercentage(bossEnergy) {
        this.bossEnergy = bossEnergy;
        let percentage = (this.bossEnergy / 100) * 100;
        let path = this.IMAGES_BOSS_HEALTH[this.findBossIndexPerc(percentage)];
        this.img = this.imageCache[path];
    }
}

MAX_BOTTLES = 20;
class BottleBar extends DrawableObject {

    IMAGES_BOTTLES = [
        'img/statusbar/status_salsa/0.png',
        'img/statusbar/status_salsa/20.png',
        'img/statusbar/status_salsa/40.png',
        'img/statusbar/status_salsa/60.png',
        'img/statusbar/status_salsa/80.png',
        'img/statusbar/status_salsa/100.png'
    ];

    collectedBottles = 0;

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

const MAX_COINS = 20;

class CoinBar extends DrawableObject {
    IMAGES_COINS = [
        'img/statusbar/status_coin/0.png',
        'img/statusbar/status_coin/20.png',
        'img/statusbar/status_coin/40.png',
        'img/statusbar/status_coin/60.png',
        'img/statusbar/status_coin/80.png',
        'img/statusbar/status_coin/100.png'
    ];

    collectedCoins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 15;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCollectedCoins(0);
    }

    setCollectedCoins(count) {
        this.collectedCoins = count;
        let percentage = (this.collectedCoins / MAX_COINS) * 100;
        let path = this.IMAGES_COINS[this.findIndexPerc(percentage)];
        this.img = this.imageCache[path];
    }
}