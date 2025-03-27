
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    endboss;
    level_end_x = 4809;

    constructor(enemies, clouds, bgObjects, coins, bottles, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = bgObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}