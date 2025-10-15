export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 18;
    this.speed = 4;
    this.angle = 0;
    this.health = 100; // Player health
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
  }

  isDead() {
    return this.health <= 0;
  }

  update(keys, maxW, maxH) {
    let dx = 0, dy = 0;
    if (keys["w"]) dy -= 1;
    if (keys["s"]) dy += 1;
    if (keys["a"]) dx -= 1;
    if (keys["d"]) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy);
      this.x += (dx / len) * this.speed;
      this.y += (dy / len) * this.speed;
    }

    this.x = Math.max(this.r, Math.min(maxW - this.r, this.x));
    this.y = Math.max(this.r, Math.min(maxH - this.r, this.y));
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.translate(this.x - camera.x, this.y - camera.y);

    // Draw gun line first
    const gunLength = this.r + 15; // length of gun
    ctx.strokeStyle = "#000"; // gun color
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(gunLength * Math.cos(this.angle), gunLength * Math.sin(this.angle));
    ctx.stroke();
    ctx.closePath();

    // Draw player body
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#00f";
    ctx.shadowColor = "#00f";
    ctx.shadowBlur = 14;
    ctx.fill();

    // Draw health bar above player
    ctx.fillStyle = "#f00";
    ctx.fillRect(-this.r, -this.r - 10, (this.health / 100) * this.r * 2, 5);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(-this.r, -this.r - 10, this.r * 2, 5);

    ctx.restore();
  }
}
