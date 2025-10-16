import React, { useState, useEffect, useCallback, useMemo } from "react";
import Tile from "./Tile";

const MemoryGame = () => {
  const emojis = useMemo(
    () => [
      "🎹","🎶","📿","🧪","🧬","🪓","🔬","🔨","🎤","🧯",
      "👨","💃","🧟","❤️‍🔥","👀","🏫","🧟‍♀️","✨","🌝",
      "🩸","🪻","⌚","☔","🐕","🚁"
    ],
    []
  );

  const [tiles, setTiles] = useState([]);
  const [firstTile, setFirstTile] = useState(null);
  const [secondTile, setSecondTile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const totalMatches = emojis.length;

  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [highScore, setHighScore] = useState(
    () => localStorage.getItem("memoryHighScore") || null
  );

  const initializeTiles = useCallback(() => {
    let tilePairs = [];
    for (let i = 0; i < emojis.length; i++) {
      tilePairs.push({ id: i * 2, value: emojis[i], flipped: false, matched: false });
      tilePairs.push({ id: i * 2 + 1, value: emojis[i], flipped: false, matched: false });
    }
    tilePairs.sort(() => Math.random() - 0.5);
    setTiles(tilePairs);
    setMatches(0);
    setFirstTile(null);
    setSecondTile(null);
    setDisabled(false);
    setStartTime(null);
    setElapsedTime(0);
    setTimerActive(false);
    setGameStarted(false);
  }, [emojis]);

  const startGame = () => {
    setTiles((prev) => prev.map((t) => ({ ...t, flipped: false, matched: false })));
    setStartTime(Date.now());
    setTimerActive(true);
    setGameStarted(true);
    setMatches(0);
  };

  useEffect(() => {
    initializeTiles();
  }, [initializeTiles]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setElapsedTime(((Date.now() - startTime) / 1000).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timerActive, startTime]);

  const handleTileClick = (tile) => {
    if (!gameStarted || disabled || tile.flipped || tile.matched) return;

    const newTiles = tiles.map((t) =>
      t.id === tile.id ? { ...t, flipped: true } : t
    );
    setTiles(newTiles);

    if (!firstTile) {
      setFirstTile(tile);
    } else if (!secondTile) {
      setSecondTile(tile);
      setDisabled(true);
      setTimeout(() => checkMatch(tile), 800);
    }
  };

  const checkMatch = (tile) => {
    let newTiles = [...tiles];
    if (firstTile.value === tile.value) {
      newTiles = newTiles.map((t) =>
        t.value === tile.value ? { ...t, matched: true } : t
      );
      setMatches((m) => m + 1);
    } else {
      newTiles = newTiles.map((t) =>
        t.id === firstTile.id || t.id === tile.id ? { ...t, flipped: false } : t
      );
    }
    setTiles(newTiles);
    setFirstTile(null);
    setSecondTile(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (matches === totalMatches && timerActive) {
      setTimerActive(false);
      const completionTime = parseFloat(elapsedTime);
      const best = parseFloat(highScore);
      if (!highScore || completionTime < best) {
        localStorage.setItem("memoryHighScore", completionTime);
        setHighScore(completionTime);
      }
    }
  }, [matches, totalMatches, elapsedTime, timerActive, highScore]);

  return (
    <div style={{
      textAlign: "center",
      color: "#00f",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#000",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{textShadow: "0 0 12px #00f"}}>🧠 Quest for Past</h1>

      {matches === totalMatches ? (
        <div style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#0ff",
          fontSize: "40px",
          textAlign: "center",
          textShadow: "0 0 10px #0ff"
        }}>
          Memory Unlocked 🎉
        </div>
      ) : (
        <h3 style={{ color: "#0f0", marginTop: "10px", textShadow: "0 0 10px #0f0" }}>
          Matches: {matches} / {totalMatches} | Time: {elapsedTime}s | Best:{highScore && <> {highScore}s</>}
        </h3>
      )}

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "20px",
        opacity: gameStarted ? 1 : 0.4,
        pointerEvents: gameStarted ? "auto" : "none",
        transition: "opacity 0.5s"
      }}>
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} onClick={handleTileClick} />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {!gameStarted ? (
          <button style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#00f",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 0 10px #00f",
            fontWeight: "bold"
          }} onClick={startGame}>
            Start Game
          </button>
        ) : (
          <button style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#00f",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 0 10px #00f",
            fontWeight: "bold"
          }} onClick={initializeTiles}>
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
