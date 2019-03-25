import { arrayToggle } from './arrayToggle';

describe('arrayToggle', () => {
  const array = ['a', 'b', 'c', 'd'];

  it('removes given item from array if present', () => {
    expect(arrayToggle(array, 'b')).toEqual(['a', 'c', 'd']);
  });

  it('adds item to array if not present', () => {
    expect(arrayToggle(array, 'new')).toEqual(['a', 'b', 'c', 'd', 'new']);
  });

  it('does not mutate input array', () => {
    expect(arrayToggle(array, 'new')).not.toBe(array);
  });
});
