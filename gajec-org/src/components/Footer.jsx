import React from "react";
import "../assets/styles/components/Footer.css";
import Icon from "./UI/Icon";
import ScrollToTop from "./UI/ScrollToTop";
import logo from "../assets/logos/gajec-official.png";

const LINKS = [
  "About",
  "Members",
  "Works",
  "Awards",
  "Certifications",
  "Contact",
];
const SOCIALS = [
  { icon: "github", label: "GitHub", href: "https://github.com/gajec" },
  { icon: "linkedin", label: "LinkedIn", href: "#" },
  { icon: "instagram", label: "Instagram", href: "#" },
];

const Footer = ({ home = true }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer__top">
        <a href={home ? "#top" : "/"} className="footer__brand">
          <img src={logo} alt="" width="34" height="34" />
          <div>
            <strong>GAJEC</strong>
            <span>Build. Create. Collaborate.</span>
          </div>
        </a>

        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((l) => (
            <a key={l} href={`${home ? "" : "/"}#${l.toLowerCase()}`}>
              {l}
            </a>
          ))}
          <a href="/certificates">Find Certificate</a>
        </nav>

        <div className="footer__socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name={s.icon} size={16} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} GAJEC. All rights reserved.</p>
        <p>Designed &amp; built by the GAJEC collective.</p>
        <ScrollToTop />
      </div>
    </div>
  </footer>
);

export default Footer;
