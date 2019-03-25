import React, { useReducer, createContext } from 'react';
import { arrayOf, number, node } from 'prop-types';
import { filterByOwner, filterByType, filterByStoryStates } from './filters';
import { reducer } from './reducer';

const FilterContext = createContext();

const FilterContainer = ({ uniqueOwnerIds, children, ...rest }) => {
  const [state, dispatch] = useReducer(reducer, {
    uniqueOwnerIds,
    selectedOwners: [],
    selectedTypes: [],
    ...rest
  });

  const filter = (stories, storyStates) =>
    stories.filter(
      story =>
        filterByOwner(story, state.selectedOwners) &&
        filterByType(story, state.selectedTypes) &&
        filterByStoryStates(story, storyStates)
    );

  return (
    <FilterContext.Provider value={{ ...state, dispatch, filter }}>
      {children}
    </FilterContext.Provider>
  );
};

FilterContainer.propTypes = {
  uniqueOwnerIds: arrayOf(number),
  children: node
};

export { FilterContainer, FilterContext };
export { hasUnresolvedBlockers } from './filters';
