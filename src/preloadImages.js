// src/preloadImages.js
export const imagesToPreload = [
  "/assets/AROTW.webp",
  "/assets/ATAW.webp",
  "/assets/banner.webp",
  "/assets/book1.webp",
  "/assets/ITWOW.webp"
];

export function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
