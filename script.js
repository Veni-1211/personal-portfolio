/* ==========================================================
   Veni Midigunta — Portfolio Scripts
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Theme (dark / light) ---------- */
  var root = document.documentElement;
  var stored = localStorage.getItem("vm-theme");
  var initial = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(initial);

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    localStorage.setItem("vm-theme", mode);
    document.querySelectorAll("[data-theme-icon]").forEach(function (el) {
      el.className = mode === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  });

  /* ---------- Mobile navbar: close on link click ---------- */
  var navCollapse = document.getElementById("navMenu");
  document.querySelectorAll("#navMenu .nav-link, #navMenu .btn").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse && navCollapse.classList.contains("show")) {
        // eslint-disable-next-line no-undef
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  /* ---------- Active nav highlighting ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".navbar .nav-link"));

  function syncActive() {
    var pos = window.scrollY + 120;
    var current = sections[0] ? sections[0].id : "";
    sections.forEach(function (s) {
      if (s.offsetTop <= pos) current = s.id;
    });
    navLinks.forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  }

  /* ---------- Back to top ---------- */
  var backTop = document.getElementById("backTop");
  function syncBackTop() {
    if (backTop) backTop.classList.toggle("show", window.scrollY > 500);
  }
  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", function () {
    syncActive();
    syncBackTop();
  }, { passive: true });
  syncActive();

  /* ---------- Scroll reveal ---------- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });

  /* ---------- Skill filtering ---------- */
  document.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (b) {
        b.classList.toggle("btn-brand", b === btn);
        b.classList.toggle("btn-outline-soft", b !== btn);
      });
      document.querySelectorAll("[data-skill-group]").forEach(function (card) {
        var match = key === "all" || card.getAttribute("data-skill-group") === key;
        card.parentElement.style.display = match ? "" : "none";
      });
    });
  });

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var status = document.getElementById("formStatus");
      var errors = [];

      if (name.length < 2) errors.push("Please enter your name.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email address.");
      if (message.length < 10) errors.push("Message should be at least 10 characters.");

      if (errors.length) {
        status.className = "alert alert-danger mt-3";
        status.textContent = errors[0];
      } else {
        status.className = "alert alert-success mt-3";
        status.textContent = "Thanks " + name + "! Your message is ready — I'll get back to you at " + email + ".";
        form.reset();
      }
      status.classList.remove("d-none");
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
