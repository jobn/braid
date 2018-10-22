import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getMe } from './api';
import Project from './Project';
import Login from './Login';
import PageNotFound from './PageNotFound';
import Navbar from './Navbar';

class App extends Component {
  state = {
    token: null,
    projects: [],
    error: null,
    name: null
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

  fetch = token => {
    getMe(token)
      .then(response => {
        const { name, projects } = response;

        window.localStorage.setItem('token', token);
        this.setState({ token, projects, name, error: null });
      })
      .catch(error => {
        this.clearToken();

        if (error.response && error.response.status === 403) {
          this.setState({ ...this.state, error: 'Invalid API token' });
        }
      });
  };

  render() {
    const { token, name, projects, error } = this.state;
    if (!token) {
      return <Login onSubmit={this.handleLogin} error={error} />;
    }
    return (
      <Router>
        <div>
          <Navbar
            name={name}
            projects={projects}
            onLogout={this.handleLogout}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={props => <h1>Please select a project</h1>}
            />

            <Route
              path="/projects/:id"
              render={props => <Project {...props} />}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
