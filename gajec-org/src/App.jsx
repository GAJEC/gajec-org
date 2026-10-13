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
import useScrollPosition from "./hooks/UseScrollPosition";

const SECTION_IDS = [
  "about",
  "members",
  "works",
  "awards",
  "certifications",
  "contact",
];

const App = () => {
  const { scrollY, activeId } = useScrollPosition(SECTION_IDS);

  return (
    <>
      <Navbar scrollY={scrollY} activeId={activeId} />
      <main>
        <Hero />
        <About />
        <Members />
        <Works />
        <Awards />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
