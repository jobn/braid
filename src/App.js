import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getMe } from './api';
import Project from './Project';
import Login from './Login';
import Navbar from './Navbar';

class App extends Component {
  state = {
    token: null,
    projects: [],
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
        this.setState({ token, projects, name });
      })
      .catch(() => this.clearToken());
  };

  render() {
    const { token, name, projects } = this.state;
    if (!token) {
      return <Login onSubmit={this.handleLogin} />;
    }
    return (
      <Router>
        <div>
          <Navbar
            name={name}
            projects={projects}
            onLogout={this.handleLogout}
          />

          <Route
            path="/projects/:id"
            render={props => <Project {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
