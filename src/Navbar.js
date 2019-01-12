import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import icon from './icon.svg';

const Navbar = ({ name, projects, onLogout }) => (
  <nav className="navbar is-transparent" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/projects">
        <img height="28px" width="28px" src={icon} alt="Braid logo" />
        <h1
          className="title has-text-weight-semibold"
          style={{ marginLeft: '.3rem' }}
        >
          Braid
        </h1>
      </Link>

      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            <Switch>
              <Route
                path="/projects/:id"
                render={props => (
                  <span>
                    {projects.reduce(
                      (acc, prj) =>
                        prj.projectId === Number(props.match.params.id)
                          ? prj.projectName
                          : acc,
                      'Select project'
                    )}
                  </span>
                )}
              />
              <Route render={() => <span>Select project</span>} />
            </Switch>
          </a>

          <div className="navbar-dropdown is-boxed">
            {projects.map(({ projectId, projectName }) => (
              <Link
                key={projectId}
                className="navbar-item"
                to={{
                  pathname: `/projects/${projectId}`,
                  state: { id: projectId }
                }}
              >
                {projectName}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">Signed in as {name}</div>
        <div className="navbar-item">
          <button className="button is-small" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
