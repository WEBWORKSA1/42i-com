/* 42i.com — site configuration. Edit values here; no build step needed. */
window.SITE = {
  name: "42i",
  domain: "42i.com",
  tagline: "The Answer Engine for AI",
  domainInquiryUrl: "https://web.works/contact",

  /* Contact routing — encoded so the address never appears in page source. Do not replace with a plain address. */
  _k: [71, 69, 73, 4, 70, 67, 75, 71, 77, 106, 27, 75, 89, 65, 88, 69, 93, 72, 79, 93],

  /* Monetization — paste IDs when approved; empty = house ads shown instead */
  adsenseClient: "",            /* e.g. "ca-pub-1234567890123456" */
  adsenseSlots: { banner: "", inFeed: "", sidebar: "" },
  gaMeasurementId: "",          /* e.g. "G-XXXXXXX" */
  youtubeChannel: "https://www.youtube.com/@42i",
  buyMeACoffeeUrl: "",          /* optional: https://buymeacoffee.com/yourname */
  stripeDonateUrl: "",          /* optional: Stripe Payment Link */
  affiliateTag: "ref=42i",

  /* Contest — edit dates/prizes per season */
  contest: {
    name: "42 Days of AI — Season 1",
    theme: "Build, create or automate something useful with AI in 42 days",
    opens: "2026-10-01T00:00:00Z",
    closes: "2026-11-12T23:59:59Z",
    prizes: [
      { place: "Grand Prize", reward: "$2,000 + 1-year Featured listing + homepage showcase" },
      { place: "Runner-up", reward: "$1,000 + 6-month Featured listing" },
      { place: "Third place", reward: "$500 + 3-month Featured listing" },
      { place: "Community Choice", reward: "$420 + newsletter spotlight" },
      { place: "42 Finalists", reward: "Badge + permanent gallery feature" }
    ]
  }
};
