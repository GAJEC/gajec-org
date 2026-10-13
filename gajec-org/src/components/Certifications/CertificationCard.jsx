import React from "react";
import Icon from "../UI/Icon";

const CertificationCard = ({ cert }) => (
  <article className="cert-card">
    <div className="cert-card__top">
      <span className="cert-card__icon">
        <Icon name="code" size={15} />
      </span>
      <span className="cert-card__cat">{cert.category}</span>
    </div>
    <p className="cert-card__issuer">
      {cert.issuer} · {cert.year}
    </p>
    <h3>{cert.title}</h3>
    <p className="cert-card__id">Credential ID: {cert.credentialId}</p>
    <a href={cert.link} className="cert-card__link">
      View Certificate <Icon name="arrow" size={15} />
    </a>
  </article>
);

export default CertificationCard;
