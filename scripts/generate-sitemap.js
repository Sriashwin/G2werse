// scripts/generate-sitemap.js
const { writeFileSync } = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");

const BASE_URL = "https://sriashwin.github.io/G2werse";

// All main routes
const routes = [
  "/",
  "/poems",
  "/stories",
  "/novel",
  "/novel/book1",
  "/art",
  "/games",
];

// All games subroutes
const gameRoutes = [
  "/games/memory",
  "/games/catch-tiger",
  "/games/defend-camp",
  "/games/boys-run",
  "/games/zombie-shooter",
];

// Combine main + game routes
const allRoutes = [...routes, ...gameRoutes];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const gzip = createGzip();

  streamToPromise(sitemap.pipe(gzip)).then((sm) => {
    writeFileSync("public/sitemap.xml", sm);
    console.log("✅ sitemap.xml created successfully!");
  });

  allRoutes.forEach((route) => {
    sitemap.write({
      url: route,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  sitemap.end();
}

generateSitemap();
