import React from "react";

const Bullet = ({ x, y }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "10px",
        height: "10px",
        backgroundColor: "#0f0",
        left: x,
        top: y,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Bullet;