import React, { useContext, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faForward,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Initials } from './Initials';
import { FilterContext } from './FilterContainer';
import { storyTypes } from './storyTypes';

const Filters = () => {
  const {
    selectedTypes,
    selectedOwners,
    uniqueOwnerIds,
    dispatch
  } = useContext(FilterContext);

  const handleOwnerClick = event => {
    event.target.focus();
    dispatch({
      type: 'TOGGLE_OWNER',
      payload: Number(event.currentTarget.value)
    });
  };

  const handleTypeClick = event => {
    event.target.focus();
    dispatch({ type: 'TOGGLE_TYPE', payload: event.currentTarget.value });
  };

  const handleNextOwnerClick = event => {
    event.target.focus();
    dispatch({ type: 'SELECT_NEXT_OWNER' });
  };

  const handlePrevOwnerClick = event => {
    event.target.focus();
    dispatch({ type: 'SELECT_PREV_OWNER' });
  };

  const handleClearOwners = event => {
    event.target.focus();
    dispatch({ type: 'CLEAR_OWNERS' });
  };

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
                  className={`button is-rounded ${
                    selectedOwners.indexOf(id) !== -1 ? 'is-primary' : ''
                  }`}
                  onClick={handleOwnerClick}
                >
                  <Initials id={id} />
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
                  onClick={handlePrevOwnerClick}
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
                  onClick={handleNextOwnerClick}
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
                  onClick={handleClearOwners}
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
                onClick={handleTypeClick}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Filters };
