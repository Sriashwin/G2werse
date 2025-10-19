// src/pages/Home.jsx
import { Instagram, PenTool, Youtube } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [photoHovered, setPhotoHovered] = useState(false);
  const links = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/g2werse?igsh=MW51bD6thlucHloZXBtYQ==",
    },
    {
      name: "Medium",
      icon: PenTool,
      url: "https://writersaps.medium.com/",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@saps27?si=ybsMI70zVkbvDdqV",
    },
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
        {/* Author Photo */}
        <div style={styles.photoWrapper}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/me.webp`}
            alt="Sriashwin S"
            style={{
              ...styles.photo,
              transform: photoHovered ? "scale(1.15)" : "scale(1)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={() => setPhotoHovered(true)}
            onMouseLeave={() => setPhotoHovered(false)}
          />
        </div>
        <br/>
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
          {links.map((link, idx) => {
            const Icon = link.icon;
            const isHovered = hoveredIndex === idx;
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...styles.link,
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  background: isHovered
                    ? "rgba(30,144,255,0.2)"
                    : "rgba(255,255,255,0.05)",
                  color: isHovered ? "#1e90ff" : "#fff",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Icon style={{ ...styles.icon, color: isHovered ? "#1e90ff" : "#fff" }} />
                {link.name}
              </a>
            );
          })}
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
    width: "90%",
    textAlign: "justify",
    textAlignLast: "center",
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
    maxWidth: "950px",
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
  photoWrapper: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
  },
  photo: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 0 50px 2px rgba(30,144,255,0.5)",
    border: "1px double #1e90ff",
  },
};
