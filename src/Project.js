import React, { Component, createContext } from 'react';
import { getCurrentIteration, getMemberships } from './api';
import {
  PendingColumn,
  StartedColumn,
  ReviewColumn,
  DoneColumn
} from './Columns';
import Filters from './Filters';
import Spinner from './Spinner';
import normalize from './normalize';

const { Consumer, Provider } = createContext();

const initialState = {
  isLoading: false,
  error: null,
  iteration: {},
  stories: [],
  people: [],
  uniqueOwnerIds: [],
  selectedOwners: [],
  selectedTypes: [],
  displayFilters: false
};

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

  return typeNames.includes(story.story_type);
};

const arrayToggle = (array, item) => {
  const clone = [...array];
  const index = clone.indexOf(item);

  if (index === -1) {
    clone.push(item);
  } else {
    clone.splice(index, 1);
  }

  return clone;
};

class Project extends Component {
  state = { ...initialState };

  componentDidMount() {
    this.fetchData(this.props.location.state.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state.id !== prevProps.location.state.id) {
      this.fetchData(this.props.location.state.id);
    }
  }

  fetchData = id => {
    this.setState({
      isLoading: true
    });

    Promise.all([getCurrentIteration(id), getMemberships(id)])
      .then(([iterationResponse, membershipsResponse]) => {
        this.setState({
          ...initialState,
          ...normalize({ iterationResponse, membershipsResponse }),
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({ ...initialState, error, isLoading: false })
      );
  };

  toggleOwner = id => {
    this.setState({
      selectedOwners: arrayToggle(this.state.selectedOwners, id)
    });
  };

  toggleType = id => {
    this.setState({ selectedTypes: arrayToggle(this.state.selectedTypes, id) });
  };

  toggleDisplayFilters = () => {
    this.setState(state => ({ displayFilters: !state.displayFilters }));
  };

  render() {
    const {
      isLoading,
      error,
      stories,
      people,
      uniqueOwnerIds,
      selectedOwners,
      selectedTypes,
      displayFilters
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
        <section className="section">
          <div className="columns">
            <PendingColumn stories={filteredStories} />
            <StartedColumn stories={filteredStories} />
            <ReviewColumn stories={filteredStories} />
            <DoneColumn stories={filteredStories} />
          </div>
        </section>

        <section className="filters">
          <Filters
            displayFilters={displayFilters}
            people={people}
            selectedOwners={selectedOwners}
            selectedTypes={selectedTypes}
            toggleDisplayFilters={this.toggleDisplayFilters}
            toggleOwner={this.toggleOwner}
            toggleType={this.toggleType}
            uniqueOwnerIds={uniqueOwnerIds}
          />
        </section>
      </Provider>
    );
  }
}

export default Project;
export { Consumer };
