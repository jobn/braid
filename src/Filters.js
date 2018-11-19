import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faForward,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const storyTypes = [
  {
    key: 'feature',
    activeClass: 'is-primary'
  },
  {
    key: 'bug',
    activeClass: 'is-danger'
  },
  {
    key: 'chore',
    activeClass: 'is-info'
  },
  {
    key: 'blocked',
    activeClass: 'is-warning'
  }
];

class Filters extends Component {
  handleOwnerClick = event => {
    event.currentTarget.focus();
    this.props.toggleOwner(Number(event.currentTarget.value));
  };

  handleTypeClick = event => {
    event.currentTarget.focus();
    this.props.toggleType(event.currentTarget.value);
  };

  handleNextOwnerClick = event => {
    event.currentTarget.focus();
    this.props.selectNextOwner();
  };

  handlePrevOwnerClick = event => {
    event.currentTarget.focus();
    this.props.selectPrevOwner();
  };

  render() {
    const {
      uniqueOwnerIds,
      selectedOwners,
      people,
      selectedTypes,
      clearOwners
    } = this.props;

    return (
      <Fragment>
        <div className="media">
          <div className="media-left">
            <h5 className="subtitle is-5" style={{ lineHeight: '1.8' }}>
              By owner
            </h5>
          </div>
          <div className="media-content">
            <div className="field is-grouped is-grouped-multiline">
              {uniqueOwnerIds.map(id => (
                <p className="control" key={id}>
                  <button
                    key={id}
                    value={id}
                    className={`button is-rounded is-uppercase ${
                      selectedOwners.indexOf(id) !== -1 ? 'is-primary' : ''
                    }`}
                    onClick={this.handleOwnerClick}
                  >
                    {people[id].initials}
                  </button>
                </p>
              ))}

              <div
                className="field has-addons"
                style={{ marginBottom: '.75rem' }}
              >
                <p className="control">
                  <button
                    key="next"
                    className="button"
                    onClick={this.handlePrevOwnerClick}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faBackward} />
                    </span>
                    <span>Prev</span>
                  </button>
                </p>
                <p className="control">
                  <button
                    key="next"
                    className="button"
                    onClick={this.handleNextOwnerClick}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faForward} />
                    </span>
                    <span>Next</span>
                  </button>
                </p>

                <p className="control">
                  <button
                    key="clear"
                    className="button"
                    data-testid="clear-button"
                    onClick={clearOwners}
                    disabled={selectedOwners.length === 0}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                    <span>Clear</span>
                  </button>
                </p>
              </div>
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
              {storyTypes.map(({ key, activeClass }) => (
                <button
                  value={key}
                  key={key}
                  className={`button is-rounded is-uppercase ${
                    selectedTypes.includes(key) ? activeClass : ''
                  }`}
                  onClick={this.handleTypeClick}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Filters;
