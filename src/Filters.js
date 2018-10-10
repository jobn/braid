import React from 'react';

const Filters = ({
  toggleDisplayFilters,
  displayFilters,
  uniqueOwnerIds,
  selectedOwners,
  people,
  selectedTypes,
  toggleType,
  toggleOwner
}) => (
  <div className="card">
    {displayFilters && (
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <h5 className="subtitle is-5" style={{ lineHeight: '1.8' }}>
              By owner
            </h5>
          </div>
          <div className="media-content">
            <div className="buttons">
              {uniqueOwnerIds.map(id => (
                <button
                  key={id}
                  className={`button is-rounded is-uppercase ${
                    selectedOwners.indexOf(id) !== -1 ? 'is-primary' : ''
                  }`}
                  onClick={() => toggleOwner(id)}
                >
                  {people[id].initials}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="media is-marginless" style={{ border: '0' }}>
          <div className="media-left">
            <h5 className="subtitle is-5" style={{ lineHeight: '1.8' }}>
              By type
            </h5>
          </div>
          <div className="media-content">
            <div className="buttons">
              {['feature', 'bug', 'chore'].map(id => (
                <button
                  key={id}
                  className={`button is-rounded is-uppercase ${
                    selectedTypes.indexOf(id) !== -1 ? 'is-primary' : ''
                  }`}
                  onClick={() => toggleType(id)}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

    <a
      className="card-header has-background-grey-dark"
      onClick={toggleDisplayFilters}
      style={{ userSelect: 'none' }}
    >
      <p className="card-header-title has-text-white-bis">Filter</p>
      <p className="card-header-icon has-text-white-bis">
        <span className="icon">
          <i className="fas fa-angle-up" aria-hidden="true" />
        </span>
      </p>
    </a>
  </div>
);

export default Filters;
