import React, { useState, createContext, useEffect, useMemo } from 'react';
import { arrayOf, number, node } from 'prop-types';
import { window } from '../services';
import {
  filterByOwner,
  filterByType,
  filterByStoryStates,
  filterByEpic
} from './filters';
import {
  reducer,
  selectNextOwner,
  selectPrevOwner,
  clearOwners,
  selectNextEpic,
  selectPrevEpic,
  clearEpics
} from './reducer';
import { getQueryState, setQueryState } from './queryState';
import { useKeyup } from '../useKeyup';

const FilterContext = createContext();

const FilterContainer = ({ uniqueOwnerIds, uniqueEpicIds, children }) => {
  const [state, setState] = useState({
    ...getQueryState(uniqueOwnerIds, uniqueEpicIds),
    displayModal: false,
    displayEpicsModal: false
  });

  const dispatch = useMemo(
    () => action => {
      const nextState = reducer(state, action, uniqueOwnerIds, uniqueEpicIds);

      setState(nextState);

      const { displayModal, displayEpicsModal, ...nextQueryState } = nextState;
      setQueryState(nextQueryState);
    },
    [state, uniqueOwnerIds, uniqueEpicIds]
  );

  useEffect(() => {
    const syncStates = () => {
      setState(getQueryState(uniqueOwnerIds, uniqueEpicIds));
    };

    window.addEventListener('popstate', syncStates);

    return () => {
      window.removeEventListener('popstate', syncStates);
    };
  }, [uniqueOwnerIds, uniqueEpicIds]);

  const keyMap = useMemo(
    () => ({
      n: () => dispatch({ type: selectNextOwner }),
      p: () => dispatch({ type: selectPrevOwner }),
      c: () => dispatch({ type: clearOwners }),
      N: () => dispatch({ type: selectNextEpic }),
      P: () => dispatch({ type: selectPrevEpic }),
      C: () => dispatch({ type: clearEpics })
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
            filterByEpic(story, uniqueEpicIds, state.selectedEpics) &&
            filterByType(story, state.selectedTypes) &&
            filterByStoryStates(story, storyStates)
        ),
    [
      state.selectedOwners,
      uniqueEpicIds,
      state.selectedEpics,
      state.selectedTypes
    ]
  );

  const value = useMemo(
    () => ({
      ...state,
      uniqueOwnerIds,
      uniqueEpicIds,
      dispatch,
      filter
    }),
    [state, uniqueOwnerIds, uniqueEpicIds, dispatch, filter]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

FilterContainer.propTypes = {
  uniqueOwnerIds: arrayOf(number),
  uniqueEpicIds: arrayOf(number),
  children: node
};

export { FilterContainer, FilterContext };
export { hasUnresolvedBlockers } from './filters';
export {
  toggleOwner,
  clearOwners,
  selectNextOwner,
  selectPrevOwner,
  toggleEpic,
  clearEpics,
  selectNextEpic,
  selectPrevEpic,
  toggleType
} from './reducer';
