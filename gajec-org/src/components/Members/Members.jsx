import React, { useState } from "react";
import "../../assets/styles/components/Members.css";
import SectionTitle from "../UI/SectionTitle";
import Icon from "../UI/Icon";
import MemberCard from "./MemberCard";
import members from "../../data/members";

const photoModules = import.meta.glob(
  "../../assets/images/members/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
);
const photos = Object.fromEntries(
  Object.entries(photoModules).map(([path, url]) => [
    path
      .split("/")
      .pop()
      .replace(/\.\w+$/, ""),
    url,
  ]),
);

const Members = () => {
  const [active, setActive] = useState(0);
  const total = members.length;
  const half = Math.floor(total / 2);

  const go = (dir) => setActive((a) => (a + dir + total) % total);
  const offsetFor = (i) => ((i - active + total + half) % total) - half;

  return (
    <section id="members" className="section members">
      <div className="container">
        <SectionTitle
          index="02"
          label="The Collective"
          title="Meet the Developers"
          subtitle="The people behind the code."
        />

        <div className="carousel">
          <div className="carousel__track">
            {members.map((m, i) => (
              <MemberCard
                key={m.id}
                member={m}
                index={i}
                offset={offsetFor(i)}
                onSelect={setActive}
                photo={photos[m.id]}
              />
            ))}
          </div>
        </div>

        <div className="carousel__controls">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous member"
          >
            <Icon name="left" size={16} />
          </button>
          <div className="carousel__dots">
            {members.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className={i === active ? "is-active" : ""}
                onClick={() => setActive(i)}
                aria-label={`Show ${m.name}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next member">
            <Icon name="right" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Members;
