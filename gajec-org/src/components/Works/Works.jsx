import React from 'react';
import '../../assets/styles/components/Works.css';
import SectionTitle from '../UI/SectionTitle';
import ProjectCard from './ProjectCard';
import projects from '../../data/projects';

const Works = () => (
  <section id="works" className="section works">
    <div className="container">
      <SectionTitle index="03" label="Selected Work" title="What We've Built" subtitle="From ideas to working products." />
      <div className="works__grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} featured={i === 0} />
        ))}
      </div>
    </div>
  </section>
);

export default Works;
