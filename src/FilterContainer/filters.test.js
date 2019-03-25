import {
  filterByType,
  filterByOwner,
  filterByStoryStates,
  hasUnresolvedBlockers
} from './filters';

describe('filterByStoryStates', () => {
  it('returns true if story.currentState is contained in selected story state', () => {
    expect(
      filterByStoryStates(
        {
          currentState: 'started'
        },
        ['planned', 'started']
      )
    ).toBe(true);
  });

  it('returns false if story.currentState is not contained in selected story state', () => {
    expect(
      filterByStoryStates(
        {
          currentState: 'started'
        },
        []
      )
    ).toBe(false);
  });
});

describe('filterByOwner', () => {
  it('returns true if story ownerIds contains a selected owner id', () => {
    expect(
      filterByOwner(
        {
          ownerIds: [1, 2, 3]
        },
        [3, 4, 5]
      )
    ).toBe(true);
  });

  it('returns false if story ownerIds does not contain a selected owner id', () => {
    expect(
      filterByOwner(
        {
          ownerIds: [1, 2, 3]
        },
        [23, 11]
      )
    ).toBe(false);
  });
});

describe('filterByType', () => {
  it('filters by storyType attribute', () => {
    expect(filterByType({ storyType: 'feature' }, ['chore'])).toBe(false);
    expect(filterByType({ storyType: 'chore' }, ['chore'])).toBe(true);
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
          storyType: 'chore',
          blockers: [{ resolved: true }]
        },
        ['blocked', 'chore']
      )
    ).toBe(true);

    expect(
      filterByType(
        {
          storyType: 'chore',
          blockers: [{ resolved: false }]
        },
        ['blocked', 'feature']
      )
    ).toBe(true);

    expect(
      filterByType(
        {
          storyType: 'chore',
          blockers: [{ resolved: true }]
        },
        ['chore', 'feature']
      )
    ).toBe(true);
  });
});

describe('hasUnresolvedBlockers', () => {
  it('returns true when array has a single item that is not resolved', () => {
    const blockers = [
      { resolved: true },
      { resolved: true },
      { resolved: false }
    ];

    expect(hasUnresolvedBlockers(blockers)).toBe(true);
  });

  it('returns false when all items are resolved', () => {
    const blockers = [
      { resolved: true },
      { resolved: true },
      { resolved: true }
    ];

    expect(hasUnresolvedBlockers(blockers)).toBe(false);
  });
});
