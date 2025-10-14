import React from "react";

function Tiger({ position }) {
  return (
    <div style={{
      position: "absolute",
      width: "50px",
      height: "50px",
      backgroundColor: "#ff4500",
      borderRadius: "10px",
      top: position.y,
      left: position.x,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "28px",
    }}>
      🐅
    </div>
  );
}

export default Tiger;
