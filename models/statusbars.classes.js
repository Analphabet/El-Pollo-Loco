/**
 * Represents a health bar that displays various statuses using images based on percentage.
 * @class
 * @extends DrawableObject
 */

class Statusbar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/statusbar/status_health/0.png",
    "img/statusbar/status_health/20.png",
    "img/statusbar/status_health/40.png",
    "img/statusbar/status_health/60.png",
    "img/statusbar/status_health/80.png",
    "img/statusbar/status_health/100.png",
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

  /**
   * Sets the percentage value for the health bar and updates its displayed image accordingly.
   * @method
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.findIndexPerc(this.percentage)];
    this.img = this.imageCache[path];
  }
}

/**
 * Represents a health bar for the end boss.
 * @class
 * @extends DrawableObject
 */

class EndbossHealthbar extends DrawableObject {
  IMAGES_BOSS_HEALTH = [
    "img/statusbar/status_boss/0.png",
    "img/statusbar/status_boss/10.png",
    "img/statusbar/status_boss/20.png",
    "img/statusbar/status_boss/40.png",
    "img/statusbar/status_boss/60.png",
    "img/statusbar/status_boss/80.png",
    "img/statusbar/status_boss/100.png",
  ];

  bossEnergy = 120;

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

  /**
   * Determines the index of the boss based on the given percentage.
   * The index is assigned based on the range the percentage falls into.
   * The higher the percentage, the higher the index.
   *
   * @function findBossIndexPerc
   * @memberof Level
   * @this {Level} The current Level object containing the bosses.
   * @param {number} percentage - The current percentage value used to determine the boss index.
   *
   * @returns {number} Returns the boss index based on the given percentage:
   * - 6 for 100% or higher
   * - 5 for 80% or higher
   * - 4 for 60% or higher
   * - 3 for 40% or higher
   * - 2 for 20% or higher
   * - 1 for any positive percentage greater than 0
   * - 0 for 0% or lower
   */

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

  /**
   * Sets the boss's energy percentage and updates the health bar image accordingly.
   * @function
   * @param {number} bossEnergy - The current energy level of the end boss.
   */
  setPercentage(bossEnergy) {
    let MAX_BOSSENERGY = 120;
    this.bossEnergy = bossEnergy;
    let percentage = (this.bossEnergy / MAX_BOSSENERGY) * 100;
    let path = this.IMAGES_BOSS_HEALTH[this.findBossIndexPerc(percentage)];
    this.img = this.imageCache[path];
  }
}

/**
 * Represents a status bar for collected bottles in the game.
 * @extends DrawableObject
 */

MAX_BOTTLES = 20;
class BottleBar extends DrawableObject {
  IMAGES_BOTTLES = [
    "img/statusbar/status_salsa/0.png",
    "img/statusbar/status_salsa/20.png",
    "img/statusbar/status_salsa/40.png",
    "img/statusbar/status_salsa/60.png",
    "img/statusbar/status_salsa/80.png",
    "img/statusbar/status_salsa/100.png",
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

  /**
   * Set the number of collected bottles and update the bottle bar's image.
   * @param {number} count - The number of collected bottles.
   */
  setCollectedBottles(count) {
    this.collectedBottles = count;
    let percentage = (this.collectedBottles / MAX_BOTTLES) * 100;
    let path = this.IMAGES_BOTTLES[this.findIndexPerc(percentage)];
    this.img = this.imageCache[path];
  }
}

/**
 * The maximum number of coins that the CoinBar can display.
 */
const MAX_COINS = 20;

/**
 * Represents a graphical bar that displays the collected coins.
 * Extends the DrawableObject class.
 */
class CoinBar extends DrawableObject {
  IMAGES_COINS = [
    "img/statusbar/status_coin/0.png",
    "img/statusbar/status_coin/20.png",
    "img/statusbar/status_coin/40.png",
    "img/statusbar/status_coin/60.png",
    "img/statusbar/status_coin/80.png",
    "img/statusbar/status_coin/100.png",
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

  /**
   * Sets the number of collected coins and updates the visual representation of the coin bar.
   * @param {number} count - The number of collected coins.
   */
  setCollectedCoins(count) {
    this.collectedCoins = count;
    let percentage = (this.collectedCoins / MAX_COINS) * 100;
    let path = this.IMAGES_COINS[this.findIndexPerc(percentage)];
    this.img = this.imageCache[path];
  }
}
