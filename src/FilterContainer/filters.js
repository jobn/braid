export const hasUnresolvedBlockers = blockers =>
  blockers.some(blocker => !blocker.resolved);

const isBlocked = story => hasUnresolvedBlockers(story.blockers);

export const filterByOwner = (story, ownerIds) => {
  if (ownerIds.length === 0) {
    return true;
  }

  return story.ownerIds.some(id => ownerIds.includes(id));
};

export const filterByEpic = (story, epicIds) => {
  if (epicIds.length === 0) {
    return true;
  }

  return story.labels.some(label => epicIds.includes(label.id));
};

export const filterByType = (story, typeNames) => {
  if (typeNames.length === 0) {
    return true;
  }

  return (
    typeNames.includes(story.storyType) ||
    (typeNames.includes('blocked') && isBlocked(story))
  );
};

export const filterByStoryStates = (story, storyStates) =>
  storyStates.includes(story.currentState);
