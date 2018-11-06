import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBug, faCog } from '@fortawesome/free-solid-svg-icons';

export const FeatureTag = () => (
  <div className="tag is-primary" data-testid="feature-tag">
    <span className="icon">
      <FontAwesomeIcon icon={faStar} />
    </span>
  </div>
);

export const BugTag = () => (
  <div className="tag is-danger" data-testid="bug-tag">
    <span className="icon">
      <FontAwesomeIcon icon={faBug} />
    </span>
  </div>
);

export const ChoreTag = () => (
  <div className="tag is-info" data-testid="chore-tag">
    <span className="icon">
      <FontAwesomeIcon icon={faCog} />
    </span>
  </div>
);

export const EstimateTag = ({ estimate }) => {
  if (!estimate || estimate === 0) {
    return null;
  }

  return (
    <span className="tag is-dark" data-testid="estimate-tag">
      {estimate}
    </span>
  );
};

export const LabelTag = ({ name }) => (
  <div className="tag" data-testid="label-tag">
    {name}
  </div>
);

export const BlockedTag = () => (
  <span
    style={{ marginBottom: '8px' }}
    className="tag is-warning"
    data-testid="blocked-tag"
  >
    Blocked
  </span>
);
