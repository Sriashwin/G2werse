// src/pages/Home.jsx
import { Instagram, PenTool, Youtube } from "lucide-react";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Gate To War</h1>
        <h3 style={styles.subtitleHero}>
          Greatest Awakening Towards Evolution To War Against Reality
        </h3>
        <h3 style={styles.subtitleHero}>
          SRIASHWIN S
        </h3>
        <p style={styles.subtitle}>Author | Storyteller | Poet</p>
      </section>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Me</h2>
        <p style={styles.text}>
          Sriashwin. S, a B.Tech AI & DS student, began his storytelling journey at twelve and was deeply inspired by his English teacher at fifteen. Driven by a passion for crafting unpredictable and emotionally resonant narratives, he spent three years honing his skills to complete his debut book.
His poem “Life: For the Mother, By the Mother, Of the Mother” was published in the book Magic Prevails in Mother. He has written around thirty poems in both English and Tamil on Blogspot and other platforms, consistently showcasing his literary talent. Top ranks and consistent love for writing adds a jewel to his profile.
His debut book lays the foundation for a seven-part interconnected saga, blending science fiction, thriller and horror. Set against apocalyptic backdrops of war and the undead, the series goes beyond conventional horror, exploring themes of love, mystery, futuristic science and the human condition, where zombies serve as the thread weaving an unforgettable narrative.
        </p>
      </section>

      {/* Contact Section */}
      <section style={styles.contact}>
        <h2 style={styles.sectionTitle}>Contact</h2>
        <div style={styles.socialLinks}>
          <a
            href="https://www.instagram.com/g2werse?igsh=MW51bD6thlucHloZXBtYQ=="
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            <Instagram style={styles.icon} /> Instagram
          </a>
          <a
            href="https://writersaps.medium.com/"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            <PenTool style={styles.icon} /> Medium
          </a>
          <a
            href="https://youtube.com/@saps27?si=ybsMI70zVkbvDdqV"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            <Youtube style={styles.icon} /> YouTube
          </a>
        </div>
      </section>
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

  // HERO SECTION
  hero: {
    textAlign: "center",
    marginBottom: "60px",
    padding: "0 10px",
  },
  title: {
    color: "#1e90ff",
    marginBottom: "15px",
    fontWeight: "700",
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    lineHeight: 1.2,
  },
  subtitleHero: {
    color: "#ccc",
    fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
    fontWeight: "500",
    margin: "10px 0 20px 0",
  },
  subtitle: {
    fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
    color: "#aaa",
    marginBottom: "30px",
  },

  // ABOUT SECTION
  section: {
    marginBottom: "60px",
    textAlign: "center",
    padding: "0 10px",
  },
  sectionTitle: {
    fontSize: "clamp(1.4rem, 3vw, 2rem)",
    color: "#1e90ff",
    marginBottom: "20px",
    fontWeight: "600",
  },
  text: {
    width: "60%",
    textAlign: "justify",
    textAlignLast: "center",
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
    maxWidth: "750px",
    margin: "0 auto",
    color: "#ddd",
  },

  // CONTACT SECTION
  contact: {
    padding: "50px 20px",
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center",
    borderRadius: "15px",
    maxWidth: "900px",
    margin: "0 auto",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "25px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
    textDecoration: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    transition: "all 0.3s ease",
  },
  icon: {
    width: "22px",
    height: "22px",
  },
};
