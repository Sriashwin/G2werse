import React, { useEffect, useRef } from "react";

function Concepts() {
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("../assets/concepts", false, /\.webp$/)
  );

  const gridRef = useRef();

  useEffect(() => {
    const grid = gridRef.current;
    const rowHeight = 10;
    const rowGap = 16;

    const resizeGridItems = () => {
      const items = grid.querySelectorAll(".item");

      items.forEach((item) => {
        const img = item.querySelector("img");
        const height = img.getBoundingClientRect().height;
        const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = `span ${span}`;
      });
    };

    // run after images load
    window.addEventListener("load", resizeGridItems);
    window.addEventListener("resize", resizeGridItems);

    return () => {
      window.removeEventListener("load", resizeGridItems);
      window.removeEventListener("resize", resizeGridItems);
    };
  }, []);

  return (
    <>
      <style>{`
        .container {
          padding: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 10px;
          gap: 16px;
        }

        .item {
          overflow: hidden;
          border-radius: 16px;
        }

        .item img {
          width: 100%;
          display: block;
          border-radius: 16px;
          transition: transform 0.3s ease;
        }

        .item img:hover {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container">
        <div className="grid" ref={gridRef}>
          {images.map((src, i) => (
            <div className="item" key={i}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Concepts;