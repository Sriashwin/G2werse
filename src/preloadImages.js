// src/preloadImages.js
export const imagesToPreload = [
  "/assets/AROTW.png",
  "/assets/ATAW.png",
  "/assets/banner.jpg",
  "/assets/book1.png",
  "/assets/ITWOW.jpg"
];

export function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
