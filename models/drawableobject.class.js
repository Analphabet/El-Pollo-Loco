class DrawableObject {
  x = 120;
  y = 365;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * Loads an image from the given path and assigns it to the object's 'img' property.
   * @function
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images and stores them in the image cache.
   * @function
   * @param {string[]} array - An array of image paths to load.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas context.
   * @function
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {}
  }
