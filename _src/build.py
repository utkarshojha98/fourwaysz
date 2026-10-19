"""Builds the static pages in site/ from _src/pages/*.html.

Each page file starts with one line of JSON (title, description, nav key, WhatsApp text),
followed by the page's <main> content. Run: python3 site/_src/build.py
"""
import json, pathlib, urllib.parse

SRC = pathlib.Path(__file__).parent
OUT = SRC.parent

NAV = [("products", "products.html", "Products"), ("who", "who-its-for.html", "Who it's for"),
       ("proof", "proof.html", "Proof"), ("about", "about.html", "About")]
HINDI = "चारों तरफ़ से"
CUR = ' aria-current="page"'
FONTS = ("https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700"
         "&family=Figtree:ital,wght@0,400;0,500;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap")
FONT_HI = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600&display=swap&text=" + urllib.parse.quote(HINDI)

WA_GLYPH = ('<svg class="wa" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.4 11.4 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z"/></svg>')


def wa_url(text):
    return "https://wa.me/919717166480?text=" + urllib.parse.quote(text)


def page(meta, body):
    wa = wa_url(meta.get("wa", "Hello Fourways, I'd like to know more about your cleaning sachets."))
    body = body.replace("{{FORM}}", (SRC / "form.html").read_text(encoding="utf-8")).replace("{{WA}}", wa).replace("{{WA_GLYPH}}", WA_GLYPH)
    nav = "".join(
        f'<a href="{href}"{CUR if key == meta.get("nav") else ""}>{label}</a>'
        for key, href, label in NAV)
    foot_nav = "".join(f'<a href="{h}">{l}</a>' for _, h, l in NAV) + '<a href="sample.html">Sample / quote</a>'
    return f"""<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{meta['title']}</title>
<meta name="description" content="{meta['description']}">
<meta name="color-scheme" content="only light">
<meta name="theme-color" content="#F4F6FC">
<link rel="icon" href="img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}" media="print" onload="this.media='all'">
<link rel="stylesheet" href="{FONT_HI}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="{FONTS}"><link rel="stylesheet" href="{FONT_HI}"></noscript>
<link rel="stylesheet" href="css/site.css">
{meta.get('head', '')}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="draft" role="note"><div class="wrap"><b>Draft</b><span>Dashed blanks like <span class="blank">[₹__]</span> are facts still being confirmed. They stay visible until they are filled in.</span></div></div>
<header class="site"><div class="wrap">
  <a href="index.html" aria-label="Fourways home"><picture><source srcset="img/logo.webp" type="image/webp"><img class="logo" src="img/logo.png" width="132" height="46" alt="Fourways"></picture></a>
  <nav class="main" aria-label="Main">{nav}</nav>
  <a class="btn btn-navy sm" href="sample.html">Request a sample</a>
</div></header>
<main id="main">
{body}
</main>
<footer><div class="wrap">
  <div><span class="hi" lang="hi">{HINDI}</span><br>Care from all directions.</div>
  <address>ASV Industry<br>A-183 Shalimar Garden, Ghaziabad, Uttar Pradesh<br>WhatsApp and phone: <a class="tel" href="{wa}" target="_blank" rel="noopener">+91 97171 66480</a><br>GSTIN: <span class="blank">[GSTIN]</span></address>
  <nav aria-label="Footer">{foot_nav}</nav>
</div></footer>
<script src="js/site.js" defer></script>
</body>
</html>
"""


for src in sorted((SRC / "pages").glob("*.html")):
    first, _, rest = src.read_text(encoding="utf-8").partition("\n")
    (OUT / src.name).write_text(page(json.loads(first), rest), encoding="utf-8")
    print("built", src.name)
