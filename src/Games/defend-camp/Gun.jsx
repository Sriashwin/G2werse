import React from "react";

const Gun = ({ x, y }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "30px",
        height: "30px",
        backgroundColor: "#00f",
        left: x,
        top: y,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Gun;