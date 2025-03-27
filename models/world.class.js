
class World {

 character = new Character();
 statusBar = new Statusbar();
 enemies = [
	new Chicken(),
	new Chicken(),
];

 clouds = [new Cloud()
 ];
 backgroundObjects = [
	new BackgroundObject('img/layers_bg/air.png', 0),
            new BackgroundObject('img/layers_bg/third_layer/1.png', 0),
            new BackgroundObject('img/layers_bg/second_layer/1.png', 0),
            new BackgroundObject('img/layers_bg/first_layer/1.png', 0),
 ]
 canvas;
 ctx;
 keyboard;
 camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
  }

   draw() {
 this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
 this.addObjectsToMap(this.backgroundObjects);
 this.addToMap(this.character);
 this.addObjectsToMap(this.enemies);
 this.addObjectsToMap(this.clouds);
 
 let self = this;
 requestAnimationFrame(function() {
	 self.draw();
 });
}


    draw() {
        if (!gameActive) return;
        this.clearCanvas();
        this.drawBackground();
        this.drawMainCharacter();
        this.drawGameObjects();
        this.drawUI();
        requestAnimationFrameId = requestAnimationFrame(() => this.draw());
    }

  
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

  
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

  
    drawMainCharacter() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

   
    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.updateEndbossHealthbarVisibility();
        if (this.showEndbossHealthbar) {
            this.addToMap(this.endbossHealthbar);
        }
    }

    
    

    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

   
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

  
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

   
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

   
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
 
}
