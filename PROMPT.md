# 42i.com — Concept, Revenue Model & Phase-wise Build Prompt

## 1. The concept: "42i — The Answer Engine for AI"

**42** is pop culture's most famous answer, "the answer to life, the universe and everything". **i** stands for intelligence. Put together, 42i.com is the place you go to get *the answer to "which AI should I use for this, and how?"*

**Positioning:** an AI tools directory combined with prompts, tutorials, contests, jobs and a done-for-you lead engine that connects businesses with AI experts.

### Why this idea beats the alternatives

| Candidate concept | Traffic ceiling | Revenue per visitor | Lead-gen fit | Brand fit with "42i" | Verdict |
|---|---|---|---|---|---|
| **AI tools directory + answer hub** | Very high: tens of thousands of AI tools and daily launches | High: SaaS CPCs, paid listings, affiliates | Excellent: businesses want AI implemented | Excellent ("answer" + "intelligence") | ✅ **Winner** |
| Trivia / "answers to everything" Q&A | High | Low (low CPC) | Weak | Good | ❌ |
| Hitchhiker fan site | Low/niche | Low | None | Trademark risk | ❌ |
| IQ tests / brain games ("i" = IQ) | Medium | Low–medium | Weak | Medium | ❌ |
| AI news blog only | Medium | Medium | Weak | Good | Folded in as a feature |

### Revenue stack (10 streams)
1. **Paid listings:** Free / Fast-Track $29 / Featured $199 / Spotlight $499, plus Highlight $99/mo. Market benchmarks: TAAFT $49–$437, Futurepedia $247–$497, Toolify $99, topai.tools $47–$229.
2. **Lead generation:** a free "AI Action Plan" form with lead scoring. Hot leads are sold to or matched with AI agencies ($50–$300 per lead, or a 10–15% success fee).
3. **Google AdSense:** banner, in-feed and sidebar slots on every page. AI/SaaS queries carry high CPCs.
4. **Affiliate:** outbound tool links carry a `ref` parameter. SaaS programs typically pay 20–40% recurring.
5. **Newsletter sponsorships:** Primary $420 and Quick Link $142 per send, max 3 sponsors per issue (TLDR model).
6. **YouTube:** tool walkthroughs and reviews. Earns AdSense plus sponsored integrations ($840+).
7. **Category takeovers and homepage sponsors:** $390–$490 per slot.
8. **Pay-per-click featured cards:** $1.20 per click (TAAFT model).
9. **Job board:** $149 per 30-day post, $49 highlight.
10. **Donations and memberships:** PayPal one-time or monthly ($5 / $21 / $42 / $420 tiers), plus contest sponsorships.

### Revenue model at 100k visits/month (month 9–12 target)
| Stream | Conservative | Base | Bold |
|---|---|---|---|
| AdSense (RPM $6 / $10 / $15) | $600 | $1,000 | $1,500 |
| Paid listings (15 / 40 / 80 × avg $120) | $1,800 | $4,800 | $9,600 |
| Leads (10 / 30 / 60 sold × $100) | $1,000 | $3,000 | $6,000 |
| Affiliate | $300 | $1,200 | $3,000 |
| Newsletter + YouTube sponsors | $0 | $1,500 | $4,000 |
| Jobs + donations | $150 | $600 | $1,500 |
| **Monthly total** | **$3,850** | **$12,100** | **$25,600** |

The biggest lever is **listings + leads, not AdSense**. AdSense is the floor, not the business.

---

## 2. Research: 32 world-class sites analysed (Sep 2026)
The sites fall into four groups:
- **AI tool directories:** theresanaiforthat.com, futurepedia.io, toolify.ai, topai.tools, aitoptools.com, easywithai.com, aixploria.com
- **Launch platforms and software review sites:** producthunt.com, alternativeto.net, g2.com, capterra.com, saasworthy.com, betalist.com, uneed.best, clutch.co
- **Newsletters:** therundown.ai, superhuman.ai, tldr.tech, bensbites.com
- **Communities, learning, contests, jobs and support:** promptbase.com, flowgpt.com, huggingface.co, deeplearning.ai, perplexity.ai/discover, kaggle.com, devpost.com, wellfound.com, aijobs.ai, foorilla.com, buymeacoffee.com, patreon.com

**Features adopted from them:**
- Natural-language search box with "/" shortcut
- Category, pricing and platform filters
- Save ♥ and side-by-side compare
- Tool pages with alternatives, a "claim listing" option and a Featured badge
- Tiered submission pricing with a refund-if-rejected promise
- Embeddable backlink badge
- Newsletter with 3 sponsor slots
- Rate card and media-kit form
- Contest page with countdown, prizes, judging criteria, rules and sponsor form (Kaggle/Devpost model)
- Talent network and job board
- Buy-Me-a-Coffee style donation amounts with membership tiers
- Clutch/Capterra-style "get matched" multi-step lead form with budget and timeline
- Exit-intent lead magnet
- Structured data: WebSite search, SoftwareApplication, Event, DefinedTermSet
- Affiliate disclosure

---

## 3. Phase-wise build prompt (copy each phase into your AI builder)

> **Global rules for every phase.**
> - Domain: 42i.com. Brand: "42i — The Answer Engine for AI". Stack: static HTML, CSS and vanilla JS only, deployable free on GitHub Pages. No build step.
> - Every page's very top shows a full-width bar: "Contact, if you are interested in this website/domain name", linking to https://web.works/contact (new tab).
> - All forms, contact links and donation links use ONE owner email. It must never appear in HTML, visible text or plain source. Store it encoded (char codes XOR-ed and reversed) in `config.js` and decode it only at submit or click time. Forms POST via FormSubmit AJAX; the fallback is a JS-built `mailto:`.
> - Design: dark-first with a light toggle, violet→cyan gradient, Space Grotesk + Inter fonts, 16px radius cards. Mobile-first with no horizontal scroll at 360px. WCAG AA contrast.

### Phase 1: Foundation & design system
"Create `/assets/css/style.css` with design tokens (dark and light), buttons, cards, grids (2/3/4 columns collapsing to 1), forms, multi-step, pricing cards, CTA band, ad slots, YouTube facade, countdown, FAQ accordion, toast, sticky mobile CTA, exit-intent modal and footer. Create `config.js` holding the site settings (encoded email, AdSense client and slots, GA4 ID, YouTube channel, Stripe/BMC links, affiliate tag, contest dates and prizes). Create `app.js`, which injects the header and nav (AI Tools, Prompts, Learn, AI Solutions, Contests, Careers, Advertise, Support Us, plus a Submit Tool button and theme toggle) and the footer (newsletter, link columns, domain inquiry link)."

### Phase 2: Data layer & directory
"Create `data.js` with 12 categories and 50+ real AI tools. Each tool has: slug, name, category, pricing (Free/Freemium/Paid), tagline, URL, tags, platforms, best-for, featured flag. Build:
- `tools.html`: natural-language search with a synonym map, filters for category, pricing, platform, saved and featured, 4 sort orders, ?q= and ?cat= deep links, dynamic SEO title per category, and a compare tray (max 3).
- `tool.html?t=slug`: detail page with SoftwareApplication JSON-LD, affiliate Visit button, save/share, spec table, YouTube tutorial link, alternatives, an 'implementation help' lead form, a claim-listing form and a Get Featured CTA.
- `compare.html`: side-by-side comparison table."

### Phase 3: Homepage (conversion-first)
"Hero with a giant search box and task chips, then animated stat counters. Below that, in order:
1. AdSense banner
2. Category grid
3. Tabbed editor's picks
4. Lead-gen CTA band with a 3-field 'free AI Action Plan' form
5. Prompt teaser with copy buttons
6. YouTube lite embeds with a subscribe CTA
7. Contest countdown and prizes
8. 'Grow with 42i' cards (submit, advertise, talent, support)
9. Newsletter
10. FAQ

Add an exit-intent lead magnet ('The 42 AI Tools That Pay for Themselves') and a sticky mobile CTA."

### Phase 4: Lead generation engine (`solutions.html`)
"Build:
- A hero with a value proposition and 4 trust bullets.
- An ROI calculator: team size, hours per week, hourly cost, % automatable → hours and dollars saved per year.
- 6 service cards and a 4-step process.
- A **4-step lead form**: goal → business (industry, size, website) → budget and timeline → contact (name, email, company, role, phone/WhatsApp, country, preferred contact, expert-match opt-in, consent). Include a progress bar, per-step validation and hidden lead scoring (0–100 → HOT/WARM/NURTURE) with the ROI values attached.
- An 'Apply as expert' strip and an FAQ."

### Phase 5: Monetization pages
"`submit.html`: 4 pricing tiers plus a Highlight add-on and a full submission form (plan, name, URL, tagline, description, category, pricing, starting price, platforms, demo video, affiliate URL, contact, promo code, authorisation checkbox) and the badge snippet.

`advertise.html`: stats, rate card table (homepage, category takeover, newsletter primary/quick link, YouTube, contest, PPC) and a media-kit inquiry form with placement checkboxes, budget and start date.

AdSense loader: when `adsenseClient` is set, inject `adsbygoogle`; otherwise show rotating house ads that promote internal offers."

### Phase 6: Community, contests, careers, donations
"`contests.html`: config-driven season, live countdown, prizes, how it works, judging criteria, rules, calendar, Event JSON-LD, an entry form (tracks, team, idea, 18+ consent) and a sponsor/host form.

`careers.html`: 6 open remote roles with apply buttons that preselect the role, an application form, an Expert Network signup (expertise checkboxes, rate, portfolio) and a paid job-post form.

`support.html`: one-time/monthly toggle, $5/$21/$42/$100 amounts plus custom, purpose selector, PayPal donate link built at click time, optional Stripe/BMC buttons, allocation bars, 4 membership tiers, a corporate/in-kind form and a supporters wall."

### Phase 7: Content & SEO
"`prompts.html`: searchable, category-chipped library with [VARIABLE] highlighting, copy and 'Try in ChatGPT' buttons, and a prompt submission form.

`learn.html`: YouTube lite embeds, 'Best AI tools for X' guides generated from the categories, and a searchable glossary with DefinedTermSet JSON-LD.

Also build: about, contact (topic router plus form plus a JS email-draft link), legal (privacy, cookies/AdSense, affiliate disclosure, terms, contest rules), 404, sitemap.xml, robots.txt, ads.txt, manifest and favicon.svg."

### Phase 8: QA, deploy, grow
"Run Playwright on every page at 1366px and 390px, checking for: no horizontal overflow, no console errors, the domain bar present, and the owner email absent from the DOM and repo. Push to GitHub repo `42i-com` and enable Pages (main, root).

Post-launch checklist:
- Apply for AdSense and paste the IDs into `config.js`.
- Add GA4.
- Point the 42i.com DNS to GitHub Pages and add a CNAME file.
- Submit the sitemap in Search Console.
- Activate FormSubmit with the first test submission.
- Publish 2 YouTube videos a week.
- Add 20 tools a week.
- Generate static /tool/ pages for SEO once there are more than 200 tools."

---

## 4. 90-day growth plan
- **Weeks 1–2:** Launch. Submit to 30 directories (link building). Activate forms. Apply for AdSense.
- **Weeks 3–6:** Grow to 200 tools and 10 "best X for Y" guides. Publish 2 YouTube walkthroughs a week, turned into Shorts.
- **Weeks 7–10:** Open the paid listings. Cold-email 200 AI startups with a Featured launch offer. Recruit 10 AI agencies into the Expert Network (the buyers for your leads).
- **Weeks 11–13:** Launch "42 Days of AI" funded by 2–3 tool sponsors, which drives backlinks, UGC and email list growth.
