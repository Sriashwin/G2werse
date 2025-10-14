import React, { useRef, useEffect } from "react";
import Player from "./Player";
import Zombie from "./Zombie";
import Bullet from "./Bullet";
import Ammo from "./Ammo";


const CANVAS_W = 800;
const CANVAS_H = 600;
const MAP_W = 2000;
const MAP_H = 2000;


export default function GameCanvas({ running, setScore, setTimer, ammo, setAmmo }) {
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
  const ammoRef = useRef(ammo); // Add ammoRef to track latest ammo


  const camera = useRef({ x: 0, y: 0 }); // Use useRef for camera to avoid dependency issues


  // Sync ammoRef with latest ammo state
  useEffect(() => {
    ammoRef.current = ammo;
  }, [ammo]);


  // Keyboard listeners
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


  // Mouse aiming and automated continuous shooting with ammo limit
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


    // Start shooting on mouse down (left button)
    const startShooting = (e) => {
      if (e.button !== 0) return; // Only left click
      if (ammoRef.current <= 0) return;
      if (isShooting.current) return; // Shooting already active
      isShooting.current = true;
      shootBullet(); // Immediate shot
      shootIntervalRef.current = setInterval(() => {
        if (ammoRef.current <= 0) {
          clearInterval(shootIntervalRef.current);
          isShooting.current = false;
          return;
        }
        shootBullet();
      }, 80); // Fire approx 12.5 bullets/sec
    };


    // Stop shooting on mouse up (anywhere on window)
    const stopShooting = (e) => {
      if (e.button !== 0) return;
      clearInterval(shootIntervalRef.current);
      isShooting.current = false;
    };


    // Update aiming angle based on mouse movement over canvas
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


  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(requestRef.current);
      clearInterval(timerIntRef.current);
      clearInterval(spawnIntRef.current);
      clearInterval(lootSpawnIntRef.current);
      clearInterval(shootIntervalRef.current);
      isShooting.current = false;
      return;
    }


    setScore(0);
    setTimer(60);
    zombiesRef.current = [];
    bulletsRef.current = [];
    ammoLootRef.current = [];
    playerRef.current.x = MAP_W / 2;
    playerRef.current.y = MAP_H / 2;


    const ctx = canvasRef.current.getContext("2d");


    // Timer countdown
    timerIntRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerIntRef.current);
          cancelAnimationFrame(requestRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);


    // Spawn Zombies periodically up to 40 max
    spawnIntRef.current = setInterval(() => {
      if (zombiesRef.current.length < 40) {
        zombiesRef.current.push(
          new Zombie(
            Math.random() * MAP_W,
            Math.random() * MAP_H
          )
        );
      }
    }, 900);


    // Spawn Ammo loot periodically max 10
    lootSpawnIntRef.current = setInterval(() => {
      if (ammoLootRef.current.length < 10) {
        ammoLootRef.current.push(
          new Ammo(
            Math.random() * MAP_W,
            Math.random() * MAP_H
          )
        );
      }
    }, 8000);


    function loop() {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);


      // Update player and camera position
      playerRef.current.update(keys.current, MAP_W, MAP_H);
      camera.current.x = Math.min(
        Math.max(0, playerRef.current.x - CANVAS_W / 2),
        MAP_W - CANVAS_W
      );
      camera.current.y = Math.min(
        Math.max(0, playerRef.current.y - CANVAS_H / 2),
        MAP_H - CANVAS_H
      );


      // Draw visible boundary frame
      ctx.save();
      ctx.strokeStyle = "#00f";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#00f";
      ctx.shadowBlur = 16;
      ctx.strokeRect(2, 2, CANVAS_W - 4, CANVAS_H - 4);
      ctx.restore();


      // Update and clean bullets
      bulletsRef.current.forEach((b) => b.update());
      while (bulletsRef.current.length > 100) bulletsRef.current.shift();
      bulletsRef.current = bulletsRef.current.filter(
        (b) => b.x > 0 && b.x < MAP_W && b.y > 0 && b.y < MAP_H
      );


      // Update zombies
      zombiesRef.current.forEach((z) => z.update(playerRef.current));


      // Update and clean ammo loot, apply pickup
      ammoLootRef.current = ammoLootRef.current.filter((loot) => {
        if (loot.isPicked(playerRef.current)) {
          setAmmo((a) => a + loot.amount);
          return false;
        }
        return true;
      });


      // Collision check between bullets and zombies
      bulletsRef.current.forEach((b, bi) => {
        zombiesRef.current.forEach((z, zi) => {
          if (z.isHit(b)) {
            zombiesRef.current.splice(zi, 1);
            bulletsRef.current.splice(bi, 1);
            setScore((s) => s + 1);
          }
        });
      });


      // Draw all entities relative to camera
      playerRef.current.draw(ctx, camera.current);
      bulletsRef.current.forEach((b) => b.draw(ctx, camera.current));
      zombiesRef.current.forEach((z) => z.draw(ctx, camera.current));
      ammoLootRef.current.forEach((a) => a.draw(ctx, camera.current));


      requestRef.current = requestAnimationFrame(loop);
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
  }, [running, setScore, setTimer, setAmmo]);


  return <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} id="gameCanvas" />;
}