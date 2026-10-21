import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Members from "./components/Members/Members";
import Works from "./components/Works/Works";
import Awards from "./components/Awards/Awards";
import Certifications from "./components/Certifications/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CertificatePage from "./pages/CertificatePage";
import CertificateSearch from "./pages/CertificateSearch";
import useScrollPosition from "./hooks/UseScrollPosition";

const SECTION_IDS = [
  "about",
  "members",
  "works",
  "awards",
  "certifications",
  "contact",
];

// Pages outside the one-page home. nginx serves index.html for these paths.
const route = (path) => {
  const cert = path.match(/^\/certificate\/([^/]+)\/?$/);
  if (cert) return { page: "certificate", id: cert[1] };
  if (/^\/certificates\/?$/.test(path)) return { page: "certificates" };
  return { page: "home" };
};

const App = () => {
  const [current] = React.useState(() => route(window.location.pathname));
  const home = current.page === "home";
  const { scrollY, activeId } = useScrollPosition(home ? SECTION_IDS : []);

  // Auto Scroll towards the path na gusto nila puntahan
  React.useEffect(() => {
    if (!home || !window.location.hash) return undefined;
    const target = () => document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    const go = () => target()?.scrollIntoView({ behavior: "smooth", block: "start" });
    const raf = requestAnimationFrame(go);
    let userScrolled = false;
    const onUserScroll = () => { userScrolled = true; };
    const onLoad = () => {
      const el = target();
      if (!userScrolled && el && Math.abs(el.getBoundingClientRect().top - parseFloat(getComputedStyle(el).scrollMarginTop || 0)) > 4) go();
    };
    window.addEventListener("wheel", onUserScroll, { passive: true, once: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true, once: true });
    window.addEventListener("keydown", onUserScroll, { once: true });
    if (document.readyState === "complete") requestAnimationFrame(onLoad);
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
      window.removeEventListener("keydown", onUserScroll);
    };
  }, [home]);

  return (
    <>
      <Navbar
        scrollY={scrollY}
        activeId={home ? activeId : current.page}
        home={home}
      />
      <main>
        {current.page === "certificate" && <CertificatePage id={current.id} />}
        {current.page === "certificates" && <CertificateSearch />}
        {home && (
          <>
            <Hero />
            <About />
            <Members />
            <Works />
            <Awards />
            <Certifications />
            <Contact />
          </>
        )}
      </main>
      <Footer home={home} />
    </>
  );
};

export default App;
