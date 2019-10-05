import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const Settings = () => {
  const [splitFinalColumns, setSplitFinalColumns] = useLocalStorage(
    'splitColumns'
  );

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
            Combine &ldquo;Done&rdquo; and &ldquo;Accepted&rdquo; columns into
            one
          </h4>
          <p>
            Enable this setting to have the Done and Accepted story states
            represented as a single column in the view.
            <br />
            Current state: <b>{splitFinalColumns ? 'disabled' : 'enabled'}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Settings };
