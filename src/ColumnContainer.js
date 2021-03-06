import React, { createContext, useMemo, useState } from 'react';

const ColumnContext = createContext();

function dropIsLegal(origin, target) {
  return target && target !== origin;
}

function ColumnContainer({ children, dispatch }) {
  const [state, setState] = useState({});

  const handleDragEnter = e => {
    setState({
      ...state,
      target: e,
      legal: dropIsLegal(state.origin, e)
    });
  };

  const handleDrop = e => {
    e.preventDefault();
    const { origin, target, storyId } = state;

    if (dropIsLegal(origin, target)) {
      dispatch({
        type: 'STORY_DROP',
        payload: { storyId, target }
      });
    }

    setState({});
  };

  const handleDragStart = e => {
    const {
      storyId: storyIdString,
      url,
      currentState,
      storyType
    } = e.target.dataset;
    const storyId = parseInt(storyIdString);

    e.dataTransfer.setData('text/uri-list', url);
    e.dataTransfer.effectAllowed = 'move';

    setState({
      ...state,
      storyId,
      storyType,
      origin: currentState
    });
  };

  const handleDragEnd = () => {
    setState({});
  };

  const value = useMemo(
    () => ({
      handleDragEnter,
      handleDrop,
      handleDragStart,
      handleDragEnd,
      target: state.target,
      origin: state.origin,
      storyId: state.storyId,
      storyType: state.storyType,
      legal: state.legal
    }),
    [state.target, state.origin, state.storyId, state.storyType, state.legal]
  );

  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  );
}

export { ColumnContainer, ColumnContext };
