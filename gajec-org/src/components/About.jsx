import React from "react";
import "../assets/styles/components/About.css";
import Icon from "./UI/Icon";
import members from "../data/members";
import awards from "../data/awards";
import certifications from "../data/certifications";

const PILLARS = [
  { n: "01", title: "Code", text: "Logic becomes possibility" },
  { n: "02", title: "Design", text: "Purpose meets form" },
  { n: "03", title: "Build", text: "Ideas become products" },
  { n: "04", title: "Deploy", text: "Work meets the world" },
];

const pad = (n) => String(n).padStart(2, "0");

const STATS = [
  { value: pad(members.length), label: "Developers" },
  { value: "10+", label: "Projects" },
  { value: pad(awards.length), label: "Awards" },
  { value: pad(certifications.length), label: "Certifications" },
];

const About = () => (
  <section id="about" className="section about">
    <div className="container">
      <div className="about__head">
        <span className="eyebrow">
          <b>01</b>&nbsp;&nbsp;About GAJEC
        </span>
      </div>

      <div className="about__grid">
        <div className="about__copy">
          <h2>
            More Than Developers.
            <br />
            <span className="gradient-text">We&apos;re Builders.</span>
          </h2>
          <p>
            GAJEC is a collaborative developer organization where curiosity
            becomes code. We bring together diverse minds to design websites,
            applications, systems, and technology that makes a difference.
          </p>
          <p>
            We learn in public, challenge each other, and believe the best work
            happens when ambitious people build together.
          </p>
          <a href="#members" className="about__link">
            Meet our collective <Icon name="arrow" size={14} />
          </a>
        </div>

        <ul className="about__pillars">
          {PILLARS.map((p) => (
            <li key={p.n}>
              <span className="about__num">{p.n}</span>
              <div className="about__pillar">
                <Icon name="code" size={15} />
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dl className="about__stats">
        {STATS.map((s) => (
          <div key={s.label}>
            <dt>{s.value}</dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default About;
