import { useEffect, useRef, useState } from "react";
import "../../assets/styles/AnimatedBackground.css";

const LINK = 130;
const MOUSE = 170;
const LINK_SQ = LINK * LINK;
const MOUSE_SQ = MOUSE * MOUSE;
const BUCKETS = 8;
const FRAME_MS = 1000 / 60;

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const readColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() ||
      "90, 150, 255";

    let color = readColor();
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    const nodes = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const lines = Array.from({ length: BUCKETS }, () => []);
    const mouseLines = Array.from({ length: BUCKETS }, () => []);

    const makeNode = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.4 + 0.7,
    });

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(finePointer ? 70 : 40, Math.floor((w * h) / 20000));
      if (nodes.length > target) nodes.length = target;
      while (nodes.length < target) nodes.push(makeNode());
      for (const n of nodes) {
        if (n.x > w + 10) n.x = Math.random() * w;
        if (n.y > h + 10) n.y = Math.random() * h;
      }
    };

    const draw = (step) => {
      for (const b of lines) b.length = 0;
      for (const b of mouseLines) b.length = 0;

      if (step) {
        for (const n of nodes) {
          n.x += n.vx * step;
          n.y += n.vy * step;
          if (n.x < -10) n.x = w + 10;
          else if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10;
          else if (n.y > h + 10) n.y = -10;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          if (dx > LINK || dx < -LINK) continue;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_SQ) {
            const strength = 1 - Math.sqrt(d2) / LINK;
            lines[Math.min(BUCKETS - 1, (strength * BUCKETS) | 0)].push(a, b);
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_SQ) {
            const strength = 1 - Math.sqrt(d2) / MOUSE;
            mouseLines[Math.min(BUCKETS - 1, (strength * BUCKETS) | 0)].push(a);
          }
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (let k = 0; k < BUCKETS; k++) {
        const segs = lines[k];
        if (segs.length) {
          ctx.strokeStyle = `rgba(${color}, ${(((k + 0.5) / BUCKETS) * 0.28).toFixed(3)})`;
          ctx.beginPath();
          for (let s = 0; s < segs.length; s += 2) {
            ctx.moveTo(segs[s].x, segs[s].y);
            ctx.lineTo(segs[s + 1].x, segs[s + 1].y);
          }
          ctx.stroke();
        }
        const ml = mouseLines[k];
        if (ml.length) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${(((k + 0.5) / BUCKETS) * 0.55).toFixed(3)})`;
          ctx.beginPath();
          for (const n of ml) {
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
          }
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(${color}, 0.75)`;
      ctx.beginPath();
      for (const n of nodes) {
        ctx.moveTo(n.x + n.r, n.y);
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      const elapsed = t - last;
      if (elapsed < FRAME_MS * 0.75) return;
      draw(Math.min(elapsed / FRAME_MS, 3));
      last = t;
    };

    const sync = () => {
      const run = !reduceMotion && onScreen && document.visibilityState === "visible";
      if (run && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      setPaused(!run && !reduceMotion);
    };

    let resizeQueued = 0;
    const onResize = () => {
      if (resizeQueued) return;
      resizeQueued = requestAnimationFrame(() => {
        resizeQueued = 0;
        resize();
        if (!raf) draw(0);
      });
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y > -MOUSE && mouse.y < h + MOUSE;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const themeObserver = new MutationObserver(() => {
      color = readColor();
      if (!raf) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    const ro = new ResizeObserver(onResize);

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      resize();
      draw(0);
      io.observe(host);
      ro.observe(host);
      document.addEventListener("visibilitychange", sync);
      if (finePointer) {
        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", onLeave);
      }
      sync();
    };
    const useIdle = typeof window.requestIdleCallback === "function";
    const idle = useIdle
      ? window.requestIdleCallback(start, { timeout: 600 })
      : window.setTimeout(start, 200);

    return () => {
      if (useIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeQueued);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={`bg${paused ? " bg--paused" : ""}`} aria-hidden="true">
      <div className="bg__grid">
        <div className="bg__grid-lines" />
      </div>
      <div className="bg__orb bg__orb--a" />
      <div className="bg__orb bg__orb--b" />
      <div className="bg__orb bg__orb--c" />
      <canvas ref={canvasRef} className="bg__canvas" />
      <div className="bg__fade" />
    </div>
  );
};

export default AnimatedBackground;
