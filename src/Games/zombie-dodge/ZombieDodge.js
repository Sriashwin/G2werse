import React, { useRef, useEffect, useState } from "react";
import "./style.css";

const playerEmoji = "🧑‍🚀";
const zombieEmojis = ["🧟", "🧟‍♂️", "🧟‍♀️"];
const resourceEmojis = ["🥫", "💧", "🔦"];

const GAME_WIDTH = 420;
const GAME_HEIGHT = 540;
const PLAYER_SIZE = 40;
const ZOMBIE_SIZE = 40;
const RESOURCE_SIZE = 32;
const ZOMBIE_SPEED = 2.5;
const RESOURCE_SPEED = 2;
const ROUND_TIME = 30;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getZombieStartPosition() {
  const edge = getRandomInt(0, 4);
  let x, y, dx, dy;
  switch (edge) {
    case 0: x = getRandomInt(0, GAME_WIDTH - ZOMBIE_SIZE); y = 0; dx = 0; dy = ZOMBIE_SPEED; break;
    case 1: x = getRandomInt(0, GAME_WIDTH - ZOMBIE_SIZE); y = GAME_HEIGHT - ZOMBIE_SIZE; dx = 0; dy = -ZOMBIE_SPEED; break;
    case 2: x = 0; y = getRandomInt(0, GAME_HEIGHT - ZOMBIE_SIZE); dx = ZOMBIE_SPEED; dy = 0; break;
    default: x = GAME_WIDTH - ZOMBIE_SIZE; y = getRandomInt(0, GAME_HEIGHT - ZOMBIE_SIZE); dx = -ZOMBIE_SPEED; dy = 0;
  }
  return { x, y, dx, dy, emoji: zombieEmojis[getRandomInt(0, zombieEmojis.length)] };
}

function getResourceStartPosition() {
  return {
    x: getRandomInt(50, GAME_WIDTH - 50),
    y: getRandomInt(50, GAME_HEIGHT - 50),
    emoji: resourceEmojis[getRandomInt(0, resourceEmojis.length)],
  };
}

export default function ZombieDodge() {
  const [player, setPlayer] = useState({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - PLAYER_SIZE - 24 });
  const [zombies, setZombies] = useState([]);
  const [resources, setResources] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("zd-highscore")) || 0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [playing, setPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const keys = useRef({});
  const intervalRef = useRef();

  // Prevent arrow scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w","a","s","d"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Main Game Loop
  useEffect(() => {
    if (!playing) return;

    // Spawn zombies & resources
    const zombieSpawn = setInterval(() => setZombies(zs => [...zs, getZombieStartPosition()]), 1200);
    const resourceSpawn = setInterval(() => setResources(rs => [...rs, getResourceStartPosition()]), 1600);

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) setPlaying(false);
        return Math.max(0, t - 1);
      });
    }, 1000);

    intervalRef.current = setInterval(() => {
      // Only move player if keys are pressed
      setPlayer(p => {
        let nx = p.x, ny = p.y;
        if (keys.current["ArrowLeft"] || keys.current["a"]) nx -= 6;
        if (keys.current["ArrowRight"] || keys.current["d"]) nx += 6;
        if (keys.current["ArrowUp"] || keys.current["w"]) ny -= 6;
        if (keys.current["ArrowDown"] || keys.current["s"]) ny += 6;
        nx = Math.max(0, Math.min(GAME_WIDTH - PLAYER_SIZE, nx));
        ny = Math.max(0, Math.min(GAME_HEIGHT - PLAYER_SIZE, ny));
        return { x: nx, y: ny };
      });

      // Move zombies
      setZombies(zombies => zombies.map(z => ({ ...z, x: z.x + z.dx, y: z.y + z.dy }))
        .filter(z => z.x >= -ZOMBIE_SIZE && z.x < GAME_WIDTH + ZOMBIE_SIZE && z.y >= -ZOMBIE_SIZE && z.y < GAME_HEIGHT + ZOMBIE_SIZE));

      // Move resources
      setResources(resources => resources.map(r => ({ ...r, y: r.y + RESOURCE_SPEED })).filter(r => r.y < GAME_HEIGHT));
    }, 35);

    const down = e => (keys.current[e.key] = true);
    const up = e => (keys.current[e.key] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      clearInterval(zombieSpawn);
      clearInterval(resourceSpawn);
      clearInterval(timer);
      clearInterval(intervalRef.current);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [playing]);

  // Collision Detection
  useEffect(() => {
    if (!playing) return;

    for (let z of zombies) {
      if (Math.abs((player.x + PLAYER_SIZE / 2) - (z.x + ZOMBIE_SIZE / 2)) < 26 &&
          Math.abs((player.y + PLAYER_SIZE / 2) - (z.y + ZOMBIE_SIZE / 2)) < 26) {
        setPlaying(false);
        break;
      }
    }

    setResources(rs => rs.filter(r => {
      if (Math.abs((player.x + PLAYER_SIZE / 2) - (r.x + RESOURCE_SIZE / 2)) < 28 &&
          Math.abs((player.y + PLAYER_SIZE / 2) - (r.y + RESOURCE_SIZE / 2)) < 28) {
        setScore(s => s + 1);
        return false;
      }
      return true;
    }));
  }, [player, zombies, playing]);

  // Update high score
  useEffect(() => {
    if (!playing && score > highScore) {
      setHighScore(score);
      localStorage.setItem("zd-highscore", score);
    }
  }, [playing, score, highScore]);

  const startGame = () => {
    setGameStarted(true);
    setPlaying(true);
    keys.current = {}; // reset all keys
    setPlayer({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - PLAYER_SIZE - 24 });
    setZombies([]); setResources([]); setScore(0); setTimeLeft(ROUND_TIME);
  };

  return (
    <div style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textShadow: "0 0 12px #00f" }}>🧟‍♂️ Zombie Dodge</h1>
      <h3 style={{ color: "#0f0", textShadow: "0 0 10px #0f0" }}>
        Score: {score} | Time Left: {timeLeft}s | Highest Loot: {highScore}
      </h3>

      <div style={{
        position: "relative",
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        margin: "0 auto 20px auto",
        backgroundColor: "#000",
        border: "3px solid #00f",
        borderRadius: "10px",
        overflow: "hidden"
      }}>
        <div className="zd-entity zd-player" style={{ left: player.x, top: player.y }}>{playerEmoji}</div>
        {zombies.map((z, idx) => (<div key={idx} className="zd-entity zd-zombie" style={{ left: z.x, top: z.y }}>{z.emoji}</div>))}
        {resources.map((r, idx) => (<div key={idx} className="zd-entity zd-resource" style={{ left: r.x, top: r.y }}>{r.emoji}</div>))}

        {!gameStarted && !playing && (
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", color: "#0ff", fontSize: "40px", textAlign:"center", textShadow:"0 0 12px #0ff" }}>
            Press Start to Begin
          </div>
        )}

        {!playing && gameStarted && (
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", color: "#0ff", fontSize:"40px", textAlign:"center", textShadow:"0 0 12px #0ff" }}>
            Game Over ☠️
          </div>
        )}
      </div>

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
          textShadow: "0 0 6px #00f"
        }}
      >
        {gameStarted ? "Restart" : "Start Game"}
      </button>
    </div>
  );
}
