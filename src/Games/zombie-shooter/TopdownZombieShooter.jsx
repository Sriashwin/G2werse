import React, { useState, useEffect } from "react";
import GameCanvas from "./GameCanvas";
import "./style.css";

export default function TopdownZombieShooter() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [ammo, setAmmo] = useState(50);

  // ✅ Disable arrow up/down scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault(); // prevent page scroll
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="br-bg">
      <h1 style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
        Zombie Shooter
      </h1>
      <div className="br-info">
        <span style={{ color: "#0f0", marginLeft: 12 }}>Score: <span>{score}</span></span>
        <span style={{ color: "#0f0", marginLeft: 12 }}>Time: <span>{timer}</span>s</span>
        <span style={{ color: "#0f0", marginLeft: 12 }}>Ammo: <span>{ammo}</span></span>
      </div>
      <div className="br-game-area" style={{ width: 800, height: 600, margin: "auto" }}>
        <GameCanvas
          running={running}
          setScore={setScore}
          setTimer={setTimer}
          ammo={ammo}
          setAmmo={setAmmo}
        />
      </div>
      <center>
        <button
          style={{
            marginTop: "40px",
            padding: "20px 20px",
            backgroundColor: "#00f",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 0 10px #00f",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "1",
          }}
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "Pause" : "Start Game"}
        </button>
      </center>
      <br />
      <span className="br-controls">
        WASD: Move &nbsp; Mouse: Aim & Shoot &nbsp;
      </span>
    </div>
  );
}
