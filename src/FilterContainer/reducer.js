import { arrayToggle, arrayRotateForward, arrayRotateBackward } from '../utils';

export const toggleOwner = 'TOGGLE_OWNER';
export const clearOwners = 'CLEAR_OWNERS';
export const selectNextOwner = 'SELECT_NEXT_OWNER';
export const selectPrevOwner = 'SELECT_PREV_OWNER';
export const toggleType = 'TOGGLE_TYPE';
export const showModal = 'SHOW_MODAL';
export const hideModal = 'HIDE_MODAL';

export const reducer = (state, action, uniqueOwnerIds) => {
  const { type, payload } = action;

  switch (type) {
    case toggleOwner: {
      return {
        ...state,
        selectedOwners: arrayToggle(state.selectedOwners, payload)
      };
    }

    case clearOwners: {
      return {
        ...state,
        selectedOwners: [],
        displayModal: false
      };
    }

    case selectNextOwner: {
      return {
        ...state,
        selectedOwners: [
          arrayRotateForward(uniqueOwnerIds, state.selectedOwners[0])
        ],
        displayModal: true
      };
    }

    case selectPrevOwner: {
      return {
        ...state,
        selectedOwners: [
          arrayRotateBackward(uniqueOwnerIds, state.selectedOwners[0])
        ],
        displayModal: true
      };
    }

    case toggleType: {
      return {
        ...state,
        selectedTypes: arrayToggle(state.selectedTypes, payload)
      };
    }

    case showModal: {
      return {
        ...state,
        displayModal: true
      };
    }

    case hideModal: {
      return {
        ...state,
        displayModal: false
      };
    }

    default: {
      return { ...state };
    }
  }
};
