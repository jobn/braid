import React, { useReducer, useEffect } from 'react';
import { string } from 'prop-types';
import {
  getCurrentIteration,
  getMemberships,
  getBlockers,
  putStory
} from './api';
import { Spinner } from './Spinner';
import { normalize, getStoryIds } from './normalize';
import { Project } from './Project';

const initialState = {
  isFetching: false,
  error: null,
  iteration: {},
  storyIds: [],
  stories: {},
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
      const storiesWithBlockers = { ...state.stories };

      payload.forEach(story => {
        if (story.blockers.length > 0) {
          storiesWithBlockers[story.id].blockers = story.blockers;
        }
      });

      return { ...state, stories: storiesWithBlockers };
    }

    case 'FETCH_REQUEST_ERROR': {
      return { ...initialState, error: payload };
    }

    case 'STORY_DROP': {
      return {
        ...state,
        stories: {
          ...state.stories,
          [payload.storyId]: {
            ...state.stories[payload.storyId],
            prevState: state.stories[payload.storyId].currentState,
            currentState: payload.target
          }
        },

        updateStory: {
          ...payload
        }
      };
    }

    case 'STORY_DROP_PERFROM': {
      return {
        ...state,
        updateStory: {
          ...state.updateStory,
          request: true
        }
      };
    }

    case 'STORY_DROP_FAILURE': {
      return {
        ...state,
        stories: {
          ...state.stories,
          [payload.storyId]: {
            ...state.stories[payload.storyId],
            currentState: state.stories[payload.storyId].prevState
          }
        },

        updateStory: null
      };
    }

    case 'STORY_DROP_SUCCESS': {
      return {
        ...state,
        updateStory: null
      };
    }

    default: {
      return { ...state };
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

  useEffect(() => {
    const updateStorySideEffect = async ({ storyId, target }) => {
      try {
        dispatch({ type: 'STORY_DROP_PERFROM', payload: { storyId, target } });

        await putStory(id, storyId, { current_state: target });

        dispatch({ type: 'STORY_DROP_SUCCESS', payload: { storyId, target } });
      } catch {
        dispatch({ type: 'STORY_DROP_FAILURE', payload: { storyId, target } });
        alert('Updating story state failed');
      }
    };

    if (state.updateStory && !state.updateStory.request) {
      updateStorySideEffect(state.updateStory);
    }
  });

  if (state.isFetching) {
    return <Spinner />;
  }
  if (state.error) {
    return <div>Error</div>;
  }

  return <Project {...state} dispatch={dispatch} />;
}

ProjectContainer.propTypes = {
  id: string.isRequired
};

export { ProjectContainer };
