import React, { Component, createContext } from 'react';
import { getCurrentIteration, getMemberships, getBlockers } from './api';
import {
  PendingColumn,
  StartedColumn,
  ReviewColumn,
  DoneColumn
} from './Columns';

import Footer from './Footer';
import Tray from './Tray';
import Spinner from './Spinner';
import normalize from './normalize';
import Filters from './Filters';

import { arrayRotateBackward, arrayRotateForward, arrayToggle } from './utils';
import { hasUnresolvedBlockers } from './Story';

const { Consumer, Provider } = createContext();

const initialState = {
  isLoading: false,
  error: null,
  iteration: {},
  stories: [],
  people: [],
  uniqueOwnerIds: [],
  selectedOwners: [],
  selectedTypes: []
};

const isBlocked = story => hasUnresolvedBlockers(story.blockers);
const removeReleaseStories = story => story.story_type !== 'release';
const filterByOwner = ownerIds => story => {
  if (ownerIds.length === 0) {
    return true;
  }

  return story.owner_ids.some(id => ownerIds.indexOf(id) !== -1);
};
const filterByType = typeNames => story => {
  if (typeNames.length === 0) {
    return true;
  }

  return (
    typeNames.includes(story.story_type) ||
    (typeNames.includes('blocked') && isBlocked(story))
  );
};

class Project extends Component {
  state = { ...initialState };

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData(this.props.match.params.id);
    }
  }

  fetchData = async id => {
    this.setState({
      isLoading: true
    });

    try {
      const [iterationResponse, membershipsResponse] = await Promise.all([
        getCurrentIteration(id),
        getMemberships(id)
      ]);

      this.setState({
        ...initialState,
        ...normalize({ iterationResponse, membershipsResponse }),
        isLoading: false
      });

      const { stories } = this.state;
      const blockers = await getBlockers(id, stories.map(story => story.id));

      const storiesWithBlockers = stories.map(story => ({
        ...story,
        blockers: blockers.find(item => item.id === story.id).blockers
      }));

      this.setState({ stories: storiesWithBlockers });
    } catch (error) {
      this.setState({ ...initialState, error, isLoading: false });
    }
  };

  toggleOwner = id => {
    this.setState({
      selectedOwners: arrayToggle(this.state.selectedOwners, id)
    });
  };

  selectNextOwner = () => {
    this.setState({
      selectedOwners: [
        arrayRotateForward(
          this.state.uniqueOwnerIds,
          this.state.selectedOwners[0]
        )
      ]
    });
  };

  selectPrevOwner = () => {
    this.setState({
      selectedOwners: [
        arrayRotateBackward(
          this.state.uniqueOwnerIds,
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
    const {
      isLoading,
      error,
      stories,
      people,
      uniqueOwnerIds,
      selectedOwners,
      selectedTypes
    } = this.state;

    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }

    const filteredStories = stories
      .filter(removeReleaseStories)
      .filter(filterByOwner(selectedOwners))
      .filter(filterByType(selectedTypes));

    return (
      <Provider value={people}>
        <section className="section" style={{ paddingBottom: '4rem' }}>
          <div className="columns">
            <PendingColumn stories={filteredStories} />
            <StartedColumn stories={filteredStories} />
            <ReviewColumn stories={filteredStories} />
            <DoneColumn stories={filteredStories} />
          </div>
        </section>

        <Footer>
          <Tray title="Filters">
            <Filters
              uniqueOwnerIds={uniqueOwnerIds}
              selectedOwners={selectedOwners}
              people={people}
              selectedTypes={selectedTypes}
              toggleType={this.toggleType}
              toggleOwner={this.toggleOwner}
              selectNextOwner={this.selectNextOwner}
              selectPrevOwner={this.selectPrevOwner}
              clearOwners={this.clearOwners}
            />
          </Tray>
        </Footer>
      </Provider>
    );
  }
}

export default Project;
export { Provider, Consumer };
export { filterByType };
