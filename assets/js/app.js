/* 42i.com — core app: layout, theme, forms, ads, tools, utilities */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]; }); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("42i:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("42i:" + k, JSON.stringify(v)); } catch (e) {} }
  };
  /* Contact address is decoded only at the moment of sending; never written into the page. */
  function addr() { return (S._k || []).slice().reverse().map(function (c) { return String.fromCharCode(c ^ 42); }).join(""); }

  /* ---------- Layout ---------- */
  var NAV = [
    ["tools.html", "AI Tools"], ["prompts.html", "Prompts"], ["learn.html", "Learn"],
    ["solutions.html", "AI Solutions"], ["contests.html", "Contests"], ["careers.html", "Careers"],
    ["advertise.html", "Advertise"], ["support.html", "Support Us"]
  ];
  var page = (location.pathname.split("/").pop() || "index.html");
  function header() {
    var h = $("#site-header"); if (!h) return;
    h.className = "site-header";
    h.innerHTML = '<div class="container nav">' +
      '<a class="logo" href="index.html" aria-label="42i home"><span class="logo-mark">42i</span><span>42i<small>' + esc(S.tagline) + '</small></span></a>' +
      '<nav class="nav-links" id="navLinks" aria-label="Main">' + NAV.map(function (n) {
        return '<a href="' + n[0] + '"' + (page === n[0] ? ' class="active" aria-current="page"' : "") + ">" + n[1] + "</a>";
      }).join("") + "</nav>" +
      '<div class="nav-actions"><button class="icon-btn" id="themeBtn" aria-label="Toggle theme">◐</button>' +
      '<a class="btn btn-primary btn-sm hide-m" href="submit.html">+ Submit Tool</a>' +
      '<button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">☰</button></div></div>';
    $("#menuBtn").onclick = function () { var n = $("#navLinks"); n.classList.toggle("open"); this.setAttribute("aria-expanded", n.classList.contains("open")); };
    $("#themeBtn").onclick = function () {
      var t = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", t); store.set("theme", t);
    };
  }
  function footer() {
    var f = $("#site-footer"); if (!f) return;
    f.className = "site-footer";
    var cats = (window.CATEGORIES || []).slice(0, 6).map(function (c) { return '<a href="tools.html?cat=' + c.id + '">' + esc(c.name) + "</a>"; }).join("");
    f.innerHTML = '<div class="container"><div class="foot-grid">' +
      '<div><a class="logo" href="index.html"><span class="logo-mark">42i</span><span>42i</span></a>' +
      '<p class="small" style="margin:14px 0 18px;max-width:340px">The answer engine for AI. Discover the right AI tool, prompt and expert for anything — free, independent and updated weekly.</p>' +
      '<form class="inline-form" data-form="Newsletter signup" data-inline="1"><input type="email" name="email" required placeholder="Get the weekly AI brief" aria-label="Email"><input class="hp" name="_honey" tabindex="-1" autocomplete="off"><button class="btn btn-primary btn-sm">Subscribe</button></form>' +
      '<div class="form-success"><b>You’re in! 🎉</b><p class="small">Check your inbox every Tuesday.</p></div></div>' +
      '<div><h4>Discover</h4><a href="tools.html">All AI Tools</a>' + cats + "</div>" +
      '<div><h4>Grow</h4><a href="solutions.html">Hire AI Experts</a><a href="submit.html">Submit a Tool</a><a href="advertise.html">Advertise</a><a href="contests.html">Contests</a><a href="careers.html">Careers & Talent</a></div>' +
      '<div><h4>Learn</h4><a href="prompts.html">Prompt Library</a><a href="learn.html">Videos & Guides</a><a href="learn.html#glossary">AI Glossary</a><a href="compare.html">Compare Tools</a><a href="' + esc(S.youtubeChannel) + '" target="_blank" rel="noopener">YouTube</a></div>' +
      '<div><h4>42i</h4><a href="about.html">About</a><a href="support.html">Support Us</a><a href="contact.html">Contact</a><a href="legal.html#privacy">Privacy</a><a href="legal.html#terms">Terms</a><a href="legal.html#disclosure">Affiliate Disclosure</a><a href="' + esc(S.domainInquiryUrl) + '" target="_blank" rel="noopener">Buy this domain</a></div>' +
      '</div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + " 42i.com · Some links are affiliate links; we may earn a commission at no cost to you.</span>" +
      '<span><a href="' + esc(S.domainInquiryUrl) + '" target="_blank" rel="noopener">Interested in this website/domain? Contact us</a></span></div></div>';
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    var t = $("#toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ---------- Forms: all submissions routed to the owner inbox via FormSubmit ---------- */
  function formToObj(form) {
    var o = {}, fd = new FormData(form);
    fd.forEach(function (v, k) { if (k === "_honey") return; o[k] = o[k] ? o[k] + ", " + v : v; });
    return o;
  }
  function send(form) {
    var data = formToObj(form);
    if (new FormData(form).get("_honey")) return Promise.resolve(true);
    var type = form.getAttribute("data-form") || "Inquiry";
    if (form._extra) Object.assign(data, form._extra());
    data._subject = "[42i.com] " + type + (data.name ? " — " + data.name : "") + (data.company ? " (" + data.company + ")" : "");
    data._template = "table"; data._captcha = "false";
    data["Form"] = type; data["Page"] = location.href; data["Submitted"] = new Date().toISOString();
    if (data.email) data._replyto = data.email;
    return fetch("https://formsubmit.co/ajax/" + addr(), {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data)
    }).then(function (r) { return r.ok; }).catch(function () { return false; }).then(function (ok) {
      if (!ok) {
        var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
        location.href = "mailto:" + addr() + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
      }
      if (window.gtag) window.gtag("event", "generate_lead", { form: type });
      return true;
    });
  }
  function bindForms() {
    $$("form[data-form]").forEach(function (form) {
      if (form._bound) return; form._bound = true;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (form.checkValidity && !form.checkValidity()) { form.reportValidity(); return; }
        var btn = form.querySelector("button[type=submit],button:not([type])"); var label = btn && btn.innerHTML;
        if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }
        send(form).then(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = label; }
          form.classList.add("sent"); form.reset();
          var sib = form.nextElementSibling;
          if (!sib || !sib.classList.contains("form-success")) toast("Thanks — we received it!");
          if (form.getAttribute("data-redirect")) location.href = form.getAttribute("data-redirect");
        });
      });
    });
  }
  /* Links that should open an email draft without exposing the address in markup */
  function bindMail() {
    $$("[data-mail]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        location.href = "mailto:" + addr() + "?subject=" + encodeURIComponent(a.getAttribute("data-mail") || "42i.com inquiry");
      });
    });
  }

  /* ---------- Ads: AdSense when configured, otherwise house ads ---------- */
  var HOUSE = [
    ["Reach 100% AI-intent buyers.", "Sponsor 42i →", "advertise.html"],
    ["Launched an AI tool?", "Get listed on 42i →", "submit.html"],
    ["Need AI built for your business?", "Get a free AI plan →", "solutions.html"],
    ["Win cash & featured spots.", "Enter 42 Days of AI →", "contests.html"],
    ["Keep 42i free & independent.", "Support us →", "support.html"]
  ];
  function ads() {
    var slots = $$(".ad-slot"); if (!slots.length) return;
    if (S.adsenseClient) {
      var sc = document.createElement("script"); sc.async = true; sc.crossOrigin = "anonymous";
      sc.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient;
      document.head.appendChild(sc);
      slots.forEach(function (s) {
        var type = s.getAttribute("data-ad") || "banner";
        s.innerHTML = '<span class="ad-label">Advertisement</span><ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="' + S.adsenseClient + '" data-ad-slot="' + ((S.adsenseSlots || {})[type] || "") + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      });
    } else {
      slots.forEach(function (s, i) {
        var h = HOUSE[(i + page.length) % HOUSE.length];
        s.innerHTML = '<div><span class="ad-label">Sponsored</span><div class="house-ad"><b>' + h[0] + '</b><a class="btn btn-ghost btn-sm" href="' + h[2] + '">' + h[1] + "</a></div></div>";
      });
    }
  }
  function analytics() {
    if (!S.gaMeasurementId) return;
    var sc = document.createElement("script"); sc.async = true; sc.src = "https://www.googletagmanager.com/gtag/js?id=" + S.gaMeasurementId; document.head.appendChild(sc);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", S.gaMeasurementId);
  }

  /* ---------- YouTube lite embeds ---------- */
  function videos() {
    $$(".yt[data-id]").forEach(function (v) {
      var id = v.getAttribute("data-id");
      v.innerHTML = '<img loading="lazy" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="' + esc(v.getAttribute("data-title") || "Video") + '"><span class="play"><i>▶</i></span>';
      v.setAttribute("role", "button"); v.setAttribute("tabindex", "0");
      var load = function () { v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + esc(v.getAttribute("data-title") || "Video") + '" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'; };
      v.onclick = load; v.onkeydown = function (e) { if (e.key === "Enter") load(); };
    });
  }

  /* ---------- Tools helpers ---------- */
  function catName(id) { var c = (window.CATEGORIES || []).filter(function (x) { return x.id === id; })[0]; return c ? c.name : id; }
  function host(u) { try { return new URL(u).hostname; } catch (e) { return ""; } }
  function affiliate(u) { return u + (u.indexOf("?") > -1 ? "&" : "?") + (S.affiliateTag || "ref=42i"); }
  function logo(t) {
    return '<span class="tool-logo"><img loading="lazy" alt="" src="https://www.google.com/s2/favicons?domain=' + host(t.url) + '&sz=64" onerror="this.replaceWith(document.createTextNode(\'' + esc(t.name[0]) + '\'))"></span>';
  }
  function saved() { return store.get("saved", []); }
  function toggleSave(slug) {
    var s = saved(), i = s.indexOf(slug);
    if (i > -1) { s.splice(i, 1); toast("Removed from saved"); } else { s.push(slug); toast("Saved ♥ — find it under Saved"); }
    store.set("saved", s); return i === -1;
  }
  function toolCard(t, opts) {
    opts = opts || {};
    var isSaved = saved().indexOf(t.slug) > -1;
    return '<article class="card tool-card' + (t.featured ? " is-featured" : "") + '">' +
      (opts.compare ? '<label class="cmp-check"><input type="checkbox" data-cmp="' + t.slug + '"> Compare</label>' : "") +
      '<a class="tool-top" href="tool.html?t=' + t.slug + '">' + logo(t) + '<span><span class="tool-name">' + esc(t.name) + '</span><br><span class="tool-cat">' + esc(catName(t.cat)) + "</span></span></a>" +
      "<p>" + esc(t.tagline) + "</p>" +
      '<div class="tool-meta"><span class="badge ' + t.pricing.toLowerCase() + '">' + t.pricing + "</span>" + (t.featured ? '<span class="badge feat">★ Featured</span>' : "") + t.tags.slice(0, 2).map(function (g) { return '<span class="badge">' + esc(g) + "</span>"; }).join("") + "</div>" +
      '<div class="tool-actions"><a class="btn btn-ghost btn-sm" href="tool.html?t=' + t.slug + '">Details</a><a class="btn btn-primary btn-sm" href="' + affiliate(t.url) + '" target="_blank" rel="noopener sponsored">Visit ↗</a>' +
      '<button class="btn btn-ghost btn-sm save-btn' + (isSaved ? " saved" : "") + '" data-save="' + t.slug + '" aria-label="Save">♥</button></div></article>';
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-save]");
    if (b) { var on = toggleSave(b.getAttribute("data-save")); b.classList.toggle("saved", on); }
    var c = e.target.closest && e.target.closest("[data-copy]");
    if (c) {
      var txt = c.getAttribute("data-copy-text") || (c.closest(".prompt-card") && c.closest(".prompt-card").querySelector("pre").innerText) || "";
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast("Copied to clipboard ✓"); }, function () { toast("Select the text to copy"); });
    }
  });

  /* ---------- Exit-intent lead capture (once per 7 days) ---------- */
  function exitIntent() {
    if (!$("#exitModal")) return;
    var last = store.get("exitShown", 0); if (Date.now() - last < 6048e5) return;
    var fire = function () { $("#exitModal").classList.add("show"); store.set("exitShown", Date.now()); document.removeEventListener("mouseout", h); };
    var h = function (e) { if (!e.relatedTarget && e.clientY < 10) fire(); };
    setTimeout(function () { document.addEventListener("mouseout", h); }, 8000);
    $$("#exitModal .close").forEach(function (x) { x.onclick = function () { $("#exitModal").classList.remove("show"); }; });
  }
  function reveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(function (r) { r.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (r) { io.observe(r); });
  }
  function stickyCta() {
    var s = $(".sticky-cta"); if (!s) return;
    window.addEventListener("scroll", function () { s.classList.toggle("show", window.scrollY > 600); }, { passive: true });
  }
  function countUp() {
    $$("[data-count]").forEach(function (el) {
      var end = +el.getAttribute("data-count"), suf = el.getAttribute("data-suffix") || "", t0 = null;
      var step = function (ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1200, 1); el.textContent = Math.floor(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  window.APP = { $: $, $$: $$, esc: esc, store: store, toolCard: toolCard, catName: catName, affiliate: affiliate, logo: logo, host: host, saved: saved, toast: toast, bindForms: bindForms, addr: addr, videos: videos };

  document.addEventListener("DOMContentLoaded", function () {
    header(); footer(); bindForms(); bindMail(); ads(); analytics(); videos(); exitIntent(); reveal(); stickyCta(); setTimeout(countUp, 0);
    $$("[data-year]").forEach(function (y) { y.textContent = new Date().getFullYear(); });
  });
})();
