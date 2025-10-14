export default class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.r = 5;
    this.speed = 12;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.translate(this.x - camera.x, this.y - camera.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
}
