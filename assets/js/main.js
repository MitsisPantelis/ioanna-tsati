// Ιωάννα Τσάτη — small progressive enhancements. Every page works without JS.

// The address the appointment form sends to. Change it here only.
const CONTACT_EMAIL = "[email@domain.gr]";

// Mobile menu
(() => {
  const btn = document.querySelector(".menu-toggle");
  if (!btn) return;
  const set = (open) => {
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Κλείσιμο μενού" : "Άνοιγμα μενού");
  };
  btn.addEventListener("click", () => set(!document.body.classList.contains("menu-open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) set(false); });
})();

// FAQ: one answer open at a time (fallback for browsers without <details name>)
(() => {
  const items = document.querySelectorAll("details.faq-item");
  items.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
  }));
})();

// Services tabs, selectable by URL hash (#symvouleftiki, #psychoekpaidefsi, #ypostirixi)
(() => {
  const tabs = [...document.querySelectorAll(".svc-tab")];
  if (!tabs.length) return;
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => {
      select(t);
      history.replaceState(null, "", "#" + t.dataset.slug);
    });
    t.addEventListener("keydown", (e) => {
      const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length], true);
    });
  });
  const fromHash = () => {
    const t = tabs.find((x) => "#" + x.dataset.slug === location.hash);
    select(t || tabs[0]);
  };
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();

// Appointment form: GitHub Pages has no server, so the form opens the
// visitor's email app with the request filled in.
(() => {
  const form = document.getElementById("appointment-form");
  if (!form) return;
  const done = document.getElementById("form-done");
  const draftNote = document.getElementById("draft-note");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const f = new FormData(form);
    const times = f.getAll("times").join(", ") || "—";
    const lines = [
      "Ονοματεπώνυμο: " + f.get("name"),
      "Email: " + f.get("email"),
      "Τηλέφωνο: " + (f.get("phone") || "—"),
      "Το ραντεβού αφορά: " + f.get("who"),
      "Υπηρεσία: " + f.get("service"),
      "Ώρες που με εξυπηρετούν: " + times,
      "",
      f.get("message") || ""
    ];
    const subject = "Αίτημα για ραντεβού — " + f.get("name");
    const href = "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n").trim());

    if (draftNote) draftNote.hidden = !CONTACT_EMAIL.startsWith("[");
    window.location.href = href;
    form.hidden = true;
    done.hidden = false;
    done.querySelector("h2").focus();
  });

  document.getElementById("form-reset").addEventListener("click", () => {
    done.hidden = true;
    form.hidden = false;
  });
})();
