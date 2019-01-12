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
  const stories = allStories.filter(removeReleaseStories);

  stories.forEach(story => {
    story.blockers = [];
  });

  const people = normalizeArray(membershipsResponse.map(item => item.person));

  const uniqueOwnerIds = arrayShuffle(
    uniqueArray(
      [].concat.apply([], currentIteration.stories.map(story => story.ownerIds))
    ),
    getDayOfYear(new Date())
  );

  return {
    iteration,
    stories,
    people,
    uniqueOwnerIds
  };
};

export default normalize;
