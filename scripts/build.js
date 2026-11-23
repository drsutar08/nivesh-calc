// Generates one real HTML page per calculator (plus sitemap.xml and robots.txt) so search engines can index each one.
// Usage:  SITE_URL=https://yourdomain.com/ node scripts/build.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const SITE = (process.env.SITE_URL || "https://niveshcalculator.pages.dev/").replace(/\/?$/, "/");
const SITE_NAME = "Nivesh Calc";
// Ads: set ADSENSE_CLIENT (like ca-pub-1234567890123456) to turn ads on. ADSENSE_SLOT (an ad unit ID) is optional; without it Google Auto ads are used.
const AD_CLIENT_ENV = process.env.ADSENSE_CLIENT || "", AD_SLOT_ENV = process.env.ADSENSE_SLOT || "";
// Any other ad network: paste its code into scripts/ads.json (used only when AdSense is not configured).
const adsFile = process.env.ADS_FILE || path.join(__dirname, "ads.json");
const customAds = fs.existsSync(adsFile) ? JSON.parse(fs.readFileSync(adsFile, "utf8")) : {};
// AdSense publisher ID (ca-pub-...): used for ads.txt and the google-adsense-account meta tag on every page, even when ad units are off.
const PUB = AD_CLIENT_ENV || customAds.publisher || "";
// The AdSense script goes on every page (as Google asks) whenever a publisher ID is set. Set "off": true in ads.json to switch it off.
const AD_SLOT = AD_SLOT_ENV || customAds.slotId || ""; // ad unit ID (digits) from AdSense: Ads > By ad unit > Display ads
const AD_CLIENT = customAds.off ? "" : PUB;
const AD_WIDE_SLOT = process.env.ADSENSE_SLOT_WIDE || customAds.slotIdWide || ""; // horizontal banner unit ID
// Second ad network, fixed 300x250 iframe banner. Set in ads.json: "net300": {"key": "...", "host": "https://host.example"}; remove it to turn it off.
const net = customAds.net300 || {};
const netBox = () => net.key && String(net.host || "").startsWith("https://") && !customAds.off ? `<div class="adx"><script>atOptions={'key':'${net.key}','format':'iframe','height':250,'width':300,'params':{}};</script><script src="${net.host}/22/${net.key}"></script></div>` : "";
const adUnit = (kind) => {
  const wide = kind === "wide" && AD_WIDE_SLOT, slot = wide ? AD_WIDE_SLOT : AD_SLOT;
  if (!AD_CLIENT && customAds.slot) return `<div class="ad"><small>Advertisement</small>${customAds.slot}</div>`;
  if (!(AD_CLIENT && slot)) return "";
  return `<div class="ad${wide ? " wide" : ""}"><small>Advertisement</small><ins class="adsbygoogle" style="display:block" data-ad-client="${AD_CLIENT}" data-ad-slot="${slot}" data-ad-format="${wide ? "horizontal" : "auto"}" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;
};

// Load the calculator definitions straight from js/app.js (everything before the UI code).
const src = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const head = src.slice(0, src.indexOf("const LOT_COLORS"));
const { CALCS, PAGES, pathOf, slugOf } = new Function(head + "; return {CALCS,PAGES,pathOf,slugOf};")();
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const content = Object.assign({}, require("./content.js"), require("./content-more.js"), require("./content-extra.js"), require("./content-extra2.js"), require("./content-extra3.js"), require("./content-extra4.js"), require("./content-extra5.js"), require("./content-extra6.js"), require("./content-extra7.js"), require("./content-extra8.js"));
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
// Cache-busting: js/ and css/ are cached for a day, so each link carries a hash of the file. A changed file gets a new URL and browsers fetch it at once.
const assetVer = f => require("crypto").createHash("md5").update(fs.readFileSync(path.join(root, f))).digest("hex").slice(0, 8);
const versioned = t => t.split('href="css/styles.css"').join(`href="css/styles.css?v=${assetVer("css/styles.css")}"`).split('src="js/app.js"').join(`src="js/app.js?v=${assetVer("js/app.js")}"`);
const guideTemplate = versioned(fs.readFileSync(path.join(__dirname, "guide-template.html"), "utf8"));
const OG_IMAGE = SITE + "images/og-image.png";
const template = versioned(fs.readFileSync(path.join(__dirname, "template.html"), "utf8"));
const all = [...CALCS, ...PAGES];
const urlOf = c => SITE + (c.id === "home" ? "" : pathOf(c));

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

// "More calculators" on a calculator page: a colour block in the page category with a pill for every other calculator in it
// (topped up from other categories when the category is small), links to the other categories, then related guides.
function related(c) {
  const k = catKey(c.group);
  const same = CALCS.filter(x => x.group === c.group && x.id !== c.id);
  const fill = ["average", "sip", "brokerage", "emi", "capital-gains", "swp", "cagr", "fd"].map(id => CALCS.find(x => x.id === id)).filter(x => x && x.group !== c.group && x.id !== c.id);
  const list = same.length >= 4 ? same : [...same, ...fill].slice(0, Math.max(6, same.length));
  const otherCats = groups.filter(g => g.name !== c.group && g.items.some(x => x.calc || x.lots));
  const gl = guides.filter(g => g.calcs.includes(c.id));
  return `<section class="hb hb-more" aria-labelledby="more-h"><div class="hb-blk t-${k}"><div class="hb-head"><div><h2 id="more-h">${same.length >= 4 ? `More ${esc(c.group.toLowerCase())} calculators` : "More calculators"}</h2><p>${esc(same.length >= 4 ? CAT_BLURB[c.group] || "" : "Popular calculators from across the site.")}</p></div><span class="hb-n" aria-hidden="true">${String(list.length).padStart(2, "0")}</span></div>
  <ul class="hb-pills">${list.map(x => `<li><a class="hb-pill" href="${pathOf(x)}" title="${esc(x.lede)}"><i aria-hidden="true">${esc(x.ic)}</i>${esc(shortName(x))}</a></li>`).join("")}</ul>
  <p class="hb-cats">Other categories: ${otherCats.map(g => `<a href="./#cat-${slugOf(g.name)}">${esc(g.name)}</a>`).join("")}</p></div></section>` +
    (gl.length ? `<section class="howto related"><h2>Guides</h2><ul class="ticks">${gl.map(g => `<li><a href="guides/${g.slug}/">${esc(g.title)}</a></li>`).join("")}</ul></section>` : "");
}

function seo(c, isCalc) {
  const url = urlOf(c);
  const title = c.id === "home" ? c.title : isCalc ? `${c.name} – Free Online Calculator | ${SITE_NAME}` : `${c.name} | ${SITE_NAME}`;
  const desc = c.id === "home" ? c.desc : isCalc ? `${c.lede} Free ${c.name.toLowerCase()} with instant results, a clear formula and no sign-up.` : `${c.lede} ${SITE_NAME}: free stock and investment calculators.`;
  const ld = [{
    "@context": "https://schema.org", "@type": isCalc ? "WebApplication" : "WebPage", name: c.name, url, description: c.lede,
    ...(isCalc ? { applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, inLanguage: "en-IN" } : {})
  }, {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE }].concat(c.id === "home" ? [] : [{ "@type": "ListItem", position: 2, name: c.name, item: url }])
  }];
  if (c.id === "home") ld.splice(0, 1, { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE, description: c.desc, inLanguage: "en-IN", publisher: { "@type": "Organization", name: SITE_NAME, url: SITE, logo: SITE + "images/icon-512.png" } },
    { "@context": "https://schema.org", "@type": "ItemList", name: "Calculators", itemListElement: CALCS.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: SITE + pathOf(x) })) });
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

// Homepage ("colour blocks" design): intro panel, stat tiles, most-used list, one gradient block per category, latest guides.
const CAT_KEY = { "Stocks": "stocks", "Mutual funds": "funds", "Loans & growth": "growth", "Savings & salary": "savings", "Everyday": "everyday" };
const CAT_BLURB = { "Stocks": "Averages, returns and losses, corporate actions, IPOs, futures and options, valuation (P/E, DCF, EV), trading levels, charges and tax.", "Mutual funds": "Plan SIPs, lumpsums, STPs, withdrawals, exit loads, asset allocation and goals like education, retirement and FIRE.", "Loans & growth": "EMIs, loan rates, tenure, eligibility, home and car affordability, prepayment, balance transfer, credit cards, rent vs buy, bonds and deposits.", "Savings & salary": "Government schemes (PPF, Sukanya Samriddhi, NPS, SCSS, NSC, KVP, POMIS, gold bonds), annuities and salary (EPF, gratuity, HRA, leave, hikes).", "Everyday": "Everyday money: percentages, GST, discounts, gold jewellery, margins, break-even, net worth, credit health, emergency fund and life cover." };
const catKey = name => CAT_KEY[name] || "stocks";
// The category blocks with a pill link to every calculator (homepage and 404 page).
const bento = () => { const cats = groups.filter(g => g.items.some(x => x.calc || x.lots)); return `<section class="hb-bento" id="calculators" aria-label="All calculators">${cats.map(g => { const k = catKey(g.name); return `<div class="hb-blk hb-${k} t-${k}" id="cat-${slugOf(g.name)}"><div class="hb-head"><div><h2>${esc(g.name)} calculators</h2><p>${esc(CAT_BLURB[g.name] || "")}</p></div><span class="hb-n" aria-hidden="true">${String(g.items.length).padStart(2, "0")}</span></div>
  <ul class="hb-pills">${g.items.map(c => `<li><a class="hb-pill" href="${pathOf(c)}" title="${esc(c.lede)}"><i aria-hidden="true">${esc(c.ic)}</i>${esc(shortName(c))}</a></li>`).join("")}</ul></div>`; }).join("")}</section>`; };
function home() {
  const cats = groups.filter(g => g.items.some(x => x.calc || x.lots));
  const latest = [...guides].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 6);
  const mostUsed = ["average", "sip", "brokerage", "emi", "capital-gains"].map(id => CALCS.find(c => c.id === id)).filter(Boolean);
  const guideCat = g => { const c = CALCS.find(x => x.id === g.calcs[0]); return c ? c.group : "Stocks"; };
  const nCalc = CALCS.length;
  const html = `<div class="hb">
<section class="hb-intro">
  <div class="hb-hello">
    <div class="hb-kick" aria-hidden="true">${Object.values(CAT_KEY).map(k => `<i class="t-${k}"></i>`).join("")}</div>
    <h1>Free stock market and <span>investment</span> calculators for India</h1>
    <p>Work out your average buy price, your real profit after brokerage and tax, what a split, bonus, buyback or demerger does to your holding, and how a SIP, lumpsum or SWP could grow. No sign-up, and nothing you type leaves your browser.</p>
    <div class="hb-row"><a class="hb-btn hb-main" href="#calculators">Browse ${nCalc} calculators ↓</a><a class="hb-btn hb-alt" href="guides/">Read the guides</a></div>
  </div>
  <div class="hb-side">
    <div class="hb-stats"><div class="hb-st t-stocks"><b>${nCalc}</b><small>calculators</small></div><div class="hb-st t-funds"><b>${guides.length}</b><small>guides</small></div><div class="hb-st t-growth"><b>₹0</b><small>always free</small></div><div class="hb-st t-everyday"><b>0</b><small>data sent anywhere</small></div></div>
    <nav class="hb-pop" aria-labelledby="hb-pop-h"><h2 id="hb-pop-h">Most used</h2>${mostUsed.map(c => `<a class="t-${catKey(c.group)}" href="${pathOf(c)}">${esc(c.name)}<span aria-hidden="true">${esc(c.ic)}</span></a>`).join("")}</nav>
  </div>
</section>
${bento()}
${adUnit("wide")}
<section class="hb-sec" aria-labelledby="hb-guides-h"><h2 id="hb-guides-h">Latest guides</h2><div class="hb-glist">${latest.map(g => { const n = guideCat(g); return `<a class="hb-g t-${catKey(n)}" href="guides/${g.slug}/"><span class="hb-dot" aria-hidden="true"></span><span><small>${esc(n)}</small><b>${esc(g.title)}</b><span>${esc(g.desc)}</span></span></a>`; }).join("")}</div><a class="hb-btn hb-alt hb-all" href="guides/">See all ${guides.length} guides →</a></section>
<div class="hb-about"><span class="hb-av" aria-hidden="true">DS</span><p><b>Who builds Nivesh Calc.</b> Nivesh Calc is built and maintained by Diptiranjan Sutar, an investor and software developer based in India. Each formula is checked against worked examples before it goes live. The calculators are for education and planning, not investment advice. Read more <a href="about-us/">about the site</a> and the <a href="disclaimer/">disclaimer</a>.</p></div>
</div>`;
  return {
    id: "home", name: "Free Stock Market and Investment Calculators for India", html,
    lede: `${nCalc} free calculators for Indian investors: stock average, profit and loss, corporate actions, brokerage, capital gains tax, SIP, SWP, EMI and more.`,
    title: `${SITE_NAME} – Free Stock Market & Investment Calculators for India`,
    desc: `${nCalc} free calculators for Indian investors: stock average, profit/loss, split, bonus, buyback, brokerage, capital gains tax, SIP, SWP and EMI. No sign-up.`,
  };
}

const lmFile = path.join(__dirname, ".lastmod.json");
const lm = fs.existsSync(lmFile) ? JSON.parse(fs.readFileSync(lmFile, "utf8")) : {};
const today = new Date().toISOString().slice(0, 10);
const crypto = require("crypto");
// lastmod only moves when a page's content really changes (a sitemap lastmod that changes daily gets ignored by Google).
const stamp = (key, html) => { const h = crypto.createHash("md5").update(html).digest("hex"); if (!lm[key] || lm[key].h !== h) lm[key] = { h, d: today }; return lm[key].d; };
const sitemap = [];
let n = 0;
[home(), ...all].forEach(c => {
  const isCalc = !!(c.calc || c.lots);
  const depth = c.id === "home" ? 0 : 1;
  let html = template
    .replace("{{BASE}}", depth ? '<base href="../">' : "")
    .replace("{{SEO}}", () => seo(c, isCalc))
    .replace("{{ANALYTICS}}", () => analytics).replace("{{ID}}", c.id).replace("{{NAV}}", () => navFor(c))
    .replace("{{SUPPORT}}", () => { const k = all.find(x => x.id === "coffee"); return `<div class="support"><a href="${pathOf(k)}" data-id="coffee"${c.id === "coffee" ? ' aria-current="page"' : ""}><span class="ic">${esc(k.ic)}</span><span class="lb">${esc(k.name)}</span></a></div>`; })
    .replace("{{H1}}", () => esc(c.name)).replace("{{LEDE}}", () => esc(c.lede))
    .replace("{{BODYCLASS}}", isCalc ? ` class="cat-page t-${catKey(c.group)}"` : "")
    .replace("{{CRUMB}}", () => isCalc ? `<p class="crumb"><a href="./">Home</a><span aria-hidden="true">›</span><a href="./#cat-${slugOf(c.group)}">${esc(c.group)}</a></p>` : "")
    .replace("{{PAGEHIDDEN}}", isCalc ? " hidden" : "").replace("{{PAGEHTML}}", () => isCalc ? "" : c.html)
    .split("{{WORKHIDDEN}}").join(isCalc ? "" : " hidden")
    .replace("{{FORMULA}}", () => isCalc ? c.formula : "").replace("{{HOWTO}}", () => isCalc ? guide(c) + howTo(c) : "")
    .replace("{{RELATED}}", () => isCalc ? related(c) : "")
    .replace("{{AFFILIATE}}", () => isCalc ? affiliateBox(c) : "")
    .replace("{{AD1}}", () => isCalc ? adUnit() : "").replace("{{AD2}}", () => isCalc ? adUnit("wide") : "").replace("{{AD3}}", () => isCalc ? netBox() : "")
    .replace("{{ADSCRIPT}}", () => !AD_CLIENT && isCalc && customAds.head ? customAds.head : AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "");
  if (c.id === "home") html = html.replace(/<header>[\s\S]*?<\/header>\s*/, ""); // the homepage carries its own h1 inside the intro panel
  const out = c.id === "home" ? path.join(root, "index.html") : path.join(root, pathOf(c), "index.html");
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
// A guide paragraph is shown as a formula box only when it reads "Name = expression" and is a single statement, not prose.
const isFormula = p => /^[A-Za-z ]+ = /.test(p) && !/[.!?]\s+[A-Z]/.test(p) && p.length <= 120;
guides.forEach(g => {
  const url = guideUrl(g);
  const body = `<header><p class="gmeta"><a href="guides/">Guides</a> · By <a href="about-us/">Diptiranjan Sutar</a> · Last updated ${g.updated}</p><h1>${esc(g.title)}</h1><p class="lede">${esc(g.desc)}</p></header>
<article>${g.sections.map((s, i) => (i === 2 ? adUnit() : "") + `<h2>${esc(s.h)}</h2>${s.p.map(p => isFormula(p) ? `<p class="formula">${esc(p)}</p>` : `<p>${esc(p)}</p>`).join("")}`).join("")}
<h2>Frequently asked questions</h2>${g.faq.map(([q, a]) => `<h3 class="faq-q">${esc(q)}</h3><p>${esc(a)}</p>`).join("")}</article>
${adUnit("wide")}<section class="howto"><h2>Try the calculators</h2><ul class="ticks">${calcLinks(g.calcs).map(x => `<li><a href="${pathOf(x)}">${esc(x.name)}</a> – ${esc(x.lede)}</li>`).join("")}</ul></section>
${netBox()}<section class="howto related"><h2>More guides</h2><ul class="ticks">${guides.filter(x => x !== g).map(x => `<li><a href="guides/${x.slug}/">${esc(x.title)}</a></li>`).join("")}</ul></section>`;
  const ld = [{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.desc, url, dateModified: g.updated, datePublished: g.updated, inLanguage: "en-IN", mainEntityOfPage: url, image: OG_IMAGE, author: { "@type": "Person", name: "Diptiranjan Sutar", url: SITE + "about-us/" }, publisher: { "@type": "Organization", name: SITE_NAME, url: SITE, logo: { "@type": "ImageObject", url: SITE + "images/icon-512.png" } } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE }, { "@type": "ListItem", position: 2, name: "Guides", item: SITE + "guides/" }, { "@type": "ListItem", position: 3, name: g.title, item: url }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }];
  writeGuide("guides/" + g.slug, guideTemplate.replace("{{BASEHREF}}", "../../").replace("{{SEO}}", () => guideSeo(g.title, g.desc, url, ld)).replace("{{ADSCRIPT}}", () => AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "").replace("{{ANALYTICS}}", () => analytics).replace("{{BODY}}", () => body), "guide:" + g.slug, url);
});
{
  const url = SITE + "guides/", title = "Investing Guides for India", desc = "Plain-language guides on SIPs, lumpsum investing, capital gains tax and retirement planning, each linked to a free calculator.";
  const body = `<header><p class="gmeta"><a href="./">Nivesh Calc</a></p><h1>${title}</h1><p class="lede">${desc}</p></header>` +
    guides.map(g => `<a class="gcard" href="guides/${g.slug}/"><b>${esc(g.title)}</b><span>${esc(g.desc)}</span></a>`).join("") + adUnit("wide");
  const ld = [{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url, description: desc }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE }, { "@type": "ListItem", position: 2, name: "Guides", item: url }] }];
  writeGuide("guides", guideTemplate.replace("{{BASEHREF}}", "../").replace("{{SEO}}", () => guideSeo(title, desc, url, ld)).replace("{{ADSCRIPT}}", () => AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "").replace("{{ANALYTICS}}", () => analytics).replace("{{BODY}}", () => body), "guides-index", url);
}
// 404 page: Cloudflare Pages serves /404.html with a real 404 status for any missing URL. Links resolve from the site root
// because it can be shown at any depth; noindex and no canonical, and it is not in the sitemap.
{
  const nf = { id: "notfound", name: "Page not found", lede: "The page you asked for does not exist or has moved.",
    html: `<div class="hb"><div class="hb-hello"><div class="hb-kick" aria-hidden="true">${Object.values(CAT_KEY).map(k => `<i class="t-${k}"></i>`).join("")}</div><p>The link may be old or mistyped. Every calculator is listed below, or start again from the homepage.</p><div class="hb-row"><a class="hb-btn hb-main" href="./">Go to the homepage</a><a class="hb-btn hb-alt" href="guides/">Read the guides</a></div></div>${bento()}</div>` };
  const nfSeo = `<title>Page not found | ${SITE_NAME}</title>
<meta name="robots" content="noindex">
<meta name="description" content="${esc(nf.lede)}">`;
  const html = template
    .replace("{{BASE}}", `<base href="${new URL(SITE).pathname}">`)
    .replace("{{SEO}}", () => nfSeo).replace("{{ANALYTICS}}", () => analytics).replace("{{ID}}", nf.id).replace("{{NAV}}", () => navFor(nf))
    .replace("{{SUPPORT}}", () => { const k = all.find(x => x.id === "coffee"); return `<div class="support"><a href="${pathOf(k)}" data-id="coffee"><span class="ic">${esc(k.ic)}</span><span class="lb">${esc(k.name)}</span></a></div>`; })
    .replace("{{H1}}", () => esc(nf.name)).replace("{{LEDE}}", () => esc(nf.lede)).replace("{{BODYCLASS}}", "").replace("{{CRUMB}}", "")
    .replace("{{PAGEHIDDEN}}", "").replace("{{PAGEHTML}}", () => nf.html).split("{{WORKHIDDEN}}").join(" hidden")
    .replace("{{FORMULA}}", "").replace("{{HOWTO}}", "").replace("{{RELATED}}", "").replace("{{AFFILIATE}}", "")
    .replace("{{AD1}}", "").replace("{{AD2}}", "").replace("{{AD3}}", "")
    .replace("{{ADSCRIPT}}", () => AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : "");
  fs.writeFileSync(path.join(root, "404.html"), html); n++;
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
