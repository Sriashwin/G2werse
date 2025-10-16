import React, { useState, useEffect, useRef } from "react";

export default function BoysRun() {
  const gameWidth = 800;
  const gameHeight = 400;
  const playerSize = 50;
  const obstacleWidth = 30;
  const obstacleHeight = 50;

  const [playerY, setPlayerY] = useState(gameHeight - playerSize);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [score, setScore] = useState(0);
  const [collected, setCollected] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const username = "player1";
  const savedHighScore = parseInt(localStorage.getItem(username) || "0");
  const highScoreRef = useRef(savedHighScore);
  const [highScore, setHighScore] = useState(savedHighScore);

  const jumpHeight = 120;
  const gravity = 7;
  const obstacleSpeed = 7;
  const obstacleSpawnInterval = 1500;

  const obstaclesRef = useRef(obstacles);
  const collectiblesRef = useRef(collectibles);
  const playerYRef = useRef(playerY);
  const scoreRef = useRef(score);

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { obstaclesRef.current = obstacles; }, [obstacles]);
  useEffect(() => { collectiblesRef.current = collectibles; }, [collectibles]);
  useEffect(() => { playerYRef.current = playerY; }, [playerY]);

  // Prevent arrow key scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Jump keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;
      if (["ArrowUp","w"," ","Spacebar"].includes(e.key)) {
        e.preventDefault();
        if (!isJumping) setIsJumping(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJumping, gameOver, gameStarted]);

  // Jump animation
  useEffect(() => {
    if (!isJumping) return;
    let upInterval = setInterval(() => {
      setPlayerY((y) => {
        if (y <= gameHeight - playerSize - jumpHeight) {
          clearInterval(upInterval);
          let downInterval = setInterval(() => {
            setPlayerY((y) => {
              if (y >= gameHeight - playerSize) {
                clearInterval(downInterval);
                setIsJumping(false);
                return gameHeight - playerSize;
              }
              return y + gravity;
            });
          }, 20);
          return y;
        }
        return y - gravity;
      });
    }, 20);
  }, [isJumping]);

  // Spawn obstacles & collectibles
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const spawnInterval = setInterval(() => {
      const isCollectible = Math.random() < 0.3;
      if (isCollectible) {
        const yPos = gameHeight - obstacleHeight - Math.floor(Math.random() * 100);
        setCollectibles(prev => [...prev, { x: gameWidth, y: yPos, emoji: "⚡", id: Date.now() }]);
      } else {
        setObstacles(prev => [...prev, { x: gameWidth, y: gameHeight - obstacleHeight, emoji: "🧟", id: Date.now() }]);
      }
    }, obstacleSpawnInterval);
    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    let animationFrame;
    const loop = () => {
      setObstacles(prev => prev.map(obs => ({ ...obs, x: obs.x - obstacleSpeed })).filter(obs => obs.x + obstacleWidth > 0));
      setCollectibles(prev => prev.map(col => ({ ...col, x: col.x - obstacleSpeed })).filter(col => col.x + obstacleWidth > 0));

      // Collision with obstacles
      obstaclesRef.current.forEach(obs => {
        if (obs.x < 50 + playerSize && obs.x + obstacleWidth > 50 && playerYRef.current + playerSize > obs.y) {
          setGameOver(true);
          if (scoreRef.current > highScoreRef.current) {
            localStorage.setItem(username, scoreRef.current);
            highScoreRef.current = scoreRef.current;
            setHighScore(scoreRef.current);
          }
        }
      });

      // Collision with collectibles
      collectiblesRef.current.forEach(col => {
        if (col.x < 50 + playerSize && col.x + obstacleWidth > 50 &&
            playerYRef.current + playerSize > col.y && playerYRef.current < col.y + obstacleHeight) {
          setCollected(prev => prev + 1);
          setCollectibles(prev => prev.filter(c => c.id !== col.id));
        }
      });

      setScore(prev => prev + 1);
      animationFrame = requestAnimationFrame(loop);
    };
    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCollected(0);
    setObstacles([]);
    setCollectibles([]);
    setPlayerY(gameHeight - playerSize);
    setIsJumping(false);
  };

  const restartGame = () => startGame();

  return (
    <div style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textShadow: "0 0 12px #00f" }}>🏃🏻‍➡️ Boys Run</h1>
      <h3 style={{ color: "#0f0", textShadow: "0 0 10px #0f0" }}>
        Score: {score} | Power: {collected} | Distance: {highScore}ft
      </h3>

      <div style={{
        position: "relative",
        width: gameWidth,
        height: gameHeight,
        margin: "0 auto 20px auto",
        backgroundColor: "#000",
        border: "3px solid #00f",
        borderRadius: "10px",
        overflow: "hidden"
      }}>
        {/* Player */}
        <div style={{
          position: "absolute",
          left: 50,
          top: playerY,
          width: playerSize,
          height: playerSize,
          fontSize: "40px",
          textAlign: "center",
          lineHeight: `${playerSize}px`,
          color: "#00f",
          textShadow: "0 0 10px #00f"
        }}>
          🏃🏻‍➡️
        </div>

        {/* Obstacles */}
        {obstacles.map(obs => (
          <div key={obs.id} style={{
            position: "absolute",
            left: obs.x,
            top: obs.y,
            width: obstacleWidth,
            height: obstacleHeight,
            fontSize: "40px",
            textAlign: "center",
            lineHeight: `${obstacleHeight}px`,
            color: "#f00",
            textShadow: "0 0 10px #f00"
          }}>
            {obs.emoji}
          </div>
        ))}

        {/* Collectibles */}
        {collectibles.map(col => (
          <div key={col.id} style={{
            position: "absolute",
            left: col.x,
            top: col.y,
            width: obstacleWidth,
            height: obstacleHeight,
            fontSize: "35px",
            textAlign: "center",
            lineHeight: `${obstacleHeight}px`,
            color: "#ff0",
            textShadow: "0 0 10px #ff0"
          }}>
            {col.emoji}
          </div>
        ))}

        {/* Start overlay */}
        {!gameStarted && !gameOver && (
          <div style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#0ff",
            fontSize: "40px",
            textAlign: "center",
            textShadow: "0 0 10px #0ff"
          }}>
            Press Start to Begin
          </div>
        )}

        {/* Game Over overlay */}
        {gameOver && (
          <div style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#0ff",
            fontSize: "40px",
            textAlign: "center",
            textShadow: "0 0 10px #0ff"
          }}>
            Game Over 💀 
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ textAlign: "center" }}>
        {!gameStarted && !gameOver ? (
          <button onClick={startGame} style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#00f",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 0 10px #00f"
          }}>Start Game</button>
        ) : (
          <button onClick={restartGame} style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#00f",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 0 10px #00f"
          }}>Restart</button>
        )}
      </div>
    </div>
  );
}
