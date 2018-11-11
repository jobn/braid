import arrayRotate from './arrayRotate';

describe('arrayRotate', () => {
  const array = ['a', 'b', 'c', 'd'];

  it('returns next item in array', () => {
    expect(arrayRotate(array, 'b')).toEqual('c');
  });

  it('returns first item if last given', () => {
    expect(arrayRotate(array, 'd')).toEqual('a');
  });

  it('first item if given item is not found', () => {
    expect(arrayRotate(array, 'not there')).toEqual('a');
  });
});
