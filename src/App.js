import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { imagesToPreload, preloadImages } from "./preloadImages";

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
  const [fadeOut, setFadeOut] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Preload images
  useEffect(() => {
    preloadImages(imagesToPreload);
  }, []);

  // Preloader video logic
  useEffect(() => {
    const video = document.getElementById("preloader-video");
    const handleEnded = () => {
      setFadeOut(true);
      setTimeout(() => setShowPreloader(false), 500);
    };
    if (video) {
      video.currentTime = 0;
      video.playbackRate = 3;
      video.play().catch(() => console.warn("Autoplay blocked"));
      video.addEventListener("ended", handleEnded);
    }
    const timeoutId = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowPreloader(false), 500);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
      if (video) video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* PRELOADER */}
      {showPreloader && (
        <div className={`preloader ${fadeOut ? "fade-out" : "fade-in"}`}>
          <video
            id="preloader-video"
            className="preloader-video"
            src={`${process.env.PUBLIC_URL}/assets/intro.webm`}
            autoPlay
            preload="auto"
            muted
            playsInline
          />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={styles.appContainer}>
        {/* HERO SECTION
        <div style={styles.heroSection}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/banner.webp`}
            alt="A Rise of the War"
            style={styles.heroImage}
          />
          <div style={styles.heroOverlay}>
            <h1 style={styles.heroTitle}>G2WERSE</h1>
            <p style={styles.heroSubtitle}>
              A Fallen Hero in a Forsaken World Fighting a Never-ending War
            </p>
          </div>
        </div> */}

        {/* NAVBAR */}
        <nav style={styles.navbar}>
          <div style={styles.navContainer}>
            {/* Logo + Title */}
            <div style={styles.navLogoSection}>
              <img
                src={`${process.env.PUBLIC_URL}/g2w.ico`}
                alt="logo"
                style={styles.logo}
              />
              <p style={styles.navTitle}>G2WERSE</p>
            </div>

            {/* Hamburger Button */}
            <button
              className={`menu-toggle ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>

            {/* Menu Links */}
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
              {["Home", "Poems", "Stories", "Novel", "Art", "Games"].map(
                (item) => {
                  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                  return (
                    <li key={item} style={styles.navItem}>
                      <NavLink
                        to={path}
                        end
                        className={({ isActive }) =>
                          `nav-link ${isActive ? "active" : ""}`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </NavLink>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
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
        /* --- Preloader --- */
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
        .fade-in { opacity: 1; }
        .fade-out { opacity: 0; visibility: hidden; }

        /* --- Navbar Styling --- */
        nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          background-image: linear-gradient(to bottom, rgba(2, 25, 46, 0.9), rgba(0, 12, 22, 0.9));
          border-bottom: 2px solid rgba(30, 144, 255, 0.5);
          box-shadow: 0 0 10px rgba(30,144,255,0.2);
        }

        .nav-links {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          transition: all 0.3s ease;
        }

        .nav-link {
          color: #9dc9ff;
          text-decoration: none;
          font-weight: 600;
          position: relative;
          padding: 0.5rem 0.8rem;
          font-size: clamp(0.8rem, 2vw, 1rem);
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background-color: #1e90ff;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: #1e90ff;
          text-shadow: 0 0 6px #1e90ff;
        }

        /* Active Tab */
        .nav-link.active {
          color: #fff;
          text-shadow: 0 0 12px #1e90ff, 0 0 24px #1e90ff;
        }
        .nav-link.active::after {
          width: 100%;
          background-color: #1e90ff;
        }

        /* --- Mobile Navbar --- */
        .menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1100;
          transition: all 0.3s ease;
        }
        .menu-toggle .bar {
          width: 18px;
          height: 2px;
          background-color: #1e90ff;
          margin: 3px 0;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .menu-toggle.open .bar:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .menu-toggle.open .bar:nth-child(2) {
          opacity: 0;
        }
        .menu-toggle.open .bar:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        @media (max-width: 768px) {
          .menu-toggle { display: flex; }

          .nav-links {
            position: absolute;
            top: 60px;
            right: 0;
            justify-content: center;
            background: rgba(0, 0, 0, 0.95);
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 0;
            overflow: hidden;
            opacity: 0;
            transition: all 0.4s ease;
            backdrop-filter: blur(10px);
          }

          .nav-links.open {
            position: absolute;
            top: 55px;
            right: 15px;
            background: linear-gradient(to top left, #001931ff, #000e1aff);
            flex-direction: column;
            align-items: center;
            width: 85%;               /* narrower menu */
            max-width: 150px;         /* limit width */
            border-radius: 8px;
            height: auto;
            opacity: 0.9;
            padding: 1rem 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          }


          .nav-link {
            display: block;
            padding: 1rem 0;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-link:last-child { border-bottom: none; }
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
    backgroundImage: "linear-gradient(to top left, #001931ff, #000000)",
    minHeight: "100vh",
    color: "#ddd",
    fontFamily: "'Times New Roman', serif",
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
    filter: "brightness(50%)",
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
    padding: "10px 0 0 0",
    fontFamily: "'Times New Roman', serif",
    fontSize: "clamp(1.4rem, 5vw, 3rem)",
    fontWeight: 700,
    margin: 0,
    textShadow: "0 2px 4px rgba(0,0,0,0.6)",
  },
  heroSubtitle: {
    fontFamily: "'Times New Roman', serif",
    fontSize: "clamp(0.75rem, 2.4vw, 1.1rem)",
    marginTop: "8px",
    fontWeight: "600",
    color: "#ccc",
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  },
  navbar: {
    padding: "0.8rem 0.5rem",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.1rem 0.7rem",
    position: "relative",
  },
  navLogoSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logo: {
    width: "36px",
    height: "36px",
    filter: "drop-shadow(0 0 8px #1e90ff)",
    transition: "transform 0.3s ease, filter 0.3s ease",
  },
  navTitle: {
    color: "#1e90ff",
    fontWeight: "700",
    fontSize: "1.3rem",
    letterSpacing: "1px",
    textShadow: "0 0 6px #0c71edff",
    transition: "color 0.3s ease, text-shadow 0.3s ease",
  },
  navItem: {
    listStyle: "none",
  },
  routeContainer: {
    paddingBottom: "2rem",
  },
};
