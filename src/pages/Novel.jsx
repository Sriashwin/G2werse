// src/pages/Novel.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Novel() {
  const novels = [
    {
      image: "book1.png",
      locked: false,
      link: "/novel/book1",
      title: "A Rise Of The War",
      genre: "Psychological | Sci-fi Thriller",
      synopsis: "Fallen hero in a forsaken world fighting a never-ending war",
    },
    {
      image: "book2.png",
      locked: true,
      link: "/novel/book2",
      title: "A War Lies Within",
      genre: "Crime Thriller",
      synopsis: "The night, many died. But the one death mattered.",
    },
    {
      image: "book3.png",
      locked: true,
      link: "/novel/book3",
      title: "To Let A War Begin",
      genre: "Sci-Fi | Spy Thriller",
      synopsis: "Could he save the world? Or at least, his family?",
    },
    {
      image: "book4.png",
      locked: true,
      link: "/novel/book4",
      title: "Pride To War A Prime",
      genre: "Political Thriller",
      synopsis: "Finally, a spark had born from ashes to lead the war.",
    },
    {
      image: "book5.png",
      locked: true,
      link: "/novel/book5",
      title: "Project: Written A War",
      genre: "Sci-Fi | Horror",
      synopsis: "In the dark expanse of space, the history threatens the future.",
    },
    {
      image: "book6.png",
      locked: true,
      link: "/novel/book6",
      title: "Once Upon In The war",
      genre: "Fantasy",
      synopsis: "War isn't what borns on each era. It is what takes its form.",
    },
    {
      image: "book7.png",
      locked: true,
      link: "/novel/book7",
      title: "A War We Wanted Once",
      genre: "War Thriller",
      synopsis: "An inevitable end for the war against reality",
    },
  ];

  const topRow = novels.slice(0, 4);
  const bottomRow = novels.slice(4);

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Novels</h1>

      <div style={styles.row}>
        {topRow.map((book, index) => (
          <NovelCard key={index} book={book} />
        ))}
      </div>

      <div style={styles.row}>
        {bottomRow.map((book, index) => (
          <NovelCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
function NovelCard({ book }) {
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
    <div
      style={{
        ...styles.novelCard,
        transform: hover ? "scale(1.1)" : "scale(1)",
        zIndex: hover ? 5 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Link to={book.locked ? "#" : book.link} style={styles.fullLink}>
        <img src={`${process.env.PUBLIC_URL}/${book.image}`} alt="Book Cover" style={styles.novelImage} />
      </Link>

      {book.locked && <div style={styles.lockedOverlay}>TBA</div>}

      <div
        className={`novel-hover-info${hover && !book.locked ? " active" : ""}`}
        style={styles.hoverInfo}
      >
        <h3 style={styles.bookTitle}>{book.title}</h3>
        <p style={styles.genre}>{book.genre}</p>
        <p style={styles.synopsis}>{book.synopsis}</p>
      </div>
    </div>
  );
}


const styles = {
  container: {
    backgroundColor: "transparent",
    color: "#ddd",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.6,
    padding: "40px 20px",
    minHeight: "100vh",
    textAlign: "center",
  },
  pageTitle: {
    color: "#1e90ff",
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "40px",
  },
  row: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "40px",
  },
  novelCard: {
    position: "relative",
    width: "180px",
    height: "270px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    backgroundColor: "#111",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  novelImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  lockedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    color: "#ff4d4d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "1.2rem",
    zIndex: 3,
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
    zIndex: 4,
    textAlign: "left",
    maxHeight: "50%",
    overflow: "hidden",
  },
  bookTitle: {
    fontSize: "0.90rem",
    fontWeight: 500,
    margin: "0 0 5px 0",
  },
  genre: {
    fontSize: "0.75rem",
    color: "#1e90ff",
    margin: "0 0 5px 0",
  },
  synopsis: {
    fontSize: "0.70rem",
    color: "#ddd",
    margin: 0,
  },
  fullLink: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    textDecoration: "none",
    zIndex: 1,
  },
};
