export default class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.speed = 1 + Math.random();
  }

  update(player) {
    const dx = player.x - this.x,
      dy = player.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 0) {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
  }

  isHit(bullet) {
    return Math.hypot(this.x - bullet.x, this.y - bullet.y) < this.r;
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.translate(this.x - camera.x, this.y - camera.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "lime";
    ctx.shadowColor = "lime";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();
  }
}
