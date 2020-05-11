import React, { useContext, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faForward,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Initials } from './Initials';
import {
  FilterContext,
  toggleOwner,
  clearOwners,
  selectNextOwner,
  selectPrevOwner,
  toggleEpic,
  clearEpics,
  selectNextEpic,
  selectPrevEpic,
  toggleType,
  switchOwner
} from './FilterContainer';
import { storyTypes } from './storyTypes';
import { EpicName } from './EpicName';
import { useLocalStorage } from './useLocalStorage';

const Filters = () => {
  const {
    selectedTypes,
    selectedOwners,
    selectedEpics,
    uniqueOwnerIds,
    uniqueEpicIds,
    teams,
    dispatch
  } = useContext(FilterContext);
  const [byOwner] = useLocalStorage('byOwner');
  const [byType] = useLocalStorage('byType');
  const [byEpic] = useLocalStorage('byEpic');
  const [byTeam] = useLocalStorage('byTeam');

  const handleOwnerClick = event => {
    event.target.focus();
    dispatch({
      type: toggleOwner,
      payload: Number(event.currentTarget.value)
    });
  };

  const handleSwitchOwnerClick = event => {
    event.target.focus();
    dispatch({
      type: switchOwner,
      payload: Number(event.currentTarget.value)
    });
  };

  const handleEpicClick = event => {
    event.target.focus();
    dispatch({
      type: toggleEpic,
      payload: Number(event.currentTarget.value)
    });
  };

  const handleTypeClick = event => {
    event.target.focus();
    dispatch({ type: toggleType, payload: event.currentTarget.value });
  };

  const handleNextOwnerClick = event => {
    event.target.focus();
    dispatch({ type: selectNextOwner });
  };

  const handlePrevOwnerClick = event => {
    event.target.focus();
    dispatch({ type: selectPrevOwner });
  };

  const handleClearOwners = event => {
    event.target.focus();
    dispatch({ type: clearOwners });
  };

  const handleNextEpicClick = event => {
    event.target.focus();
    dispatch({ type: selectNextEpic });
  };

  const handlePrevEpicClick = event => {
    event.target.focus();
    dispatch({ type: selectPrevEpic });
  };

  const handleClearEpics = event => {
    event.target.focus();
    dispatch({ type: clearEpics });
  };

  const memberStyle = {
    borderRadius: '3px',
    border: '1px solid #c5c5c5',
    padding: '10px',
    marginRight: '10px'
  };

  const teamHeaderStyle = {
    lineHeight: 1,
    margin: '0 0 10px 8px',
    fontWeight: 'bold'
  };

  const emojiStyle = {
    fontSize: '20px',
    marginLeft: '4px'
  };

  return (
    <Fragment>
      {!byTeam && (
        <div className="media">
          <div className="media-left">
            <h5 className="subtitle is-5" style={{ lineHeight: '1.8' }}>
              By team
            </h5>
          </div>
          <div className="media-content">
            <div className="field is-grouped is-grouped-multiline">
              {teams.map(team => (
                <div className="control" style={memberStyle} key={team.name}>
                  <h4 style={teamHeaderStyle}>
                    {team.name}{' '}
                    <span style={emojiStyle} role="img" aria-label="emoji">
                      {team.emoji}
                    </span>
                  </h4>
                  {team.membersId.map(id => (
                    <button
                      key={id}
                      value={id}
                      style={{ marginRight: '4px' }}
                      className={`button is-rounded ${
                        selectedOwners.indexOf(id) !== -1 ? 'is-primary' : ''
                      }`}
                      onClick={handleSwitchOwnerClick}
                    >
                      <Initials id={id} />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {byOwner && (
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
                    className="button"
                    data-testid="prevOwner"
                    onClick={handlePrevOwnerClick}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faBackward} />
                    </span>
                    <span>
                      <span className="is-underline">P</span>rev
                    </span>
                  </button>
                </p>
                <p className="control">
                  <button
                    className="button"
                    data-testid="nextOwner"
                    onClick={handleNextOwnerClick}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faForward} />
                    </span>
                    <span>
                      <span className="is-underline">N</span>ext
                    </span>
                  </button>
                </p>

                <p className="control">
                  <button
                    className="button"
                    data-testid="clearOwners"
                    onClick={handleClearOwners}
                    disabled={selectedOwners.length === 0}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                    <span>
                      <span className="is-underline">C</span>lear
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {byType && (
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
      )}

      {byEpic && (
        <div className="media is-marginless" style={{ border: '0' }}>
          <div className="media-left">
            <h5 className="subtitle is-5" style={{ lineHeight: '1.8' }}>
              By epic
            </h5>
          </div>
          <div className="media-content">
            <div className="field is-grouped is-grouped-multiline">
              {uniqueEpicIds.map(id => (
                <p className="control" key={id}>
                  <button
                    key={id}
                    value={id}
                    className={`button is-rounded ${
                      selectedEpics.indexOf(id) !== -1 ? 'is-primary' : ''
                    }`}
                    onClick={handleEpicClick}
                  >
                    <EpicName id={id} />
                  </button>
                </p>
              ))}

              <div
                className="field has-addons"
                style={{ marginBottom: '.75rem' }}
              >
                <p className="control">
                  <button
                    className="button"
                    data-testid="prevEpic"
                    onClick={handlePrevEpicClick}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faBackward} />
                    </span>
                    <span>
                      <span className="is-underline">P</span>rev
                    </span>
                  </button>
                </p>
                <p className="control">
                  <button
                    className="button"
                    data-testid="nextEpic"
                    onClick={handleNextEpicClick}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faForward} />
                    </span>
                    <span>
                      <span className="is-underline">N</span>ext
                    </span>
                  </button>
                </p>

                <p className="control">
                  <button
                    className="button"
                    data-testid="clearEpics"
                    onClick={handleClearEpics}
                    disabled={selectedEpics.length === 0}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                    <span>
                      <span className="is-underline">C</span>lear
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export { Filters };
