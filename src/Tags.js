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

const getTypeColorClassName = storyType => {
  switch (storyType) {
    case 'feature': {
      return 'has-background-primary';
    }
    case 'chore': {
      return 'has-background-info';
    }
    case 'bug': {
      return 'has-background-danger';
    }
    default: {
      throw new Error('unknow storyType');
    }
  }
};

const getEstimateHeight = estimate => {
  if (estimate >= 8) {
    return '100%';
  }

  return `${estimate * 10}%`;
};

export const SlimTag = ({ estimate, storyType, blocked }) => {
  const className = getTypeColorClassName(storyType);
  const height = getEstimateHeight(estimate);

  return (
    <div
      data-testid="slim-tags"
      style={{
        position: 'absolute',
        top: '7px',
        right: '7px',
        width: '8px',
        height: 'calc(100% - 14px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        className={className}
        style={{
          borderRadius: '4px',
          flexShrink: '1',
          flexGrow: '0',
          flexBasis: height,
          marginBottom: '6px',
          minHeight: '8px'
        }}
      />

      {blocked && (
        <div
          className="has-background-warning"
          style={{
            borderRadius: '4px',
            flex: '0 0 8px'
          }}
        />
      )}
    </div>
  );
};

export const LabelTag = ({ name }) => (
  <div className="tag" data-testid="label-tag">
    {name}
  </div>
);

export const BlockedTag = ({ visible }) => (
  <span
    style={{
      position: 'absolute',
      top: '10px',
      right: '0',
      height: '1.75em',
      fontSize: '.65rem',
      opacity: visible ? '1' : '0',
      transition: 'opacity 1s',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0'
    }}
    className="tag is-warning"
    data-testid="blocked-tag"
  >
    Blocked
  </span>
);
