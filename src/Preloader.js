import React, { useEffect, useState } from "react";

export default function Preloader({ onFinish, videoSrc, fallbackImage }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById("preloader-video");

    const handleEnded = () => {
      setFadeOut(true);
      setTimeout(onFinish, 800); // matches fade animation
    };

    // Video events
    if (video) {
      video.addEventListener("ended", handleEnded);
      video.addEventListener("loadeddata", () => setLoaded(true));
      video.play().catch(() => setLoaded(true)); // fallback if autoplay blocked
    }

    // Timeout fallback (5 seconds)
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 800);
    }, 5000);

    return () => {
      clearTimeout(timer);
      if (video) video.removeEventListener("ended", handleEnded);
    };
  }, [onFinish]);

  return (
    <div>
      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: black;
          overflow: hidden;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }
        .preloader-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .fade-out {
          opacity: 0;
          visibility: hidden;
        }
      `}</style>

      <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
        {!loaded && fallbackImage ? (
          <img
            src={fallbackImage}
            alt="loading..."
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <video
            id="preloader-video"
            className="preloader-video"
            src={videoSrc}
            autoPlay
            muted
            playsInline
          />
        )}
      </div>
    </div>
  );
}
