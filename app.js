// Free Tools — renders everything from TOOLS in tools.js.
// Do not hardcode tool cards in index.html; add tools only in tools.js.

(function () {
  var tools = (typeof TOOLS !== "undefined" && Array.isArray(TOOLS)) ? TOOLS.slice() : [];

  // Newest first (by date, then by order in tools.js).
  tools.sort(function (a, b) {
    if (a.date !== b.date) return (b.date || "").localeCompare(a.date || "");
    return 0;
  });

  var state = { query: "", category: "All" };

  // ---- Corner menu preferences (saved in localStorage) ----
  var PREF_THEME = "ft-theme";       // "dark" | "light"
  var PREF_TEXT = "ft-text-size";    // "large" | "normal"
  var PREF_COMPACT = "ft-compact";   // "1" | "0"
  var HUB_LINK = "https://hiat01.github.io/";

  function loadPref(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function savePref(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ } }

  // Apply saved choices right away (no flash). First visit: follow the device's dark preference.
  function applyPrefs() {
    var savedTheme = loadPref(PREF_THEME);
    var dark = savedTheme
      ? savedTheme === "dark"
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("text-large", loadPref(PREF_TEXT) === "large");
    document.documentElement.classList.toggle("compact-view", loadPref(PREF_COMPACT) === "1");
    return dark;
  }
  applyPrefs();

  function copyText(text, onOk, onFail) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onOk, onFail);
    } else {
      onFail();
    }
  }

  function initMenu() {
    var menuBtn = el("menuBtn");
    var panel = el("menuPanel");
    var overlay = el("aboutOverlay");
    if (!menuBtn || !panel) return;

    function isDark() { return document.documentElement.getAttribute("data-theme") === "dark"; }

    function syncMenuStates() {
      var darkItem = el("darkModeItem");
      var darkState = el("darkModeState");
      if (darkItem) darkItem.setAttribute("aria-checked", isDark() ? "true" : "false");
      if (darkState) darkState.textContent = isDark() ? "On" : "Off";
      menuBtn.classList.toggle("dark-on", isDark());
      var textItem = el("textSizeItem");
      var textState = el("textSizeState");
      var large = document.documentElement.classList.contains("text-large");
      if (textItem) textItem.setAttribute("aria-checked", large ? "true" : "false");
      if (textState) textState.textContent = large ? "Large" : "Normal";
      var compactItem = el("compactItem");
      var compactState = el("compactState");
      var compact = document.documentElement.classList.contains("compact-view");
      if (compactItem) compactItem.setAttribute("aria-checked", compact ? "true" : "false");
      if (compactState) compactState.textContent = compact ? "On" : "Off";
    }

    function openMenu() {
      panel.hidden = false;
      menuBtn.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      panel.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
    }
    function toggleMenu() {
      if (panel.hidden) { openMenu(); } else { closeMenu(); }
    }
    function openAbout() {
      if (overlay) overlay.hidden = false;
    }
    function closeAbout() {
      if (overlay) overlay.hidden = true;
    }

    menuBtn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      toggleMenu();
    });
    panel.addEventListener("click", function (ev) { ev.stopPropagation(); });

    var darkItem = el("darkModeItem");
    if (darkItem) darkItem.addEventListener("click", function () {
      var dark = !isDark();
      document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
      savePref(PREF_THEME, dark ? "dark" : "light");
      syncMenuStates();
    });
    var textItem = el("textSizeItem");
    if (textItem) textItem.addEventListener("click", function () {
      var large = !document.documentElement.classList.contains("text-large");
      document.documentElement.classList.toggle("text-large", large);
      savePref(PREF_TEXT, large ? "large" : "normal");
      syncMenuStates();
    });
    var compactItem = el("compactItem");
    if (compactItem) compactItem.addEventListener("click", function () {
      var compact = !document.documentElement.classList.contains("compact-view");
      document.documentElement.classList.toggle("compact-view", compact);
      savePref(PREF_COMPACT, compact ? "1" : "0");
      syncMenuStates();
    });
    var shareItem = el("shareMenuItem");
    if (shareItem) shareItem.addEventListener("click", function () {
      var stateEl = el("shareMenuState");
      function done(msg) {
        if (stateEl) stateEl.textContent = msg;
        setTimeout(function () { if (stateEl) stateEl.textContent = ""; closeMenu(); }, 1200);
      }
      copyText(HUB_LINK, function () { done("Link copied"); }, function () { done("Copy: " + HUB_LINK); });
    });
    var allToolsItem = el("allToolsItem");
    if (allToolsItem) allToolsItem.addEventListener("click", function () {
      closeMenu();
      var toolsSection = el("tools");
      if (toolsSection) toolsSection.scrollIntoView({ behavior: "smooth" });
    });
    var aboutItem = el("aboutItem");
    if (aboutItem) aboutItem.addEventListener("click", function () {
      closeMenu();
      openAbout();
    });
    var aboutClose = el("aboutCloseBtn");
    if (aboutClose) aboutClose.addEventListener("click", closeAbout);
    if (overlay) overlay.addEventListener("click", function (ev) {
      if (ev.target === overlay) closeAbout();
    });

    document.addEventListener("click", function (ev) {
      if (!panel.hidden && !panel.contains(ev.target) && ev.target !== menuBtn && !menuBtn.contains(ev.target)) {
        closeMenu();
      }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") {
        closeMenu();
        closeAbout();
      }
    });

    syncMenuStates();
  }

  function el(id) { return document.getElementById(id); }

  function formatDate(iso) {
    try {
      var d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch (e) {
      return iso || "";
    }
  }

  function badgeHtml(badge) {
    return badge ? '<span class="badge">' + escapeHtml(badge) + "</span>" : "";
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function featureList(features) {
    if (!features || !features.length) return "";
    var items = features.map(function (f) {
      return "<li>" + escapeHtml(f) + "</li>";
    }).join("");
    return '<ul class="features">' + items + "</ul>";
  }

  function cardHtml(t) {
    return (
      '<article class="card" data-category="' + escapeHtml(t.category) + '">' +
      '<div class="card-top"><span class="card-icon" aria-hidden="true">' + escapeHtml(t.icon || "🧰") + "</span>" +
      '<span class="tag">' + escapeHtml(t.category) + "</span>" + badgeHtml(t.badge) + "</div>" +
      "<h3>" + escapeHtml(t.name) + "</h3>" +
      '<p class="tagline">' + escapeHtml(t.tagline || "") + "</p>" +
      '<p class="desc">' + escapeHtml(t.description || "") + "</p>" +
      featureList(t.features) +
      '<p class="meta">Added ' + escapeHtml(formatDate(t.date)) + "</p>" +
      '<a class="btn btn-primary" href="' + escapeHtml(t.url) + '" target="_blank" rel="noopener">Open Tool &rarr;</a>' +
      "</article>"
    );
  }

  function filteredTools() {
    var q = state.query.trim().toLowerCase();
    return tools.filter(function (t) {
      var okCategory = state.category === "All" || t.category === state.category;
      if (!okCategory) return false;
      if (!q) return true;
      var hay = [t.name, t.tagline, t.description, t.category, (t.features || []).join(" ")].join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function renderHero() {
    var hero = el("hero");
    if (!hero) return;
    var featured = tools.find(function (t) { return t.badge === "NEW"; }) || tools[0];
    if (!featured) {
      hero.innerHTML = "<p>No tools yet. Add one in tools.js.</p>";
      return;
    }
    hero.innerHTML =
      '<div class="hero-copy">' +
      '<p class="eyebrow">Featured tool ' + badgeHtml(featured.badge) + "</p>" +
      "<h2>" + escapeHtml(featured.icon || "") + " " + escapeHtml(featured.name) + "</h2>" +
      '<p class="hero-tagline">' + escapeHtml(featured.tagline || "") + "</p>" +
      '<p class="hero-desc">' + escapeHtml(featured.description || "") + "</p>" +
      '<p class="meta">Added ' + escapeHtml(formatDate(featured.date)) + " &middot; " + escapeHtml(featured.category) + "</p>" +
      '<a class="btn btn-light" href="' + escapeHtml(featured.url) + '" target="_blank" rel="noopener">Open ' + escapeHtml(featured.name) + " &rarr;</a>" +
      "</div>" +
      '<div class="hero-side"><div class="hero-icon" aria-hidden="true">' + escapeHtml(featured.icon || "🧰") + "</div>" +
      '<p class="hero-count"><strong>' + tools.length + "</strong> free tools and counting</p>" +
      '<p class="hero-note">No login. No payment. No server.</p></div>';
  }

  function renderGrid() {
    var grid = el("toolGrid");
    var empty = el("noResults");
    var count = el("resultCount");
    if (!grid) return;
    var list = filteredTools();
    grid.innerHTML = list.map(cardHtml).join("");
    if (count) count.textContent = list.length + (list.length === 1 ? " tool" : " tools");
    if (empty) empty.hidden = list.length !== 0;
  }

  function renderFilters() {
    var wrap = el("categoryFilters");
    if (!wrap) return;
    var cats = ["All"].concat(tools.map(function (t) { return t.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    wrap.innerHTML = cats.map(function (c) {
      var active = c === state.category ? " active" : "";
      return '<button type="button" class="filter-btn' + active + '" data-category="' + escapeHtml(c) + '">' + escapeHtml(c) + "</button>";
    }).join("");
    wrap.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.category = btn.getAttribute("data-category");
        renderFilters();
        renderGrid();
        syncNav();
      });
    });
  }

  function syncNav() {
    document.querySelectorAll("[data-nav-category]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav-category") === state.category);
    });
  }

  function init() {
    var today = el("today");
    if (today) {
      today.textContent = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    }
    var search = el("searchBox");
    if (search) {
      search.addEventListener("input", function () {
        state.query = search.value;
        renderGrid();
      });
    }
    document.querySelectorAll("[data-nav-category]").forEach(function (a) {
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        state.category = a.getAttribute("data-nav-category");
        renderFilters();
        renderGrid();
        syncNav();
        var toolsSection = el("tools");
        if (toolsSection) toolsSection.scrollIntoView({ behavior: "smooth" });
      });
    });
    var share = el("shareBtn");
    if (share) {
      share.addEventListener("click", function () {
        var link = window.location.href;
        function done(msg) { share.textContent = msg; setTimeout(function () { share.textContent = "Share"; }, 2000); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link).then(function () { done("Link copied!"); }, function () { done("Copy this link: " + link); });
        } else {
          done("Copy this link: " + link);
        }
      });
    }
    renderHero();
    renderFilters();
    renderGrid();
    syncNav();
    initMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
