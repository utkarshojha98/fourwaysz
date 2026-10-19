# Fourways website (static build)

Six pages, plain HTML/CSS/JS, no framework: `index.html`, `products.html`, `who-its-for.html`, `proof.html`, `about.html`, `sample.html`.

- Edit pages in `_src/pages/*.html` (shared header/footer and the sample form live in `_src/build.py` and `_src/form.html`), then run `python3 _src/build.py`. The built pages are what you deploy.
- Preview: `cd site && python3 -m http.server`, then open http://localhost:8000.
- Deploy: the `site/` folder as-is to Netlify, Vercel or Cloudflare Pages (not done; waiting on your go-ahead). `_src/` and this README can be left out of the upload.

## Where the design came from

No Claude Design export was in the project folder, so the design source is the published homepage ([Fourways Homepage](https://claude.ai/artifact/Mvh3xZjksVBzBtyVLJHEuL)) plus `design.md`. Copy is from the six-page copy doc, with the changes below.

## Copy I did not publish (breaks the claim guardrails)

| Page | Copy-doc line | What the site says instead |
|---|---|---|
| Products | Dishwash "Enzyme-powered [F4] to lift grease" | "For plates, pans and café cups." |
| Products | Floor cleaner "For marble, tile and stone [F5]" | "For lobbies, corridors and rooms." |
| Products, Home | Hand wash "gentle" | Dropped; "cleanses" / "everyday hygiene" only |
| Who it's for | "Easier on your team… kinder to hands [F7]" | Bullet removed |
| Who it's for | "…in a fraction of the shelf space [F6]" | Kept "Five sachets make the same 5 litres as a 5-litre can"; space claim dropped until pack dimensions exist |
| About | Intro "work as hard as the usual ones, without the harsh chemicals [F14]" | Intro removed |
| About | Four stages: low-carbon [F15], cleans as well as conventional [F16], without harsh chemicals [F7], biodegradable [F17] | List removed; only the meaning of "charo taraf se" kept |
| About | "comes with the paperwork to back what we say" | Clause removed (no documents yet) |
| Proof | "our test reports and trial data are the proof" | Only "We list certifications here only once they are granted." |
| Proof | "GST details and a trial summary… on WhatsApp or email" | "GST details… on WhatsApp" (no trial yet, no email address given) |
| Home (impact) | Plastic figure used a 3 g sachet weight that was our own guess | Plastic figure is a visible blank until the sachet is weighed |

Still flagged but published because the brief itself states it: "plant-based" (F1, needs a formulation sheet) and "free sample" (F3, your sample policy).

## Visible blanks

Hand wash price, pack sizes, dilution rates, GSTIN, first trial result, sachet weight (plastic estimate). A yellow "Draft" bar explains them; remove it in `_src/build.py` once they're filled.

## Homepage critique (screenshots at 390px and 1440px)

No `design-critic` skill is installed, so I reviewed the screenshots against `design.md` myself. Fixed before building the other pages:

1. Phone product rows were broken: the packshot sat over the product name ("Dishwa…"). Now a clean 72px image + name row.
2. Proof squares overflowed on phone: long blanks pushed text off the right edge. Fixed.
3. Packshots had mixed crops (dishwash was near-square, the others 4:3). All four are now the same 4:3 crop.
4. Desktop cost section left a large empty area beside the table. The "invoice price is not your real cost" note now sits beside it.

## Cut pass (removed)

- Off-palette scent dots (purple, orange, light blue) on product pills and table rows; table dots are all navy.
- Draft "[F1]" style claim flags from the page (they're listed above instead).
- Duplicate end-of-page CTA bands on Products, Who it's for and Proof (each already ends with its own CTA section).
- The full sentence "Your request is in" before the visitor has actually sent the WhatsApp message (now "One last step").

## Launch checks

- Static, no database: yes.
- Speed, phone on 4G (4 Mbps, 170 ms RTT, 4x CPU slowdown): Home loads in 1.9 s, first paint 0.8 s, about 210 KB total (most of it fonts).
- No horizontal scroll at 390px or 1440px: checked on all six pages.
- Hindi slogan renders with Baloo 2 (loaded with only the slogan's characters). Checked in Chromium only; still needs a look on a real Android phone and iPhone.
- WhatsApp click-to-chat with a prefilled message on every page, opens in a new tab, right number; number also shown as selectable text in the footer.
- Every page has "Request a sample" and WhatsApp on the first phone screen. Sample page shows the form there.
- Form: required-field errors only after typing or submit; submit builds a WhatsApp message with Send and Copy buttons. Nothing reaches an inbox; WhatsApp is the only channel.
- No germ-kill or antibacterial wording: checked.
- GSTIN and licence in footer: GSTIN is a blank; no licence yet.
- All internal links and anchors resolve; no console errors.

## Known gaps

- Home is about 760 words, well over the ~250 target, because `design.md` asks for eight sections on it (cost, products, impact, proof, start-with-one, form). Cutting the impact section or the on-page form would bring it near 450.
- "Who it's for" copy covers hotels and cafés; schools and hospitals appear only through the property picker (with the "wards and clinical areas stay with your current supplier" note for hospitals).
