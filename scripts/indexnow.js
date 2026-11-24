// Pings IndexNow (Bing, Yandex, Seznam, Naver) with sitemap URLs whose own content changed since the last ping.
// "Content" is the same signature that decides each page's sitemap lastmod (scripts/.pagesigs.json, written by the build):
// a page's text, inputs, formula, calculation and example result. Shared CSS/JS, navigation and ad code do not count,
// so a site-wide style change sends nothing. Signatures are compared exactly, so same-day changes are caught too.
// Usage:  node scripts/indexnow.js          only new or changed URLs
//         node scripts/indexnow.js --all    every URL in the sitemap
// Set INDEXNOW=0 to skip (for example on a local test build).
const fs = require("fs");
const path = require("path");

const KEY = "d1bf13db99098b943c0329a8b93a73b2"; // must match /<KEY>.txt at the site root
const root = path.join(__dirname, "..");
const stateFile = path.join(__dirname, ".indexnow.json");
const sigFile = path.join(__dirname, ".pagesigs.json");

if (process.env.INDEXNOW === "0") {
  console.log("IndexNow: skipped (INDEXNOW=0)");
  process.exit(0);
}

const xml = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (!urls.length) {
  console.error("IndexNow: no URLs found in sitemap.xml");
  process.exit(1);
}
let sigs;
try { sigs = JSON.parse(fs.readFileSync(sigFile, "utf8")); } catch {
  console.error("IndexNow: scripts/.pagesigs.json is missing. Run node scripts/build.js first.");
  process.exit(1);
}

let state = {};
try { state = JSON.parse(fs.readFileSync(stateFile, "utf8")); } catch {}
const save = () => fs.writeFileSync(stateFile, JSON.stringify(state, null, 1) + "\n");

// One-time switch from the old whole-file hashes: record the current signatures without sending anything.
// Safe because every page was sent with the old method on the last run.
if (state.__v !== 2 && Object.keys(state).length) {
  state = { __v: 2 };
  for (const u of urls) if (sigs[u]) state[u] = sigs[u];
  save();
  console.log(`IndexNow: switched to content signatures; recorded ${urls.length} URL(s), nothing sent`);
  process.exit(0);
}
state.__v = 2;

const all = process.argv.includes("--all");
const changed = urls.filter(u => all || !sigs[u] || state[u] !== sigs[u]);
if (!changed.length) {
  console.log("IndexNow: no page content changed since the last ping");
  process.exit(0);
}

const host = new URL(urls[0]).host;
fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `https://${host}/${KEY}.txt`, urlList: changed }),
})
  .then(async r => {
    if (r.status !== 200 && r.status !== 202) {
      // Don't fail the build over a ping; the URLs stay pending for the next run.
      console.warn(`IndexNow: ${r.status} ${r.statusText} ${await r.text()}`);
      return;
    }
    for (const u of changed) state[u] = sigs[u];
    save();
    console.log(`IndexNow: submitted ${changed.length} URL(s), ${r.status} ${r.statusText}`);
  })
  .catch(e => console.warn(`IndexNow: request failed (${e.message}); will retry next run`));
