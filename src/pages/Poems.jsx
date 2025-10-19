// src/pages/Poems.jsx
import React, { useEffect, useState, useRef } from "react";

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [language, setLanguage] = useState("English");
  const [otherPoems, setOtherPoems] = useState([]);
  const [supportsHover, setSupportsHover] = useState(false);

  // Load main poems
  useEffect(() => {
    const file = language === "English" ? "english.json" : "tamil.json";
    fetch(`${process.env.PUBLIC_URL}/${file}`)
      .then((res) => res.json())
      .then((data) => setPoems(data))
      .catch((err) => console.error("Error loading poems:", err));
  }, [language]);

  // Load other poems
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/others.json`)
      .then((res) => res.json())
      .then((data) => setOtherPoems(data))
      .catch((err) => console.error("Error loading other poems:", err));
  }, []);

  // detect hover support
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      setSupportsHover(mq.matches);
      const onChange = (e) => setSupportsHover(e.matches);
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else mq.addListener(onChange);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", onChange);
        else mq.removeListener(onChange);
      };
    } else {
      setSupportsHover(false);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Love Poems</h1>

      <div style={styles.languageSelector}>
        <button
          style={{
            ...styles.langButton,
            backgroundColor: language === "English" ? "#1e90ff" : "#333",
          }}
          onClick={() => setLanguage("English")}
        >
          English
        </button>
        <button
          style={{
            ...styles.langButton,
            backgroundColor: language === "Tamil" ? "#1e90ff" : "#333",
          }}
          onClick={() => setLanguage("Tamil")}
        >
          Tamil
        </button>
      </div>

      {/* Main poems */}
      <div style={styles.row}>
        {poems.map((poem, index) => (
          <PoemCard
            key={index}
            poem={poem}
            supportsHover={supportsHover}
            showLanguage={false} // no language for love poems
          />
        ))}
      </div>

      {/* Other Themes Section */}
      {otherPoems.length > 0 && (
        <>
          <h2 style={{ color: "#1e90ff", marginTop: "50px" }}>Other Themes</h2>
          <div style={styles.row}>
            {otherPoems.map((poem, index) => (
              <PoemCard
                key={index}
                poem={poem}
                supportsHover={supportsHover}
                showLanguage={true} // show language label
              />
            ))}
          </div>
        </>
      )}
      <p style={styles.hint}>
        Desktop: Hover to see description, click to open. <br />
        Mobile: Tap once to see description, tap again to open.
      </p>
    </div>
  );
}

function PoemCard({ poem, supportsHover, showLanguage }) {
  const [hover, setHover] = useState(false);
  const [tappedOnce, setTappedOnce] = useState(false);
  const tapTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (supportsHover) setHover(true);
  };
  const handleMouseLeave = () => {
    if (supportsHover) setHover(false);
  };

  const handleClick = (e) => {
    if (supportsHover) {
      window.open(poem.link, "_blank");
      return;
    }

    e.preventDefault();
    if (!tappedOnce) {
      setTappedOnce(true);
      tapTimeout.current = setTimeout(() => setTappedOnce(false), 10000); // 10s to read
      return;
    }
    clearTimeout(tapTimeout.current);
    window.open(poem.link, "_blank");
    setTappedOnce(false);
  };

  const showInfo = supportsHover ? hover : tappedOnce;

  return (
    <div
      style={{
        ...styles.poemCard,
        transform: showInfo ? "scale(1.05)" : "scale(1)",
        zIndex: showInfo ? 5 : 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Title */}
      <div style={styles.titleWrapper}>
        <div style={styles.poemTitle}>{poem.title}</div>
        <div
          style={{
            height: "2px",
            width: showInfo ? "60%" : "25%",
            backgroundColor: "#1e90ff",
            margin: "6px auto 0",
            borderRadius: "2px",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Lines */}
      <div
        style={{
          ...styles.lineContainer,
          opacity: showInfo ? 1 : 0.6,
          filter: showInfo ? "blur(0)" : "blur(2px)",
          transform: showInfo ? "translateY(0)" : "translateY(5px)",
          transition:
            "opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease",
        }}
      >
        {poem.lines.slice(0, 4).map((line, idx) => (
          <p
            key={idx}
            style={{
              ...styles.line,
              opacity: showInfo ? 1 : idx === 0 ? 0.75 : 0,
              transition: "opacity 0.3s ease",
              lineHeight: "1.35"
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

/* Styles */
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
    marginBottom: "20px",
  },
  languageSelector: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  langButton: {
    padding: "8px 20px",
    fontSize: "0.9rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    transition: "all 0.25s ease",
  },
  row: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  poemCard: {
    width: "300px",
    height: "300px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    backgroundColor: "#111",
    cursor: "pointer",
    padding: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    userSelect: "none",
    transition: "transform 0.3s ease",
  },
  titleWrapper: {
    position: "absolute",
    top: "18px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "86%",
    textAlign: "center",
    pointerEvents: "none",
  },
  poemTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#1e90ff",
    lineHeight: 1.2,
    wordBreak: "break-word",
  },
  lineContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
    color: "#ddd",
    padding: "10px 10px 10px 10px",
  },
  line: {
    fontSize: "0.92rem",
    color: "#ddd",
    margin: "8px 0",
    lineHeight: 1.35,
  },
  hint: {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#aaa",
  }
};
