import React, { useState, createContext, useEffect } from 'react';
import { arrayOf, number, node } from 'prop-types';
import { window } from '../services';
import { filterByOwner, filterByType, filterByStoryStates } from './filters';
import { reducer } from './reducer';
import { getQueryState, setQueryState } from './queryState';

const FilterContext = createContext();

const FilterContainer = ({ uniqueOwnerIds, children }) => {
  const [state, setState] = useState(getQueryState(uniqueOwnerIds));

  const dispatch = action => {
    const nextState = reducer(state, action, uniqueOwnerIds);

    setState(nextState);
    setQueryState(nextState);
  };

  useEffect(() => {
    const syncStates = () => {
      setState(getQueryState(uniqueOwnerIds));
    };

    window.addEventListener('popstate', syncStates);

    return () => {
      window.removeEventListener('popstate', syncStates);
    };
  }, [uniqueOwnerIds]);

  const filter = (storyIds, stories, storyStates) =>
    storyIds
      .map(id => stories[id])
      .filter(
        story =>
          filterByOwner(story, state.selectedOwners) &&
          filterByType(story, state.selectedTypes) &&
          filterByStoryStates(story, storyStates)
      );

  return (
    <FilterContext.Provider
      value={{ ...state, uniqueOwnerIds, dispatch, filter }}
    >
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
