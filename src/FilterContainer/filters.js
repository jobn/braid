export const hasUnresolvedBlockers = blockers =>
  blockers.some(blocker => !blocker.resolved);

const isBlocked = story => hasUnresolvedBlockers(story.blockers);

export const filterByOwner = (story, ownerIds) => {
  if (ownerIds.length === 0) {
    return true;
  }

  return story.ownerIds.some(id => ownerIds.includes(id));
};

export const filterByEpic = (story, uniqueEpicIds, epicIds) => {
  if (epicIds.length === 0) {
    return true;
  }

  if (epicIds.includes(-1)) {
    return !story.labels.some(label => uniqueEpicIds.includes(label.id));
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


export const filterByReviewer = (story, reviewerIds) => {
  if (reviewerIds.length === 0) {
    return true;
  }

  return reviewerIds.includes(story.requestedById) || (story.reviewerIds || []).some(id => reviewerIds.includes(id));
}
