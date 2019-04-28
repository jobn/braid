import axios from 'axios';
import { camelCaseKeys } from './utils';

export const getMe = token => request(axios.get('me', options({ token })));

export const getStories = id =>
  request(axios.get(`projects/${id}/stories`, options()));

export const putStory = (projectId, storyId, params) =>
  request(
    axios.put(`projects/${projectId}/stories/${storyId}`, params, options())
  );

export const getCurrentIteration = projectId =>
  request(
    axios.get(`projects/${projectId}/iterations?scope=current`, options())
  );

export const getMemberships = projectId =>
  request(axios.get(`projects/${projectId}/memberships`, options()));

export const getBlockers = (projectId, storyIds) =>
  request(
    axios.get(
      `projects/${projectId}/stories/bulk`,
      options({ params: { ids: storyIds.join(','), fields: 'blockers' } })
    )
  );

const request = promise =>
  promise.then(response => camelCaseKeys(response.data, { deep: true }));

const options = ({ token, params } = {}) => ({
  baseURL: 'https://www.pivotaltracker.com/services/v5/',
  headers: { 'X-TrackerToken': token || window.localStorage.getItem('token') },
  params
});
