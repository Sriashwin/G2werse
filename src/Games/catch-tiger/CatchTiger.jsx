import React, { useState, useEffect, useRef } from "react";
import Player from "./Player";
import Tiger from "./Tiger";

const CatchTiger = () => {
  const arenaWidth = 800;
  const arenaHeight = 600;
  const playerStep = 15;
  const tigerStep = 10;

  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
  const [tigerPos, setTigerPos] = useState({ x: 400, y: 300 });
  const [caught, setCaught] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [obstacles, setObstacles] = useState([]);
  const [keysPressed, setKeysPressed] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(
    () => localStorage.getItem("tigerHighScore") || "—"
  );

  const scoreUpdated = useRef(false);

  // Initialize obstacles
  useEffect(() => {
    const cols = 4;
    const rows = 3;
    const cellWidth = arenaWidth / cols;
    const cellHeight = arenaHeight / rows;
    let obs = [];

    const isOverlappingPlayer = (x, y, width, height) => {
      const playerBox = { x: 100, y: 100, width: 50, height: 50 };
      return (
        x < playerBox.x + playerBox.width &&
        x + width > playerBox.x &&
        y < playerBox.y + playerBox.height &&
        y + height > playerBox.y
      );
    };

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let newX = i * cellWidth + Math.random() * (cellWidth - 60);
        let newY = j * cellHeight + Math.random() * (cellHeight - 60);
        while (isOverlappingPlayer(newX, newY, 60, 60)) {
          newX = i * cellWidth + Math.random() * (cellWidth - 60);
          newY = j * cellHeight + Math.random() * (cellHeight - 60);
        }
        obs.push({ x: newX, y: newY, width: 60, height: 60 });
      }
    }
    setObstacles(obs);
  }, []);

  // Timer
  useEffect(() => {
    if (caught || !gameStarted) return;
    const interval = setInterval(() => setTimer(t => (t <= 1 ? 0 : t - 1)), 1000);
    return () => clearInterval(interval);
  }, [caught, gameStarted]);

  // Key press
  useEffect(() => {
    const handleKeyDown = e => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      setKeysPressed(prev => ({ ...prev, [e.key]: true }));
    };
    const handleKeyUp = e => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
      setKeysPressed(prev => ({ ...prev, [e.key]: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Player movement
  useEffect(() => {
    if (caught || !gameStarted) return;
    const interval = setInterval(() => {
      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysPressed["ArrowUp"]) newY = Math.max(0, newY - playerStep);
        if (keysPressed["ArrowDown"]) newY = Math.min(arenaHeight - 50, newY + playerStep);
        if (keysPressed["ArrowLeft"]) newX = Math.max(0, newX - playerStep);
        if (keysPressed["ArrowRight"]) newX = Math.min(arenaWidth - 50, newX + playerStep);

        // Obstacle collision
        for (let obs of obstacles) {
          if (
            newX < obs.x + obs.width &&
            newX + 50 > obs.x &&
            newY < obs.y + obs.height &&
            newY + 50 > obs.y
          ) return prev;
        }

        return { x: newX, y: newY };
      });
    }, 30);
    return () => clearInterval(interval);
  }, [keysPressed, obstacles, caught, gameStarted]);

  // Tiger movement
  useEffect(() => {
    if (caught || !gameStarted) return;
    const interval = setInterval(() => {
      setTigerPos(prev => {
        const dx = prev.x - playerPos.x;
        const dy = prev.y - playerPos.y;
        const distance = Math.hypot(dx, dy);
        let newX = prev.x;
        let newY = prev.y;

        if (distance < 300) {
          const angle = Math.atan2(dy, dx);
          newX += tigerStep * Math.cos(angle);
          newY += tigerStep * Math.sin(angle);
        } else {
          const angle = Math.random() * 2 * Math.PI;
          newX += tigerStep * Math.cos(angle);
          newY += tigerStep * Math.sin(angle);
        }

        newX = Math.min(Math.max(newX, 0), arenaWidth - 50);
        newY = Math.min(Math.max(newY, 0), arenaHeight - 50);
        return { x: newX, y: newY };
      });
    }, 40);
    return () => clearInterval(interval);
  }, [playerPos, caught, gameStarted]);

  // Check if caught
  useEffect(() => {
    if (!gameStarted) return;
    const distance = Math.hypot(playerPos.x - tigerPos.x, playerPos.y - tigerPos.y);
    if (distance < 50 && !scoreUpdated.current) {
      setCaught(true);
      setScore(prev => prev + 100 + timer);
      scoreUpdated.current = true;

      const timeTaken = 60 - timer;
      const prevHigh = localStorage.getItem("tigerHighScore");
      if (!prevHigh || timeTaken < parseInt(prevHigh)) {
        localStorage.setItem("tigerHighScore", timeTaken);
        setHighScore(timeTaken);
      }
    }
  }, [playerPos, tigerPos, timer, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setCaught(false);
    setScore(0);
    setTimer(60);
    scoreUpdated.current = false;
  };

  const restartGame = () => {
    setPlayerPos({ x: 100, y: 100 });
    setTigerPos({ x: 400, y: 300 });
    setCaught(false);
    setScore(0);
    setTimer(60);
    setKeysPressed({});
    scoreUpdated.current = false;
    setGameStarted(false);
  };

  return (
    <div style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#00f", fontFamily: "Arial, sans-serif", textShadow: "0 0 12px #00f" }}>🐅 Catch Charlie</h1>
      <h3 style={{ color: "#0f0", textShadow: "0 0 10px #0f0" }}>Score: {score} | Time: {timer}s | Speed: {highScore}s</h3>

      <div
        style={{
          position: "relative",
          width: arenaWidth,
          height: arenaHeight,
          margin: "0 auto 20px auto",
          border: "3px solid #00f",
          borderRadius: "10px",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        {obstacles.map((obs, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: obs.y,
              left: obs.x,
              width: obs.width,
              height: obs.height,
              backgroundColor: "#555",
              borderRadius: "8px",
            }}
          />
        ))}

        <Player position={playerPos} />
        <Tiger position={tigerPos} />

        {!gameStarted && !caught && (
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

        {caught && (
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
            Charlie Caught 🎉
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {!gameStarted ? (
          <button
            onClick={startGame}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#00f",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 0 10px #00f",
              fontWeight: "bold",
            }}
          >
            Start Game
          </button>
        ) : (
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
              boxShadow: "0 0 10px #00f",
              fontWeight: "bold",
            }}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default CatchTiger;
