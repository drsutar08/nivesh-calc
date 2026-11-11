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
