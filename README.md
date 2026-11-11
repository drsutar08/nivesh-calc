# Nivesh Calc

A static stock and investment calculator site. It uses plain HTML, CSS and JavaScript, with no build step and no dependencies.

## Run locally
Open `index.html` in a browser. You can also serve the folder with a local server:

    npx serve .        # or: python3 -m http.server

## Structure
- `index.html`: the page shell, with the sidebar, the input panel and the result panel
- `css/styles.css`: the theme tokens (light and dark), the layout and the components
- `js/app.js`: the calculator definitions (`CALCS`), the rendering, the routing and the theme toggle

## Add a calculator
Add an object to the `CALCS` array in `js/app.js`:

    {id:"my-calc", group:"Stocks", ic:"Σ", name:"My Calculator", lede:"One-line description.",
     fields:[["a","Label",100,"₹"]],             // [key, label, default value, unit]
     calc:f => ({hero:["Main result", inr(f.a)],  // big number
                 rows:[["Detail", inr(f.a*2)]],    // label/value list
                 bar:[invested, returns]}),        // optional split bar
     formula:"Explanation shown under the result."}

The sidebar link and the `#my-calc` URL are created automatically.

## Deploy
Upload the folder to any static host, such as GitHub Pages, Netlify, Vercel or Cloudflare Pages.

## SEO build
Every calculator has its own real page (for example `sip-calculator/`) with its own title, description, canonical URL and structured data. These pages, `index.html`, `sitemap.xml` and `robots.txt` are generated, so do not edit them by hand.

After you add or change a calculator, or change `scripts/template.html`, run:

    SITE_URL=https://your-domain.com/ node scripts/build.js

On Windows PowerShell: `$env:SITE_URL="https://your-domain.com/"; node scripts/build.js`. Then upload the whole folder. Old `#hash` links redirect to the new pages.

## Guides, analytics and images
- Long-form guides live in `scripts/guides.js` and are built to `guides/<slug>/`. Add an object there and rebuild. Keep them free of figures that change (tax rates, charges).
- Analytics: set `CF_BEACON=<Cloudflare Web Analytics token>` (or `GA_ID=G-XXXX`) when you build. Without either, no analytics script is added.
- `images/og-image.png` (1200×630) is the social preview; `images/icon-*.png` and `site.webmanifest` are the app icons.
- `scripts/.lastmod.json` remembers when each page last changed, so `sitemap.xml` only updates `lastmod` for pages that really changed. Keep this file.
- When you move to your own domain: `SITE_URL=https://yourdomain.com/ node scripts/build.js`, then upload the folder.
