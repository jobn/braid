import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import ProjectList from './ProjectList';

describe('ProjectList', () => {
  const projects = [
    {
      project_name: 'Dominate the tri-state-area',
      project_id: 1,
      project_role: 'Supreme leader'
    },
    {
      project_name: 'Next level grocery shopping',
      project_id: 2,
      project_role: 'Bystander'
    },
    {
      project_name: 'Afternoon nap',
      project_id: 3,
      project_role: 'Member'
    },
    {
      project_name: 'Side-project',
      project_id: 4,
      project_role: 'Owner'
    },
    {
      project_name: 'Death star construction',
      project_id: 5,
      project_role: 'Janitor'
    }
  ];

  it('renders single project according to snapshot', () => {
    const { container } = render(
      <Router>
        <ProjectList projects={[projects[0]]} />
      </Router>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders alternating colors', () => {
    const { container } = render(
      <Router>
        <ProjectList projects={projects} />
      </Router>
    );

    expect(container.querySelector('a[href="/projects/1"]')).toHaveClass(
      'is-primary'
    );

    expect(container.querySelector('a[href="/projects/2"]')).toHaveClass(
      'is-link'
    );

    expect(container.querySelector('a[href="/projects/3"]')).toHaveClass(
      'is-info'
    );

    expect(container.querySelector('a[href="/projects/4"]')).toHaveClass(
      'is-danger'
    );

    expect(container.querySelector('a[href="/projects/5"]')).toHaveClass(
      'is-primary'
    );
  });
});
