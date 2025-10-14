// src/Games/defend-camp/DefendCamp.jsx
import React, { useState, useEffect } from "react";
import Zombie from "./Zombie";
import Gun from "./Gun";
import Bullet from "./Bullet";

const arenaWidth = 800;
const arenaHeight = 500;
const gunX = 50;
const campWallX = 10; // Camp wall is behind the gun

const DefendCamp = () => {
  const [zombies, setZombies] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [score, setScore] = useState(0);
  const [gunY, setGunY] = useState(arenaHeight / 2);
  const [campHealth, setCampHealth] = useState(5);
  const [extraGuns, setExtraGuns] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Prevent arrow key scrolling & handle gun movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault(); // stop page scrolling
        if (e.key === "ArrowUp") setGunY((prev) => Math.max(prev - 20, 0));
        if (e.key === "ArrowDown") setGunY((prev) => Math.min(prev + 20, arenaHeight));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Spawn zombies every 2s
  useEffect(() => {
    if (gameOver) return;
    const spawn = setInterval(() => {
      const newZombie = {
        id: Date.now(),
        x: arenaWidth - 30,
        y: Math.random() * (arenaHeight - 50),
        alive: true,
      };
      setZombies((prev) => [...prev, newZombie]);
    }, 2000);
    return () => clearInterval(spawn);
  }, [gameOver]);

  // Move zombies toward camp
  useEffect(() => {
    if (gameOver) return;
    const moveZombies = setInterval(() => {
      setZombies((prev) =>
        prev
          .map((z) => {
            if (!z.alive) return z;
            if (z.x <= campWallX) {
              setCampHealth((h) => h - 1);
              return { ...z, alive: false };
            }
            return { ...z, x: z.x - 5 };
          })
          .filter((z) => z.alive)
      );
    }, 200);
    return () => clearInterval(moveZombies);
  }, [gameOver]);
  

  // Move bullets
  useEffect(() => {
    if (gameOver) return;
    const moveBullets = setInterval(() => {
      setBullets((prev) =>
        prev.map((b) => ({ ...b, x: b.x + 5 })).filter((b) => b.x <= arenaWidth)
      );
    }, 20);
    return () => clearInterval(moveBullets);
  }, [gameOver]);

  // Main gun shooting
  useEffect(() => {
    if (gameOver) return;
    const shoot = setInterval(() => {
      setBullets((prev) => [...prev, { id: Date.now(), x: gunX, y: gunY }]);
    }, 800);
    return () => clearInterval(shoot);
  }, [gunY, gameOver]);

  // Extra guns shooting
  useEffect(() => {
    if (gameOver) return;
    const shootExtra = setInterval(() => {
      setBullets((prev) => [
        ...prev,
        ...extraGuns.map((g) => ({ id: Date.now() + Math.random(), x: g.x, y: g.y })),
      ]);
    }, 1000);
    return () => clearInterval(shootExtra);
  }, [extraGuns, gameOver]);

  // Collision detection
  useEffect(() => {
    setZombies((prevZombies) =>
      prevZombies.map((z) => {
        if (!z.alive) return z;
        const hit = bullets.some((b) => b.x >= z.x && b.x <= z.x + 30 && Math.abs(b.y - z.y) < 25);
        if (hit) setScore((prev) => prev + 1);
        return hit ? { ...z, alive: false } : z;
      })
    );
  }, [bullets]);

  // Spawn extra guns based on score thresholds
  useEffect(() => {
    const extraGunThresholds = [40, 80];
    const newGuns = [];
    if (score >= extraGunThresholds[0] && extraGuns.length < 1) newGuns.push({ x: 50, y: arenaHeight / 4 });
    if (score >= extraGunThresholds[1] && extraGuns.length < 2) newGuns.push({ x: 50, y: (arenaHeight * 3) / 4 });
    if (newGuns.length > 0) setExtraGuns((prev) => [...prev, ...newGuns]);
  }, [score, extraGuns]);

  // Check game over
  useEffect(() => {
    if (campHealth <= 0) setGameOver(true);
  }, [campHealth]);

  const restartGame = () => {
    setZombies([]);
    setBullets([]);
    setScore(0);
    setCampHealth(5);
    setGunY(arenaHeight / 2);
    setExtraGuns([]);
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
      {/* HUD above arena */}
      <h1>Defend the Camp</h1>
      <h3 style={{ color: "#0f0" }}>Score: {score} | Camp Health: {campHealth}</h3>

      {/* Arena */}
      <div
        style={{
          position: "relative",
          width: arenaWidth,
          height: arenaHeight,
          margin: "0 auto 20px auto",
          backgroundColor: "#000",
          border: "3px solid #00f",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Gun */}
        <Gun x={gunX} y={gunY} />
        {/* Extra Guns */}
        {extraGuns.map((g, i) => (
          <Gun key={i} x={g.x} y={g.y} />
        ))}
        {/* Bullets */}
        {bullets.map((b) => (
          <Bullet key={b.id} x={b.x} y={b.y} />
        ))}
        {/* Zombies */}
        {zombies.filter((z) => z.alive).map((z) => (
          <Zombie key={z.id} x={z.x} y={z.y} />
        ))}

        {/* Game Over */}
        {gameOver && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#0ff",
              fontSize: "32px",
              textAlign: "center",
              textShadow: "0 0 10px #0ff",
            }}
          >
            Game Over! <br />

          </div>
        )}
      </div>
      <button
              onClick={restartGame}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#00f",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                boxShadow: "0 0 10px #00f",
              }}
            >
              Restart Game
            </button>
    </div>
    
  );

};

export default DefendCamp;