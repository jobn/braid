import { arrayToggle, arrayRotateForward, arrayRotateBackward } from '../utils';

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'TOGGLE_OWNER': {
      return {
        ...state,
        selectedOwners: arrayToggle(state.selectedOwners, payload)
      };
    }

    case 'CLEAR_OWNERS': {
      return {
        ...state,
        selectedOwners: []
      };
    }

    case 'SELECT_NEXT_OWNER': {
      return {
        ...state,
        selectedOwners: [
          arrayRotateForward(state.uniqueOwnerIds, state.selectedOwners[0])
        ]
      };
    }

    case 'SELECT_PREV_OWNER': {
      return {
        ...state,
        selectedOwners: [
          arrayRotateBackward(state.uniqueOwnerIds, state.selectedOwners[0])
        ]
      };
    }

    case 'TOGGLE_TYPE': {
      return {
        ...state,
        selectedTypes: arrayToggle(state.selectedTypes, payload)
      };
    }

    default: {
      return { ...state };
    }
  }
};