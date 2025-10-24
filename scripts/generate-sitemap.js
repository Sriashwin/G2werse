// scripts/generate-sitemap.js
const { writeFileSync } = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");

const BASE_URL = "https://sriashwin.github.io/G2werse";

// Main routes
const routes = [
  "/",
  "/poems",
  "/stories",
  "/novel",
  "/novel/book1",
  "/art",
  "/games",
];

// Games subroutes
const gameRoutes = [
  "/games/memory",
  "/games/catch-tiger",
  "/games/defend-camp",
  "/games/zombie-dodge",
  "/games/boys-run",
  "/games/zombie-shooter",
];

// Combine all routes
const allRoutes = [...routes, ...gameRoutes];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  allRoutes.forEach((route) => {
    sitemap.write({ url: route, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  // Convert stream to XML string
  const xml = await streamToPromise(sitemap).then((data) => data.toString());

  // Write plain XML to public/sitemap.xml
  writeFileSync("public/sitemap.xml", xml, { encoding: "utf8" });
  console.log("✅ sitemap.xml created successfully (plain XML)!");
}

generateSitemap();
