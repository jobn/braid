import React, { useReducer, useEffect } from 'react';
import { shape, string, func } from 'prop-types';
import { getCurrentIteration, getMemberships, getBlockers } from './api';
import Spinner from './Spinner';
import { normalize, getStoryIds } from './normalize';

const initialState = {
  isFetching: false,
  error: null,
  iteration: {},
  stories: [],
  people: {},
  uniqueOwnerIds: []
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_ITERATION': {
      return { ...state, isFetching: true };
    }

    case 'FETCH_ITERATION_SUCCESS': {
      return { ...state, isFetching: false, ...normalize(payload) };
    }

    case 'FETCH_BLOCKERS_SUCCESS': {
      const storiesWithBlockers = state.stories.map(story => ({
        ...story,
        blockers: payload.find(blocker => blocker.id === story.id).blockers
      }));

      return { ...state, stories: storiesWithBlockers };
    }

    case 'FETCH_REQUEST_ERROR': {
      return { ...initialState, error: payload };
    }
  }
}

function ProjectContainer({ id, render }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async id => {
      try {
        dispatch({ type: 'FETCH_ITERATION' });

        const [iterationResponse, membershipsResponse] = await Promise.all([
          getCurrentIteration(id),
          getMemberships(id)
        ]);

        dispatch({
          type: 'FETCH_ITERATION_SUCCESS',
          payload: { iterationResponse, membershipsResponse }
        });

        const blockers = await getBlockers(id, getStoryIds(iterationResponse));

        dispatch({ type: 'FETCH_BLOCKERS_SUCCESS', payload: blockers });
      } catch (error) {
        dispatch({ type: 'FETCH_REQUEST_ERROR', payload: error });
      }
    };

    fetchData(id);
  }, [id]);

  if (state.isFetching) {
    return <Spinner />;
  }
  if (state.error) {
    return <div>Error</div>;
  }

  return render(state);
}

ProjectContainer.propTypes = {
  render: func.isRequired,
  id: string.isRequired
};

export { ProjectContainer };
