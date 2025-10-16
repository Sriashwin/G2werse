import React, { useState, useEffect } from "react";
import GameCanvas from "./GameCanvas";
import "./style.css";

export default function TopdownZombieShooter() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0); // starts from 0
  const [ammo, setAmmo] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("zombieHighScore")) || 0
  );

  const handleStartPause = () => {
    if (gameOver) {
      setScore(0);
      setTimer(0); // reset timer
      setAmmo(50);
      setGameOver(false);
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  };

  // Update localStorage when game ends
  useEffect(() => {
    if (gameOver && timer > highScore) {
      setHighScore(timer);
      localStorage.setItem("zombieHighScore", timer);
    }
  }, [gameOver, timer, highScore]);

  return (
    <div style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
      {/* Title */}
      <h1 style={{ textShadow: "0 0 12px #00f" }}>💥 Zombie Shooter</h1>

      {/* Game stats */}
      <div style={{ marginBottom: "10px", textShadow: "0 0 10px #0f0" }}>
        <h3>
          <span style={{ color: "#0f0", marginLeft: 12 }}>Score: {score}</span>
          <span style={{ color: "#0f0", marginLeft: 12 }}>Time: {timer}s</span>
          <span style={{ color: "#0f0", marginLeft: 12 }}>Ammo: {ammo}</span>
          <span style={{ color: "#0f0", marginLeft: 12 }}>Survival: {highScore}s</span>
        </h3>
      </div>

      {/* Game area */}
      <div
        className="br-game-area"
        style={{
          width: 800,
          height: 600,
          margin: "0 auto 20px auto",
          backgroundColor: "#000",
          border: "3px solid #00f",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 20px #00f",
          position: "relative",
        }}
      >
        <GameCanvas
          running={running}
          setRunning={setRunning}
          setScore={setScore}
          setTimer={setTimer}
          ammo={ammo}
          setAmmo={setAmmo}
          setGameOver={setGameOver}
        />

        {/* Game Over overlay */}
        {gameOver && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#0ff",
              fontSize: "36px",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "0 0 8px #0ff, 0 0 12px #0ff, 0 0 20px #0ff",
              pointerEvents: "none",
            }}
          >
            {/* <div style={{ fontSize: "20px", marginTop: "10px", textShadow: "0 0 5px #0ff" }}>
              Survival Time: {timer}s
            </div>
            <div style={{ fontSize: "18px", marginTop: "5px", textShadow: "0 0 5px #0ff" }}>
              Highscore: {highScore}s
            </div> */}
          </div>
        )}
      </div>

      {/* Start / Pause / Restart button */}
      <button
        onClick={handleStartPause}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#00f",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 0 10px #00f",
        }}
      >
        {gameOver ? "Restart" : running ? "Pause" : "Start Game"}
      </button>

      {/* Controls */}
      <div style={{ marginTop: "10px", color: "#0ff", textShadow: "0 0 5px #0ff", fontSize: "16px" }}>
        WASD: Move &nbsp; Mouse: Aim & Shoot
      </div>
    </div>
  );
}
