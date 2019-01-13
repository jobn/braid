import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';
import { getCurrentIteration, getMemberships, getBlockers } from './api';
import Spinner from './Spinner';
import normalize from './normalize';

const initialState = {
  isLoading: false,
  error: null,
  iteration: {},
  stories: [],
  people: {},
  uniqueOwnerIds: []
};

class ProjectContainer extends Component {
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

    return this.props.render({ uniqueOwnerIds, stories, people });
  }
}

ProjectContainer.propTypes = {
  render: func.isRequired,
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired
};

export default ProjectContainer;
