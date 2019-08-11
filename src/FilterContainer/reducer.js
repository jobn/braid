import { arrayToggle, arrayRotateForward, arrayRotateBackward } from '../utils';

export const toggleOwner = 'TOGGLE_OWNER';
export const clearOwners = 'CLEAR_OWNERS';
export const selectNextOwner = 'SELECT_NEXT_OWNER';
export const selectPrevOwner = 'SELECT_PREV_OWNER';
export const toggleEpic = 'TOGGLE_EPIC';
export const clearEpics = 'CLEAR_EPICS';
export const selectNextEpic = 'SELECT_NEXT_EPIC';
export const selectPrevEpic = 'SELECT_PREV_EPIC';
export const toggleType = 'TOGGLE_TYPE';
export const showModal = 'SHOW_MODAL';
export const hideModal = 'HIDE_MODAL';
export const showEpicsModal = 'SHOW_EPICS_MODAL';
export const hideEpicsModal = 'HIDE_EPICS_MODAL';

export const reducer = (state, action, uniqueOwnerIds, uniqueEpicIds) => {
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

    case toggleEpic: {
      return {
        ...state,
        selectedEpics: arrayToggle(state.selectedEpics, payload)
      };
    }

    case clearEpics: {
      return {
        ...state,
        selectedEpics: [],
        displayEpicsModal: false
      };
    }

    case selectNextEpic: {
      return {
        ...state,
        selectedEpics: [
          arrayRotateForward(uniqueEpicIds, state.selectedEpics[0])
        ],
        displayEpicsModal: true
      };
    }

    case selectPrevEpic: {
      return {
        ...state,
        selectedEpics: [
          arrayRotateBackward(uniqueEpicIds, state.selectedEpics[0])
        ],
        displayEpicsModal: true
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

    case showEpicsModal: {
      return {
        ...state,
        displayEpicsModal: true
      };
    }

    case hideEpicsModal: {
      return {
        ...state,
        displayEpicsModal: false
      };
    }

    default: {
      return { ...state };
    }
  }
};
