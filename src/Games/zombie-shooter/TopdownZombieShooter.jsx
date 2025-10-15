import React, { useState } from "react";
import GameCanvas from "./GameCanvas";
import "./style.css";

export default function TopdownZombieShooter() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [ammo, setAmmo] = useState(50); // initial ammo 50
  const [gameOver, setGameOver] = useState(false);

  const handleStartPause = () => {
    if (gameOver) {
      // Restart the game
      setScore(0);
      setTimer(60);
      setAmmo(50);
      setGameOver(false);
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  };

  return (
    <div className="br-bg">
      <h1 style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
        Zombie Shooter
      </h1>

      <div className="br-info">
        <span style={{ color: "#0f0", marginLeft: 12 }}>Score: {score}</span>
        <span style={{ color: "#0f0", marginLeft: 12 }}>Time: {timer}s</span>
        <span style={{ color: "#0f0", marginLeft: 12 }}>Ammo: {ammo}</span>
      </div>

      <div className="br-game-area" style={{ width: 800, height: 600, margin: "auto" }}>
        <GameCanvas
          running={running}
          setRunning={setRunning}
          setScore={setScore}
          setTimer={setTimer}
          ammo={ammo}
          setAmmo={setAmmo}
          setGameOver={setGameOver}
        />
      </div>

      <center>
        <button
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
          onClick={handleStartPause}
        >
          {gameOver ? "Restart" : running ? "Pause" : "Start Game"}
        </button>
      </center>

      <br />
      <span className="br-controls">
        WASD: Move &nbsp; Mouse: Aim & Shoot &nbsp;
      </span>
    </div>
  );
}
