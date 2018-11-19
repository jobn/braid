import { filterByType } from './Project';

describe('filterByType', () => {
  it('returns filter function that filters by story_type attribute', () => {
    expect(filterByType(['chore'])({ story_type: 'feature' })).toBe(false);
    expect(filterByType(['chore'])({ story_type: 'chore' })).toBe(true);
  });

  it('returns filter function that filters by blockers if type is blocked', () => {
    expect(filterByType(['blocked'])({ blockers: [{ resolved: true }] })).toBe(
      false
    );
    expect(filterByType(['blocked'])({ blockers: [{ resolved: false }] })).toBe(
      true
    );
  });

  it('returns filter function that filters inclusively', () => {
    expect(
      filterByType(['blocked', 'chore'])({
        story_type: 'chore',
        blockers: [{ resolved: true }]
      })
    ).toBe(true);

    expect(
      filterByType(['blocked', 'feature'])({
        story_type: 'chore',
        blockers: [{ resolved: false }]
      })
    ).toBe(true);

    expect(
      filterByType(['chore', 'feature'])({
        story_type: 'chore',
        blockers: [{ resolved: true }]
      })
    ).toBe(true);
  });
});
