import React, { Component } from 'react';
import { getStories } from './api';

const Story = ({ name }) => <li>{name}</li>;

class Project extends Component {
  state = {
    isLoading: false,
    error: null,
    response: []
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
    getStories(id)
      .then(response => this.setState({ response, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { projects } = this.props;
    const { isLoading, error, response } = this.state;

    const { project_name } = projects.find(
      prj => prj.project_id === this.props.location.state.id
    );

    if (isLoading) {
      return <div>Loading ...</div>;
    }
    if (error) {
      return <div>Error</div>;
    }

    return (
      <div>
        <h2>{project_name}</h2>
        <ul>
          {response.map(story => (
            <Story key={story.id} {...story} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Project;
