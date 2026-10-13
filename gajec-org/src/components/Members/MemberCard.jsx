import React from "react";
import Icon from "../UI/Icon";

// A link only counts if it's a real URL (not empty or "#")
const isLink = (url) => Boolean(url) && url !== "#";

const MemberCard = ({ member, index, offset, onSelect, photo }) => {
  const dist = Math.abs(offset);
  const isActive = offset === 0;

  // Keep link clicks from also triggering the card's "select" click
  const stop = (e) => e.stopPropagation();

  return (
    <article
      className={`member-card ${isActive ? "is-active" : ""}`}
      style={{
        "--offset": offset,
        "--scale": 1 - dist * 0.12,
        zIndex: 10 - dist,
        opacity: dist === 0 ? 1 : dist === 1 ? 0.55 : 0,
        pointerEvents: dist > 1 ? "none" : "auto",
      }}
      onClick={() => !isActive && onSelect(index)}
      aria-hidden={dist > 1}
    >
      <div className="member-card__art">
        <span className="member-card__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        {photo && (
          <img src={photo} alt={member.name} className="member-card__photo" />
        )}
        <span className="member-card__initials">{member.initials}</span>

        <div className="member-card__social">
          {isLink(member.github) && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              aria-label={`${member.name} on GitHub`}
            >
              <Icon name="github" size={15} />
            </a>
          )}
          {isLink(member.linkedin) && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              aria-label={`${member.name} on LinkedIn`}
            >
              <Icon name="linkedin" size={15} />
            </a>
          )}
        </div>
      </div>

      <div className="member-card__body">
        <p className="member-card__role">{member.role}</p>
        <h3>{member.name}</h3>
        <p className="member-card__bio">{member.bio}</p>
        <div className="member-card__tags">
          {member.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        {isLink(member.portfolio) ? (
          <a
            href={member.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            className="member-card__link"
          >
            View Portfolio <Icon name="arrow" size={15} />
          </a>
        ) : (
          <span className="member-card__link is-disabled">
            Portfolio coming soon
          </span>
        )}
      </div>
    </article>
  );
};

export default MemberCard;
