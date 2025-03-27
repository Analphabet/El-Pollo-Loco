

class Level {
    enemies;
    clouds;
	coins;
    backgroundObjects;
    level_end_x = 4000;

    constructor(enemies, clouds, bgObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
		this.coins = coins;
        this.backgroundObjects = bgObjects;
       }
}