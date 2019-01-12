import React, { Component, createContext } from 'react';
import { arrayOf, number, node } from 'prop-types';
import { arrayRotateBackward, arrayRotateForward, arrayToggle } from './utils';

const { Provider, Consumer } = createContext();

export const hasUnresolvedBlockers = blockers =>
  blockers.some(blocker => !blocker.resolved);

const isBlocked = story => hasUnresolvedBlockers(story.blockers);

export const filterByOwner = (story, ownerIds) => {
  if (ownerIds.length === 0) {
    return true;
  }

  return story.ownerIds.some(id => ownerIds.includes(id));
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

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOwners: [],
      selectedTypes: [],
      filter: this.filter,
      toggleOwner: this.toggleOwner,
      selectNextOwner: this.selectNextOwner,
      selectPrevOwner: this.selectPrevOwner,
      clearOwners: this.clearOwners,
      toggleType: this.toggleType
    };
  }

  filter = (stories, storyStates) =>
    stories.filter(
      story =>
        filterByOwner(story, this.state.selectedOwners) &&
        filterByType(story, this.state.selectedTypes) &&
        filterByStoryStates(story, storyStates)
    );

  toggleOwner = id => {
    this.setState({
      selectedOwners: arrayToggle(this.state.selectedOwners, id)
    });
  };

  selectNextOwner = () => {
    this.setState({
      selectedOwners: [
        arrayRotateForward(
          this.props.uniqueOwnerIds,
          this.state.selectedOwners[0]
        )
      ]
    });
  };

  selectPrevOwner = () => {
    this.setState({
      selectedOwners: [
        arrayRotateBackward(
          this.props.uniqueOwnerIds,
          this.state.selectedOwners[0]
        )
      ]
    });
  };

  clearOwners = () => {
    this.setState({ selectedOwners: [] });
  };

  toggleType = id => {
    this.setState({ selectedTypes: arrayToggle(this.state.selectedTypes, id) });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

FilterContainer.propTypes = {
  uniqueOwnerIds: arrayOf(number),
  children: node
};

export default FilterContainer;
export { Consumer as FilterConsumer };
