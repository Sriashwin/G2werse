import React, { useRef, useEffect, useState } from "react";
import "./style.css";

// Emoji sets
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

// Get edge start position for zombies (random edge)
function getZombieStartPosition() {
  const edge = getRandomInt(0, 4);
  let x, y, dx, dy;
  switch (edge) {
    case 0: // top
      x = getRandomInt(0, GAME_WIDTH - ZOMBIE_SIZE);
      y = 0;
      dx = 0;
      dy = ZOMBIE_SPEED;
      break;
    case 1: // bottom
      x =     (0, GAME_WIDTH - ZOMBIE_SIZE);
      y = GAME_HEIGHT - ZOMBIE_SIZE;
      dx = 0;
      dy = -ZOMBIE_SPEED;
      break;
    case 2: // left
      x = 0;
      y = getRandomInt(0, GAME_HEIGHT - ZOMBIE_SIZE);
      dx = ZOMBIE_SPEED;
      dy = 0;
      break;
    default: // right
      x = GAME_WIDTH - ZOMBIE_SIZE;
      y = getRandomInt(0, GAME_HEIGHT - ZOMBIE_SIZE);
      dx = -ZOMBIE_SPEED;
      dy = 0;
  }
  return { x, y, dx, dy, emoji: zombieEmojis[getRandomInt(0, zombieEmojis.length)] };
}

// Get random position for resources
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
  const [highScore, setHighScore] = useState(() => {
    // load from localStorage if exists
    return Number(localStorage.getItem("zd-highscore")) || 0;
  });
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [playing, setPlaying] = useState(true);
  const keys = useRef({});
  const intervalRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){
        e.preventDefault(); // stops page scrolling
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    if (!playing) return;

    // Spawn zombies/resources at intervals
    const zombieSpawn = setInterval(() => {
      setZombies(zs => [...zs, getZombieStartPosition()]);
    }, 1200);

    const resourceSpawn = setInterval(() => {
      setResources(rs => [...rs, getResourceStartPosition()]);
    }, 1600);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) setPlaying(false);
        return Math.max(0, t - 1);
      });
    }, 1000);

    // Game loop (movement)
    intervalRef.current = setInterval(() => {
      setPlayer(p => {
        let nx = p.x;
        let ny = p.y;
        if (keys.current["ArrowLeft"] || keys.current["a"]) nx -= 6;
        if (keys.current["ArrowRight"] || keys.current["d"]) nx += 6;
        if (keys.current["ArrowUp"] || keys.current["w"]) ny -= 6;
        if (keys.current["ArrowDown"] || keys.current["s"]) ny += 6;
        nx = Math.max(0, Math.min(GAME_WIDTH - PLAYER_SIZE, nx));
        ny = Math.max(0, Math.min(GAME_HEIGHT - PLAYER_SIZE, ny));
        return { x: nx, y: ny };
      });

      // Move zombies
      setZombies(zombies => zombies
        .map(z => ({ ...z, x: z.x + z.dx, y: z.y + z.dy }))
        .filter(z => z.x >= -ZOMBIE_SIZE && z.x < GAME_WIDTH+ZOMBIE_SIZE && z.y >= -ZOMBIE_SIZE && z.y < GAME_HEIGHT+ZOMBIE_SIZE)
      );

      // Move resources
      setResources(resources => resources
        .map(r => ({ ...r, y: r.y + RESOURCE_SPEED }))
        .filter(r => r.y < GAME_HEIGHT)
      );
    }, 35);

    // Keyboard events
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

  // Collision detection
  useEffect(() => {
    if (!playing) return;
    // Check zombie collisions
    for (let z of zombies) {
      if (
        Math.abs((player.x + PLAYER_SIZE/2) - (z.x + ZOMBIE_SIZE/2)) < 26 &&
        Math.abs((player.y + PLAYER_SIZE/2) - (z.y + ZOMBIE_SIZE/2)) < 26
      ) {
        setPlaying(false);
        break;
      }
    }
    // Check resource collection
    setResources(rs =>
      rs.filter(r => {
        if (
          Math.abs((player.x + PLAYER_SIZE/2) - (r.x + RESOURCE_SIZE/2)) < 28 &&
          Math.abs((player.y + PLAYER_SIZE/2) - (r.y + RESOURCE_SIZE/2)) < 28
        ) {
          setScore(s => s + 1);
          return false;
        }
        return true;
      })
    );
  }, [player, zombies, playing]);

  // Track high score when game ends
  useEffect(() => {
    if (!playing) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("zd-highscore", score);
      }
    }
  }, [playing, score, highScore]);

  // Restart game
  const restart = () => {
    keys.current = {}; // reset all keys
    setPlayer({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT - PLAYER_SIZE - 24 });
    setZombies([]);
    setResources([]);
    setScore(0);
    setTimeLeft(ROUND_TIME);
    setPlaying(true);
  };

  return (
    <div className="zd-bg">
      <div className="zd-title">🧟‍♂️</div> <h1 style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>Zombie Dodge</h1>
      <div className="zd-info">
        <span style={{color: "#0f0", marginLeft:12}}>Score: <span className="zd-score">{score}</span></span>
        <span style={{color: "#0f0", marginLeft:12}}>High Score: <span className="zd-highscore">{highScore}</span></span>
        <span style={{color: "#0f0", marginLeft:12}}>Time Left: <span className="zd-timer">{timeLeft}</span>s</span>
        
      </div>
      <div className="zd-game-area" style={{width:GAME_WIDTH, height:GAME_HEIGHT}}>
        <div
          className="zd-entity zd-player"
          style={{ left: player.x, top: player.y }}
        >{playerEmoji}</div>

        {zombies.map((z, idx) => (
          <div key={"zomb"+idx} className="zd-entity zd-zombie" style={{ left: z.x, top: z.y }}>{z.emoji}</div>
        ))}

        {resources.map((r, idx) => (
          <div key={"res"+idx} className="zd-entity zd-resource" style={{ left: r.x, top: r.y }}>{r.emoji}</div>
        ))}

        {!playing &&
          <div className="zd-overlay">
            {timeLeft === 0 ? "Survived! 🏆" : "Game Over! ☠️"}
            <div style={{marginTop:8}}>Score: {score} | High Score: {highScore}</div>
            <button className="zd-btn" style={{marginTop:16}} onClick={restart}>Restart</button>
          </div>
        }
      </div>
      <div className="zd-tip">
        Use <span className="zd-controls">Arrow keys / WASD</span> to move.<br/>
        Dodge <span className="zd-zombie-tip">🧟</span> and collect <span className="zd-resource-tip">🥫 💧 🔦</span> before time runs out!
      </div><br/>
      <button onClick={restart} style={{                            
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#00f",
                        color: "#000",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "0 0 10px #00f",
                    }}>Restart</button>
    </div>
  );
}
