import React from 'react';
import { render, within } from 'react-testing-library';
import Story from './Story';
import { Provider } from './Project';

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
    created_at: '2018-09-25T12:24:00Z',
    updated_at: '2018-09-25T12:24:00Z',
    accepted_at: '2018-09-26T12:00:05Z',
    estimate: 3,
    blockers: [],
    story_type: 'feature',
    name: 'Test the Expeditionary Battle Planetoid',
    description: 'Blow upp some stuff',
    current_state: 'accepted',
    requested_by_id: 102,
    external_id: 'abc123',
    integration_id: 30,
    url: 'http://localhost/story/show/564',
    project_id: 99,
    owner_ids: [101, 102],
    labels: [
      {
        id: 1,
        project_id: 99,
        kind: 'label',
        name: 'first label',
        created_at: '2018-09-25T12:01:00Z',
        updated_at: '2018-09-25T12:01:00Z'
      },
      {
        id: 2,
        project_id: 99,
        kind: 'label',
        name: 'second label',
        created_at: '2018-09-25T12:01:00Z',
        updated_at: '2018-09-25T12:01:00Z'
      }
    ],
    owned_by_id: 102
  };

  it('renders title', () => {
    const { container } = render(
      <Provider value={people}>
        <Story {...story} story_type="feature" />
      </Provider>
    );

    expect(container).toHaveTextContent(
      'Test the Expeditionary Battle Planetoid'
    );
  });

  describe('estimate', () => {
    it('renders estimate tag', () => {
      const { queryByTestId } = render(
        <Provider value={people}>
          <Story {...story} estimate={5} />
        </Provider>
      );

      expect(queryByTestId('estimate-tag')).toHaveTextContent(5);
    });

    it('does not render if estimate is not present', () => {
      const { queryByTestId } = render(
        <Provider value={people}>
          <Story {...story} estimate={null} />
        </Provider>
      );

      expect(queryByTestId('estimate-tag')).not.toBeInTheDocument();
    });

    it('does not render if estimate is zero', () => {
      const { queryByTestId } = render(
        <Provider value={people}>
          <Story {...story} estimate={0} />
        </Provider>
      );

      expect(queryByTestId('estimate-tag')).not.toBeInTheDocument();
    });
  });

  it('renders feature tag for feature story', () => {
    const { queryByTestId } = render(
      <Provider value={people}>
        <Story {...story} story_type="feature" />
      </Provider>
    );

    expect(queryByTestId('feature-tag')).toBeInTheDocument();
    expect(queryByTestId('bug-tag')).not.toBeInTheDocument();
    expect(queryByTestId('chore-tag')).not.toBeInTheDocument();
  });

  it('renders bug tag for bug story', () => {
    const { queryByTestId } = render(
      <Provider value={people}>
        <Story {...story} story_type="bug" />
      </Provider>
    );

    expect(queryByTestId('feature-tag')).not.toBeInTheDocument();
    expect(queryByTestId('bug-tag')).toBeInTheDocument();
    expect(queryByTestId('chore-tag')).not.toBeInTheDocument();
  });

  it('renders chore tag for chore story', () => {
    const { queryByTestId } = render(
      <Provider value={people}>
        <Story {...story} story_type="chore" />
      </Provider>
    );

    expect(queryByTestId('feature-tag')).not.toBeInTheDocument();
    expect(queryByTestId('bug-tag')).not.toBeInTheDocument();
    expect(queryByTestId('chore-tag')).toBeInTheDocument();
  });

  it('renders labels', () => {
    const { container, queryAllByTestId } = render(
      <Provider value={people}>
        <Story {...story} />
      </Provider>
    );

    expect(queryAllByTestId('label-tag')).toHaveLength(2);
    expect(container).toHaveTextContent('first label');
    expect(container).toHaveTextContent('second label');
  });

  it('renders owners', () => {
    const { queryByTestId, getByTestId } = render(
      <Provider value={people}>
        <Story {...story} />
      </Provider>
    );

    expect(queryByTestId('owners')).toBeInTheDocument();
    expect(within(getByTestId('owners')).getByText('DV')).toBeInTheDocument();
    expect(within(getByTestId('owners')).getByText('WT')).toBeInTheDocument();
  });

  describe('blocked tag', () => {
    it('renders visible blocked tag if blocked', () => {
      const { queryByTestId } = render(
        <Provider value={people}>
          <Story {...story} blockers={[{ resolved: false }]} />
        </Provider>
      );

      expect(queryByTestId('blocked-tag')).toBeVisible();
    });

    it('renders invisible blocked tag if not blocked', () => {
      const { queryByTestId } = render(
        <Provider value={people}>
          <Story {...story} blockers={[{ resolved: true }]} />
        </Provider>
      );

      expect(queryByTestId('blocked-tag')).toBeInTheDocument();
      expect(queryByTestId('blocked-tag')).not.toBeVisible();
    });
  });
});
