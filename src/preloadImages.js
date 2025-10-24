// src/preloadImages.js
export const imagesToPreload = [
  `${process.env.PUBLIC_URL}/assets/AROTW.webp`,
  `${process.env.PUBLIC_URL}/assets/ATAW.webp`,
  `${process.env.PUBLIC_URL}/assets/banner.webp`,
  `${process.env.PUBLIC_URL}/assets/book1.webp`,
  `${process.env.PUBLIC_URL}/assets/ITWOW.webp`
];

export function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
