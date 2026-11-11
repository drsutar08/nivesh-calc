// Generates one real HTML page per calculator (plus sitemap.xml and robots.txt) so search engines can index each one.
// Usage:  SITE_URL=https://yourdomain.com/ node scripts/build.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const SITE = (process.env.SITE_URL || "https://example.com/").replace(/\/?$/, "/");
const SITE_NAME = "Nivesh Calc";

// Load the calculator definitions straight from js/app.js (everything before the UI code).
const src = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const head = src.slice(0, src.indexOf("const LOT_COLORS"));
const { CALCS, PAGES, pathOf } = new Function(head + "; return {CALCS,PAGES,pathOf};")();
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const content = require("./content.js");
const template = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const all = [...CALCS, ...PAGES];
const urlOf = c => SITE + (c.id === "average" ? "" : pathOf(c));

const groups = [];
all.forEach(c => { let g = groups.find(x => x.name === c.group); if (!g) groups.push(g = { name: c.group, items: [] }); g.items.push(c); });
const nav = groups.map(g => `<div class="group">${esc(g.name)}</div>` +
  g.items.map(c => `<a href="${pathOf(c)}" data-id="${c.id}"><span class="ic">${esc(c.ic)}</span>${esc(c.name)}</a>`).join("")).join("");

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
    .replace("{{ID}}", c.id).replace("{{NAV}}", () => nav)
    .replace("{{H1}}", () => esc(c.name)).replace("{{LEDE}}", () => esc(c.lede))
    .replace("{{PAGEHIDDEN}}", isCalc ? " hidden" : "").replace("{{PAGEHTML}}", () => isCalc ? "" : c.html)
    .split("{{WORKHIDDEN}}").join(isCalc ? "" : " hidden")
    .replace("{{FORMULA}}", () => isCalc ? c.formula : "").replace("{{HOWTO}}", () => isCalc ? guide(c) + howTo(c) : "")
    .replace("{{RELATED}}", () => related(c));
  const out = c.id === "average" ? path.join(root, "index.html") : path.join(root, pathOf(c), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html); n++;
});

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  all.map(c => `  <url><loc>${urlOf(c)}</loc><lastmod>${today}</lastmod></url>`).join("\n") + `\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
console.log(`Built ${n} pages for ${SITE}`);
if (SITE.includes("example.com")) console.warn("WARNING: SITE_URL is not set, so canonical URLs and the sitemap use example.com.");
