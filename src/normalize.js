import { arrayShuffle, getDayOfYear } from './utils';

const normalizeArray = array => {
  const obj = {};

  array.forEach(element => {
    obj[element.id] = element;
  });

  return obj;
};

const uniqueArray = array =>
  array.filter((value, index, self) => self.indexOf(value) === index);

const removeReleaseStories = story => story.storyType !== 'release';

const normalize = ({ iterationResponse, membershipsResponse }) => {
  const currentIteration = iterationResponse[0];

  const { stories: allStories, ...iteration } = currentIteration;
  const userStories = allStories.filter(removeReleaseStories);

  const people = normalizeArray(membershipsResponse.map(item => item.person));
  const peopleIds = Object.keys(people);

  const storyIds = userStories.map(story => story.id);
  const stories = {};

  userStories.forEach(story => {
    stories[story.id] = {
      ...story,
      ownerIds: story.ownerIds.filter(id => peopleIds.includes(id.toString())),
      blockers: []
    };
  });

  const uniqueOwnerIds = arrayShuffle(
    uniqueArray(
      [].concat.apply(
        [],
        Object.keys(stories).map(storyId => stories[storyId].ownerIds)
      )
    ),
    getDayOfYear(new Date())
  );

  return {
    iteration,
    stories,
    storyIds,
    people,
    uniqueOwnerIds
  };
};

const getStoryIds = iterationResponse =>
  iterationResponse[0].stories.map(story => story.id);

export { normalize, getStoryIds };
