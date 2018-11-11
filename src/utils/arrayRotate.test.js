import { arrayRotateForward, arrayRotateBackward } from './arrayRotate';

const array = ['a', 'b', 'c', 'd'];

describe('arrayRotateForward', () => {
  it('returns next item in array', () => {
    expect(arrayRotateForward(array, 'b')).toEqual('c');
  });

  it('returns first item if last given', () => {
    expect(arrayRotateForward(array, 'd')).toEqual('a');
  });

  it('first item if given item is not found', () => {
    expect(arrayRotateForward(array, 'not there')).toEqual('a');
  });
});

describe('arrayRotateBackward', () => {
  it('returns previous item in array', () => {
    expect(arrayRotateBackward(array, 'b')).toEqual('a');
  });

  it('returns last item if first given', () => {
    expect(arrayRotateBackward(array, 'a')).toEqual('d');
  });

  it('first last if given item is not found', () => {
    expect(arrayRotateBackward(array, 'not there')).toEqual('d');
  });
});
