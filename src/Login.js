import React, { Component } from 'react';

class Login extends Component {
  state = {
    token: ''
  };

  handleChange = event => this.setState({ token: event.target.value });

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.token);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.token}
          onChange={this.handleChange}
          name="token"
        />
        <input type="submit" value="set token" />
      </form>
    );
  }
}

export default Login;
