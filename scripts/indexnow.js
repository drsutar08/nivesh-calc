// Pings IndexNow (Bing, Yandex, Seznam, Naver) with sitemap URLs whose page content changed since the last ping.
// Change is detected from a hash of each built page, so several changes on the same day are all caught.
// Usage:  node scripts/indexnow.js          only new or changed URLs
//         node scripts/indexnow.js --all    every URL in the sitemap
// Set INDEXNOW=0 to skip (for example on a local test build).
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const KEY = "d1bf13db99098b943c0329a8b93a73b2"; // must match /<KEY>.txt at the site root
const root = path.join(__dirname, "..");
const stateFile = path.join(__dirname, ".indexnow.json");

if (process.env.INDEXNOW === "0") {
  console.log("IndexNow: skipped (INDEXNOW=0)");
  process.exit(0);
}

const xml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const entries = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(m => [m[1], m[2]]);
if (!entries.length) {
  console.error("IndexNow: no URLs found in sitemap.xml");
  process.exit(1);
}

let state = {};
try { state = JSON.parse(fs.readFileSync(stateFile, "utf8")); } catch {}

const all = process.argv.includes("--all");
// Hash the built file behind each URL (https://host/a/b/ -> a/b/index.html).
const hashOf = u => {
  const f = path.join(root, decodeURIComponent(new URL(u).pathname), "index.html");
  return fs.existsSync(f) ? crypto.createHash("md5").update(fs.readFileSync(f)).digest("hex") : null;
};
const hashes = Object.fromEntries(entries.map(([u]) => [u, hashOf(u)]));
const changed = entries.filter(([u]) => all || !hashes[u] || state[u] !== hashes[u]);
if (!changed.length) {
  console.log("IndexNow: nothing changed since the last ping");
  process.exit(0);
}

const host = new URL(entries[0][0]).host;
const body = {
  host,
  key: KEY,
  keyLocation: `https://${host}/${KEY}.txt`,
  urlList: changed.map(([u]) => u),
};

fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
})
  .then(async r => {
    if (r.status !== 200 && r.status !== 202) {
      // Don't fail the build over a ping; the URLs stay pending for the next run.
      console.warn(`IndexNow: ${r.status} ${r.statusText} ${await r.text()}`);
      return;
    }
    for (const [u] of changed) state[u] = hashes[u];
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 1) + "\n");
    console.log(`IndexNow: submitted ${changed.length} URL(s), ${r.status} ${r.statusText}`);
  })
  .catch(e => console.warn(`IndexNow: request failed (${e.message}); will retry next run`));
