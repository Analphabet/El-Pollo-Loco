class Level {
    enemies;
    clouds;
    backgroundObjects;

    constructor(enemies, clouds, bgObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = bgObjects;
    }
}

function initLevel() {

    level1 = new Level(
        [
            new Chicken(100, 275),
            new Chicken(3000, 275),
			])
}