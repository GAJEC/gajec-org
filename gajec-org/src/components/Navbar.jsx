import React, { useState } from "react";
import "../assets/styles/components/Navbar.css";
import Icon from "./UI/Icon";
import Button from "./UI/Button";
import ThemeToggle from "./UI/ThemeToggle";
import logo from "../assets/logos/gajec-official.png";

const LINKS = [
  { id: "about", label: "About" },
  { id: "members", label: "Members" },
  { id: "works", label: "Works" },
  { id: "awards", label: "Awards" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const Navbar = ({ scrollY = 0, activeId = "" }) => {
  const [open, setOpen] = useState(false);
  const floating = scrollY > 40;

  return (
    <header
      className={`navbar ${floating ? "navbar--floating" : ""} ${open ? "navbar--open" : ""}`}
    >
      <div className="navbar__inner">
        <a href="#top" className="navbar__brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="" width="34" height="34" />
          <span>GAJEC</span>
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeId === id ? "is-active" : ""}
              aria-current={activeId === id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />
          <Button
            href="#contact"
            variant="light"
            icon="arrow"
            className="navbar__cta"
          >
            Let&apos;s Work Together
          </Button>
          <button
            type="button"
            className="navbar__burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
