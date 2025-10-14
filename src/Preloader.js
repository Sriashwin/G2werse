import React, { useEffect, useState } from "react";

export default function Preloader({ onFinish, videoSrc }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Automatically fade out after video finishes (or you can use Firebase completion)
    const video = document.getElementById("preloader-video");
    const handleEnded = () => {
      setFadeOut(true);
      setTimeout(onFinish, 800); // matches fade animation
    };

    if (video) video.addEventListener("ended", handleEnded);

    return () => {
      if (video) video.removeEventListener("ended", handleEnded);
    };
  }, [onFinish]);

  return (
    <div>
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
        `}
      </style>

      <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
        <video
          id="preloader-video"
          className="preloader-video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
          
        />
      </div>
    </div>
  );
}
