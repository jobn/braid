import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const Settings = () => {
  const [splitFinalColumns, setSplitFinalColumns] = useLocalStorage(
    'splitColumns'
  );

  const [slim, setSlim] = useLocalStorage('slim');
  const [useFullNames, setUseFullNames] = useLocalStorage('useFullNames');

  const [showLabels, setShowLabels] = useLocalStorage('labels');

  const [
    splitFinishedAndDelivered,
    setSplitFinishedAndDelivered
  ] = useLocalStorage('splitFinishedAndDelivered');

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
              checked={splitFinishedAndDelivered ? false : 'checked'}
              onChange={() =>
                setSplitFinishedAndDelivered(!splitFinishedAndDelivered)
              }
            />
            <div />
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>
            Combine &ldquo;Finished&rdquo; and &ldquo;Delivered&rdquo; columns
            into one
          </h4>
          <p>
            Enable this setting to have the Finished and Delivered story states
            represented as a single column in the view.
            <br />
            Current state:{' '}
            <b>{splitFinishedAndDelivered ? 'disabled' : 'enabled'}</b>
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
              checked={useFullNames ? 'checked' : false}
              onChange={() => setUseFullNames(!useFullNames)}
            />
            <div></div>
          </label>
        </div>
        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>
            <span className="is-underline">F</span>ull names
          </h4>
          <p>
            Enable this setting to have the names in the navbar be displayed as full names instead of initials
            <br />
            Current state: <b>{useFullNames ? 'enabled' : 'disabled'}</b>
          </p>
        </div>
      </div>

      <div className="media">
        <div className="media-left">
          <label className="switch">
            <input
              type="checkbox"
              checked={showLabels ? 'checked' : false}
              onChange={() => setShowLabels(!showLabels)}
            />
            <div></div>
          </label>
        </div>

        <div className="media-content content" style={{ marginRight: '1rem' }}>
          <h4>
            <span className="is-underline">S</span>how labels in extended view
          </h4>
          <p>
            Enable this setting to have each story take up less space on screen
            in the extended view, and see more stories at a time by hiding the
            labels.
            <br />
            Current state: <b>{showLabels ? 'enabled' : 'disabled'}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Settings };
