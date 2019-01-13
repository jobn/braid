import React, { Component } from 'react';
import { PeopleProvider } from './PeopleContext';
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
import FilterContext, { FilterConsumer } from './FilterContext';

const initialState = {
  isLoading: false,
  error: null,
  iteration: {},
  stories: [],
  people: [],
  uniqueOwnerIds: []
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

  render() {
    const { isLoading, error, stories, people, uniqueOwnerIds } = this.state;

    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }

    return (
      <FilterContext uniqueOwnerIds={uniqueOwnerIds}>
        <PeopleProvider value={people}>
          <section className="section" style={{ paddingBottom: '4rem' }}>
            <div className="columns">
              <PendingColumn stories={stories} />
              <StartedColumn stories={stories} />
              <ReviewColumn stories={stories} />
              <DoneColumn stories={stories} />
            </div>
          </section>

          <Footer>
            <Tray title="Filters">
              <FilterConsumer>
                {consumerValue => (
                  <Filters uniqueOwnerIds={uniqueOwnerIds} {...consumerValue} />
                )}
              </FilterConsumer>
            </Tray>
          </Footer>
        </PeopleProvider>
      </FilterContext>
    );
  }
}

export default Project;
