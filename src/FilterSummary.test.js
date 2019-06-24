import React from 'react';
import { render } from '@testing-library/react';
import { PeopleContext } from './PeopleContext';
import { FilterContainer } from './FilterContainer';
import { FilterSummary } from './FilterSummary';
import { window } from './services';

jest.mock('./services/window');

describe('FilterSummary', () => {
  it('renders according to snapshot', () => {
    const people = {
      1: { initials: 'AA' },
      2: { initials: 'BB' },
      3: { initials: 'CC' }
    };

    const uniqueOwnerIds = [1, 2, 3];

    window.location.search = 'selectedOwners=1,2&selectedTypes=bug,feature';

    const { container } = render(
      <PeopleContext.Provider value={people}>
        <FilterContainer uniqueOwnerIds={uniqueOwnerIds}>
          <FilterSummary />
        </FilterContainer>
      </PeopleContext.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
