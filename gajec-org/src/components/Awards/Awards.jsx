import React from "react";
import "../../assets/styles/components/Awards.css";
import SectionTitle from "../UI/SectionTitle";
import AwardCard from "./AwardCard";
import awards from "../../data/awards";

const Awards = () => (
  <section id="awards" className="section awards">
    <div className="container">
      <SectionTitle
        index="04"
        label="Recognition"
        title="Recognition & Achievements"
        subtitle="Milestones that remind us to keep pushing."
      />
      <div className="awards__grid">
        {awards.map((a, i) => (
          <AwardCard key={a.id} award={a} index={i} featured={i === 0} />
        ))}
      </div>
    </div>
  </section>
);

export default Awards;
