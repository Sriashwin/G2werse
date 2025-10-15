import React, { useRef, useEffect } from "react";
import Player from "./Player";
import Zombie from "./Zombie";
import Bullet from "./Bullet";
import Ammo from "./Ammo";

const CANVAS_W = 800;
const CANVAS_H = 600;
const MAP_W = 2000;
const MAP_H = 2000;

export default function GameCanvas({ running, setRunning, setScore, setTimer, ammo, setAmmo, setGameOver }) {
  const canvasRef = useRef(null);
  const keys = useRef({});
  const playerRef = useRef(new Player(MAP_W / 2, MAP_H / 2));
  const zombiesRef = useRef([]);
  const bulletsRef = useRef([]);
  const ammoLootRef = useRef([]);
  const requestRef = useRef(null);
  const timerIntRef = useRef(null);
  const spawnIntRef = useRef(null);
  const lootSpawnIntRef = useRef(null);
  const shootIntervalRef = useRef(null);
  const isShooting = useRef(false);
  const ammoRef = useRef(ammo);
  const camera = useRef({ x: 0, y: 0 });

  // Sync ammoRef
  useEffect(() => { ammoRef.current = ammo; }, [ammo]);

  // Keyboard
  useEffect(() => {
    const onKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true);
    const onKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Mouse aiming & shooting
  useEffect(() => {
    const canvas = canvasRef.current;

    const shootBullet = () => {
      if (ammoRef.current > 0) {
        bulletsRef.current.push(
          new Bullet(playerRef.current.x, playerRef.current.y, playerRef.current.angle)
        );
        setAmmo((a) => Math.max(0, a - 1));
      }
    };

    const startShooting = (e) => {
      if (e.button !== 0 || ammoRef.current <= 0 || isShooting.current) return;
      isShooting.current = true;
      shootBullet();
      shootIntervalRef.current = setInterval(() => {
        if (ammoRef.current <= 0) {
          clearInterval(shootIntervalRef.current);
          isShooting.current = false;
          return;
        }
        shootBullet();
      }, 80);
    };

    const stopShooting = (e) => {
      if (e.button !== 0) return;
      clearInterval(shootIntervalRef.current);
      isShooting.current = false;
    };

    const updateAiming = (e) => {
      const rect = canvas.getBoundingClientRect();
      playerRef.current.angle = Math.atan2(
        e.clientY - rect.top - (playerRef.current.y - camera.current.y),
        e.clientX - rect.left - (playerRef.current.x - camera.current.x)
      );
    };

    window.addEventListener("mousedown", startShooting);
    window.addEventListener("mouseup", stopShooting);
    canvas.addEventListener("mousemove", updateAiming);

    return () => {
      window.removeEventListener("mousedown", startShooting);
      window.removeEventListener("mouseup", stopShooting);
      canvas.removeEventListener("mousemove", updateAiming);
      clearInterval(shootIntervalRef.current);
      isShooting.current = false;
    };
  }, [setAmmo]);

  // Game loop
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Reset game state
    if (running) {
      setScore(0);
      setTimer(60);
      setAmmo(50);
      zombiesRef.current = [];
      bulletsRef.current = [];
      ammoLootRef.current = [];
      playerRef.current = new Player(MAP_W / 2, MAP_H / 2);
      playerRef.current.health = 100;
      setGameOver(false);
    }

    // Timer
    timerIntRef.current = setInterval(() => {
      if (!running) return;
      setTimer((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);

    // Spawn zombies
    spawnIntRef.current = setInterval(() => {
      if (!running || zombiesRef.current.length >= 40) return;
      zombiesRef.current.push(new Zombie(Math.random() * MAP_W, Math.random() * MAP_H));
    }, 900);

    // Spawn ammo
    lootSpawnIntRef.current = setInterval(() => {
      if (!running || ammoLootRef.current.length >= 10) return;
      ammoLootRef.current.push(new Ammo(Math.random() * MAP_W, Math.random() * MAP_H));
    }, 8000);

    function loop() {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Player death flag
      const dead = playerRef.current.isDead();

      if (!running && !dead) {
        ctx.fillStyle = "#fff";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Click Start to Play", CANVAS_W / 2, CANVAS_H / 2);
        drawBoundary(ctx); // draw boundary even in idle state
        requestRef.current = requestAnimationFrame(loop);
        return;
      }

      // Player & camera
      playerRef.current.update(keys.current, MAP_W, MAP_H);
      camera.current.x = Math.min(Math.max(0, playerRef.current.x - CANVAS_W / 2), MAP_W - CANVAS_W);
      camera.current.y = Math.min(Math.max(0, playerRef.current.y - CANVAS_H / 2), MAP_H - CANVAS_H);

      // Bullets
      bulletsRef.current.forEach((b) => b.update());
      bulletsRef.current = bulletsRef.current.filter((b) => b.x > 0 && b.x < MAP_W && b.y > 0 && b.y < MAP_H);

      // Zombies
      zombiesRef.current.forEach((z) => z.update(playerRef.current));

      // Ammo pickup
      ammoLootRef.current = ammoLootRef.current.filter((loot) => {
        if (loot.isPicked(playerRef.current)) {
          setAmmo((a) => a + loot.amount);
          return false;
        }
        return true;
      });

      // Bullets vs zombies
      bulletsRef.current.forEach((b, bi) => {
        zombiesRef.current.forEach((z, zi) => {
          if (z.isHit(b)) {
            zombiesRef.current.splice(zi, 1);
            bulletsRef.current.splice(bi, 1);
            setScore((s) => s + 1);
          }
        });
      });

      // Player vs zombies
      zombiesRef.current.forEach((z) => {
        const dx = z.x - playerRef.current.x;
        const dy = z.y - playerRef.current.y;
        if (dx * dx + dy * dy < (z.r + playerRef.current.r) ** 2) {
          playerRef.current.takeDamage(0.5);
        }
      });

      // Draw entities
      playerRef.current.draw(ctx, camera.current);
      bulletsRef.current.forEach((b) => b.draw(ctx, camera.current));
      zombiesRef.current.forEach((z) => z.draw(ctx, camera.current));
      ammoLootRef.current.forEach((a) => a.draw(ctx, camera.current));

      // Always draw boundary on top
      drawBoundary(ctx);

      // Player death handling
      if (dead) {
        setRunning(false);
        setGameOver(true);
        ctx.fillStyle = "red";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2);
        return;
      }

      requestRef.current = requestAnimationFrame(loop);
    }

    // Draw boundary as a separate function
    function drawBoundary(ctx) {
      ctx.save();
      ctx.strokeStyle = "#00f";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#00f";
      ctx.shadowBlur = 16;
      ctx.strokeRect(2, 2, CANVAS_W - 4, CANVAS_H - 4);
      ctx.restore();
    }

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(timerIntRef.current);
      clearInterval(spawnIntRef.current);
      clearInterval(lootSpawnIntRef.current);
      clearInterval(shootIntervalRef.current);
      isShooting.current = false;
    };
  }, [running, setRunning, setScore, setTimer, setAmmo, setGameOver]);

  return <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} id="gameCanvas" />;
}
