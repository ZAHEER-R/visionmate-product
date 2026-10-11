const WEB_APP_URL = ""; // paste deployed web app URL here
const APK_URL = ""; // paste direct APK download link here

const urls = { web: WEB_APP_URL.trim(), apk: APK_URL.trim() };

document.querySelectorAll("[data-app-link]").forEach((link) => {
  const url = urls[link.dataset.appLink];
  const status = link.querySelector("[data-link-status]");

  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (status) status.textContent = "Available";
    return;
  }

  link.removeAttribute("href");
  link.setAttribute("aria-disabled", "true");
  link.setAttribute("tabindex", "0");
  if (status) status.textContent = "Coming soon";
});

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
