export default class Medikit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 12;        // radius of medikit
    this.amount = 30;   // amount of health it restores
  }

  isPicked(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    return dx * dx + dy * dy < (this.r + player.r) ** 2;
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.translate(this.x - camera.x, this.y - camera.y);

    // Draw medikit as a red box with white cross
    ctx.fillStyle = "#f00";
    ctx.fillRect(-this.r, -this.r, this.r * 2, this.r * 2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;

    // vertical line
    ctx.beginPath();
    ctx.moveTo(0, -this.r + 2);
    ctx.lineTo(0, this.r - 2);
    ctx.stroke();
    // horizontal line
    ctx.beginPath();
    ctx.moveTo(-this.r + 2, 0);
    ctx.lineTo(this.r - 2, 0);
    ctx.stroke();

    ctx.restore();
  }
}
