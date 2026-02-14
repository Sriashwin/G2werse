// src/pages/Home.jsx
import { Instagram, PenTool, Youtube } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
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

  /* ---------------- HERO SLIDER DATA ---------------- */
  const slides = [
    {
      title: "Featured Update",
      subtitle: "An Epic Myth Of Love is now live!",
      image: `${process.env.PUBLIC_URL}/assets/slide1.webp`,
    },
    {
      title: "Upcoming Content",
      subtitle: "ENTROPY trilogy will be available soon...",
      image: `${process.env.PUBLIC_URL}/assets/slide2.webp`,
    },
    {
      title: "Major Project",
      subtitle: "Stay tuned for A Rise Of The War!",
      image: `${process.env.PUBLIC_URL}/assets/slide3.webp`,
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  /* ---------------- AUTO SLIDE EFFECT ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  /* ---------------- MOBILE SWIPE SUPPORT ---------------- */
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = touchStartX.current;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    } else {
      setActiveSlide((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
    }
  };

  /* ---------------- DESKTOP DETECTION ---------------- */
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 900);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div style={styles.container}>
      {/* HERO SLIDER */}
      <section
        style={styles.heroSlider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            ...styles.slide,
            backgroundImage: `url(${slides[activeSlide].image})`,
          }}
        >
          <div style={styles.overlay}>
            <h2 style={styles.slideTitle}>{slides[activeSlide].title}</h2>
            <p style={styles.slideSubtitle}>{slides[activeSlide].subtitle}</p>
          </div>
        </div>

        {/* Dots */}
        <div style={styles.dots}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              style={{
                ...styles.dot,
                opacity: idx === activeSlide ? 1 : 0.4,
              }}
              onClick={() => setActiveSlide(idx)}
            />
          ))}
        </div>
      </section>

      {/* HERO TEXT */}
      <section style={styles.hero}>
        <h1 style={styles.title}>G2WERSE</h1>
        <p style={styles.text}>
          G2werse is the creative universe that connects all my works in one
          place. It is a space where poetry, fiction, and upcoming novels come
          together as parts of a larger journey.
        </p>
      </section>

      {/* ABOUT SECTION (NO CARD) */}
      <section style={styles.section}>
        <div
          style={{
            ...styles.aboutLayout,
            flexDirection: isDesktop ? "row" : "column",
          }}
        >
          {/* LEFT SIDE */}
          <div style={styles.aboutLeft}>
            <h2 style={styles.sectionTitle}>About Me</h2>

            <h3 style={styles.subtitleHero}>
              <b>SRIASHWIN S</b>
            </h3>

            <p style={styles.subtitle}>Author | Storyteller | Poet</p>
          </div>

          {/* RIGHT SIDE */}
          <div style={styles.aboutRight}>
            <p style={styles.aboutText}>
              Sriashwin S. (Writer SAPS) is a young Indian writer currently
              pursuing a B.Tech. He began writing at twelve, drawn early to the
              quiet power of words and to the belief that love is the force that
              beautifies all art.
              <br />
              His poem{" "}
              <i>“Life: For the Mother, By the Mother, Of the Mother”</i> was
              published in the anthology <b>Magic Prevails in Mother</b>.
              <br />
              Alongside poetry, his works are expanding into fiction through his
              philosophical short story series{" "}
              <b>ENTROPY: A Trilogy of Being</b>.
              <br />
              Beyond all, he is working on his debut book, the first entry in a
              seven-part interconnected saga. <b>A Rise Of The War</b> blends
              science fiction and psychological thriller elements.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ CONTACT SECTION (FIXED CARD STYLE) */}
      <section style={styles.contactSection}>
        <div style={styles.contactCard}>
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
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Icon style={styles.icon} />
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  container: {
    backgroundColor: "transparent",
    color: "#ddd",
    fontFamily: "'Times New Roman', serif",
    lineHeight: 1.6,
    minHeight: "100vh",
  },

  /* HERO SLIDER */
  heroSlider: {
    width: "100%",
    marginBottom: "20px",
    overflow: "hidden",
    position: "relative",
  },

  slide: {
    width: "100%",
    aspectRatio: "16 / 9",
    maxHeight: "620px",
    minHeight: "220px",
    backgroundSize: "cover",
    backgroundPosition: "top",
    display: "flex",
    alignItems: "flex-end",
  },

  overlay: {
    width: "100%",
    padding: "25px",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0))",
  },

  slideTitle: {
    fontSize: "1.6rem",
    color: "#1e90ff",
    margin: 0,
    textShadow: "0 0 6px rgb(0, 0, 0)",
  },

  slideSubtitle: {
    fontSize: "1.1rem",
    margin: 0,
  },

  dots: {
    position: "absolute",
    bottom: "12px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#1e90ff",
    cursor: "pointer",
  },

  /* HERO TEXT */
  hero: {
    textAlign: "center",
    marginBottom: "60px",
  },

  title: {
    color: "#1e90ff",
    fontSize: "2.5rem",
  },

  text: {
    width: "90%",
    maxWidth: "750px",
    margin: "0 auto",
    textAlign: "center",
    fontSize: "1.05rem"
  },

  /* ABOUT SECTION */
  section: {
    marginBottom: "90px",
    display: "flex",
    justifyContent: "center",
  },

  aboutLayout: {
    width: "90%",
    maxWidth: "1000px",
    display: "flex",
    gap: "50px",
  },

  aboutLeft: {
    flex: 1,
    textAlign: "center",
  },

  aboutRight: {
    flex: 2,
  },

  aboutText: {
    textAlign: "justify",
    fontSize: "1.05rem",
    color: "#ddd",
    margin: 0,
  },

  sectionTitle: {
    fontSize: "2rem",
    color: "#1e90ff",
    marginBottom: "15px",
  },

  subtitleHero: {
    margin: 0,
    fontSize: "1.4rem",
  },

  subtitle: {
    marginTop: "10px",
    color: "#aaa",
  },

  /* ✅ CONTACT FIXED (CARD CENTERED) */
  contactSection: {
    display: "flex",
    justifyContent: "center",
    padding: "0 15px",
    marginBottom: "80px",
  },

  contactCard: {
    width: "fit-content",
    maxWidth: "550px",
    minWidth: "250px",

    padding: "28px 40px",

    borderRadius: "22px",
    background: "rgba(0,15,35,0.55)",
    boxShadow: "0 0 30px rgba(0,0,0,0.65)",

    textAlign: "center",
  },

  socialLinks: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "25px",
    marginTop: "25px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 22px",
    borderRadius: "12px",
    textDecoration: "none",
    background: "rgba(255,255,255,0.05)",
    transition: "0.25s ease",
  },

  icon: {
    width: "20px",
    height: "20px",
  },
};
