const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const scenes = Array.from(
  document.querySelectorAll<HTMLElement>(".experience-scene"),
);
let pending = false;
function update() {
  pending = false;
  for (const scene of scenes) {
    const rect = scene.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) continue;
    const progress = Math.max(
      -1,
      Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight),
    );
    scene.style.setProperty(
      "--scene-shift",
      reduced.matches ? "0px" : `${progress * 55}px`,
    );
  }
}
function queue() {
  if (!pending) {
    pending = true;
    requestAnimationFrame(update);
  }
}
window.addEventListener("scroll", queue, { passive: true });
window.addEventListener("resize", queue, { passive: true });
reduced.addEventListener("change", update);
update();
