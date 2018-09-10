import axios from 'axios';

export const getMe = token =>
  axios.get('me', options(token)).then(response => response.data);

export const getProjects = () => axios.get('projects', options());

export const getStories = id =>
  axios
    .get(`projects/${id}/stories`, options())
    .then(response => response.data);

const options = token => ({
  baseURL: 'https://www.pivotaltracker.com/services/v5/',
  headers: { 'X-TrackerToken': token || window.localStorage.getItem('token') }
});
