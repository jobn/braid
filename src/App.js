import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { getMe } from './api';
import { ProjectContainer } from './ProjectContainer';
import { ProjectList } from './ProjectList';
import { Login } from './Login';
import { PageNotFound } from './PageNotFound';
import { Navbar } from './Navbar';
import { Spinner } from './Spinner';

class App extends Component {
  state = {
    token: null,
    projects: [],
    error: null,
    name: null,
    isLoading: false
  };

  componentDidMount() {
    const token = window.localStorage.getItem('token');

    if (!token) return;

    this.fetch(token);
  }

  handleLogin = token => this.fetch(token);

  handleLogout = () => this.clearToken();

  clearToken = () => {
    window.localStorage.removeItem('token');
    this.setState({ token: null });
  };

  clearError = () => {
    if (this.state.error) {
      this.setState({ error: null });
    }
  };

  fetch = token => {
    this.setState({ isLoading: 'true' });

    getMe(token)
      .then(response => {
        const { name, projects } = response;

        window.localStorage.setItem('token', token);
        this.setState({ token, projects, name, isLoading: false, error: null });
      })
      .catch(error => {
        this.clearToken();

        if (error.response && error.response.status === 403) {
          this.setState({
            ...this.state,
            isLoading: false,
            error: 'Invalid API token'
          });
        }
      });
  };

  render() {
    const { isLoading, token, name, projects, error } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    if (!token) {
      return (
        <Login
          onSubmit={this.handleLogin}
          error={error}
          onClearError={this.clearError}
        />
      );
    }

    const allProjectIds = projects.map(p => p.projectId)

    return (
      <Router>
        <div>
          <Navbar
            name={name}
            projects={projects}
            onLogout={this.handleLogout}
          />
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/projects" />} />

            <Route
              path="/projects"
              exact
              render={() => <ProjectList projects={projects} />}
            />

            <Route
              path="/projects/combined"
              render={props => <ProjectContainer ids={allProjectIds} />}
            />

            <Route
              path="/projects/:id"
              render={props => <ProjectContainer ids={[props.match.params.id]} />}
            />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export { App };
