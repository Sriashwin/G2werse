//App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Poems from "./pages/Poems";
import Stories from "./pages/Stories";
import Novel from "./pages/Novel";
import Art from "./pages/Art";
import Games from "./pages/Games";

// Novels
import Book1 from "./Novel/book1";

function AppContent() {
  const location = useLocation();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setFadeOut(false);

    const video = document.getElementById("preloader-video");

    const handleEnded = () => {
      setFadeOut(true);
    };

    if (video) {
      video.currentTime = 0;
      video.playbackRate = 3; // 3x speed
      video.play().catch(() => console.warn("Autoplay blocked"));
      video.addEventListener("ended", handleEnded);
    }

    const timeoutId = setTimeout(() => {
      setFadeOut(true);
    }, 4000); // safety fallback

    return () => {
      clearTimeout(timeoutId);
      if (video) video.removeEventListener("ended", handleEnded);
    };
  }, [location]);

  return (
    <div style={{ position: "relative" }}>
      {/* PRELOADER */}
      <div className={`preloader ${fadeOut ? "fade-out" : "fade-in"}`}>
        <video
          id="preloader-video"
          className="preloader-video"
          src={`${process.env.PUBLIC_URL}/intro.mp4`}
          autoPlay
          preload="metadata" 
          muted
          playsInline
        />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ ...styles.appContainer }}>
        {/* HERO SECTION */}
        <div style={styles.heroSection}>
          <img src={`${process.env.PUBLIC_URL}/banner.jpg`} alt="A Rise of the War" style={styles.heroImage} />
          <div style={styles.heroOverlay}>
            <h1 style={styles.heroTitle}>G2WERSE</h1>
            <p style={styles.heroSubtitle}>
              A Fallen Hero in a Forsaken World Fighting a Never-ending War
            </p>
          </div>
        </div>

        {/* NAVBAR */}
        <nav style={styles.navbar}>
          <ul style={styles.navList}>
            {["Home", "Poems", "Stories", "Novel", "Art", "Games"].map((item) => (
              <li key={item} style={styles.navItem}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  style={styles.navLink}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ROUTES */}
        <div style={styles.routeContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poems" element={<Poems />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/novel" element={<Novel />} />
            <Route path="/novel/book1" element={<Book1 />} />
            <Route path="/art" element={<Art />} />
            <Route path="/games/*" element={<Games />} />
          </Routes>
        </div>
      </div>

      {/* STYLES */}
      <style>
        {`
          .preloader {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            background: black;
            overflow: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
          }
          .preloader-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .fade-in {
            opacity: 1;
          }
          .fade-out {
            opacity: 0;
            visibility: hidden;
          }
        `}
      </style>
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/G2werse">
      <AppContent />
    </Router>
  );
}

// --- STYLES ---
const styles = {
  appContainer: {
    backgroundColor: "#000",
    minHeight: "100vh",
    color: "#ddd",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
  },
  heroSection: {
    position: "relative",
    width: "100%",
    height: "auto",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    maxHeight: "70vh",
    filter: "brightness(70%)",
    display: "block",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    padding: "1rem",
    pointerEvents: "none",
  },
  heroTitle: {
    fontSize: "clamp(1.4rem, 5vw, 3rem)",
    fontWeight: 700,
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.6)",
  },
  heroSubtitle: {
    fontSize: "clamp(0.75rem, 2.4vw, 1.1rem)",
    marginTop: "8px",
    color: "#ccc",
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  },
  navbar: {
    backgroundColor: "#111",
    padding: "0.8rem 0.5rem",
    borderBottom: "2px solid #1e90ff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  navItem: { textAlign: "center" },
  navLink: {
    color: "#1e90ff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "clamp(0.8rem, 2.2vw, 1rem)",
    transition: "color 0.3s ease",
  },
  routeContainer: {
    padding: "1rem",
  },
};
