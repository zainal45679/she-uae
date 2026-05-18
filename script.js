/**
 * SHE Event Management — Frontend data & UI
 * Event and gallery structures are backend-ready (JSON-serializable).
 */

const SITE_CONTACT = {
  phoneE164: "+971501234567",
  phoneDisplay: "+971 50 123 4567",
  email: "hello@sheevents.ae",
};

/* --------------------------------------------------------------------------
   Events API-ready schema
   {
     id: string,
     slug: string,
     title: string,
     date: string (ISO),
     dateDisplay: string,
     venue: string,
     city: string,
     description: string,
     image: string,
     imageAlt: string,
     registerUrl: string,
     status: 'upcoming' | 'sold_out' | 'past'
   }
   -------------------------------------------------------------------------- */

const EVENTS_DATA = [
  {
    id: "evt-001",
    slug: "edu-expo-2026",
    title: "Edu Expo 2026",
    date: "2026-00-00",
    dateDisplay: "Date Announcing Soon",
    venue: "Venue Announcing Soon",
    city: "UAE",
    description:
      "An education-focused expo bringing together universities, institutions, academic consultants, and students under one platform to explore future academic opportunities and professional growth.",
    image: "assets/images/events/event-1.png",
    imageAlt: "Students and university representatives at an education expo",
    registerUrl: "#connect-she",
    status: "upcoming",
  },
  {
    id: "evt-002",
    slug: "student-market-2026",
    title: "Student Market 2026",
    date: "2026-00-00",
    dateDisplay: "Date Announcing Soon",
    venue: "Venue Announcing Soon",
    city: "UAE",
    description:
      "A creative marketplace event designed for student entrepreneurs to showcase, promote, and sell their products while connecting with brands, visitors, and fellow young creators.",
    image: "assets/images/events/event-2.png",
    imageAlt: "Student entrepreneurs showcasing products at a market event",
    registerUrl: "#connect-she",
    status: "upcoming",
  },
  {
    id: "evt-003",
    slug: "she-event-coming-soon",
    title: "More Experiences Coming Soon",
    date: "2026-00-00",
    dateDisplay: "Stay Tuned",
    venue: "Details To Be Revealed",
    city: "UAE",
    description:
      "SHE is preparing more curated events, networking experiences, and collaborative gatherings designed for professionals, students, and emerging entrepreneurs across the UAE.",
    image: "assets/images/events/event-3.png",
    imageAlt: "Coming soon placeholder event banner",
    registerUrl: "#connect-she",
    status: "coming-soon",
  },
];

/* --------------------------------------------------------------------------
   Gallery schema
   { id, src, alt, layout?: 'wide' | 'tall' }
   -------------------------------------------------------------------------- */

const GALLERY_PREVIEW_COUNT = 4;

const GALLERY_DATA = [
  {
    id: "gal-001",
    src: "assets/images/gallery/photo1.jpg",
    alt: "SHE event",
  },
  {
    id: "gal-002",
    src: "assets/images/gallery/photo3.jpg",
    alt: "Women-led SHE team",
  },
  {
    id: "gal-003",
    src: "assets/images/gallery/photo2.jpg",
    alt: "SHE Founders",
  },
  {
    id: "gal-004",
    src: "assets/images/gallery/photo4.jpg",
    alt: "Women-led SHE team",
  },
  {
    id: "gal-005",
    src: "assets/images/gallery/photo5.jpg",
    alt: "SHE Logo",
  },
];

const VIDEO_PREVIEW_COUNT = 1;

const VIDEOS_DATA = [
  {
    id: "vid-001",
    title: "Smart Money Talks",
    thumbnail: "assets/images/gallery/IMG_9713.jpg",
    embedUrl: "https://www.youtube.com/embed/4IO_tJPNh60",
  },
  {
    id: "vid-002",
    title: "Gulf treat",
    thumbnail: "assets/images/gallery/IMG_9714.jpg",
    embedUrl: "https://www.youtube.com/embed/2l87jbIwfeQ",
  },
  {
    id: "vid-003",
    title: "Welcome - SHE",
    thumbnail: "assets/images/gallery/IMG_9716.jpg",
    embedUrl: "https://www.youtube.com/embed/LXROoAlv-vw",
  },
  {
    id: "vid-004",
    title: "She Moments",
    thumbnail: "assets/images/gallery/IMG_9715.jpg",
    embedUrl: "https://www.youtube.com/embed/tZXtexZIgwM",
  },
];

/* --------------------------------------------------------------------------
   Render helpers
   -------------------------------------------------------------------------- */

/**
 * @param {typeof EVENTS_DATA[0]} event
 * @returns {string}
 */
function renderEventCard(event) {
  const soldOut = event.status === "sold_out";
  const registerLabel = soldOut ? "Sold out" : "Register";
  const registerClass = soldOut ? "btn btn-outline event-card__register" : "btn btn-primary event-card__register";
  const registerDisabled = soldOut ? "aria-disabled=\"true\"" : "";

  return `
    <article
      class="event-card"
      role="listitem"
      data-event-id="${event.id}"
      data-event-slug="${event.slug}"
      itemscope
      itemtype="https://schema.org/Event"
    >
      <div class="event-card__media">
        <img
          src="${event.image}"
          alt="${event.imageAlt}"
          width="640"
          height="400"
          loading="lazy"
          itemprop="image"
        >
      </div>
      <div class="event-card__body">
        <div class="event-card__meta">
          <span itemprop="startDate" content="${event.date}">${event.dateDisplay}</span>
          <span itemprop="location" itemscope itemtype="https://schema.org/Place">
            <span itemprop="name">${event.venue}, ${event.city}</span>
          </span>
        </div>
        <h3 class="event-card__title" itemprop="name">${event.title}</h3>
        <p class="event-card__description" itemprop="description">${event.description}</p>
        <div class="event-card__footer">
          <a
            href="${event.registerUrl}"
            class="${registerClass}"
            data-register-for="${event.id}"
            ${registerDisabled}
          >${registerLabel}</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * @param {typeof GALLERY_DATA[0]} item
 * @param {boolean} isExtra
 * @returns {string}
 */
function renderGalleryItem(item, isExtra = false) {
  const extraClass = isExtra ? " gallery-item--extra" : "";
  return `
    <button
      type="button"
      class="gallery-item${extraClass}"
      role="listitem"
      data-gallery-id="${item.id}"
      aria-label="View image: ${item.alt}"
    >
      <img src="${item.src}" alt="${item.alt}" width="600" height="450" loading="lazy">
    </button>
  `;
}

/**
 * @param {typeof VIDEOS_DATA[0]} video
 * @param {boolean} isExtra
 * @returns {string}
 */
function renderVideoCard(video, isExtra = false) {
  const extraClass = isExtra ? " video-card--extra" : "";
  return `
    <article class="video-card${extraClass}" role="listitem" data-video-id="${video.id}">
      <div class="video-card__media">
        <div class="video-card__poster">
          <img src="${video.thumbnail}" alt="" width="640" height="360" loading="lazy">
          <button
            type="button"
            class="video-play"
            data-embed-url="${video.embedUrl}"
            aria-label="Play video: ${video.title}"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>
        <div class="video-card__embed" hidden>
          <iframe
            src=""
            title="${video.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <p class="video-card__title">${video.title}</p>
    </article>
  `;
}

/* --------------------------------------------------------------------------
   DOM init
   -------------------------------------------------------------------------- */

function renderEvents() {
  const grid = document.getElementById("events-grid");
  if (!grid) return;
  grid.innerHTML = EVENTS_DATA.filter((e) => e.status !== "past")
    .map(renderEventCard)
    .join("");
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;
  gallery.innerHTML = GALLERY_DATA.map((item, index) =>
    renderGalleryItem(item, index >= GALLERY_PREVIEW_COUNT)
  ).join("");
}

function renderVideos() {
  const list = document.getElementById("video-list");
  if (!list) return;
  list.innerHTML = VIDEOS_DATA.map((video, index) =>
    renderVideoCard(video, index >= VIDEO_PREVIEW_COUNT)
  ).join("");
}

function initHighlightsExpand() {
  const gallery = document.getElementById("gallery");
  const photosBtn = document.getElementById("see-all-photos");
  const videoList = document.getElementById("video-list");
  const videosBtn = document.getElementById("show-all-videos");

  if (photosBtn && gallery) {
    if (GALLERY_DATA.length <= GALLERY_PREVIEW_COUNT) {
      photosBtn.hidden = true;
    } else {
      photosBtn.addEventListener("click", () => {
        const expanded = gallery.classList.toggle("is-expanded");
        photosBtn.setAttribute("aria-expanded", String(expanded));
        photosBtn.textContent = expanded ? "Show less photos" : "See all photos";
      });
    }
  }

  if (videosBtn && videoList) {
    if (VIDEOS_DATA.length <= VIDEO_PREVIEW_COUNT) {
      videosBtn.hidden = true;
    } else {
      videosBtn.addEventListener("click", () => {
        const expanded = videoList.classList.toggle("is-expanded");
        videosBtn.setAttribute("aria-expanded", String(expanded));
        videosBtn.textContent = expanded ? "Show less videos" : "Show all videos";
      });
    }
  }
}

function initHeader() {
  const header = document.getElementById("site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }
}

function initGalleryLightbox() {
  let lightbox = document.getElementById("gallery-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "gallery-lightbox";
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Close">&times;</button>
      <img src="" alt="">
    `;
    document.body.appendChild(lightbox);
  }

  const img = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt;
    lightbox.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
    img.src = "";
  };

  document.getElementById("gallery")?.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    const imgEl = item.querySelector("img");
    if (imgEl) open(imgEl.src, imgEl.alt);
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function initVideoList() {
  const list = document.getElementById("video-list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".video-play");
    if (!playBtn) return;

    const card = playBtn.closest(".video-card");
    if (!card) return;

    const poster = card.querySelector(".video-card__poster");
    const embed = card.querySelector(".video-card__embed");
    const iframe = embed?.querySelector("iframe");
    if (!poster || !embed || !iframe) return;

    const baseUrl = playBtn.dataset.embedUrl || "";
    const separator = baseUrl.includes("?") ? "&" : "?";
    iframe.src = `${baseUrl}${separator}autoplay=1`;
    poster.hidden = true;
    embed.hidden = false;
  });
}

function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function initContactLinks() {
  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.setAttribute("href", `tel:${SITE_CONTACT.phoneE164}`);
  });

  document.querySelectorAll("[data-phone-display]").forEach((el) => {
    el.textContent = SITE_CONTACT.phoneDisplay;
  });
}

/* Wave paths: top = section above, bottom = section below (no transparent gaps) */
const CURVE_TOP =
  "M0,0 L1440,0 L1440,36 C1280,12 1120,56 840,40 560,4 280,56 0,20 Z";
const CURVE_BOTTOM =
  "M0,20 C280,56 560,4 840,40 C1120,56 1280,12 1440,36 L1440,64 L0,64 Z";
const FOOTER_TOP =
  "M0,0 L1440,0 L1440,28 C1360,16 1240,52 1020,32 680,8 320,48 0,12 Z";
const FOOTER_BOTTOM =
  "M0,12 C320,48 680,8 1020,32 C1240,52 1360,16 1440,28 L1440,65 L0,65 Z";

function getCurveBgVar(el) {
  if (el.classList.contains("section-curve--to-footer")) {
    const prev = el.previousElementSibling;
    if (prev?.classList.contains("she-highlights")) return "var(--color-bg-warm)";
    return "var(--color-bg-warm)";
  }

  const host = el.closest(".section");
  if (!host) return "var(--color-bg)";

  let prev = host.previousElementSibling;
  if (prev?.classList.contains("home-page")) {
    prev = prev.querySelector(".upcoming-events") || prev.lastElementChild;
  }

  if (!prev) return "var(--color-bg)";
  if (prev.classList.contains("banner")) return "var(--color-bg-warm)";
  if (prev.classList.contains("what-we-do")) return "var(--color-bg-warm)";
  if (prev.classList.contains("upcoming-events")) return "var(--color-bg)";
  if (prev.classList.contains("connect-she")) return "var(--color-bg-muted)";
  return "var(--color-bg)";
}

function initSectionCurves() {
  document.querySelectorAll(".section-curve").forEach((el) => {
    const toFooter = el.classList.contains("section-curve--to-footer");
    const height = toFooter ? 65 : 64;
    const viewBox = `0 0 1440 ${height}`;
    const bg = getCurveBgVar(el);
    const topD = toFooter ? FOOTER_TOP : CURVE_TOP;
    el.innerHTML = `<svg viewBox="${viewBox}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><rect width="1440" height="${height}" fill="currentColor"/><path fill="${bg}" stroke="${bg}" stroke-width="3" vector-effect="non-scaling-stroke" d="${topD}"/><rect width="1440" height="3" y="0" fill="${bg}"/></svg>`;
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/** Premium scroll reveal — re-run after dynamic renders */
let refreshScrollReveal = null;

function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const observeElements = () => {
    const elements = document.querySelectorAll(".reveal, .reveal-stagger");

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        observer.observe(el);
      }
    });
  };

  refreshScrollReveal = observeElements;
  observeElements();

  const hero = document.querySelector(".reveal--hero");
  if (hero && !prefersReduced) {
    requestAnimationFrame(() => {
      setTimeout(() => hero.classList.add("is-visible"), 80);
    });
  } else if (hero) {
    hero.classList.add("is-visible");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initSectionCurves();
  initContactLinks();
  renderEvents();
  renderGallery();
  renderVideos();
  initScrollReveal();
  refreshScrollReveal?.();
  initHeader();
  initGalleryLightbox();
  initVideoList();
  initHighlightsExpand();
  initYear();
  initSmoothAnchors();
});

/* Export for future module / API integration */
if (typeof window !== "undefined") {
  window.SHE = {
    SITE_CONTACT,
    EVENTS_DATA,
    GALLERY_DATA,
    VIDEOS_DATA,
    GALLERY_PREVIEW_COUNT,
    VIDEO_PREVIEW_COUNT,
    renderEventCard,
    renderEvents,
  };
}
