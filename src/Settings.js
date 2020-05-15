import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const Settings = () => {
  const [splitFinalColumns, setSplitFinalColumns] = useLocalStorage(
    'splitColumns'
  );

  const [slim, setSlim] = useLocalStorage('slim');
  const [showRejectedColumn, setShowRejectedColumn] = useLocalStorage(
    'rejected'
  );

  const [byOwner, setByOwner] = useLocalStorage('byOwner');
  const [byType, setByType] = useLocalStorage('byType');
  const [byEpic, setByEpic] = useLocalStorage('byEpic');
  const [byTeam, setByTeam] = useLocalStorage('byTeam');

  return (
    <div>
      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={splitFinalColumns ? false : 'checked'}
              onChange={() => setSplitFinalColumns(!splitFinalColumns)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>
            Combine &ldquo;Delivered&rdquo; and &ldquo;Accepted&rdquo; columns
            into one
          </h4>
          <p>
            Enable this setting to have the Delivered and Accepted story states
            represented as a single column in the view.
            <br />
            Current state: <b>{splitFinalColumns ? 'disabled' : 'enabled'}</b>
          </p>
        </div>
      </div>

      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={slim ? 'checked' : false}
              onChange={() => setSlim(!slim)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>
            <span className="is-underline">S</span>lim theme
          </h4>
          <p>
            Enable this setting to have each story take up less space on screen,
            and see more stories at a time.
            <br />
            Current state: <b>{slim ? 'enabled' : 'disabled'}</b>
          </p>
        </div>
      </div>

      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={showRejectedColumn ? 'checked' : false}
              onChange={() => setShowRejectedColumn(!showRejectedColumn)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>Rejected state column</h4>
          <p>
            Enable this setting to have Rejected state column.
            <br />
            Current state: <b>{showRejectedColumn ? 'enabled' : 'disabled'}</b>
          </p>
        </div>
      </div>

      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={byTeam ? false : 'checked'}
              onChange={() => setByTeam(!byTeam)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>By Team</h4>
        </div>
      </div>

      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={byOwner ? 'checked' : false}
              onChange={() => setByOwner(!byOwner)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>By Owner</h4>
        </div>
      </div>

      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={byType ? 'checked' : false}
              onChange={() => setByType(!byType)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>By Type</h4>
        </div>
      </div>

      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={byEpic ? 'checked' : false}
              onChange={() => setByEpic(!byEpic)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>By Epic</h4>
        </div>
      </div>
    </div>
  );
};

export { Settings };
