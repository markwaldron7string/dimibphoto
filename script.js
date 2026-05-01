/* ── TABS ──────────────────────────────────────────── */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".gallery-panel");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    document
      .getElementById("tab-" + btn.dataset.tab)
      .classList.add("active");

    currentItems = getActiveItems();
  });
});


/* ── NAV ───────────────────────────────────────────── */
const toggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");

// Toggle menu
toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("open");
  toggle.classList.toggle("open");
});

// Close menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    toggle.classList.remove("open");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav")) {
    navMenu.classList.remove("open");
    toggle.classList.remove("open");
  }
});


/* ── LIGHTBOX ─────────────────────────────────────── */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCap = document.getElementById("lightbox-caption");
const lbClose = document.getElementById("lightbox-close");
const lbPrev = document.getElementById("lightbox-prev");
const lbNext = document.getElementById("lightbox-next");

let lbIdx = 0;
let currentItems = [];

function getActiveItems() {
  const activePanel = document.querySelector(".gallery-panel.active");
  return Array.from(activePanel.querySelectorAll(".photo-item"));
}

currentItems = getActiveItems();

function openLightbox(idx) {
  lbIdx = idx;
  const item = currentItems[idx];

  lbImg.src = item.dataset.src || item.querySelector("img").src;
  lbCap.textContent = item.dataset.caption || "";

  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lb.classList.remove("open");
  document.body.style.overflow = "";
}

function stepLightbox(dir) {
  lbIdx = (lbIdx + dir + currentItems.length) % currentItems.length;
  openLightbox(lbIdx);
}

// Open
document.addEventListener("click", (e) => {
  const item = e.target.closest(".photo-item");
  if (item) {
    currentItems = getActiveItems();
    openLightbox(currentItems.indexOf(item));
  }
});

// Controls
lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", () => stepLightbox(-1));
lbNext.addEventListener("click", () => stepLightbox(1));

// Close on background click
lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLightbox();
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});


/* ── FADE-UP ON SCROLL ───────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".fade-up")
  .forEach((el) => observer.observe(el));


/* ── ACTIVE NAV LINK ─────────────────────────────── */
const sections = document.querySelectorAll("section[id], footer");

window.addEventListener(
  "scroll",
  () => {
    let cur = "";

    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 100) {
        cur = s.id;
      }
    });

    navLinks.forEach((a) => {
      a.classList.toggle(
        "active",
        a.getAttribute("href") === "#" + cur
      );
    });
  },
  { passive: true }
);