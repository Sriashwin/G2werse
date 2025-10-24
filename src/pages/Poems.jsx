// src/pages/Poems.jsx
import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [language, setLanguage] = useState("English");
  const [otherPoems, setOtherPoems] = useState([]);
  const [supportsHover, setSupportsHover] = useState(false);

  const [activeIndexMain, setActiveIndexMain] = useState(0);
  const [activeIndexOther, setActiveIndexOther] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchMoved = useRef(false);

  // Load main poems
  useEffect(() => {
    const file = language === "English" ? "english.json" : "tamil.json";
    fetch(`${process.env.PUBLIC_URL}/json/${file}`)
      .then((res) => res.json())
      .then((data) => setPoems(data))
      .catch((err) => console.error("Error loading poems:", err));
  }, [language]);

  // Load other poems
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/json/others.json`)
      .then((res) => res.json())
      .then((data) => setOtherPoems(data))
      .catch((err) => console.error("Error loading other poems:", err));
  }, []);

  // Detect hover support
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

  // Slider navigation
  const prevCard = (isOther = false) => {
    if (isOther) {
      setActiveIndexOther((prev) => (prev === 0 ? otherPoems.length - 1 : prev - 1));
    } else {
      setActiveIndexMain((prev) => (prev === 0 ? poems.length - 1 : prev - 1));
    }
  };
  const nextCard = (isOther = false) => {
    if (isOther) {
      setActiveIndexOther((prev) => (prev === otherPoems.length - 1 ? 0 : prev + 1));
    } else {
      setActiveIndexMain((prev) => (prev === poems.length - 1 ? 0 : prev + 1));
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchMoved.current = false;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchMoved.current = true;
  };
  const handleTouchEnd = (isOther = false) => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextCard(isOther);
      else prevCard(isOther);
    }
  };

  // Helper to render slider
  const renderSlider = (data, activeIndex, isOther = false) => {
    return (
      <div
        style={sliderStyles.sliderContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => handleTouchEnd(isOther)}
      >
        <button style={sliderStyles.btn} onClick={() => prevCard(isOther)}>
          <ChevronLeft size={32} />
        </button>

        <div style={sliderStyles.cardsWrapper}>
          {data.map((poem, index) => {
            let className = "";
            if (index === activeIndex) className = "active";
            else if (index === (activeIndex - 1 + data.length) % data.length) className = "left";
            else if (index === (activeIndex + 1) % data.length) className = "right";
            else className = "back";

            return (
              <div
                key={index}
                style={{
                  ...sliderStyles.cardPositions[className],
                  width: "300px",
                  height: "300px",
                }}
              >
                <PoemCard
                  poem={poem}
                  supportsHover={supportsHover}
                  showLanguage={isOther}
                  touchMoved={touchMoved}
                />
              </div>
            );
          })}
        </div>

        <button style={sliderStyles.btn} onClick={() => nextCard(isOther)}>
          <ChevronRight size={32} />
        </button>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Love Poems</h1>

      {/* Language Toggle */}
      <div style={styles.languageSelector}>
        <div
          onClick={() => setLanguage(language === "English" ? "Tamil" : "English")}
          style={styles.toggleContainer}
        >
          {/* Sliding Thumb showing selected language */}
          <div
            style={{
              ...styles.toggleThumb,
              left: language === "English" ? "2px" : "calc(50% + 2px)",
            }}
          >
            {language}
          </div>

          {/* Inactive labels behind */}
          <div style={styles.toggleLabels}>
            <span style={{ color: language === "English" ? "#aaa" : "#fff" }}>English</span>
            <span style={{ color: language === "Tamil" ? "#aaa" : "#fff" }}>Tamil</span>
          </div>
        </div>
      </div>

      {/* Main poems slider */}
      {poems.length > 0 && renderSlider(poems, activeIndexMain)}

      {/* Other Poems Slider */}
      {otherPoems.length > 0 && (
        <>
          <h2 style={{ color: "#1e90ff", marginTop: "50px" }}>Other Themes</h2>
          {renderSlider(otherPoems, activeIndexOther, true)}
        </>
      )}

      <p style={styles.hint}>
        Desktop: Hover to see description, click to open. <br />
        Mobile: Swipe to slide, tap twice to open link.
      </p>
    </div>
  );
}

// PoemCard component
function PoemCard({ poem, supportsHover, showLanguage, touchMoved }) {
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

    if (touchMoved.current) {
      touchMoved.current = false;
      return;
    }

    if (!tappedOnce) {
      setTappedOnce(true);
      tapTimeout.current = setTimeout(() => setTappedOnce(false), 1000);
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
      onTouchStart={() => (touchMoved.current = false)}
      onTouchMove={() => (touchMoved.current = true)}
    >
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

      <div
        style={{
          ...styles.lineContainer,
          opacity: showInfo ? 1 : 0.6,
          filter: showInfo ? "blur(0)" : "blur(2px)",
          transform: showInfo ? "translateY(0)" : "translateY(5px)",
          transition: "opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease",
        }}
      >
        {poem.lines.slice(0, 4).map((line, idx) => (
          <p
            key={idx}
            style={{
              ...styles.line,
              opacity: showInfo ? 1 : idx === 0 ? 0.75 : 0,
              transition: "opacity 0.3s ease",
              lineHeight: 1.35,
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
  toggleContainer: {
    width: "200px",
    height: "40px",
    borderRadius: "20px",
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#111",
    padding: "2px",
    userSelect: "none",
  },
  toggleThumb: {
    position: "absolute",
    top: "2px",
    width: "calc(50% - 4px)",
    height: "40px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    color: "#fff",
    fontWeight: 600,
    transition: "left 0.3s ease",
    zIndex: 2,
  },
  toggleLabels: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 25px",
    fontWeight: 600,
    zIndex: 1,
    pointerEvents: "none",
  },
  poemCard: {
    width: "100%",
    height: "100%",
    borderRadius: "25px",
    overflow: "hidden",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
    backgroundColor: "#0d022aff",
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
    padding: "10px",
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
  },
};

/* Slider Styles */
const sliderStyles = {
  sliderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "nowrap",
    marginBottom: "40px",
    overflow: "hidden",
    position: "relative",
  },
  cardsWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
    minHeight: "300px",
  },
  btn: {
    background: "transparent",
    border: "none",
    color: "#1e90ff",
    cursor: "pointer",
    zIndex: 10,
  },
  cardPositions: {
    left: {
      transform: "translateX(-40%) scale(0.9)",
      zIndex: 2,
      opacity: 0.7,
      position: "absolute",
      filter: "blur(3px)",
      transition: "all 0.4s ease",
    },
    right: {
      transform: "translateX(40%) scale(0.9)",
      zIndex: 2,
      opacity: 0.7,
      position: "absolute",
      filter: "blur(3px)",
      transition: "all 0.4s ease",
    },
    active: {
      transform: "translateX(0) scale(1)",
      zIndex: 5,
      opacity: 1,
      position: "absolute",
      transition: "all 0.4s ease",
    },
    back: {
      transform: "translateX(0) scale(0.7)",
      zIndex: 0,
      opacity: 0,
      position: "absolute",
      transition: "all 0.4s ease",
    },
  },
};
