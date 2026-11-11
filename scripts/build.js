// Generates one real HTML page per calculator (plus sitemap.xml and robots.txt) so search engines can index each one.
// Usage:  SITE_URL=https://yourdomain.com/ node scripts/build.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const SITE = (process.env.SITE_URL || "https://niveshcalculator.pages.dev/").replace(/\/?$/, "/");
const SITE_NAME = "Nivesh Calc";
// Ads: set ADSENSE_CLIENT (like ca-pub-1234567890123456) to turn ads on. ADSENSE_SLOT (an ad unit ID) is optional; without it Google Auto ads are used.
const AD_CLIENT_ENV = process.env.ADSENSE_CLIENT || "", AD_SLOT = process.env.ADSENSE_SLOT || "";
// Any other ad network: paste its code into scripts/ads.json (used only when AdSense is not configured).
const adsFile = process.env.ADS_FILE || path.join(__dirname, "ads.json");
const customAds = fs.existsSync(adsFile) ? JSON.parse(fs.readFileSync(adsFile, "utf8")) : {};
// AdSense publisher ID (ca-pub-...): used for ads.txt and the google-adsense-account meta tag on every page, even when ad units are off.
const PUB = AD_CLIENT_ENV || customAds.publisher || "";
// The AdSense script goes on every page (as Google asks) whenever a publisher ID is set. Set "off": true in ads.json to switch it off.
const AD_CLIENT = customAds.off ? "" : PUB;
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
// Analytics: set CF_BEACON (Cloudflare Web Analytics token) or GA_ID (like G-XXXXXXXXXX). Neither set means no analytics script.
const CF_BEACON = process.env.CF_BEACON || "", GA_ID = process.env.GA_ID || "";
const pubMeta = PUB ? `<meta name="google-adsense-account" content="${PUB}">
` : "";
const analytics = pubMeta + (CF_BEACON ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${CF_BEACON}"}'></script>` :
  GA_ID ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GA_ID}");</script>` : "");
const guides = require("./guides.js");
const guideTemplate = fs.readFileSync(path.join(__dirname, "guide-template.html"), "utf8");
const OG_IMAGE = SITE + "images/og-image.png";
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
  const gl = guides.filter(g => g.calcs.includes(c.id));
  return `<ul class="ticks">${list.map(x => `<li><a href="${pathOf(x)}">${esc(x.name)}</a> – ${esc(x.lede)}</li>`).join("")}</ul>` +
    (gl.length ? `<h2 style="margin-top:18px">Guides</h2><ul class="ticks">${gl.map(g => `<li><a href="guides/${g.slug}/">${esc(g.title)}</a></li>`).join("")}</ul>` : "");
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
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${OG_IMAGE}">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
}

const lmFile = path.join(__dirname, ".lastmod.json");
const lm = fs.existsSync(lmFile) ? JSON.parse(fs.readFileSync(lmFile, "utf8")) : {};
const today = new Date().toISOString().slice(0, 10);
const crypto = require("crypto");
// lastmod only moves when a page's content really changes (a sitemap lastmod that changes daily gets ignored by Google).
const stamp = (key, html) => { const h = crypto.createHash("md5").update(html).digest("hex"); if (!lm[key] || lm[key].h !== h) lm[key] = { h, d: today }; return lm[key].d; };
const sitemap = [];
let n = 0;
all.forEach(c => {
  const isCalc = !!(c.calc || c.lots);
  const depth = c.id === "average" ? 0 : 1;
  const html = template
    .replace("{{BASE}}", depth ? '<base href="../">' : "")
    .replace("{{SEO}}", () => seo(c, isCalc))
    .replace("{{ANALYTICS}}", () => analytics).replace("{{ID}}", c.id).replace("{{NAV}}", () => navFor(c))
    .replace("{{SUPPORT}}", () => { const k = all.find(x => x.id === "coffee"); return `<div class="support"><a href="${pathOf(k)}" data-id="coffee"${c.id === "coffee" ? ' aria-current="page"' : ""}><span class="ic">${esc(k.ic)}</span><span class="lb">${esc(k.name)}</span></a></div>`; })
    .replace("{{H1}}", () => esc(c.name)).replace("{{LEDE}}", () => esc(c.lede))
    .replace("{{PAGEHIDDEN}}", isCalc ? " hidden" : "").replace("{{PAGEHTML}}", () => isCalc ? "" : c.html)
    .split("{{WORKHIDDEN}}").join(isCalc ? "" : " hidden")
    .replace("{{FORMULA}}", () => isCalc ? c.formula : "").replace("{{HOWTO}}", () => isCalc ? guide(c) + howTo(c) : "")
    .replace("{{RELATED}}", () => related(c))
    .replace("{{AFFILIATE}}", () => isCalc ? affiliateBox(c) : "")
    .replace("{{AD1}}", () => isCalc ? adUnit() : "").replace("{{AD2}}", () => isCalc ? adUnit() : "")
    .replace("{{ADSCRIPT}}", () => !AD_CLIENT && isCalc && customAds.head ? customAds.head : AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "");
  const out = c.id === "average" ? path.join(root, "index.html") : path.join(root, pathOf(c), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html); n++;
  sitemap.push([urlOf(c), stamp(c.id, html)]);
});

// Guides
const guideUrl = g => SITE + "guides/" + g.slug + "/";
const calcLinks = ids => ids.map(id => all.find(x => x.id === id)).filter(Boolean);
const guideSeo = (title, desc, url, ld) => `<title>${esc(title)} | ${SITE_NAME}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${OG_IMAGE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${OG_IMAGE}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
const writeGuide = (dir, html, key, url) => { const out = path.join(root, dir, "index.html"); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, html); n++; sitemap.push([url, stamp(key, html)]); };
guides.forEach(g => {
  const url = guideUrl(g);
  const body = `<header><p class="gmeta"><a href="guides/">Guides</a> · Last updated ${g.updated}</p><h1>${esc(g.title)}</h1><p class="lede">${esc(g.desc)}</p></header>
<article>${g.sections.map(s => `<h2>${esc(s.h)}</h2>${s.p.map(p => /^[A-Za-z ]+ = /.test(p) ? `<p class="formula">${esc(p)}</p>` : `<p>${esc(p)}</p>`).join("")}`).join("")}
<h2>Frequently asked questions</h2>${g.faq.map(([q, a]) => `<h3 class="faq-q">${esc(q)}</h3><p>${esc(a)}</p>`).join("")}</article>
<section class="howto"><h2>Try the calculators</h2><ul class="ticks">${calcLinks(g.calcs).map(x => `<li><a href="${pathOf(x)}">${esc(x.name)}</a> – ${esc(x.lede)}</li>`).join("")}</ul></section>
<section class="howto related"><h2>More guides</h2><ul class="ticks">${guides.filter(x => x !== g).map(x => `<li><a href="guides/${x.slug}/">${esc(x.title)}</a></li>`).join("")}</ul></section>`;
  const ld = [{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.desc, url, dateModified: g.updated, datePublished: g.updated, inLanguage: "en-IN", mainEntityOfPage: url, image: OG_IMAGE, author: { "@type": "Organization", name: SITE_NAME, url: SITE }, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE, logo: { "@type": "ImageObject", url: SITE + "images/icon-512.png" } } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE }, { "@type": "ListItem", position: 2, name: "Guides", item: SITE + "guides/" }, { "@type": "ListItem", position: 3, name: g.title, item: url }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }];
  writeGuide("guides/" + g.slug, guideTemplate.replace("{{BASEHREF}}", "../../").replace("{{SEO}}", () => guideSeo(g.title, g.desc, url, ld)).replace("{{ADSCRIPT}}", () => AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "").replace("{{ANALYTICS}}", () => analytics).replace("{{BODY}}", () => body), "guide:" + g.slug, url);
});
{
  const url = SITE + "guides/", title = "Investing Guides for India", desc = "Plain-language guides on SIPs, lumpsum investing, capital gains tax and retirement planning, each linked to a free calculator.";
  const body = `<header><p class="gmeta"><a href="./">Nivesh Calc</a></p><h1>${title}</h1><p class="lede">${desc}</p></header>` +
    guides.map(g => `<a class="gcard" href="guides/${g.slug}/"><b>${esc(g.title)}</b><span>${esc(g.desc)}</span></a>`).join("");
  const ld = [{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url, description: desc }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE }, { "@type": "ListItem", position: 2, name: "Guides", item: url }] }];
  writeGuide("guides", guideTemplate.replace("{{BASEHREF}}", "../").replace("{{SEO}}", () => guideSeo(title, desc, url, ld)).replace("{{ADSCRIPT}}", () => AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "").replace("{{ANALYTICS}}", () => analytics).replace("{{BODY}}", () => body), "guides-index", url);
}
// Web app manifest
fs.writeFileSync(path.join(root, "site.webmanifest"), JSON.stringify({ name: "Nivesh Calc", short_name: "Nivesh Calc", description: "Free stock and investment calculators", start_url: "./", display: "standalone", background_color: "#f5f7f6", theme_color: "#0f7a55", icons: [{ src: "images/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "images/icon-512.png", sizes: "512x512", type: "image/png" }] }, null, 2));
fs.writeFileSync(lmFile, JSON.stringify(lm, null, 1));
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemap.map(([u, d]) => `  <url><loc>${u}</loc><lastmod>${d}</lastmod></url>`).join("\n") + `\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
if (PUB) fs.writeFileSync(path.join(root, "ads.txt"), `google.com, ${PUB.replace("ca-", "")}, DIRECT, f08c47fec0942fa0
`);
else if (fs.existsSync(path.join(root, "ads.txt"))) fs.unlinkSync(path.join(root, "ads.txt"));
if (AD_CLIENT) console.log("Ads on for", AD_CLIENT, AD_SLOT ? "(manual units)" : "(auto ads only)");
console.log(`Built ${n} pages for ${SITE}`);
if (SITE.includes("example.com")) console.warn("WARNING: SITE_URL is not set, so canonical URLs and the sitemap use example.com.");
