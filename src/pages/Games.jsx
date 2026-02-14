// src/pages/Games.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import your game components
import MemoryGame from "../Games/memory-game/MemoryGame";
import CatchTiger from "../Games/catch-tiger/CatchTiger";
import DefendCamp from "../Games/defend-camp/DefendCamp";
import ZombieDodge from "../Games/zombie-dodge/ZombieDodge";
import BoysRun from "../Games/boys-run/BoysRun";
import TopdownZombieShooter from "../Games/zombie-shooter/TopdownZombieShooter";

// Import GameWrapper
import GameWrapper from "../Games/GameWrapper";

export default function Games() {
  return (
    <div style={styles.container}>
      {/* Games Navigation */}
      <section style={styles.navSection}>
        <h1 style={styles.title}>Mini Games</h1>
        <div style={styles.buttons}>
          <Link to="/games/memory"><button style={styles.button}>Quest for Past</button></Link>
          <Link to="/games/catch-tiger"><button style={styles.button}>Catch Charlie</button></Link>
          <Link to="/games/defend-camp"><button style={styles.button}>Defend the Camp</button></Link>
          <Link to="/games/zombie-dodge"><button style={styles.button}>Zombie Dodge</button></Link>
          <Link to="/games/boys-run"><button style={styles.button}>The Boy's Run</button></Link>
          <Link to="/games/zombie-shooter"><button style={styles.button}>Zombie Shooter</button></Link>
        </div>
      </section>

      {/* Game Routes */}
      <Routes>
        <Route path="memory" element={<GameWrapper><MemoryGame /></GameWrapper>} />
        <Route path="catch-tiger" element={<GameWrapper><CatchTiger /></GameWrapper>} />
        <Route path="defend-camp" element={<GameWrapper><DefendCamp /></GameWrapper>} />
        <Route path="zombie-dodge" element={<GameWrapper><ZombieDodge /></GameWrapper>} />
        <Route path="boys-run" element={<GameWrapper><BoysRun /></GameWrapper>} />
        <Route path="zombie-shooter" element={<GameWrapper><TopdownZombieShooter /></GameWrapper>} />
      </Routes>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "transparent",
    color: "#ddd",
    minHeight: "100vh",
    padding: "40px 20px",
    textAlign: "center",
    fontFamily: "'Times New Roman', serif",
  },
  navSection: {
    marginBottom: "50px",
  },
  title: {
    color: "#1e90ff",
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "20px",
    textShadow: "0 0 10px rgba(30,144,255,0.6), 0 10px 20px rgba(0,0,0,0.8)",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    fontFamily: "'Times New Roman', serif",
    padding: "12px 25px",
    fontSize: "16px",
    backgroundImage: "linear-gradient(to bottom right, #001931ff, #002343ff)",
    color: "#1e90ff",
    textShadow: "0 0 10px rgba(30,144,255,0.6), 0 10px 20px rgba(0,0,0,0.8)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
