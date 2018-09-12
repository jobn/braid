import React, { Component } from 'react';
import { getCurrentIteration } from './api';
import Story from './Story';

const Column = ({ title, state, stories }) => (
  <div className="column">
    <h3 className="title is-4 has-text-centered">{title}</h3>
    {stories
      .filter(
        story =>
          state.includes(story.current_state) && story.story_type !== 'release'
      )
      .map(story => (
        <Story key={story.id} {...story} />
      ))}
  </div>
);

class Project extends Component {
  state = {
    isLoading: false,
    error: null,
    iteration: {},
    stories: []
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
      response: [],
      isLoading: true,
      error: null
    });
    getCurrentIteration(id)
      .then(response => {
        const iteration = { ...response[0], stories: null };
        this.setState({
          iteration,
          stories: response[0].stories,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { isLoading, error, stories } = this.state;

    if (isLoading) {
      return <div>Loading ...</div>;
    }
    if (error) {
      return <div>Error</div>;
    }

    return (
      <section className="section">
        <div className="columns">
          <Column title="Pending" state={['planned']} stories={stories} />
          <Column title="Started" state={['started']} stories={stories} />
          <Column title="Review" state={['finished']} stories={stories} />
          <Column
            title="Accept | Done"
            state={['delivered', 'accepted']}
            stories={stories}
          />
        </div>
      </section>
    );
  }
}

export default Project;
