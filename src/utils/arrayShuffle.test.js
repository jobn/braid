import arrayShuffle from './arrayShuffle';

describe('shuffle', () => {
  it('shuffles array using given seed 22', () => {
    const result = arrayShuffle(['a', 'b', 'c', 'd'], 22);

    expect(result).toEqual(['b', 'c', 'a', 'd']);
  });

  it('shuffles array using given seed 128564723', () => {
    const result = arrayShuffle(['a', 'b', 'c', 'd'], 1285);

    expect(result).toEqual(['b', 'd', 'c', 'a']);
  });
});
