const WEB_APP_URL = "https://visionmate-one.vercel.app";
const APK_URL = "VisionMateai.apk";

const urls = { web: WEB_APP_URL.trim(), apk: APK_URL.trim() };

document.querySelectorAll("[data-app-link]").forEach((link) => {
  const url = urls[link.dataset.appLink];
  const status = link.querySelector("[data-link-status]");

  if (url) {
    link.href = url;
    if (link.dataset.appLink === "web") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else if (link.dataset.appLink === "apk") {
      link.download = "VisionMateai.apk";
    }
    if (status) status.textContent = "Available";
    return;
  }

  link.removeAttribute("href");
  link.setAttribute("aria-disabled", "true");
  link.setAttribute("tabindex", "0");
  if (status) status.textContent = "Coming soon";
});

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section-heading, .challenge, .module-card, .gallery-card, .control-step, .install-card").forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

document.addEventListener("click", (event) => {
  const disabledLink = event.target.closest('[data-app-link][aria-disabled="true"]');
  if (disabledLink) event.preventDefault();

  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor || anchor === disabledLink) return;
  const target = document.querySelector(anchor.getAttribute("href"));
  if (!target) return;
  event.preventDefault();
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  target.scrollIntoView({ behavior, block: "start" });
  target.focus({ preventScroll: true });
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    menuButton.focus();
  });
}
