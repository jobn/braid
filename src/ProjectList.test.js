import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ProjectList } from './ProjectList';

describe('ProjectList', () => {
  const projects = [
    {
      projectName: 'Dominate the tri-state-area',
      projectId: 1,
      projectRole: 'Supreme leader'
    },
    {
      projectName: 'Next level grocery shopping',
      projectId: 2,
      projectRole: 'Bystander'
    },
    {
      projectName: 'Afternoon nap',
      projectId: 3,
      projectRole: 'Member'
    },
    {
      projectName: 'Side-project',
      projectId: 4,
      projectRole: 'Owner'
    },
    {
      projectName: 'Death star construction',
      projectId: 5,
      projectRole: 'Janitor'
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
