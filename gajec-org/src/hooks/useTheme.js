import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const STORAGE_KEY = "gajec-theme";
const DURATION = 650; // ms

const readTheme = () => {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f7fb" : "#05070d");
};

let fadeTimer = 0;

const useTheme = () => {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const toggle = useCallback((event) => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    const swap = () => {
      applyTheme(next);
      flushSync(() => setTheme(next));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swap();
      return;
    }

    if (typeof document.startViewTransition !== "function") {
      root.classList.add("theme-fade");
      swap();
      window.clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => root.classList.remove("theme-fade"), DURATION);
      return;
    }

    const rect = event?.currentTarget?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 60;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add("theme-switching");
    const transition = document.startViewTransition(swap);
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: DURATION, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  }, []);

  return { theme, toggle };
};

export default useTheme;
