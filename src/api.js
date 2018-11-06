import axios from 'axios';

export const getMe = token =>
  axios.get('me', options({ token })).then(response => response.data);

export const getProjects = () => axios.get('projects', options());

export const getStories = id =>
  axios
    .get(`projects/${id}/stories`, options())
    .then(response => response.data);

export const getCurrentIteration = projectId =>
  axios
    .get(`/projects/${projectId}/iterations?scope=current`, options())
    .then(response => response.data);

export const getMemberships = projectId =>
  axios
    .get(`/projects/${projectId}/memberships`, options())
    .then(response => response.data);

export const getBlockers = (projectId, storyIds) =>
  axios
    .get(
      `/projects/${projectId}/stories/bulk`,
      options({ params: { ids: storyIds.join(','), fields: 'blockers' } })
    )
    .then(response => response.data);

const options = ({ token, params } = {}) => ({
  baseURL: 'https://www.pivotaltracker.com/services/v5/',
  headers: { 'X-TrackerToken': token || window.localStorage.getItem('token') },
  params
});
