// Generates one real HTML page per calculator (plus sitemap.xml and robots.txt) so search engines can index each one.
// Usage:  SITE_URL=https://yourdomain.com/ node scripts/build.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const SITE = (process.env.SITE_URL || "https://example.com/").replace(/\/?$/, "/");
const SITE_NAME = "Nivesh Calc";
// Ads: set ADSENSE_CLIENT (like ca-pub-1234567890123456) to turn ads on. ADSENSE_SLOT (an ad unit ID) is optional; without it Google Auto ads are used.
const AD_CLIENT = process.env.ADSENSE_CLIENT || "", AD_SLOT = process.env.ADSENSE_SLOT || "";
// Any other ad network: paste its code into scripts/ads.json (used only when AdSense is not configured).
const adsFile = process.env.ADS_FILE || path.join(__dirname, "ads.json");
const customAds = fs.existsSync(adsFile) ? JSON.parse(fs.readFileSync(adsFile, "utf8")) : {};
const adUnit = () => !AD_CLIENT && customAds.slot ? `<div class="ad"><small>Advertisement</small>${customAds.slot}</div>` : AD_CLIENT && AD_SLOT ? `<div class="ad"><small>Advertisement</small><ins class="adsbygoogle" style="display:block" data-ad-client="${AD_CLIENT}" data-ad-slot="${AD_SLOT}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>` : "";

// Load the calculator definitions straight from js/app.js (everything before the UI code).
const src = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const head = src.slice(0, src.indexOf("const LOT_COLORS"));
const { CALCS, PAGES, pathOf } = new Function(head + "; return {CALCS,PAGES,pathOf};")();
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const content = Object.assign({}, require("./content.js"), require("./content-more.js"));
const affFile = process.env.AFFILIATES_FILE || path.join(__dirname, "affiliates.json");
const affiliates = fs.existsSync(affFile) ? JSON.parse(fs.readFileSync(affFile, "utf8")) : {};
function affiliateBox(c) {
  const items = [...(affiliates["*"] || []), ...(affiliates[c.id] || [])].filter(x => x && x.label && /^https?:\/\//.test(x.url || ""));
  if (!items.length) return "";
  return `<section class="howto aff"><h2>Useful services</h2><ul class="ticks">${items.map(x => `<li><a href="${esc(x.url)}" target="_blank" rel="sponsored nofollow noopener">${esc(x.label)}</a>${x.note ? " – " + esc(x.note) : ""}</li>`).join("")}</ul><p class="aff-note">Sponsored links. We may earn a commission if you sign up through them, at no extra cost to you. This is not a recommendation or investment advice.</p></section>`;
}
const template = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const all = [...CALCS, ...PAGES];
const urlOf = c => SITE + (c.id === "average" ? "" : pathOf(c));

const groups = [];
all.filter(c => c.id !== "coffee").forEach(c => { let g = groups.find(x => x.name === c.group); if (!g) groups.push(g = { name: c.group, items: [] }); g.items.push(c); });
const shortName = c => c.name.replace(/ Calculator$/, "");
const navFor = cur => groups.map(g => {
  const open = g.items.some(x => x.id === cur.id);
  return `<details class="grp"${open ? " open" : ""} data-open="${open ? 1 : 0}"><summary>${esc(g.name)}<span class="gcount">${g.items.length}</span></summary><div class="links">` +
    g.items.map(x => `<a href="${pathOf(x)}" data-id="${x.id}" title="${esc(x.name)}"${x.id === cur.id ? ' aria-current="page"' : ""}><span class="ic">${esc(x.ic)}</span><span class="lb">${esc(shortName(x))}</span></a>`).join("") + "</div></details>";
}).join("");

function howTo(c) {
  let hero = "the result";
  try { hero = c.lots ? "your average buy price" : c.calc(Object.fromEntries(c.fields.map(f => [f[0], f[2]]))).hero[0]; } catch (e) {}
  const inputs = c.lots ? "the units and price of each purchase" : c.fields.map(f => f[1].toLowerCase()).join(", ");
  return `<h2 style="margin-top:16px">How to use the ${esc(c.name)}</h2><p>Enter ${esc(inputs)}. The calculator updates as you type and shows ${esc(hero)}, along with the figures behind it. It runs in your browser, so nothing you enter is sent anywhere. Use the Reset button to go back to the example values.</p>`;
}

function guide(c) {
  const g = content[c.id]; if (!g) return "";
  return `<h2 style="margin-top:16px">${esc(g.heading)}</h2>${g.intro.map(p => `<p>${esc(p)}</p>`).join("")}<h3 class="faq-h">Frequently asked questions</h3>${g.faq.map(([q, a]) => `<h4 class="faq-q">${esc(q)}</h4><p>${esc(a)}</p>`).join("")}`;
}

function related(c) {
  const same = CALCS.filter(x => x.group === c.group && x.id !== c.id);
  const others = CALCS.filter(x => x.group !== c.group && x.id !== c.id);
  const list = [...same, ...others].slice(0, 6);
  return `<ul class="ticks">${list.map(x => `<li><a href="${pathOf(x)}">${esc(x.name)}</a> – ${esc(x.lede)}</li>`).join("")}</ul>`;
}

function seo(c, isCalc) {
  const url = urlOf(c);
  const title = c.id === "average" ? `Stock Average Calculator – Free Online Tools for Investors | ${SITE_NAME}` :
    isCalc ? `${c.name} – Free Online Calculator | ${SITE_NAME}` : `${c.name} | ${SITE_NAME}`;
  const desc = isCalc ? `${c.lede} Free ${c.name.toLowerCase()} with instant results, a clear formula and no sign-up.` : `${c.lede} ${SITE_NAME}: free stock and investment calculators.`;
  const ld = [{
    "@context": "https://schema.org", "@type": isCalc ? "WebApplication" : "WebPage", name: c.name, url, description: c.lede,
    ...(isCalc ? { applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, inLanguage: "en-IN" } : {})
  }, {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE }].concat(c.id === "average" ? [] : [{ "@type": "ListItem", position: 2, name: c.name, item: url }])
  }];
  if (content[c.id]) ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: content[c.id].faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  return `<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
}

let n = 0;
all.forEach(c => {
  const isCalc = !!(c.calc || c.lots);
  const depth = c.id === "average" ? 0 : 1;
  const html = template
    .replace("{{BASE}}", depth ? '<base href="../">' : "")
    .replace("{{SEO}}", () => seo(c, isCalc))
    .replace("{{ID}}", c.id).replace("{{NAV}}", () => navFor(c))
    .replace("{{SUPPORT}}", () => { const k = all.find(x => x.id === "coffee"); return `<div class="support"><a href="${pathOf(k)}" data-id="coffee"${c.id === "coffee" ? ' aria-current="page"' : ""}><span class="ic">${esc(k.ic)}</span><span class="lb">${esc(k.name)}</span></a></div>`; })
    .replace("{{H1}}", () => esc(c.name)).replace("{{LEDE}}", () => esc(c.lede))
    .replace("{{PAGEHIDDEN}}", isCalc ? " hidden" : "").replace("{{PAGEHTML}}", () => isCalc ? "" : c.html)
    .split("{{WORKHIDDEN}}").join(isCalc ? "" : " hidden")
    .replace("{{FORMULA}}", () => isCalc ? c.formula : "").replace("{{HOWTO}}", () => isCalc ? guide(c) + howTo(c) : "")
    .replace("{{RELATED}}", () => related(c))
    .replace("{{AFFILIATE}}", () => isCalc ? affiliateBox(c) : "")
    .replace("{{AD1}}", () => isCalc ? adUnit() : "").replace("{{AD2}}", () => isCalc ? adUnit() : "")
    .replace("{{ADSCRIPT}}", () => !AD_CLIENT && isCalc && customAds.head ? customAds.head : AD_CLIENT && isCalc ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "");
  const out = c.id === "average" ? path.join(root, "index.html") : path.join(root, pathOf(c), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html); n++;
});

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  all.map(c => `  <url><loc>${urlOf(c)}</loc><lastmod>${today}</lastmod></url>`).join("\n") + `\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
if (AD_CLIENT) {
  fs.writeFileSync(path.join(root, "ads.txt"), `google.com, ${AD_CLIENT.replace("ca-", "")}, DIRECT, f08c47fec0942fa0
`);
  console.log("Ads on for", AD_CLIENT, AD_SLOT ? "(manual units)" : "(auto ads only)");
} else if (fs.existsSync(path.join(root, "ads.txt"))) fs.unlinkSync(path.join(root, "ads.txt"));
console.log(`Built ${n} pages for ${SITE}`);
if (SITE.includes("example.com")) console.warn("WARNING: SITE_URL is not set, so canonical URLs and the sitemap use example.com.");
