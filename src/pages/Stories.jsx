// src/pages/Stories.js
import React, { useState, useEffect, useRef } from "react";
import "../App.css";

export default function Stories({ onDataLoaded }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const localData = [
      {
        title: "In The World of War",
        cover: "ITWOW.webp",
        link: "https://writersaps.medium.com/a-day-he-woke-up-66010844f89e",
        genre: "Sci-Fi",
        synopsis:
          "In a world full of War, Dr. SAPS must unravel humanity's mistakes before it's too late.",
      },
      {
        title: "As The Angel Wished",
        cover: "ATAW.webp",
        link: "https://medium.com/@yourusername/whispers-in-the-dark-67890",
        genre: "Fantasy",
        synopsis: "The Angel gave him six. Could he give her the seventh?",
      },
      {
        title: "Coming Soon",
        cover: "/assets/stories/story3.jpg",
        link: "https://medium.com/@yourusername/journey-beyond-abcde",
        genre: "TBA",
        synopsis: "TBA",
      },
    ];

    setStories(localData);
    if (onDataLoaded) onDataLoaded();
  }, [onDataLoaded]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Short Stories</h1>

      <div style={styles.grid}>
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </div>

      <p style={styles.hint}>
        Desktop: Hover to see description, click to open. <br />
        Mobile: Tap once to see description, tap again to open.
      </p>
    </div>
  );
}

// --- StoryCard ---
function StoryCard({ story }) {
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false);

  const isTouchDevice = useRef(
    "ontouchstart" in window || navigator.maxTouchPoints > 0
  ).current;

  // Desktop hover
  const handleMouseEnter = () => {
    if (!isTouchDevice) setHover(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setHover(false);
    setTapped(false);
  };

  // Click / Tap
  const handleClick = (e) => {
    if (isTouchDevice) {
      e.preventDefault();
      if (!tapped) {
        setTapped(true);
      } else {
        window.open(story.link, "_blank");
      }
    } else {
      window.open(story.link, "_blank");
    }
  };

  const showInfo = isTouchDevice ? tapped : hover;

  return (
    <div
      className="story-card"
      style={{
        ...styles.card,
        transform: showInfo ? "scale(1.05)" : "scale(1)",
        zIndex: showInfo ? 2 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/${story.cover}`}
        alt={story.title}
        loading="lazy"
        style={styles.image}
      />

      {showInfo && (
        <div style={styles.hoverInfo}>
          <div style={styles.hoverInfoBackground}></div>
          <div style={styles.hoverInfoText}>
            <h3 style={styles.storyTitle}>{story.title}</h3>
            <p style={styles.genre}>{story.genre}</p>
            <p style={styles.synopsis}>{story.synopsis}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- STYLES ---
const styles = {
  container: {
    backgroundColor: "transparent",
    color: "#ddd",
    minHeight: "100vh",
    padding: "40px 20px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "36px",
    color: "#1e90ff",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    justifyItems: "center",
  },
  card: {
    textDecoration: "none",
    color: "#ddd",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    width: "100%",
    maxWidth: "220px",
  },
  image: {
    width: "100%",
    objectFit: "contain",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
    display: "block",
  },
  hoverInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    maxHeight: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    textAlign: "left",
    pointerEvents: "none",
    overflow: "visible",
  },
  hoverInfoBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)",
    borderRadius: "0 0 10px 10px",
    zIndex: 0,
  },
  hoverInfoText: {
    position: "relative",
    zIndex: 1,
    color: "#fff",
    padding: "10px",
  },
  storyTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    margin: "0 0 5px 0",
  },
  genre: {
    fontSize: "0.85rem",
    color: "#1e90ff",
    margin: "0 0 5px 0",
  },
  synopsis: {
    fontSize: "0.8rem",
    color: "#ddd",
    margin: 0,
  },
  hint: {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#aaa",
  },
};
