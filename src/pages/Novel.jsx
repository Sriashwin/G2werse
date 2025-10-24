import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Novel() {
  const navigate = useNavigate();

  const novels = [
    {
      image: "book1.webp",
      locked: true,
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
          <NovelCard key={index} book={book} navigate={navigate} />
        ))}
      </div>
      <div style={styles.row}>
        {bottomRow.map((book, index) => (
          <NovelCard key={index} book={book} navigate={navigate} />
        ))}
      </div>

      <p style={styles.hint}>
        Desktop: Hover to see description, click to open. <br />
        Mobile: Tap once to see description, tap again to open.
      </p>
    </div>
  );
}

function NovelCard({ book, navigate }) {
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false);
  const isTouchDevice = useRef(
    "ontouchstart" in window || navigator.maxTouchPoints > 0
  ).current;

  const handleMouseEnter = () => {
    if (!isTouchDevice) setHover(true);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice) setHover(false);
    setTapped(false);
  };

  const handleClick = (e) => {
    if (book.locked) return;

    if (isTouchDevice) {
      e.preventDefault();
      if (!tapped) setTapped(true);
      else navigate(book.link);
    } else {
      navigate(book.link);
    }
  };

  const showInfo = book.locked ? false : isTouchDevice ? tapped : hover;

  return (
    <div
      style={{
        ...styles.novelCard,
        transform: showInfo ? "scale(1.1)" : "scale(1)",
        zIndex: showInfo ? 5 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/${book.image}`}
        alt={book.title}
        style={styles.novelImage}
        draggable="false"
      />

      {book.locked && <div style={styles.lockedOverlay}>TBA</div>}

      {showInfo && !book.locked && (
        <div style={styles.hoverInfo}>
          <h3 style={styles.bookTitle}>{book.title}</h3>
          <p style={styles.genre}>{book.genre}</p>
          <p style={styles.synopsis}>{book.synopsis}</p>
        </div>
      )}
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
    WebkitTapHighlightColor: "transparent",
    userSelect: "none",
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
    maxHeight: "60%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: "0.9rem",
    fontWeight: 500,
    margin: "0 0 5px 0",
  },
  genre: {
    fontSize: "0.75rem",
    color: "#1e90ff",
    margin: "0 0 5px 0",
  },
  synopsis: {
    fontSize: "0.7rem",
    color: "#ddd",
    margin: "0 0 8px 0",
  },
  hint: {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#aaa",
  },
};
