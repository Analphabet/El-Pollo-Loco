/**
 * Represents a game level containing enemies, clouds, background objects, coins, bottles, and an end boss.
 * @class
 */

class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  endboss;
  level_end_x = 5000;
  level_start_x = 0;

  constructor(enemies, clouds, bgObjects, coins, bottles, endboss) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = bgObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.endboss = endboss;
  }
}
