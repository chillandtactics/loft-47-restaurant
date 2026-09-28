const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const bookingLayer = document.querySelector("[data-booking-layer]");
const bookingDialog = document.querySelector("[data-booking-dialog]");
const bookingForm = document.querySelector("[data-booking-form]");
const formStatus = document.querySelector("[data-form-status]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxDialog = document.querySelector("[data-lightbox-dialog]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const pageHeader = document.querySelector("[data-header]");
const pageMain = document.querySelector("#main");
const pageFooter = document.querySelector(".site-footer");
const galleryStage = document.querySelector("[data-gallery]");
const galleryCards = [...document.querySelectorAll("[data-gallery-card]")];
const galleryCurrentLabel = document.querySelector("[data-gallery-current-label]");
const menuTabs = [...document.querySelectorAll("[data-menu-tab]")];
const menuPanels = [...document.querySelectorAll("[data-menu-panel]")];
const desktopNavigation = window.matchMedia("(min-width: 901px)");

let returnFocus = null;
let currentGalleryIndex = 1;

function setPageLocked(locked) {
  body.classList.toggle("is-locked", locked);
}

function setBackgroundInert(inert) {
  pageHeader.inert = inert;
  pageMain.inert = inert;
  pageFooter.inert = inert;
}

function focusableElements(container) {
  return [...container.querySelectorAll("button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])")]
    .filter((element) => {
      const style = getComputedStyle(element);
      const bounds = element.getBoundingClientRect();
      return !element.disabled
        && !element.hidden
        && style.display !== "none"
        && style.visibility !== "hidden"
        && bounds.width > 0
        && bounds.height > 0;
    });
}

function trapFocus(event, container) {
  if (event.key !== "Tab") return;
  const focusable = focusableElements(container);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeIsFocusable = focusable.includes(document.activeElement);

  if (!activeIsFocusable) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Открыть меню");
  mobileMenu.hidden = true;
  pageMain.inert = false;
  pageFooter.inert = false;
  setPageLocked(false);
}

menuToggle.addEventListener("click", () => {
  const shouldOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  menuToggle.setAttribute("aria-label", shouldOpen ? "Закрыть меню" : "Открыть меню");
  mobileMenu.hidden = !shouldOpen;
  pageMain.inert = shouldOpen;
  pageFooter.inert = shouldOpen;
  setPageLocked(shouldOpen);
  if (shouldOpen) mobileMenu.querySelector("a").focus();
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeMenu();
});

desktopNavigation.addEventListener("change", (event) => {
  if (event.matches && !mobileMenu.hidden) closeMenu();
});

function openBooking(trigger) {
  returnFocus = mobileMenu.contains(trigger) ? menuToggle : trigger;
  closeMenu();
  bookingLayer.hidden = false;
  setBackgroundInert(true);
  setPageLocked(true);
  bookingDialog.focus();
}

function closeBooking() {
  if (bookingLayer.hidden) return;
  bookingLayer.hidden = true;
  setBackgroundInert(false);
  setPageLocked(false);
  formStatus.textContent = "";
  returnFocus?.focus();
}

document.querySelectorAll("[data-open-booking]").forEach((button) => {
  button.addEventListener("click", () => openBooking(button));
});

document.querySelectorAll("[data-close-booking]").forEach((button) => {
  button.addEventListener("click", closeBooking);
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  formStatus.textContent = "Демо-проверка пройдена. Это не бронь, данные никуда не отправлены.";
});

function activateMenuTab(tab, moveFocus = false) {
  const target = tab.dataset.menuTab;

  menuTabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  menuPanels.forEach((panel) => {
    panel.hidden = panel.dataset.menuPanel !== target;
  });

  if (moveFocus) tab.focus();
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateMenuTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % menuTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + menuTabs.length) % menuTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = menuTabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    activateMenuTab(menuTabs[nextIndex], true);
  });
});

function openLightbox(trigger) {
  returnFocus = trigger;
  lightboxImage.src = trigger.dataset.lightboxSrc;
  lightboxImage.alt = trigger.dataset.lightboxAlt;
  lightbox.hidden = false;
  setBackgroundInert(true);
  setPageLocked(true);
  lightboxDialog.focus();
}

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  setBackgroundInert(false);
  setPageLocked(false);
  returnFocus?.focus();
}

document.querySelectorAll("[data-lightbox-src]:not([data-gallery-card])").forEach((button) => {
  button.addEventListener("click", () => openLightbox(button));
});

document.querySelectorAll("[data-close-lightbox]").forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

function renderGallery() {
  const total = galleryCards.length;
  const previousIndex = (currentGalleryIndex - 1 + total) % total;
  const nextIndex = (currentGalleryIndex + 1) % total;
  galleryCards.forEach((card, index) => {
    card.classList.remove("is-prev", "is-current", "is-next");
    const isCurrent = index === currentGalleryIndex;
    if (isCurrent) card.classList.add("is-current");
    else if (index === previousIndex) card.classList.add("is-prev");
    else card.classList.add("is-next");

    card.toggleAttribute("aria-current", isCurrent);
    card.setAttribute(
      "aria-label",
      isCurrent
        ? `Открыть кадр: ${card.dataset.galleryLabel}`
        : `Показать кадр: ${card.dataset.galleryLabel}`,
    );
  });

  const currentLabel = galleryCards[currentGalleryIndex].dataset.galleryLabel;
  galleryCurrentLabel.textContent = currentLabel;
}

function moveGallery(direction, moveFocus = false) {
  currentGalleryIndex = (currentGalleryIndex + direction + galleryCards.length) % galleryCards.length;
  renderGallery();
  if (moveFocus) galleryCards[currentGalleryIndex].focus();
}

let galleryPointerStartX = null;
let gallerySwiped = false;

galleryCards.forEach((card, index) => {
  card.addEventListener("click", (event) => {
    if (gallerySwiped) {
      event.preventDefault();
      return;
    }

    if (index === currentGalleryIndex) openLightbox(card);
    else {
      currentGalleryIndex = index;
      renderGallery();
      card.focus();
    }
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveGallery(event.key === "ArrowLeft" ? -1 : 1, true);
  });
});

galleryStage.addEventListener("pointerdown", (event) => {
  galleryPointerStartX = event.clientX;
});

galleryStage.addEventListener("pointerup", (event) => {
  if (galleryPointerStartX === null) return;
  const distance = event.clientX - galleryPointerStartX;
  galleryPointerStartX = null;
  if (Math.abs(distance) < 48) return;

  gallerySwiped = true;
  moveGallery(distance > 0 ? -1 : 1);
  window.setTimeout(() => {
    gallerySwiped = false;
  }, 0);
});

galleryStage.addEventListener("pointercancel", () => {
  galleryPointerStartX = null;
});

renderGallery();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!lightbox.hidden) closeLightbox();
    else if (!bookingLayer.hidden) closeBooking();
    else if (!mobileMenu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  }

  if (!lightbox.hidden) trapFocus(event, lightboxDialog);
  else if (!bookingLayer.hidden) trapFocus(event, bookingDialog);
  else if (!mobileMenu.hidden) trapFocus(event, pageHeader);
});

const revealItems = document.querySelectorAll(".reveal-item");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
}
