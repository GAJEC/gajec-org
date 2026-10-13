import { useEffect, useState } from "react";

const useScrollPosition = (sectionIds = []) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeId, setActiveId] = useState("");
  const key = sectionIds.join("|");

  useEffect(() => {
    const ids = key ? key.split("|") : [];
    let ticking = false;

    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setScrollY(window.scrollY);
      setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return { scrollY, activeId };
};

export default useScrollPosition;
