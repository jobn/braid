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

  const epics = {
    4: { name: 'E:AA' },
    5: { name: 'E:BB' },
    6: { name: 'E:CC' }
  };

  const uniqueOwnerIds = [1, 2, 3];
  const uniqueEpicIds = [4, 5, 6];

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
    window.location.search =
      'selectedOwners=2,3&selectedEpics=5,6&selectedTypes=bug,feature';

    const { getByText } = renderSubject();

    expect(getByText('AA').parentElement).not.toHaveClass('is-primary');
    expect(getByText('BB').parentElement).toHaveClass('is-primary');
    expect(getByText('CC').parentElement).toHaveClass('is-primary');

    expect(getByText('E:AA').parentElement).not.toHaveClass('is-primary');
    expect(getByText('E:BB').parentElement).toHaveClass('is-primary');
    expect(getByText('E:CC').parentElement).toHaveClass('is-primary');

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

      fireEvent.click(getByTestId('nextOwner'));

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

      fireEvent.click(getByTestId('prevOwner'));

      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
      expect(getByText('AA').parentElement).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedOwners=1');
    });
  });

  describe('clear owners', () => {
    it('is disabled when no owners is selected', () => {
      const { getByTestId } = renderSubject();

      expect(getByTestId('clearOwners')).toHaveAttribute('disabled');
    });

    it('clears owners on click', () => {
      const { getByText, getByTestId } = renderSubject({
        selectedOwners: [1, 2]
      });

      fireEvent.click(getByTestId('clearOwners'));

      expect(getByText('AA').parentElement).not.toHaveClass('is-primary');
      expect(getByText('BB').parentElement).not.toHaveClass('is-primary');
      expect(window.location.search).toEqual('');
    });
  });

  describe('epics', () => {
    it('toggles epic on click', () => {
      const { getByText } = renderSubject();

      expect(getByText('E:AA').parentElement).not.toHaveClass('is-primary');

      fireEvent.click(getByText('E:AA'));

      expect(getByText('E:AA').parentElement).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedEpics=4');
    });
  });

  describe('next epic', () => {
    it('selects next epic on click', () => {
      window.location.search = 'selectedEpics=5';
      const { getByText, getByTestId } = renderSubject();

      expect(getByText('E:BB').parentElement).toHaveClass('is-primary');

      fireEvent.click(getByTestId('nextEpic'));

      expect(getByText('E:BB').parentElement).not.toHaveClass('is-primary');
      expect(getByText('E:CC').parentElement).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedEpics=6');
    });
  });

  describe('previous epic', () => {
    it('triggers selectPrevEpic on click', () => {
      window.location.search = 'selectedEpics=5';

      const { getByText, getByTestId } = renderSubject();

      expect(getByText('E:BB').parentElement).toHaveClass('is-primary');

      fireEvent.click(getByTestId('prevEpic'));

      expect(getByText('E:BB').parentElement).not.toHaveClass('is-primary');
      expect(getByText('E:AA').parentElement).toHaveClass('is-primary');
      expect(window.location.search).toEqual('selectedEpics=4');
    });
  });

  describe('clear epics', () => {
    it('is disabled when no epic is selected', () => {
      const { getByTestId } = renderSubject();

      expect(getByTestId('clearEpics')).toHaveAttribute('disabled');
    });

    it('clears epics on click', () => {
      const { getByText, getByTestId } = renderSubject({
        selectedEpics: [4, 5]
      });

      fireEvent.click(getByTestId('clearEpics'));

      expect(getByText('E:AA').parentElement).not.toHaveClass('is-primary');
      expect(getByText('E:BB').parentElement).not.toHaveClass('is-primary');
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
