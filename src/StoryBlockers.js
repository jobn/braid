import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

function StoryBlockers({ blockers }) {
  if (!blockers.length) return null;

  return (
    <div data-testid="story-blockers" className="content is-small">
      <hr style={{ margin: '0px 0 10px' }} />
      <span className="has-text-danger">
        <FontAwesomeIcon icon={faBan} size="1x" /> Blockers:
      </span>

      <ul style={{ marginTop: '10px' }}>
        {blockers.map((b, i) => (
          <li key={`blocker-${i}`}>
            <a
              href={b.url}
              className="is-small has-text-grey-dark has-hover-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {b.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { StoryBlockers };
