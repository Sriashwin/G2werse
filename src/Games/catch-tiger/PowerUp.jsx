import React from "react";

function PowerUp({ power }) {
  return (
    <div style={{
      position: "absolute",
      top: power.y,
      left: power.x,
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: power.type === "speed" ? "#0ff" : "#ff0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
    }}>
      {power.type === "speed" ? "💨" : "❄️"}
    </div>
  );
}

export default PowerUp;
