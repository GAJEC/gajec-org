import React from "react";
import "../assets/styles/components/Hero.css";
import Button from "./UI/Button";
import Icon from "./UI/Icon";
import AnimatedBackground from "./UI/AnimatedBackground";

const Hero = () => (
  <section id="top" className="hero">
    <AnimatedBackground />

    <div className="container hero__inner">
      <div className="hero__copy">
        <span className="hero__pill">
          <i className="hero__pill-dot" />
          GAJEC · Developer Organization
        </span>

        <h1>
          <span>We Build.</span>
          <span>We Create.</span>
          <span className="gradient-text">We Collaborate.</span>
        </h1>

        <p className="hero__lead">
          GAJEC is a developer collective creating meaningful digital
          experiences, innovative software, and technology-driven solutions.
        </p>

        <div className="hero__actions">
          <Button href="#works" icon="arrow">
            Explore Our Works
          </Button>
          <Button href="#members" variant="ghost">
            Meet the Developers
          </Button>
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero__ring" />
        <div className="hero__ring hero__ring--dashed" />
        <div className="hero__orbit">
          <i />
        </div>

        <div className="hero__badge hero__badge--status">
          <i /> ALL SYSTEMS CREATIVE
        </div>

        <div className="code-window">
          <div className="code-window__bar">
            <span />
            <span />
            <span />
            <em>gajec/build.ts</em>
          </div>
          <pre className="code-window__body">
            <code>
              <span className="ln">01</span>
              <span className="k">const</span> team ={" "}
              <span className="s">&quot;GAJEC&quot;</span>;{"\n"}
              <span className="ln">02</span>
              <span className="k">while</span> (curious) {"{"}
              {"\n"}
              <span className="ln">03</span>
              {"  "}build(<span className="a">ideas</span>);{"\n"}
              <span className="ln">04</span>
              {"  "}create(<span className="a">impact</span>);{"\n"}
              <span className="ln">05</span>
              {"}"}
              <span className="caret" />
            </code>
          </pre>
          <div className="code-window__status">
            <Icon name="check" size={13} /> deployed successfully
          </div>
        </div>

        <div className="hero__badge hero__badge--stat">
          <Icon name="code" size={16} />
          <div>
            <strong>10+</strong>
            <span>SHIPPED PROJECTS</span>
          </div>
        </div>
      </div>
    </div>

    <a href="#about" className="hero__scroll">
      <span>Scroll to explore</span>
      <i />
    </a>
  </section>
);

export default Hero;
