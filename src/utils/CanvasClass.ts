class CanvasClass {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = 5000;
    this.canvas.height = 5000;

    this.ctx = this.canvas.getContext("2d")!;
    this.clear();

    this.img = new Image();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  scale(w: number, h: number) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.clear();
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.img!, 0, 0, this.canvas.width, this.canvas.height);
  }

  loadImage(img: HTMLImageElement) {
    this.img = img;
    this.scale(this.img.width, this.img.height);
    return [this.img.width, this.img.height];
  }

  saveImage(imageType: string, quality: number = 1.0) {
    return this.canvas.toDataURL(imageType, quality);
  }
}

export default CanvasClass;
