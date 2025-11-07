import React from "react";

function Tile({ tile, onClick }) {
    return (
        <div
            onClick={() => onClick(tile)}
            style={{
                width: "80px",
                height: "80px",
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: tile.flipped || tile.matched ? "#1e90ff" : "#000",
                color: "#fff",
                fontSize: "40px",
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(30,144,255,0.6), 0 10px 20px rgba(0,0,0,0.8)",
                userSelect: "none"
            }}
        >
            {tile.flipped || tile.matched ? tile.value : "?"}
        </div>
    );
}

export default Tile; 