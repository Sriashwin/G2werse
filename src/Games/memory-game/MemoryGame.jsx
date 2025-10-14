import React, { useState, useEffect, useCallback, useMemo } from "react";
import Tile from "./Tile";

const MemoryGame = () => {
  // ✅ Memoized emojis so they don't recreate every render
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
  const totalMatches = emojis.length;

  // ✅ Memoized initializer
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
  }, [emojis]);

  useEffect(() => {
    initializeTiles();
  }, [initializeTiles]);

  const handleTileClick = (tile) => {
    if (disabled) return;
    if (tile.flipped || tile.matched) return;

    const newTiles = tiles.map(t =>
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
      newTiles = newTiles.map(t =>
        t.value === tile.value ? { ...t, matched: true } : t
      );
      setMatches((m) => m + 1);
    } else {
      newTiles = newTiles.map(t =>
        t.id === firstTile.id || t.id === tile.id ? { ...t, flipped: false } : t
      );
    }
    setTiles(newTiles);
    setFirstTile(null);
    setSecondTile(null);
    setDisabled(false);
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#00f", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#00f", fontFamily: "Arial, sans-serif" }}>
        Quest for Past
      </h1>

      {matches === totalMatches ? (
        <h2 style={{ textAlign: "center", color: "#0f0", marginTop: "20px" }}>
          Memory Unlocked 🎉
        </h2>
      ) : (
        <div style={{ color: "#0f0", textAlign: "center" }}>
          Matches: {matches} / {totalMatches}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} onClick={handleTileClick} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={initializeTiles}
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
    </div>
  );
};

export default MemoryGame;