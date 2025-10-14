// src/Games/GameWrapper.jsx
import React, { useEffect, useState } from "react";

const GameWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iphone|ipad|ipod|windows phone/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          textAlign: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#00f",
          backgroundColor: "#000",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 0 20px #1e90ff",
          margin: "50px auto",
          maxWidth: "600px",
        }}
      >
        <h1 style={{ color: "#ff4500", fontSize: "32px", marginBottom: "20px" }}>
          ⚠️ Mobile Detected!
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          This game is best played on a desktop/laptop to enjoy the full experience.
        </p>
        <a
          href="/games"
          style={{
            textDecoration: "none",
            backgroundColor: "#1e90ff",
            color: "#000",
            padding: "12px 25px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 0 10px #00f",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#00f";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#1e90ff";
            e.target.style.color = "#000";
          }}
        >
          Go Back to Games
        </a>
      </div>
    );
  }

  return children;
};

export default GameWrapper;
