import React, { useState, useEffect, useRef } from "react";
import Zombie from "./Zombie";
import Gun from "./Gun";
import Bullet from "./Bullet";

const arenaWidth = 800;
const arenaHeight = 500;
const gunX = 50;
const campWallX = 10;

const DefendCamp = () => {
  const [zombies, setZombies] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [score, setScore] = useState(0);
  const [gunY, setGunY] = useState(arenaHeight / 2);
  const [campHealth, setCampHealth] = useState(10);
  const [extraGuns, setExtraGuns] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeSurvived, setTimeSurvived] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const username = "player1";
  const savedHighScore = parseInt(localStorage.getItem(`${username}_campHighScore`) || "0");
  const highScoreRef = useRef(savedHighScore);
  const timerRef = useRef(null);
  const timeSurvivedRef = useRef(timeSurvived);

  // Keep ref updated
  useEffect(() => {
    timeSurvivedRef.current = timeSurvived;
  }, [timeSurvived]);

  // Prevent arrow scrolling & handle gun movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        if (!gameStarted || gameOver) return;
        if (e.key === "ArrowUp") setGunY((prev) => Math.max(prev - 20, 0));
        if (e.key === "ArrowDown") setGunY((prev) => Math.min(prev + 20, arenaHeight));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver]);

  // Timer
  useEffect(() => {
    if (!gameStarted || gameOver) {
      clearInterval(timerRef.current);
      if (gameOver && timeSurvivedRef.current > highScoreRef.current) {
        localStorage.setItem(`${username}_campHighScore`, timeSurvivedRef.current);
        highScoreRef.current = timeSurvivedRef.current;
      }
      return;
    }
    timerRef.current = setInterval(() => setTimeSurvived((prev) => prev + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameOver]);

  // Spawn zombies
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const spawn = setInterval(() => {
      const newZombie = {
        id: Date.now() + Math.random(),
        x: arenaWidth - 30,
        y: Math.random() * (arenaHeight - 50),
        alive: true,
      };
      setZombies((prev) => [...prev, newZombie]);
    }, 2000);
    return () => clearInterval(spawn);
  }, [gameStarted, gameOver]);

  // Move zombies
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const moveZombies = setInterval(() => {
      setZombies((prev) =>
        prev
          .map((z) => {
            if (!z.alive) return z;
            if (z.x <= campWallX) {
              setCampHealth((h) => Math.max(h - 1, 0));
              return { ...z, alive: false };
            }
            return { ...z, x: z.x - 10 };
          })
          .filter((z) => z.alive)
      );
    }, 200);
    return () => clearInterval(moveZombies);
  }, [gameStarted, gameOver]);

  // Move bullets
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const moveBullets = setInterval(() => {
      setBullets((prev) =>
        prev.map((b) => ({ ...b, x: b.x + 10 })).filter((b) => b.x <= arenaWidth)
      );
    }, 20);
    return () => clearInterval(moveBullets);
  }, [gameStarted, gameOver]);

  // Main gun shooting
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const shoot = setInterval(() => {
      setBullets((prev) => [...prev, { id: Date.now() + Math.random(), x: gunX, y: gunY }]);
    }, 800);
    return () => clearInterval(shoot);
  }, [gunY, gameStarted, gameOver]);

  // Extra guns shooting
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const shootExtra = setInterval(() => {
      setBullets((prev) => [
        ...prev,
        ...extraGuns.map((g) => ({ id: Date.now() + Math.random(), x: g.x, y: g.y })),
      ]);
    }, 1000);
    return () => clearInterval(shootExtra);
  }, [extraGuns, gameStarted, gameOver]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted) return;
    setZombies((prevZombies) =>
      prevZombies.map((z) => {
        if (!z.alive) return z;
        const hit = bullets.some((b) => b.x >= z.x && b.x <= z.x + 30 && Math.abs(b.y - z.y) < 25);
        if (hit) setScore((prev) => prev + 1);
        return hit ? { ...z, alive: false } : z;
      })
    );
  }, [bullets, gameStarted]);

  // Extra guns by score
  useEffect(() => {
    const extraGunThresholds = [40, 80];
    const newGuns = [];
    if (score >= extraGunThresholds[0] && extraGuns.length < 1)
      newGuns.push({ x: 50, y: arenaHeight / 4 });
    if (score >= extraGunThresholds[1] && extraGuns.length < 2)
      newGuns.push({ x: 50, y: (arenaHeight * 3) / 4 });
    if (newGuns.length > 0) setExtraGuns((prev) => [...prev, ...newGuns]);
  }, [score, extraGuns]);

  // Game over condition
  useEffect(() => {
    if (campHealth <= 0 && gameStarted) setGameOver(true);
  }, [campHealth, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setZombies([]);
    setBullets([]);
    setScore(0);
    setCampHealth(10);
    setExtraGuns([]);
    setGunY(arenaHeight / 2);
    setTimeSurvived(0);
  };

  return (
    <div style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{textShadow: "0 0 12px #00f"}}>🛡️ Defend the Camp</h1>
      <h3 style={{ color: "#0f0", textShadow: "0 0 10px #0f0" }}>
        Camp Health: {campHealth} | Time: {timeSurvived}s | Durability: {highScoreRef.current}s
      </h3>

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
        <Gun x={gunX} y={gunY} />
        {extraGuns.map((g, i) => (
          <Gun key={i} x={g.x} y={g.y} />
        ))}
        {bullets.map((b) => (
          <Bullet key={b.id} x={b.x} y={b.y} />
        ))}
        {zombies.filter((z) => z.alive).map((z) => (
          <Zombie key={z.id} x={z.x} y={z.y} />
        ))}

        {!gameStarted && !gameOver && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#0ff",
              fontSize: "40px",
              textAlign: "center",
              textShadow: "0 0 10px #0ff",
            }}
          >
            Press Start to Begin
          </div>
        )}

        {gameOver && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#0ff",
              fontSize: "40px",
              textAlign: "center",
              textShadow: "0 0 10px #0ff",
            }}
          >
            Game Over 💀
          </div>
        )}
      </div>

      {/* Restart button always visible */}
      <button
        onClick={startGame}
        style={{
          padding: "12px 28px",
          fontSize: "16px",
          backgroundColor: "#00f",
          color: "#000",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          boxShadow: "0 0 12px #00f",
          marginTop: "12px",
          textShadow: "0 0 6px #00f",
        }}
      >
        {gameStarted ? "Restart Game" : "Start Game"}
      </button>
    </div>
  );
};

export default DefendCamp;
