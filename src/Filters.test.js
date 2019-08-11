import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Filters } from './Filters';
import { PeopleContext } from './PeopleContext';
import { EpicsContext } from './EpicsContext';
import { FilterContainer } from './FilterContainer';
import { window } from './services';

jest.mock('./services/window');

describe('Filters', () => {
  afterEach(() => {
    window.cleanup();
  });

  const people = {
    1: { initials: 'AA' },
    2: { initials: 'BB' },
    3: { initials: 'CC' }
  };

  const epics = {};

  const uniqueOwnerIds = [1, 2, 3];
  const uniqueEpicIds = [];

  const renderSubject = () =>
    render(
      <PeopleContext.Provider value={people}>
        <EpicsContext.Provider value={epics}>
          <FilterContainer
            uniqueOwnerIds={uniqueOwnerIds}
            uniqueEpicIds={uniqueEpicIds}
          >
            <Filters />
          </FilterContainer>
        </EpicsContext.Provider>
      </PeopleContext.Provider>
    );

  it('renders as per snapthot', () => {
    const { container } = renderSubject();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('reads state from window.location.search', () => {
    window.location.search = 'selectedOwners=2,3&selectedTypes=bug,feature';

    const { getByText } = renderSubject();

    expect(getByText('AA').parentElement).not.toHaveClass('is-primary');
    expect(getByText('BB').parentElement).toHaveClass('is-primary');
    expect(getByText('CC').parentElement).toHaveClass('is-primary');

    expect(getByText('chore')).not.toHaveClass('is-info');
    expect(getByText('blocked')).not.toHaveClass('is-warning');
    expect(getByText('bug')).toHaveClass('is-danger');
    expect(getByText('feature')).toHaveClass('is-primary');
  });

  describe('owners', () => {
    it('toggles owner on click', () => {
      const { getByText } = renderSubject();

      expect(getByText('AA').parentElement).not.toHaveClass('is-primary');

      fireEvent.click(getByText('AA'));

      expect(getByText('AA').parentElement).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedOwners=1');
    });
  });

  describe('next owner', () => {
    it('selects next owner on click', () => {
      window.location.search = 'selectedOwners=2';
      const { getByText, getByTestId } = renderSubject();

      expect(getByText('BB').parentElement).toHaveClass('is-primary');

      fireEvent.click(getByTestId('next'));

      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
      expect(getByText('CC').parentElement).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedOwners=3');
    });
  });

  describe('previous owner', () => {
    it('triggers selectPrevOwner on click', () => {
      window.location.search = 'selectedOwners=2';

      const { getByText, getByTestId } = renderSubject();

      expect(getByText('BB').parentElement).toHaveClass('is-primary');

      fireEvent.click(getByTestId('prev'));

      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
      expect(getByText('AA').parentElement).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedOwners=1');
    });
  });

  describe('clear owners', () => {
    it('is disabled when no owners is selected', () => {
      const { getByTestId } = renderSubject();

      expect(getByTestId('clear')).toHaveAttribute('disabled');
    });

    it('clears owners on click', () => {
      const { getByText, getByTestId } = renderSubject({
        selectedOwners: [1, 2]
      });

      fireEvent.click(getByTestId('clear'));

      expect(getByText('AA').parentElement).not.toHaveClass('is-primary');
      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
      expect(window.location.search).toEqual('');
    });
  });

  describe('types', () => {
    it('toggles bug on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('bug'));

      expect(getByText('bug')).toHaveClass('is-danger');
      expect(window.location.search).toEqual('selectedTypes=bug');
    });

    it('toggles feature on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('feature'));

      expect(getByText('feature')).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedTypes=feature');
    });

    it('toggles chore on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('chore'));

      expect(getByText('chore')).toHaveClass('is-info');
      expect(window.location.search).toEqual('selectedTypes=chore');
    });

    it('toggles blocked on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('blocked'));

      expect(getByText('blocked')).toHaveClass('is-warning');
      expect(window.location.search).toEqual('selectedTypes=blocked');
    });
  });
});
