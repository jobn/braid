import { storyTypes } from '../storyTypes';

const storyTypesArray = storyTypes.map(storyType => storyType.key);

function ensureArray(data) {
  if (!data) {
    return [];
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [data];
}

function normalizeOwners(data, uniqueOwnerIds) {
  return ensureArray(data)
    .map(id => parseInt(id))
    .filter(id => uniqueOwnerIds.includes(id));
}

function normalizeReviewers(data, uniqueReviewerIds) {
  return ensureArray(data)
    .map(id => parseInt(id))
    .filter(id => uniqueReviewerIds.includes(id));
}

function normalizeEpics(data, uniqueEpicIds) {
  return ensureArray(data)
    .map(id => parseInt(id))
    .filter(id => uniqueEpicIds.includes(id));
}

function normalizeTypes(data) {
  return ensureArray(data).filter(type => storyTypesArray.includes(type));
}

export { normalizeOwners, normalizeEpics, normalizeTypes, normalizeReviewers };
