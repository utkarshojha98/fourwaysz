# Fourways — Website

Plant-based powder-to-liquid home care. Landing page + product catalogue + prototype cart.

## What's in this folder
- `index.html` — the complete website in ONE file. Logo, all product images, fonts and scripts are embedded inside it, so images always show.
- `assets/` — the original logo and product images (backup / for editing). The site does not need them to run.
- `IMAGE-DETAILS.md` — size, description and placement of every image.
- `.nojekyll` — tells GitHub Pages to serve the files as-is.

## Upload to GitHub Pages
1. Unzip this file on your computer.
2. On github.com → **New repository** → name it (e.g. `fourways-site`) → **Public** → **Create repository**.
3. Click **uploading an existing file**.
4. Open the unzipped folder, select **everything inside it** (index.html, README.md, IMAGE-DETAILS.md, .nojekyll, assets folder) and drag it in.
   - Do NOT drag the outer folder itself — `index.html` must sit at the top level of the repo.
   - Hidden file `.nojekyll`: on Mac press Cmd+Shift+. to show it; on Windows enable "Hidden items". Optional — the site works without it.
5. Click **Commit changes**.
6. **Settings → Pages** → Source: **Deploy from a branch** → Branch `main`, folder `/ (root)` → **Save**.
7. Wait 1–2 minutes. Your site is live at `https://<your-username>.github.io/fourways-site/`

## Note
The cart and checkout are a prototype — no payment is taken. For real sales, connect Shopify, Razorpay or Stripe.
