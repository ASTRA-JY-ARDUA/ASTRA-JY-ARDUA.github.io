const navigationLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navigationLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);

function updateCurrentSection() {
  if (!sections.length) return;

  const readingLine = window.innerHeight * 0.3;
  let current = sections[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) current = section;
  }

  for (const link of navigationLinks) {
    if (link.hash === `#${current.id}`) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

let framePending = false;
function scheduleUpdate() {
  if (framePending) return;
  framePending = true;
  window.requestAnimationFrame(() => {
    updateCurrentSection();
    framePending = false;
  });
}

window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);
updateCurrentSection();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
