
class Cloud extends MoveableObject {
    y = 25;
    width = 400;
    height = 250;

    constructor() {
        super().loadImage('img/layers_bg/third_layer/clouds1.png');
        this.x = 0 + Math.random() * 5500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < 0) {
                this.x = window.innerWidth + 3000;
            }
        }, 1000 / 60);
    }
}