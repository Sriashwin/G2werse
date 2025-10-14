import React from "react";

const Zombie = ({ x, y }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "30px",
        height: "30px",
        backgroundColor: "#f00",
        left: x,
        top: y,
        borderRadius: "5px",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Zombie;