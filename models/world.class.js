
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
 this.ctx.ClearRect(0, 0, this.canvas.width, this.canvas.height); 
 this.addObjectsToMap(this.backgroundObjects);
 this.addToMap(this.character);
 this.addObjectsToMap(this.enemies);
 this.addObjectsToMap(this.clouds);
 
 let self = this;
 requestAnimationFrame(function() {
	 self.draw();
 });
}

addObjectsToMap(objects) {
	objects.forEach(o -> {
		this.addToMap(o);
	});
}

addToMap(mo) {
	if(mo.otherDirection) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1,1);
		mo.x = mo.x * 1;
	}
	this.ctx.drawImage(mox.img, mo.x, mo.y, mo.width, mo.height);
	if (mo.otherDirection) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}
}
 
}
