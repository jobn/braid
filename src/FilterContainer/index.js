import React, { useState, createContext, useEffect, useMemo } from 'react';
import { arrayOf, number, node } from 'prop-types';
import { window } from '../services';
import { filterByOwner, filterByType, filterByStoryStates } from './filters';
import {
  reducer,
  selectNextOwner,
  selectPrevOwner,
  clearOwners
} from './reducer';
import { getQueryState, setQueryState } from './queryState';
import { useKeyup } from '../useKeyup';

const FilterContext = createContext();

const FilterContainer = ({ uniqueOwnerIds, children }) => {
  const [state, setState] = useState(getQueryState(uniqueOwnerIds));

  const dispatch = useMemo(
    () => action => {
      const nextState = reducer(state, action, uniqueOwnerIds);

      setState(nextState);
      setQueryState(nextState);
    },
    [state, uniqueOwnerIds]
  );

  useEffect(() => {
    const syncStates = () => {
      setState(getQueryState(uniqueOwnerIds));
    };

    window.addEventListener('popstate', syncStates);

    return () => {
      window.removeEventListener('popstate', syncStates);
    };
  }, [uniqueOwnerIds]);

  const keyMap = useMemo(
    () => ({
      n: () => dispatch({ type: selectNextOwner }),
      p: () => dispatch({ type: selectPrevOwner }),
      c: () => dispatch({ type: clearOwners })
    }),
    [dispatch]
  );

  useKeyup(keyMap);

  const filter = useMemo(
    () => (storyIds, stories, storyStates) =>
      storyIds
        .map(id => stories[id])
        .filter(
          story =>
            filterByOwner(story, state.selectedOwners) &&
            filterByType(story, state.selectedTypes) &&
            filterByStoryStates(story, storyStates)
        ),
    [state.selectedOwners, state.selectedTypes]
  );

  const value = useMemo(
    () => ({
      ...state,
      uniqueOwnerIds,
      dispatch,
      filter
    }),
    [state, uniqueOwnerIds, dispatch, filter]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

FilterContainer.propTypes = {
  uniqueOwnerIds: arrayOf(number),
  children: node
};

export { FilterContainer, FilterContext };
export { hasUnresolvedBlockers } from './filters';
export {
  toggleOwner,
  clearOwners,
  selectNextOwner,
  selectPrevOwner,
  toggleType
} from './reducer';
