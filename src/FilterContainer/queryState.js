import { window } from '../services';
import { normalizeOwners, normalizeEpics, normalizeTypes } from './normalize';

const queryString = require('query-string');

const queryStringOptions = {
  arrayFormat: 'comma'
};

function getQueryState(uniqueOwnerIds, uniqueEpicIds) {
  const queryState = queryString.parse(
    window.location.search,
    queryStringOptions
  );

  return {
    selectedOwners: normalizeOwners(queryState.selectedOwners, uniqueOwnerIds),
    selectedEpics: normalizeEpics(queryState.selectedEpics, uniqueEpicIds),
    selectedTypes: normalizeTypes(queryState.selectedTypes)
  };
}

function setQueryState(state) {
  window.history.pushState(
    {},
    document.title,
    `${window.location.pathname}?${queryString.stringify(
      state,
      queryStringOptions
    )}`
  );
}

export { getQueryState, setQueryState };
