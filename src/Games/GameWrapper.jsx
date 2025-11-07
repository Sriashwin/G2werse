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
          fontFamily: "'Times New Roman', sans-serif",
          color: "#1e90ff",
          backgroundColor: "#000",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 0 20px #1e90ff",
          margin: "50px auto",
          maxWidth: "600px",
        }}
      >
        <h1 style={{ color: "#ff4d4d", textShadow: "0 0 10px rgba(255, 0, 0, 0.7), 0 10px 20px rgba(0,0,0,0.8)", fontSize: "32px", marginBottom: "20px" }}>
          ⚠️ Mobile Detected!
        </h1>
        <p style={{ fontSize: "18px", textShadow: "0 0 5px rgba(30, 143, 255, 0.75), 0 10px 20px rgba(0,0,0,0.8)", marginBottom: "30px" }}>
          Use Laptop for better experience
        </p>
        <a href={`${process.env.PUBLIC_URL}/games`}
          style={{
            textDecoration: "none",
            backgroundColor: "#1e90ff",
            color: "#000",
            padding: "12px 25px",
            borderRadius: "8px",
            fontSize: "16px",
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
          Go Back
        </a>
      </div>
    );
  }

  return children;
};

export default GameWrapper;
