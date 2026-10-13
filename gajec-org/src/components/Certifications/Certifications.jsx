import React, { useState } from "react";
import "../../assets/styles/components/Certifications.css";
import SectionTitle from "../UI/SectionTitle";
import CertificationCard from "./CertificationCard";
import certifications, {
  certificationCategories,
} from "../../data/certifications";

const Certifications = () => {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All"
      ? certifications
      : certifications.filter((c) => c.category === filter);

  return (
    <section id="certifications" className="section certs">
      <div className="container">
        <SectionTitle
          index="05"
          label="Credentials"
          title="Skills Backed by Learning"
          subtitle="Continuous learning, verified."
        />

        <div
          className="certs__filters"
          role="tablist"
          aria-label="Filter certifications"
        >
          {certificationCategories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              className={filter === c ? "is-active" : ""}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="certs__grid">
          {visible.map((c) => (
            <CertificationCard key={c.id} cert={c} />
          ))}
          {visible.length === 0 && (
            <p className="certs__empty">
              No certifications in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
