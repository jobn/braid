import React from 'react';
import icon from './icon.svg';

const PageNotFound = () => (
  <section className="hero is-white is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-half">
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
              <h2 className="is-size-2 has-text-grey-dark">
                404 Page Not Found
              </h2>
              <p>
                The page you were looking for appears to have been moved,
                deleted or does not exist. You could go back to our{' '}
                <a className="has-text-info" href="/">
                  home page
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PageNotFound;
