import React from 'react';
import { Link } from 'react-router-dom';

const colorNames = ['is-primary', 'is-link', 'is-info', 'is-danger'];

const projectColor = index => colorNames[index % colorNames.length];

const ProjectList = ({ projects }) => (
  <div className="section">
    <h1 className="title is-3">Select project</h1>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '1.5rem'
      }}
    >
      {projects.map((project, index) => (
        <Link
          to={`/projects/${project.projectId}`}
          className={`notification ${projectColor(index)} is-marginless`}
          key={project.projectId}
        >
          <p className="title">{project.projectName}</p>
          <p className="subtitle">{project.role}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default ProjectList;
