import React from 'react';
import { render, within } from '@testing-library/react';
import { Story } from './Story';
import { PeopleContext } from './PeopleContext';

describe('Story', () => {
  const people = {
    101: {
      email: 'vader@deathstar.mil',
      id: 101,
      initials: 'DV',
      kind: 'person',
      name: 'Darth Vader',
      username: 'vader'
    },
    102: {
      email: 'governor@eriadu.gov',
      id: 102,
      initials: 'WT',
      kind: 'person',
      name: 'Wilhuff Tarkin',
      username: 'tarkin'
    }
  };

  const story = {
    kind: 'chore',
    id: 564,
    createdAt: '2018-09-25T12:24:00Z',
    updatedAt: '2018-09-25T12:24:00Z',
    acceptedAt: '2018-09-26T12:00:05Z',
    estimate: 3,
    blockers: [],
    storyType: 'feature',
    name: 'Test the Expeditionary Battle Planetoid',
    description: 'Blow upp some stuff',
    current_state: 'accepted',
    requestedById: 102,
    externalId: 'abc123',
    integrationId: 30,
    url: 'http://localhost/story/show/564',
    projectId: 99,
    ownerIds: [101, 102],
    labels: [
      {
        id: 1,
        projectId: 99,
        kind: 'label',
        name: 'first label',
        createdAt: '2018-09-25T12:01:00Z',
        updatedAt: '2018-09-25T12:01:00Z'
      },
      {
        id: 2,
        projectId: 99,
        kind: 'label',
        name: 'second label',
        createdAt: '2018-09-25T12:01:00Z',
        updatedAt: '2018-09-25T12:01:00Z'
      }
    ],
    ownedById: 102
  };

  const renderSubject = props =>
    render(
      <PeopleContext.Provider value={people}>
        <Story {...story} {...props} />
      </PeopleContext.Provider>
    );

  it('renders title as link', () => {
    const { container } = renderSubject({ storyType: 'feature' });

    expect(container).toHaveTextContent(
      'Test the Expeditionary Battle Planetoid'
    );

    expect(container.querySelector('.subtitle > a')).toHaveAttribute(
      'href',
      'http://localhost/story/show/564'
    );
  });

  describe('estimate', () => {
    it('renders estimate tag', () => {
      const { queryByTestId } = renderSubject({ estimate: 5 });

      expect(queryByTestId('estimate-tag')).toHaveTextContent(5);
    });

    it('does not render if estimate is not present', () => {
      const { queryByTestId } = renderSubject({ estimate: undefined });

      expect(queryByTestId('estimate-tag')).not.toBeInTheDocument();
    });

    it('does not render if estimate is zero', () => {
      const { queryByTestId } = renderSubject({ estimate: 0 });

      expect(queryByTestId('estimate-tag')).not.toBeInTheDocument();
    });
  });

  it('renders feature tag for feature story', () => {
    const { queryByTestId } = renderSubject({ storyType: 'feature' });

    expect(queryByTestId('feature-tag')).toBeInTheDocument();
    expect(queryByTestId('bug-tag')).not.toBeInTheDocument();
    expect(queryByTestId('chore-tag')).not.toBeInTheDocument();
  });

  it('renders bug tag for bug story', () => {
    const { queryByTestId } = renderSubject({ storyType: 'bug' });

    expect(queryByTestId('feature-tag')).not.toBeInTheDocument();
    expect(queryByTestId('bug-tag')).toBeInTheDocument();
    expect(queryByTestId('chore-tag')).not.toBeInTheDocument();
  });

  it('renders chore tag for chore story', () => {
    const { queryByTestId } = renderSubject({ storyType: 'chore' });

    expect(queryByTestId('feature-tag')).not.toBeInTheDocument();
    expect(queryByTestId('bug-tag')).not.toBeInTheDocument();
    expect(queryByTestId('chore-tag')).toBeInTheDocument();
  });

  it('renders labels', () => {
    const { container, queryAllByTestId } = renderSubject();

    expect(queryAllByTestId('label-tag')).toHaveLength(2);
    expect(container).toHaveTextContent('first label');
    expect(container).toHaveTextContent('second label');
  });

  it('renders owners', () => {
    const { queryByTestId, getByTestId } = renderSubject();

    expect(queryByTestId('owners')).toBeInTheDocument();
    expect(within(getByTestId('owners')).getByText('DV')).toBeInTheDocument();
    expect(within(getByTestId('owners')).getByText('WT')).toBeInTheDocument();
  });

  describe('blocked tag', () => {
    it('renders visible blocked tag if blocked', () => {
      const { queryByTestId } = renderSubject({
        blockers: [{ resolved: false }]
      });

      expect(queryByTestId('blocked-tag')).toBeVisible();
    });

    it('renders invisible blocked tag if not blocked', () => {
      const { queryByTestId } = renderSubject({
        blockers: [{ resolved: true }]
      });

      expect(queryByTestId('blocked-tag')).toBeInTheDocument();
      expect(queryByTestId('blocked-tag')).not.toBeVisible();
    });

    it('renders invisible blocked tag if no blockers', () => {
      const { queryByTestId } = renderSubject({
        blockers: []
      });

      expect(queryByTestId('blocked-tag')).toBeInTheDocument();
      expect(queryByTestId('blocked-tag')).not.toBeVisible();
    });
  });
});
