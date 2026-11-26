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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
