import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Filters } from './Filters';
import { PeopleContext } from './PeopleContext';
import { FilterContainer } from './FilterContainer';

describe('Filters', () => {
  const people = {
    1: { initials: 'AA' },
    2: { initials: 'BB' },
    3: { initials: 'CC' }
  };

  const uniqueOwnerIds = [1, 2, 3];

  const renderSubject = (extraProps = {}) =>
    render(
      <PeopleContext.Provider value={people}>
        <FilterContainer uniqueOwnerIds={uniqueOwnerIds} {...extraProps}>
          <Filters />
        </FilterContainer>
      </PeopleContext.Provider>
    );

  it('renders as per snapthot', () => {
    const { container } = renderSubject();

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('owners', () => {
    it('toggles owner on click', () => {
      const { getByText } = renderSubject();

      expect(getByText('AA').parentElement).not.toHaveClass('is-primary');

      fireEvent.click(getByText('AA'));

      expect(getByText('AA').parentElement).toHaveClass('is-primary');
    });
  });

  describe('next owner', () => {
    it('selects next owner on click', () => {
      const { getByText } = renderSubject({ selectedOwners: [2] });

      expect(getByText('BB').parentElement).toHaveClass('is-primary');

      fireEvent.click(getByText('Next'));

      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
      expect(getByText('CC').parentElement).toHaveClass('is-primary');
    });
  });

  describe('previous owner', () => {
    it('triggers selectPrevOwner on click', () => {
      const { getByText } = renderSubject({ selectedOwners: [2] });

      expect(getByText('BB').parentElement).toHaveClass('is-primary');

      fireEvent.click(getByText('Prev'));

      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
      expect(getByText('AA').parentElement).toHaveClass('is-primary');
    });
  });

  describe('clear owners', () => {
    it('is disabled when no owners is selected', () => {
      const { getByTestId } = renderSubject();

      expect(getByTestId('clear-button')).toHaveAttribute('disabled');
    });

    it('clears owners on click', () => {
      const { getByText } = renderSubject({ selectedOwners: [1, 2] });

      fireEvent.click(getByText('Clear'));

      expect(getByText('AA').parentElement).not.toHaveClass('is-primary');
      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
    });
  });

  describe('types', () => {
    it('toggles bug on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('bug'));

      expect(getByText('bug')).toHaveClass('is-danger');
    });

    it('toggles feature on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('feature'));

      expect(getByText('feature')).toHaveClass('is-primary');
    });

    it('toggles chore on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('chore'));

      expect(getByText('chore')).toHaveClass('is-info');
    });
    it('toggles blocked on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('blocked'));

      expect(getByText('blocked')).toHaveClass('is-warning');
    });
  });
});
