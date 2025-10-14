export default class Ammo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 12;
    this.amount = 50;
  }

  isPicked(player) {
    return Math.hypot(this.x - player.x, this.y - player.y) < this.r + player.r;
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.translate(this.x - camera.x, this.y - camera.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "cyan";
    ctx.shadowColor = "cyan";
    ctx.shadowBlur = 10;
    ctx.fill();

    // ammo text inside the circle
    ctx.fillStyle = "#000";
    ctx.font = "bold 14px 'Orbitron', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.amount, 0, 0);
    ctx.restore();
  }
}
