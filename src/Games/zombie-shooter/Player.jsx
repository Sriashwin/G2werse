export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 18;
    this.speed = 4;
    this.angle = 0;
  }

  update(keys, maxW, maxH) {
    if (keys["w"]) this.y -= this.speed;
    if (keys["s"]) this.y += this.speed;
    if (keys["a"]) this.x -= this.speed;
    if (keys["d"]) this.x += this.speed;
    this.x = Math.max(this.r, Math.min(maxW - this.r, this.x));
    this.y = Math.max(this.r, Math.min(maxH - this.r, this.y));
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.translate(this.x - camera.x, this.y - camera.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#00f";
    ctx.shadowColor = "#00f";
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.restore();
  }
}
