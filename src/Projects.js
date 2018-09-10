import React from 'react';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => (
  <ul>
    {projects.map(({ project_id, project_name }) => (
      <li key={project_id}>
        <Link
          to={{
            pathname: `/projects/${project_id}`,
            state: { id: project_id }
          }}
        >
          {project_name}
        </Link>
      </li>
    ))}
  </ul>
);

export default Projects;
