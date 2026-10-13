import React from "react";
import Icon from "../UI/Icon";

const ProjectCard = ({ project, index, featured = false }) => (
  <article
    className={`project-card ${featured ? "project-card--featured" : ""}`}
    style={{ "--accent": project.accent }}
  >
    <div className="project-card__preview">
      <span className="project-card__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mock">
        <div className="mock__bar">
          <span />
          <span />
          <span />
        </div>
        <div className="mock__side" />
        <div className="mock__main">
          <i />
          <strong>{project.title}</strong>
          <div className="mock__tiles">
            <b />
            <b />
            <b />
          </div>
        </div>
      </div>
    </div>

    <div className="project-card__body">
      <p className="project-card__category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__tags">
        {project.stack.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
      <a href={project.github} className="project-card__link">
        <span>
          <Icon name="github" size={15} /> View on GitHub
        </span>
        <Icon name="arrow" size={15} />
      </a>
    </div>
  </article>
);

export default ProjectCard;
