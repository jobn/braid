import React, { Component } from 'react';
import icon from './icon.svg';

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
    const error = this.props.error;

    return (
      <section className="hero is-white is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-three-fifths">
                <section className="section">
                  <div style={{ display: 'flex' }}>
                    <img
                      height="128px"
                      width="128px"
                      src={icon}
                      alt="Braid logo"
                      style={{ flex: '0 0 auto' }}
                    />

                    <div
                      style={{
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: '1rem'
                      }}
                    >
                      <h1 className="title" style={{ fontSize: '4rem' }}>
                        Braid
                      </h1>
                      <h3 className="subtitle is-5">
                        Kanban like board for PivotalTracker
                      </h3>
                    </div>
                  </div>
                </section>

                <section className="section">
                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="token" className="label">
                      PivotalTracker API token
                    </label>

                    <div className="field is-grouped">
                      <div className="control is-expanded">
                        <input
                          type="text"
                          value={this.state.token}
                          onChange={this.handleChange}
                          id="token"
                          name="token"
                          className="input is-medium"
                          placeholder="Paste token here"
                        />
                      </div>

                      <div className="control">
                        <button
                          type="submit"
                          className="button is-primary is-medium"
                        >
                          Submit
                        </button>
                      </div>
                    </div>

                    {error && <p className="help is-danger">{error}</p>}

                    <p className="help">
                      Your personal token can be found near the bottom of your{' '}
                      <a
                        className="has-text-info"
                        href="https://www.pivotaltracker.com/profile"
                      >
                        PivotalTracker profile page
                      </a>
                    </p>

                    <p className="help">
                      Your token is used for fetching information from
                      PivotalTracker. It is stored here in your browser. Neither
                      your token or any of your PivotalTracker information is
                      sent to Braid.
                    </p>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
