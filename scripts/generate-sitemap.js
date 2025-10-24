const { writeFileSync } = require("fs");

// 1. Set your GitHub Pages repo URL
const BASE_URL = "https://sriashwin.github.io/G2werse";

// 2. List all your pages and games
const routes = [
  "/", "/poems", "/stories", "/novel", "/novel/book1", "/art", "/games",
  "/games/memory", "/games/catch-tiger", "/games/defend-camp",
  "/games/boys-run", "/games/zombie-dodge", "/games/zombie-shooter"
];

// 3. Build sitemap manually
const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
const urls = routes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n");

const sitemapXml = `${xmlHeader}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`;

// 4. Write sitemap.xml to public folder
writeFileSync("public/sitemap.xml", sitemapXml, { encoding: "utf8" });
console.log("✅ sitemap.xml created successfully with /G2werse base!");
