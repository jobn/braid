import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const Settings = () => {
  const [splitFinalColumns, setSplitFinalColumns] = useLocalStorage(
    'splitColumns'
  );

  const [slim, setSlim] = useLocalStorage('slim');

  const [showTaskProgress, setShowTaskProgress] = useLocalStorage(
    'showTaskProgress'
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

      {slim ? (
        ''
      ) : (
        <div className="media">
          <div className="media-left">
            <label className="switch">
              <input
                type="checkbox"
                checked={showTaskProgress ? 'checked' : false}
                onChange={() => setShowTaskProgress(!showTaskProgress)}
                disabled={slim}
              />
              <div></div>
            </label>
          </div>

          <div
            className="media-content content"
            style={{ marginRight: '1rem' }}
          >
            <h4>
              <span className="is-underline">T</span>ask Progress
            </h4>
            <p>
              Enable this setting to render an indicator of the progress through
              story tasks beside the story type and estimate. Has no effect if
              the slim theme is enabled.
              <br />
              Current state: <b>{showTaskProgress ? 'enabled' : 'disabled'}</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Settings };
