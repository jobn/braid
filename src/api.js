import axios from 'axios';
import retry from 'axios-retry-after';
import { camelCaseKeys } from './utils';

const client = axios.create();
client.interceptors.response.use(null, retry(client));

export const getMe = token => request(axios.get('me', options({ token })));

export const getStories = id =>
  request(axios.get(`projects/${id}/stories`, options()));

export const putStory = (projectId, storyId, params) =>
  request(
    axios.put(`projects/${projectId}/stories/${storyId}`, params, options())
  );

export const getCurrentIteration = projectId =>
  axios
    .get(`projects/${projectId}/iterations?scope=current_backlog`, options())
    .then(response => {
      const fetchReviewTasks = [];
      response.data.forEach(iteration =>
        iteration.stories.forEach(story =>
          fetchReviewTasks.push(
            axios
              .get(
                `projects/${projectId}/stories/${story.id}/reviews`,
                options({params: {fields: 'review_type,status,reviewer_id'}})
              )
              .then(reviewsResponse => {
                reviewsResponse.data.forEach(review => {
                  story.reviews = [...(story.reviews || []), review];
                  story.reviewerIds = [
                    ...(story.reviewerIds || []),
                    review.reviewer_id
                  ];
                });
              })
          )
        )
      );
      return Promise.all(fetchReviewTasks).then(done =>
        camelCaseKeys(response.data, { deep: true })
      );
    });

export const getEpics = projectId =>
  request(axios.get(`projects/${projectId}/epics`, options()));

export const getMemberships = projectId =>
  request(axios.get(`projects/${projectId}/memberships`, options()));

export const getBlockersAndTasks = (projectId, storyIds) =>
  request(
    axios.get(
      `projects/${projectId}/stories/bulk`,
      options({ params: { ids: storyIds.join(','), fields: 'blockers,tasks' } })
    )
  );

const request = promise =>
  promise.then(response => camelCaseKeys(response.data, { deep: true }));

const options = ({ token, params } = {}) => ({
  baseURL: 'https://www.pivotaltracker.com/services/v5/',
  headers: { 'X-TrackerToken': token || window.localStorage.getItem('token') },
  params
});
