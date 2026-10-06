"use strict";

const slides = [...document.querySelectorAll(".slide")];
const chapters = ["Introducción", "Usos y conceptos", "Caso de uso", "Demo", "Historia", "Defensa"];
const chapterButtons = [...document.querySelectorAll(".chapters button")];
const dialogs = [...document.querySelectorAll("dialog")];
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const overviewGrid = document.getElementById("overview-grid");
let current = 0;
let toastTimer;
let touchStart;

function goTo(index, updateHash = true) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  const changed = next !== current;
  if (next !== current) {
    slides[current].classList.add("leaving");
    slides[current].classList.remove("active");
  }
  current = next;
  slides.forEach((slide, i) => {
    const active = i === current;
    slide.inert = !active;
    slide.setAttribute("aria-hidden", String(!active));
    if (active) {
      slide.classList.remove("leaving");
      slide.classList.add("active");
      slide.scrollTop = 0;
    }
  });
  document.body.classList.toggle("light-ui", slides[current].classList.contains("light"));
  document.body.classList.toggle("blue-ui", slides[current].classList.contains("blue"));
  document.getElementById("current-number").textContent = String(current + 1).padStart(2, "0");
  document.getElementById("current-title").textContent = slides[current].dataset.title;
  document.getElementById("progress").style.width = `${((current + 1) / slides.length) * 100}%`;
  document.querySelector(".progress-track").setAttribute("aria-valuenow", String(current + 1));
  document.getElementById("slide-announcement").textContent = `Diapositiva ${current + 1} de ${slides.length}: ${slides[current].dataset.title}`;
  previousButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;
  chapterButtons.forEach((button, i) => {
    const active = i === Number(slides[current].dataset.chapter);
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  [...overviewGrid.children].forEach((button, i) => button.setAttribute("aria-current", String(i === current)));
  if (updateHash && location.hash !== `#${current + 1}`) {
    history.replaceState(null, "", `#${current + 1}`);
  }
  if (changed) slides[current].focus({ preventScroll: true });
}

function goToHash() {
  const number = Number(location.hash.slice(1));
  goTo(Number.isInteger(number) && number >= 1 && number <= slides.length ? number - 1 : 0, false);
}

function openDialog(id) {
  if (dialogs.some((dialog) => dialog.open)) return;
  if (id === "notes-dialog") {
    document.getElementById("notes-title").textContent = `${String(current + 1).padStart(2, "0")} / ${slides[current].dataset.title}`;
    document.getElementById("notes-content").textContent = slides[current].querySelector(".speaker-note").textContent;
  }
  document.getElementById(id).showModal();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3500);
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else showToast("Este navegador no permite pantalla completa. Probá con F11.");
  } catch {
    showToast("No se pudo activar pantalla completa. Probá con F11 en el navegador.");
  }
}

slides.forEach((slide, i) => {
  slide.tabIndex = 0;
  slide.querySelectorAll(".reveal").forEach((element, j) => {
    element.style.setProperty("--delay", `${Math.min(j * 65, 520)}ms`);
  });
  const button = document.createElement("button");
  button.className = "overview-item";
  const number = document.createElement("span");
  number.textContent = String(i + 1).padStart(2, "0");
  const copy = document.createElement("div");
  const title = document.createElement("b");
  title.textContent = slide.dataset.title;
  const chapter = document.createElement("small");
  chapter.textContent = chapters[Number(slide.dataset.chapter)];
  copy.append(title, chapter);
  button.append(number, copy);
  button.addEventListener("click", () => {
    document.getElementById("overview-dialog").close();
    goTo(i);
    document.getElementById("overview-open").focus();
  });
  overviewGrid.append(button);
});

previousButton.addEventListener("click", () => goTo(current - 1));
nextButton.addEventListener("click", () => goTo(current + 1));
document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => goTo(Number(button.dataset.go))));
document.getElementById("overview-open").addEventListener("click", () => openDialog("overview-dialog"));
document.getElementById("notes-open").addEventListener("click", () => openDialog("notes-dialog"));
document.getElementById("sources-open").addEventListener("click", () => openDialog("sources-dialog"));
document.getElementById("fullscreen").addEventListener("click", toggleFullscreen);
dialogs.forEach((dialog) => {
  dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey || dialogs.some((dialog) => dialog.open)) return;
  if (event.target.closest("input, textarea, select, [contenteditable='true']")) return;
  // Preserve native keyboard activation on focused buttons and links.
  if ((event.key === " " || event.key === "Enter") && event.target.closest("button, a")) return;
  const key = event.key.toLowerCase();
  const scrollable = slides[current].scrollHeight > slides[current].clientHeight + 2;
  if (scrollable && ["arrowdown", "arrowup", "pagedown", "pageup", " ", "home", "end"].includes(key)) {
    event.preventDefault();
    const slide = slides[current];
    if (key === "home" || key === "end") slide.scrollTop = key === "home" ? 0 : slide.scrollHeight;
    else {
      const distance = key.startsWith("arrow") ? 60 : slide.clientHeight * .7;
      slide.scrollTop += ["arrowup", "pageup"].includes(key) ? -distance : distance;
    }
    return;
  }
  if (["f", "n", "o"].includes(key) && !document.getElementById("keyboard-shortcuts").checked) return;
  switch (key) {
    case "arrowright": case "arrowdown": case "pagedown": case " ":
      event.preventDefault(); goTo(current + 1); break;
    case "arrowleft": case "arrowup": case "pageup":
      event.preventDefault(); goTo(current - 1); break;
    case "home": event.preventDefault(); goTo(0); break;
    case "end": event.preventDefault(); goTo(slides.length - 1); break;
    case "f": toggleFullscreen(); break;
    case "n": openDialog("notes-dialog"); break;
    case "o": openDialog("overview-dialog"); break;
  }
});

document.getElementById("deck").addEventListener("touchstart", (event) => {
  if (event.target.closest("button, a, pre")) return;
  touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
}, { passive: true });
document.getElementById("deck").addEventListener("touchend", (event) => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
document.getElementById("deck").addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });
window.addEventListener("hashchange", goToHash);
document.addEventListener("fullscreenchange", () => {
  const fullscreen = Boolean(document.fullscreenElement);
  document.getElementById("fullscreen").setAttribute("aria-label", fullscreen ? "Salir de pantalla completa" : "Activar pantalla completa");
});

document.body.classList.add("js-ready");
goToHash();
