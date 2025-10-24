const { writeFileSync } = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");

const BASE_URL = "https://sriashwin.github.io";
const routes = [
  "/", "/poems", "/stories", "/novel", "/novel/book1", "/art", "/games",
  "/games/memory", "/games/catch-tiger", "/games/defend-camp",
  "/games/boys-run", "/games/zombie-dodge", "/games/zombie-shooter"
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  routes.forEach((route) => {
    sitemap.write({ url: route, changefreq: "weekly", priority: 0.8 });
  });
  sitemap.end();

  const xml = await streamToPromise(sitemap).then((data) => data.toString("utf8")); // explicit UTF-8
  writeFileSync("public/sitemap.xml", xml, { encoding: "utf8" }); // explicit UTF-8
  console.log("✅ sitemap.xml created successfully!");
}

generateSitemap();
