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

export const isCodeReview = (review) => review.reviewType.name === 'Code';
const isProductionMergeReview = (review) => review.reviewType.name === 'Production Merge';
const isStoryDelivered = (story) => story.currentState === 'delivered';
const allReviewsAreFinished = (story, notIncludingFn = false) => story.reviews
    ? story.reviews.every(review => notIncludingFn && notIncludingFn(review) || review.status === 'pass')
    : true;

export const filterByReviewer = (story, reviewerIds) => {
  const hasCodeReview = story.reviews?.filter(isCodeReview);
  const hasProductionMergeReview = story.reviews?.find(isProductionMergeReview);
  const isCodeReviewDone =
    hasCodeReview?.every(review => review.status === 'pass') &&
    isStoryDelivered(story);
  const isReviewNotFinished = reviewerId =>
    story.reviews.find(
      review => review.reviewerId === reviewerId && review.status !== 'pass'
    );
  if (reviewerIds.length === 0) {
    return true;
  }
  if (isCodeReviewDone)
    return (
      (reviewerIds.includes(story.requestedById) && allReviewsAreFinished(story)) ||
      (story.reviewerIds || []).some(
        id => reviewerIds.includes(id) && isReviewNotFinished(id)
      )
    );
  if (hasProductionMergeReview && allReviewsAreFinished(story, isProductionMergeReview))
    return isStoryDelivered(story) &&
      reviewerIds.includes(hasProductionMergeReview?.reviewerId);
  if (allReviewsAreFinished(story))
    return reviewerIds.includes(story.requestedById);
  return hasCodeReview &&
    hasCodeReview.some(codeReview => reviewerIds.includes(codeReview.reviewerId));
};
