

class Coin extends MoveableObject {
    IMAGES_COINS = [
        'img/coin/coin_1.png',
        'img/coin/coin_2.png'
    ];
    percentage = 100;
    animationInterval;

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.loadImage('img/coin/coin_1.png');
        this.x = x + 500;
        this.y = y * Math.random();
        this.width = 100;
        this.height = 100;
        this.offset = {
            top: 40,
            right: 40,
            bottom: 75,
            left: 40
        };
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200)
    }

    stopAnimation() {
        clearInterval(this.animationInterval);
    }
}