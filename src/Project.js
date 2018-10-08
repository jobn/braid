import React, { Component, createContext } from 'react';
import { getCurrentIteration, getMemberships } from './api';
import {
  PendingColumn,
  StartedColumn,
  ReviewColumn,
  DoneColumn
} from './Columns';
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
  filters: {
    notRelease: story => story.story_type !== 'release'
  }
};

class Project extends Component {
  state = {
    ...initialState
  };

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
      ...initialState,
      isLoading: true
    });
    Promise.all([getCurrentIteration(id), getMemberships(id)])
      .then(([iterationResponse, membershipsResponse]) => {
        this.setState({
          ...normalize({ iterationResponse, membershipsResponse }),
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({ ...initialState, error, isLoading: false })
      );
  };

  render() {
    const {
      isLoading,
      error,
      stories,
      people,
      uniqueOwnerIds,
      filters
    } = this.state;

    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }

    const filteredStories = Object.values(filters).reduce(
      (storiesLeft, filter) => storiesLeft.filter(filter),
      stories
    );

    return (
      <Provider value={people}>
        <section className="section">
          <h4 className="title is-4 is-marginless">Filter</h4>
          <div className="media">
            <div className="media-left">
              <h5 className="subtitle is-5 line-height__18">By owner</h5>
            </div>
            <div className="media-content">
              <div className="buttons">
                {uniqueOwnerIds.map(id => (
                  <button
                    key={id}
                    className="button is-link is-outlined is-rounded uppercase"
                  >
                    {people[id].initials}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="columns">
            <PendingColumn stories={filteredStories} />
            <StartedColumn stories={filteredStories} />
            <ReviewColumn stories={filteredStories} />
            <DoneColumn stories={filteredStories} />
          </div>
        </section>
      </Provider>
    );
  }
}

export default Project;
export { Consumer };
