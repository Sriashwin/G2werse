import React from "react";

function Player({ position }) {
  return (
    <div style={{
      position: "absolute",
      width: "50px",
      height: "50px",
      backgroundColor: "#1e90ff",
      borderRadius: "10px",
      top: position.y,
      left: position.x,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
    }}>
      👨
    </div>
  );
}

export default Player;
