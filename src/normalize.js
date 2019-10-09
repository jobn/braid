import { arrayShuffle, getDayOfYear } from './utils';

const normalizeArray = array => {
  const obj = {};

  array.forEach(element => {
    obj[element.id] = element;
  });

  return obj;
};

const normalizeEpicsArray = array => {
  const obj = {};

  array.forEach(element => {
    obj[element.label.id] = element;
  });

  return obj;
};

const uniqueArray = array =>
  array.filter((value, index, self) => self.indexOf(value) === index);

const removeReleaseStories = story => story.storyType !== 'release';

export const normalize = ({
  iterationResponse,
  membershipsResponse,
  epicsResponse
}) => {
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

  const activeLabelIds = userStories.reduce(
    (acc, story) => acc.concat(story.labels.map(label => label.id)),
    []
  );

  const activeEpics = epicsResponse.filter(epic =>
    activeLabelIds.includes(epic.label.id)
  );

  activeEpics.push({
    id: -1,
    kind: 'epic',
    name: 'No Epic',
    label: { id: -1 }
  });

  const epics = normalizeEpicsArray(activeEpics);

  const uniqueEpicIds = uniqueArray(
    [].concat.apply([], activeEpics.map(epic => epic.label.id))
  );

  return {
    iteration,
    stories,
    storyIds,
    people,
    epics,
    uniqueOwnerIds,
    uniqueEpicIds
  };
};
