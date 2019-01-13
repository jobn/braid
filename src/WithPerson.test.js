import React from 'react';
import { render } from 'react-testing-library';
import WithPerson from './WithPerson';
import { PeopleProvider } from './PeopleContext';

describe('WithPerson', () => {
  const people = {
    0: 'Darth Wader',
    1: 'Luke Skywalker',
    2: 'Han Solo'
  };

  it('takes person with given id and calls children function', () => {
    const mockChild = jest.fn();

    render(
      <PeopleProvider value={people}>
        <WithPerson id={2}>{person => mockChild(person)}</WithPerson>
      </PeopleProvider>
    );

    expect(mockChild).toHaveBeenCalledWith('Han Solo');
  });

  it('calls children function with undefined if id not found', () => {
    const mockChild = jest.fn();

    render(
      <PeopleProvider value={people}>
        <WithPerson id={214}>{person => mockChild(person)}</WithPerson>
      </PeopleProvider>
    );

    expect(mockChild).toHaveBeenCalledWith(undefined);
  });
});
