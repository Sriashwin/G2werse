// src/Novel/book1.jsx
import React from "react";
const trailerLink = "https://youtu.be/FTI6dncKWdE?si=U-EwfJ8Tocf9wA1w";

export default function Book1() {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>A Rise Of The War</h1>

      {/* Cover Image clickable to Trailer */}
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
    <a
        href={trailerLink}
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
        src="/AROTW.png"
        alt="A Rise Of The War - Cover"
        style={styles.coverImage}
        />
    </a>
    </div>

      {/* Synopsis */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Blurb</h2>
        <p style={styles.text}>
          Black and blue crystals shone, sparkles striking each other in rhythmic beats like a thought—fragile yet powerful enough to change the world. Some gave rise to civilizations, while others gave rise to war and turned them to dust. Once born, they were nearly impossible to eradicate. It was from a bracelet hanging near the dressing table's mirror. The bracelet gleamed as though it had captured such a thought from his brain, or maybe it would remember the shattering moment which held their last meet. He was never meant to remember. But the world won't let him forget.
          <br /><br />
          For nine years, he thought that the child he grew would be a ray of hope and revive him, only for everything to shatter right after. The REX Unleashed.
          <br /><br />
          Later, in the world of burning cities and ever-evolving threats, scientists were racing, trying to find a cure. Some truths, however, are sealed for a reason—like the past—is now clawing its way back. With every answer comes a price, causing the balance of the decaying world to tilt dangerously close to a complete collapse.
        </p>
      </div>

      {/* Theme */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Theme</h2>
        <p style={styles.text}>
          We fight for control to protect what we love. But sometimes, that fight becomes the very chaos we feared.
        </p>
      </div>
      {/* Virus Analysis */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Virus Analysis</h2>
        <p style={styles.text}>
          <strong>Zovirex Voracis:</strong> The virus is highly adaptive, targeting human cells and microbes to produce reanimation-like behavior. It spreads rapidly via contact, air, and even contaminated surfaces. Once infected, hosts exhibit heightened aggression and coordinated swarm behavior. Scientists in the story are racing against time to understand its genetic structure and develop a potential cure.
        </p>
      </div>

      {/* Timeline */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Timeline of Events</h2>
        <ul style={styles.timeline}>
          <li><strong>2024 Feb 27:</strong> Hollow Flame incident in Tamil Nadu, India.</li>
          <li><strong>2025:</strong> Initial outbreak of Zovirex Voracis globally.</li>
          <li><strong>2026:</strong> Formation of RIMSORN to combat virus and save civilians.</li>
          <li><strong>2027:</strong> Discovery of key genetic markers and potential cure.</li>
          <li><strong>2030:</strong> Final conflict as the virus evolves beyond containment.</li>
        </ul>
      </div>

      {/* Iconic Dialogues */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Iconic Dialogues</h2>
        <ul style={styles.dialogues}>
          <li>"A God who can change everything is now wishing for a change."</li>
          <li>"If I have to repeat the same, then it would never be a word again. You know them."</li>
        </ul>
      </div>

      {/* Hollow Flame Conspiracy */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Hollow Flame<br/>27 Feb 2024 | Tamil Nadu, India</h3>
        <p style={styles.text}>
          Several students died in a fire incident at a private school in Tamil Nadu on February 27. The incident was reported by authorities as a cause of an electrical short-circuit, termed a tragic accident. 
          <br /><br />
          However, witness accounts tell a more terrifying tale. Some residents report blood stains and signs of a struggle inconsistent with a normal fire. Online posts about the incident are being deleted, and rumors circulate about a diary titled "Lies" belonging to one of the victims, possibly containing the truth.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#ddd",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.6,
    padding: "40px 20px",
    minHeight: "100vh",
  },
  title: {
    color: "#1e90ff",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    textAlign: "center",
    marginBottom: "20px",
  },
  coverImage: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto 30px auto",
    display: "block",
    borderRadius: "15px",
    boxShadow: "0 0 20px #1e90ff",
  },
  section: {
    marginBottom: "30px",
    padding: "0 10px",
  },
  sectionTitle: {
    color: "#00f",
    fontSize: "1.5rem",
    marginBottom: "12px",
    borderBottom: "1px solid #1e90ff",
    paddingBottom: "4px",
  },
  text: {
    fontSize: "1rem",
    color: "#ddd",
    whiteSpace: "pre-line",
  },
  trailerLink: {
    fontSize: "1.1rem",
    color: "#1e90ff",
    textDecoration: "underline",
  },
  timeline: {
    listStyleType: "disc",
    paddingLeft: "20px",
    color: "#ddd",
  },
  dialogues: {
    listStyleType: "circle",
    paddingLeft: "20px",
    color: "#ddd",
  },
};
