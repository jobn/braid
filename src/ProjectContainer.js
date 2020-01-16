import React, { useReducer, useEffect } from 'react';
import { array } from 'prop-types';
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import {
  getCurrentIteration,
  getMemberships,
  getBlockers,
  putStory,
  getEpics
} from './api';
import { Spinner } from './Spinner';
import { normalize } from './normalize';
import { Project } from './Project';

const initialState = {
  isFetching: false,
  error: null,
  iteration: {},
  storyIds: [],
  stories: {},
  people: {},
  epics: {},
  uniqueOwnerIds: [],
  uniqueEpicIds: []
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_ITERATION': {
      return { ...state, isFetching: true };
    }

    case 'FETCH_ITERATION_SUCCESS': {
      return { ...state, isFetching: false, ...payload };
    }

    case 'FETCH_BLOCKERS_SUCCESS': {
      const storiesWithBlockers = { ...state.stories };

      const matchStoryId = str => {
        try {
          return (str && str.match(/([0-9]){9}$/)[0]) || 'Unknown';
        } catch (err) {
          return 'Unknown';
        }
      }

      const getStoryBlockers = blockers => {
        return blockers
          .map(b => {
            const storyId = matchStoryId(b.description);
            const scopedStory = storiesWithBlockers[storyId];
            return scopedStory
              ? {
                  id: scopedStory.id,
                  url: scopedStory.url,
                  name: scopedStory.name,
                  resolved: b.resolved
                }
              : {
                  id: storyId,
                  url: `https://www.pivotaltracker.com/story/show/${storyId}`,
                  name: '[Out of current iteration blocker]',
                  resolved: b.resolved
                };
          })
          .filter(b => !b.resolved);
      };

      payload.forEach(story => {
        if (story.blockers.length > 0) {
          if (storiesWithBlockers[story.id]) {
            storiesWithBlockers[story.id].blockers = getStoryBlockers(
              story.blockers
            );
          } else {
            console.warn(
              'Recieved blockers for unknow story, with id',
              story.id
            );
          }
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

function ProjectContainer({ ids, render }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async id => {
      try {
        dispatch({ type: 'FETCH_ITERATION' });

        const [
          iterationResponse,
          membershipsResponse,
          epicsResponse
        ] = await Promise.all([
          getCurrentIteration(id),
          getMemberships(id),
          getEpics(id)
        ]);
        return normalize({
          iterationResponse,
          membershipsResponse,
          epicsResponse,
        })

      } catch (error) {
        dispatch({ type: 'FETCH_REQUEST_ERROR', payload: error });
        throw error
      }
    };

    if (ids && ids.length > 0) {
      (async function() {
        let responses = await Promise.all(
          ids.map(id => fetchData(id))
        )

        let storyIds = uniq(responses.reduce((into, each) => [].concat(into, each.storyIds), []))
        let uniqueEpicIds = uniq(responses.reduce((into, each) => [].concat(into, each.uniqueEpicIds), []))
        let uniqueOwnerIds = uniq(responses.reduce((into, each) => [].concat(into, each.uniqueOwnerIds), []))
    
        dispatch({
          type: 'FETCH_ITERATION_SUCCESS',
          payload: {
            ...merge(...responses),
            storyIds,
            uniqueEpicIds,
            uniqueOwnerIds,
          },
        });
      })()
    }

  }, [ids]);

  useEffect(() => {
    const fetchBlockers = async () => {
      try {
        const blockers = (await Promise.all(
          ids.map(id => getBlockers(id, state.storyIds))
        )).reduce((into, each) => [].concat(into, each), [])
    
        dispatch({ type: 'FETCH_BLOCKERS_SUCCESS', payload: blockers });
      } catch (error) {
        dispatch({ type: 'FETCH_REQUEST_ERROR', payload: error });
      }
    };
    
    if (state.storyIds.length > 0) {
      fetchBlockers();
    }
  }, [ids, state.storyIds]);

  useEffect(() => {
    const updateStorySideEffect = async ({ storyId, target }) => {
      try {
        dispatch({ type: 'STORY_DROP_PERFROM', payload: { storyId, target } });
    
        await putStory(state.stories[storyId].projectId, storyId, { current_state: target });
    
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
  ids: array.isRequired
};

export { ProjectContainer };
