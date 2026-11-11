# Ιωάννα Τσάτη — Ψυχολόγος

Static website for Ιωάννα Τσάτη, psychologist (online sessions for adults and
older adults). Built from the "Τελικό · Φασκόμηλο & Πηλός" design canvas.

Live: https://mitsispantelis.github.io/ioanna-tsati/

## Stack

Plain HTML + CSS + a little JavaScript. No build step: GitHub Pages serves the
repository root as-is. Every page works without JavaScript.

| File | Page |
|------|------|
| `index.html` | Αρχική |
| `about.html` | Σχετικά με εμένα |
| `services.html` | Υπηρεσίες (tabs; deep links `#symvouleftiki`, `#psychoekpaidefsi`, `#ypostirixi`) |
| `faq.html` | Συχνές ερωτήσεις |
| `contact.html` | Επικοινωνία & ραντεβού |
| `privacy.html` | Πολιτική απορρήτου (placeholder) |

The header and footer are repeated in each page. **When you change one, change
it in all six files.**

## Preview locally

Open `index.html` in a browser, or serve the folder on localhost:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

## Contact form

GitHub Pages has no server, so the form opens the visitor's email app with the
request already written (`mailto:`). Set the address in **one** place:
`CONTACT_EMAIL` at the top of `assets/js/main.js`.

## Placeholders still to fill

Search for `[` in the HTML: email, phone, session price, and the privacy policy
text.

## Fonts

Commissioner and Noto Serif Display are self-hosted (Greek + Latin subsets from
Fontsource), so no visitor data goes to Google Fonts. Both are under the SIL
Open Font License — see `assets/fonts/OFL-*.txt`.
