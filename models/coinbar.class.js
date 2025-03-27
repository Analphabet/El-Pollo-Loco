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