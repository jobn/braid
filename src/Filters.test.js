import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Filters from './Filters';

describe('Filters', () => {
  const uniqueOwnerIds = [1, 2, 3];
  const selectedOwners = [];
  const people = {
    1: { initials: 'AA' },
    2: { initials: 'BB' },
    3: { initials: 'CC' }
  };
  const selectedTypes = [];
  const clearOwners = jest.fn();
  const toggleOwner = jest.fn();
  const toggleType = jest.fn();
  const selectNextOwner = jest.fn();
  const selectPrevOwner = jest.fn();

  const props = {
    uniqueOwnerIds,
    selectedOwners,
    people,
    selectedTypes,
    clearOwners,
    toggleOwner,
    toggleType,
    selectNextOwner,
    selectPrevOwner
  };

  const renderSubject = (extraProps = {}) =>
    render(<Filters {...props} {...extraProps} />);

  it('renders as per snapthot', () => {
    const { container } = renderSubject();

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('owners', () => {
    it('triggers toggleOwner with id on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('AA'));

      expect(toggleOwner).toHaveBeenCalledWith(1);
    });

    it('renders activeClass when active', () => {
      const { getByText } = renderSubject({ selectedOwners: [2] });

      expect(getByText('BB')).toHaveClass('is-primary');
    });
  });

  describe('next owner', () => {
    it('triggers selectNextOwner on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('Next'));

      expect(selectNextOwner).toHaveBeenCalled();
    });
  });

  describe('previous owner', () => {
    it('triggers selectPrevOwner on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('Prev'));

      expect(selectPrevOwner).toHaveBeenCalled();
    });
  });

  describe('clear owners', () => {
    it('is disabled when no owners is selected', () => {
      const { getByTestId } = renderSubject();

      expect(getByTestId('clear-button')).toHaveAttribute('disabled');
    });

    it('triggers clearOwners on click', () => {
      const { getByText } = renderSubject({ selectedOwners: [1] });

      fireEvent.click(getByText('Clear'));

      expect(clearOwners).toHaveBeenCalled();
    });
  });

  describe('types', () => {
    it('triggers toggleType with type on click', () => {
      const { getByText } = renderSubject();

      fireEvent.click(getByText('bug'));
      expect(toggleType).toHaveBeenCalledWith('bug');

      fireEvent.click(getByText('feature'));
      expect(toggleType).toHaveBeenLastCalledWith('feature');

      fireEvent.click(getByText('chore'));
      expect(toggleType).toHaveBeenLastCalledWith('chore');
    });

    it('renders active activeClass when enabled', () => {
      const { getByText } = renderSubject({
        selectedTypes: ['feature', 'chore', 'bug']
      });

      expect(getByText('feature')).toHaveClass('is-primary');
      expect(getByText('chore')).toHaveClass('is-info');
      expect(getByText('bug')).toHaveClass('is-danger');
    });
  });
});
