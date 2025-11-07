// src/Novel/book1.jsx
import React, { useEffect, useState, useRef } from "react";

const trailerLink = "https://youtu.be/idWl77Ag_YI?si=VnGZQLkbrqddtqMq";

export default function Book1() {
  const [visibleSections, setVisibleSections] = useState({});
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 100;

        setVisibleSections((prev) => ({
          ...prev,
          [index]: isVisible,
        }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const section = (title, content, idx) => (
    <div
      ref={(el) => (sectionsRef.current[idx] = el)}
      style={{
        ...styles.section,
        opacity: visibleSections[idx] ? 1 : 0,
        transform: visibleSections[idx] ? "translateY(0px)" : "translateY(50px)",
        transition: "all 0.8s ease-out",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHoveredTitle(idx)}
      onMouseLeave={() => setHoveredTitle(null)}
    >
      <h2
        style={{
          ...styles.sectionTitle,
          ...(hoveredTitle === idx ? styles.sectionTitleHover : {}),
        }}
      >
        {title}
      </h2>
      <div style={styles.text}>{content}</div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Floating background glows */}
      <div style={{ ...styles.floatingGlow, top: "10%", left: "15%" }} />
      <div style={{ ...styles.floatingGlow, top: "70%", left: "70%" }} />
      <div style={{ ...styles.floatingGlow, top: "50%", left: "30%" }} />

      {/* Title */}
      <h1 style={styles.title}>A Rise Of The War</h1>

      {/* Cover Image */}
      <div style={styles.coverWrapper}>
        <a href={trailerLink} target="_blank" rel="noopener noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/assets/AROTW.webp`}
            alt="Cover"
            style={styles.coverImage}
          />
        </a>
      </div>

      {/* Sections */}
      {section(
        "Blurb",
        <>
          Black and blue crystals shone, sparkles striking each other in rhythmic beats like a thought—fragile yet powerful enough to change the world. Some gave rise to civilizations, while others gave rise to war and turned them to dust. Once born, they were nearly impossible to eradicate. It was from a bracelet hanging near the dressing table's mirror. The bracelet gleamed as though it had captured such a thought from his brain, or maybe it would remember the shattering moment which held their last meet. He was never meant to remember. But the world won't let him forget. <br />
          For nine years, he thought that the child he grew would be a ray of hope and revive him, only for everything to shatter right after. The REX Unleashed. <br />
          Later, in the world of burning cities and ever-evolving threats, scientists were on track, trying to find a cure. Some truths, however, are sealed for a reason—like the past—is now clawing its way back. With every answer comes a price, causing the balance of the decaying world to tilt dangerously close to a complete collapse.
        </>,
        0
      )}

      {section(
        "Synopsis",
        "Our broken hero reached his lowest point. Right then the world fell. The day of judgement isn't too far. Scientists were rushing to find a cure. Soldiers were dying to save civilians. But the one who can save them all is now fighting to save his son. Will he find his greatest purpose?",
        1
      )}

      {section(
        "Theme",
        "We fight for control to protect what we love. But sometimes, that fight becomes the very chaos we feared.",
        2
      )}

      {section(
        "Virus Analysis",
        <>
          <strong>Zovirex Voracis:</strong> The virus is highly adaptive, targeting human cells and microbes to produce reanimation-like behavior...
        </>,
        3
      )}

      {section(
        "Timeline of Events",
        <ul style={styles.timeline}>
          <li><strong>2024 Feb 27:</strong> Hollow Flame incident in Tamil Nadu, India.</li>
          <li><strong>2025:</strong> Initial outbreak of Zovirex Voracis globally.</li>
          <li><strong>2026:</strong> Formation of RIMSORN to combat virus and save civilians.</li>
          <li><strong>2027:</strong> Discovery of key genetic markers and potential cure.</li>
          <li><strong>2030:</strong> Final conflict as the virus evolves beyond containment.</li>
        </ul>,
        4
      )}

      {/* {section(
        "Iconic Dialogues",
        <div style={styles.dialogues}>
          <p>"A God who can change everything is now wishing for a change."</p>
          <p>"If I have to repeat the same, then it would never be a word again. You know what."</p>
        </div>,
        5
      )} */}

      {section(
        "Prophecy",
        <p style={styles.prophecy}>
          "A spark in ash, with sun in chest,<br/>
          The one shall rise, the son of blest.<br/>
          As shut the sun by the one for rest<br/>
          The dark, the dead crown the crest"
        </p>,
        6
      )}

      {section(
        "Hollow Flame Conspiracy",
        "Several students died in a fire incident at a private school in Tamil Nadu on February 27. The incident was reported as an electrical short-circuit, but witness accounts tell a more terrifying tale...",
        7
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "transparent",
    color: "#eee",
    fontFamily: "'Times New Roman', serif",
    padding: "50px 20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontFamily: "'Times New Roman', serif",
    color: "#1e90ff",
    fontSize: "clamp(3rem, 8vw, 5rem)",
    textAlign: "center",
    marginBottom: "60px",
    letterSpacing: "2px",
    textShadow: "0 0 10px rgba(30, 34, 255,0.8), 0 0 30px rgba(30,144,255,0.6)",
  },
  coverWrapper: {
    position: "relative",
    marginBottom: "60px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  coverImage: {
    width: "100%",
    maxWidth: "650px",
    borderRadius: "25px",
    boxShadow: "0 0 50px rgba(30,144,255,0.6), 0 10px 20px rgba(0,0,0,0.8)",
    transition: "transform 0.5s ease, box-shadow 0.5s ease",
    cursor: "pointer",
  },
  section: {
    marginBottom: "50px",
    padding: "35px",
    maxWidth: "900px",
    width: "100%",
    background: "linear-gradient(to bottom right, #001931ff, #000000)",
    borderRadius: "25px",
    boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 10px rgba(30,144,255,0.15)",
    backdropFilter: "blur(5px)",
    transition: "all 0.3s ease",
  },
  sectionTitle: {
    color: "#1e90ff",
    fontSize: "1.9rem",
    marginBottom: "18px",
    paddingBottom: "4px",
    fontWeight: 600,
    letterSpacing: "1px",
    textShadow: "0 0 6px rgba(30,144,255,0.5)",
    position: "relative",
    display: "inline-block",
    backgroundImage: "linear-gradient(to right, #1e90ff, #00f)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 100%",
    backgroundSize: "50px 2px",
    transition: "all 0.3s ease",
  },
  sectionTitleHover: {
    textShadow: "0 0 15px rgba(30,144,255,0.8)",
    backgroundSize: "80px 3px",
  },
  text: {
    fontSize: "1.1rem",
    color: "#ddd",
    textAlign: "justify",
    lineHeight: 2,
    wordSpacing: "2px",
    marginTop: "15px",
    letterSpacing: "0.5px",
  },
  timeline: {
    listStyleType: "circle",
    paddingLeft: "30px",
    color: "#ddd",
    fontSize: "1.05rem",
    lineHeight: 1.9,
  },
  // dialogues: {
  //   ontFamily: "'Cormorant Garamond', serif",
  //   fontSize: "1.3rem",
  //   color: "#f0f8ff",
  //   textAlign: "center",
  //   lineHeight: 2,
  //   letterSpacing: "1px",
  //   marginTop: "25px",
  //   textShadow: "0 0 15px rgba(30,144,255,0.5)",
  // },
  prophecy: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    color: "#f0f8ff",
    textAlign: "center",
    lineHeight: 2,
    letterSpacing: "1px",
    marginTop: "25px",
    textShadow: "0 0 15px rgba(30,144,255,0.5)",
    fontStyle: "italic",
  },
  trailerLink: {
    fontSize: "1.2rem",
    color: "#1e90ff",
    textDecoration: "none",
    padding: "10px 20px",
    border: "2px solid #1e90ff",
    borderRadius: "15px",
    transition: "all 0.3s ease",
    display: "inline-block",
    marginTop: "20px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(30,144,255,0.5)",
  },
  floatingGlow: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(30,144,255,0.3) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(100px)",
    pointerEvents: "none",
    zIndex: 0,
  },
};
