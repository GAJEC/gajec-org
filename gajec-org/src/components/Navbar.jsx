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
  { id: "certificates", label: "Find Certificate", href: "/certificates" },
];

const Navbar = ({ scrollY = 0, activeId = "", home = true }) => {
  const hrefFor = (link) => link.href || (home ? `#${link.id}` : `/#${link.id}`);
  const isActive = (id) =>
    activeId === id || (id === "certificates" && activeId === "certificate");
  const [open, setOpen] = useState(false);
  const floating = scrollY > 40;

  return (
    <header
      className={`navbar ${floating ? "navbar--floating" : ""} ${open ? "navbar--open" : ""}`}
    >
      <div className="navbar__inner">
        <a href={home ? "#top" : "/"} className="navbar__brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="" width="34" height="34" />
          <span>GAJEC</span>
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={hrefFor(link)}
              className={isActive(link.id) ? "is-active" : ""}
              aria-current={isActive(link.id) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />
          <Button
            href={home ? "#contact" : "/#contact"}
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
