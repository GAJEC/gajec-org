import React from "react";

const SectionTitle = ({ index, label, title, subtitle }) => (
  <header className="section-title">
    <p className="eyebrow">
      {index} / {label}
    </p>
    <div className="section-title__row">
      <h2>{title}</h2>
      {subtitle && <p className="section-title__sub">{subtitle}</p>}
    </div>
  </header>
);

export default SectionTitle;
