const canvas = document.querySelector<HTMLCanvasElement>(
  "#connection-background",
);
const context = canvas?.getContext("2d");
if (canvas && context) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const touch = matchMedia("(pointer: coarse)");
  let paused = reduced.matches;
  let width = 0,
    height = 0,
    frame = 0,
    previous = 0;
  let pointer = { x: -1000, y: -1000 };
  let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
  function paint(step = 0) {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    for (const node of nodes) {
      node.x = (node.x + node.vx * step + width) % width;
      node.y = (node.y + node.vy * step + height) % height;
      const proximity = Math.max(
        0,
        1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / 180,
      );
      context.fillStyle = `rgba(23,93,204,${0.18 + proximity * 0.65})`;
      context.beginPath();
      context.arc(node.x, node.y, 1.7 + proximity * 1.8, 0, Math.PI * 2);
      context.fill();
      if (proximity > 0) {
        context.strokeStyle = `rgba(23,93,204,${proximity * 0.5})`;
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(pointer.x, pointer.y);
        context.stroke();
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i],
          b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance > 150) continue;
        const nearPointer = Math.max(
          0,
          1 - Math.hypot(a.x - pointer.x, a.y - pointer.y) / 240,
        );
        context.strokeStyle = `rgba(23,93,204,${(1 - distance / 150) * (0.08 + nearPointer * 0.42)})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }
  function tick(time: number) {
    frame = 0;
    if (paused || document.hidden) return;
    const elapsed = time - previous;
    if (elapsed >= 1000 / 30) {
      paint(Math.min(elapsed, 60) / 16.67);
      previous = time;
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (paused) pointer = { x: -1000, y: -1000 };
    paint();
    if (!paused && !document.hidden) {
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  function resize() {
    if (!canvas || !context) return;
    width = document.documentElement.clientWidth;
    height = innerHeight;
    const dpr = Math.min(devicePixelRatio, touch.matches ? 1 : 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.lineWidth = 0.7;
    const count = touch.matches
      ? 24
      : Math.min(95, Math.max(45, Math.floor((width * height) / 15000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
    paint();
  }
  window.addEventListener(
    "pointermove",
    (event) => {
      if (!paused && !touch.matches)
        pointer = { x: event.clientX, y: event.clientY };
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => {
    pointer = { x: -1000, y: -1000 };
  });
  window.addEventListener("blur", () => {
    pointer = { x: -1000, y: -1000 };
  });
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("portfolio:motion", () => {
    paused = document.documentElement.dataset.motionPaused === "true";
    sync();
  });
  reduced.addEventListener("change", () => {
    paused = reduced.matches;
    sync();
  });
  resize();
  sync();
}
