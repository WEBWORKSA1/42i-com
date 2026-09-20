# 42i.com — The Answer Engine for AI

A static, fully responsive AI tools directory with a prompt library, learning hub, contests, careers, donations and a lead-generation engine. It has no build step and runs on the free GitHub Pages plan.

**Interested in this website or domain?** → https://web.works/contact

## Pages
| Page | What it does |
|---|---|
| `index.html` | Hero search, categories, editor's picks, lead form, prompts, videos, contest, newsletter, FAQ |
| `tools.html` | Directory with search, filters, sort and compare (`?q=`, `?cat=`) |
| `tool.html?t=slug` | Tool detail page, alternatives, implementation lead form, claim listing |
| `compare.html` | Side-by-side comparison of up to 3 tools |
| `solutions.html` | **Lead gen**: ROI calculator and a 4-step lead form with lead scoring |
| `submit.html` / `advertise.html` | Paid listings and sponsorship inquiries |
| `contests.html` | Countdown, prizes, entry form, sponsor form |
| `careers.html` | Open roles, expert network, job posts |
| `support.html` | Donations (one-time or monthly) and memberships |
| `prompts.html`, `learn.html`, `about.html`, `contact.html`, `legal.html`, `404.html` | Content and trust pages |

## Configure (`assets/js/config.js`)
- `adsenseClient` and `adsenseSlots`: paste your AdSense IDs after approval. Until then, house ads are shown.
- `gaMeasurementId`: your GA4 ID.
- `youtubeChannel`, `stripeDonateUrl`, `buyMeACoffeeUrl`, `affiliateTag`.
- `contest`: season name, dates and prizes.
- Add tools, prompts, glossary entries and videos in `assets/js/data.js`.

## Forms
Every form posts through FormSubmit to the owner inbox. The address is stored encoded in `config.js` and never appears in the page. **The first submission sends an activation email to the owner inbox; confirm it once.**

## Deploy
Settings → Pages → Deploy from branch → `main` / root.

For the custom domain:
1. Add a `CNAME` file containing `42i.com`.
2. Set DNS A records to 185.199.108.153, .109.153, .110.153 and .111.153.
3. Set a `www` CNAME record to `webworksa1.github.io`.

See `PROMPT.md` for the concept, revenue model, research and phase-wise build prompt.
