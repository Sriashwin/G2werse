//pages/Stories.js
import React, { useState, useEffect, useRef } from "react"; 
import '../App.css';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function Stories({ onDataLoaded }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const q = query(collection(db, "stories"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const storiesData = querySnapshot.docs.map(doc => doc.data());
        setStories(storiesData);

        if (onDataLoaded) onDataLoaded(); // signal App.js
      } catch (error) {
        console.error("Error fetching stories:", error);
        if (onDataLoaded) onDataLoaded(); // still signal to prevent infinite loader
      }
    }

    fetchStories();
  }, [onDataLoaded]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Short Stories</h1>
      <div style={styles.grid}>
        {stories.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </div>
    </div>
  );
}

// --- StoryCard ---
function StoryCard({ story }) {
  const [hover, setHover] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => setHover(true), 300);
  };
  const handleTouchEnd = () => {
    clearTimeout(timerRef.current);
    setHover(false);
  };

  return (
    <a
      href={story.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...styles.card,
        transform: hover ? "scale(1.05)" : "scale(1)",
        zIndex: hover ? 2 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={`${process.env.PUBLIC_URL}/${story.cover}`} alt={story.title} style={styles.image} />
      <div
        className={`hover-info-animate${hover ? " active" : ""}`}
        style={styles.hoverInfo}
      >
        <h3 style={styles.storyTitle}>{story.title}</h3>
        <p style={styles.genre}>{story.genre}</p>
        <p style={styles.synopsis}>{story.synopsis}</p>
      </div>
    </a>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    justifyItems: "center",
  },
  card: {
    textDecoration: "none",
    color: "#ddd",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "220px",
    height: "320px",
    objectFit: "cover",
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
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    padding: "10px",
    boxSizing: "border-box",
    maxHeight: "50%",
    overflow: "hidden",
    textAlign: "left",
    borderRadius: "0 0 10px 10px",
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
};
