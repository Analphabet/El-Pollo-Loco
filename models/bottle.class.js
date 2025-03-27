
class Bottles extends MoveableObject {

    width = 60;
    height = 60;
    IMAGES_BOTTLE = [
        'img/salsa/1_salsa_bottle_on_ground.png',
        'img/salsa/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
        this.x = x + 450;
        this.y = y;
        };
    }
