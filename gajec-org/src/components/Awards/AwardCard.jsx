import React from "react";
import Icon from "../UI/Icon";

const AwardCard = ({ award, index, featured = false }) => (
  <article className={`award-card ${featured ? "award-card--featured" : ""}`}>
    <span className="award-card__index">
      {String(index + 1).padStart(2, "0")}
    </span>

    <div className="award-card__icon">
      <div className="award-card__medal">
        <Icon name={award.icon} size={featured ? 40 : 22} />
      </div>
      <span className="award-card__year">{award.year}</span>
    </div>

    <div className="award-card__text">
      <p className="award-card__placement">{award.placement}</p>
      <h3>{award.title}</h3>
      <p className="award-card__event">{award.event}</p>
      <p className="award-card__desc">{award.description}</p>
    </div>
  </article>
);

export default AwardCard;
