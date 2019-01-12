import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import FilterContainer, {
  FilterConsumer,
  filterByType,
  filterByOwner,
  filterByStoryStates
} from './FilterContext';

describe('filterByStoryStates', () => {
  it('returns true if story.current_state is contained in selected story state', () => {
    expect(
      filterByStoryStates(
        {
          current_state: 'started'
        },
        ['planned', 'started']
      )
    ).toBe(true);
  });

  it('returns false if story.current_state is not contained in selected story state', () => {
    expect(
      filterByStoryStates(
        {
          current_state: 'started'
        },
        []
      )
    ).toBe(false);
  });
});

describe('filterByOwner', () => {
  it('returns true if story owner_ids contains a selected owner id', () => {
    expect(
      filterByOwner(
        {
          owner_ids: [1, 2, 3]
        },
        [3, 4, 5]
      )
    ).toBe(true);
  });

  it('returns false if story owner_ids does not contain a selected owner id', () => {
    expect(
      filterByOwner(
        {
          owner_ids: [1, 2, 3]
        },
        [23, 11]
      )
    ).toBe(false);
  });
});

describe('filterByType', () => {
  it('filters by story_type attribute', () => {
    expect(filterByType({ story_type: 'feature' }, ['chore'])).toBe(false);
    expect(filterByType({ story_type: 'chore' }, ['chore'])).toBe(true);
  });

  it('filters by blockers if type is blocked', () => {
    expect(filterByType({ blockers: [{ resolved: true }] }, ['blocked'])).toBe(
      false
    );
    expect(filterByType({ blockers: [{ resolved: false }] }, ['blocked'])).toBe(
      true
    );
  });

  it('filters inclusively', () => {
    expect(
      filterByType(
        {
          story_type: 'chore',
          blockers: [{ resolved: true }]
        },
        ['blocked', 'chore']
      )
    ).toBe(true);

    expect(
      filterByType(
        {
          story_type: 'chore',
          blockers: [{ resolved: false }]
        },
        ['blocked', 'feature']
      )
    ).toBe(true);

    expect(
      filterByType(
        {
          story_type: 'chore',
          blockers: [{ resolved: true }]
        },
        ['chore', 'feature']
      )
    ).toBe(true);
  });
});

describe('FilterContext', () => {
  const TestChild = ({
    stories,
    selectedOwners,
    selectedTypes,
    filter,
    toggleOwner,
    selectNextOwner,
    selectPrevOwner,
    clearOwners,
    toggleType
  }) => (
    <div>
      <div data-testid="selectedOwners">{selectedOwners.map(i => i)}</div>
      <div data-testid="selectedTypes">{selectedTypes.map(i => i)}</div>
      <div data-testid="filtered">
        {filter(stories, ['started'])
          .map(s => s.id)
          .join(',')}
      </div>
      <button onClick={() => toggleOwner(2)}>toggle owner</button>
      <button onClick={() => selectNextOwner()}>select next owner</button>
      <button onClick={() => selectPrevOwner()}>select prev owner</button>
      <button onClick={() => clearOwners()}>clear owners</button>
      <button onClick={() => toggleType('fakeType')}>toggle type</button>
    </div>
  );

  const uniqueOwnerIds = [0, 1, 2, 3, 4, 5];

  const stories = [
    {
      id: 0,
      owner_ids: [0],
      current_state: 'started',
      story_type: 'feature'
    },
    {
      id: 1,
      owner_ids: [0],
      current_state: 'started',
      story_type: 'bug'
    },
    {
      id: 2,
      owner_ids: [0],
      current_state: 'finished',
      story_type: 'feature'
    },
    {
      id: 3,
      owner_ids: [1],
      current_state: 'started',
      story_type: 'fakeType'
    }
  ];

  const renderSubject = () =>
    render(
      <FilterContainer uniqueOwnerIds={uniqueOwnerIds}>
        <FilterConsumer>
          {value => <TestChild {...value} stories={stories} />}
        </FilterConsumer>
      </FilterContainer>
    );

  test('toggleOwner toggles owner', () => {
    const { getByTestId, getByText } = renderSubject();
    expect(getByTestId('selectedOwners')).toHaveTextContent('');

    fireEvent.click(getByText('toggle owner'));

    expect(getByTestId('selectedOwners')).toHaveTextContent('2');
  });

  test('selectNextOwner circles forwards', () => {
    const { getByTestId, getByText } = renderSubject();

    fireEvent.click(getByText('select next owner'));
    expect(getByTestId('selectedOwners')).toHaveTextContent('0');

    fireEvent.click(getByText('select next owner'));
    expect(getByTestId('selectedOwners')).toHaveTextContent('1');
  });

  test('selectPrevtOwner circles backwards', () => {
    const { getByTestId, getByText } = renderSubject();

    fireEvent.click(getByText('select prev owner'));
    expect(getByTestId('selectedOwners')).toHaveTextContent('5');

    fireEvent.click(getByText('select prev owner'));
    expect(getByTestId('selectedOwners')).toHaveTextContent('4');
  });

  test('clearOwners clears owners', () => {
    const { getByTestId, getByText } = renderSubject();

    fireEvent.click(getByText('toggle owner'));
    expect(getByTestId('selectedOwners')).toHaveTextContent('2');

    fireEvent.click(getByText('clear owners'));
    expect(getByTestId('selectedOwners')).toHaveTextContent('');
  });

  test('toggleType toggles type', () => {
    const { getByTestId, getByText } = renderSubject();

    expect(getByTestId('selectedOwners')).toHaveTextContent('');

    fireEvent.click(getByText('toggle type'));
    expect(getByTestId('selectedTypes')).toHaveTextContent('fakeType');

    fireEvent.click(getByText('toggle type'));
    expect(getByTestId('selectedOwners')).toHaveTextContent('');
  });

  describe('filters', () => {
    it('filters by given story_types', () => {
      const { getByTestId } = renderSubject();

      expect(getByTestId('filtered')).toHaveTextContent('0,1,3');
    });

    it('filters by owner', () => {
      const { getByTestId, getByText } = renderSubject();

      fireEvent.click(getByText('select next owner'));

      expect(getByTestId('filtered')).toHaveTextContent('0,1');
    });

    it('filters by type', () => {
      const { getByTestId, getByText } = renderSubject();

      fireEvent.click(getByText('toggle type'));

      expect(getByTestId('filtered')).toHaveTextContent('3');
    });
  });
});
