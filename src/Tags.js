import React from 'react';

const FeatureIcon = () => (
  <div className="tag is-primary">
    <span className="icon">
      <i className="fas fa-star" />
    </span>
  </div>
);

const BugIcon = () => (
  <div className="tag is-danger">
    <span className="icon">
      <i className="fas fa-bug" />
    </span>
  </div>
);

const ChoreIcon = () => (
  <div className="tag is-info">
    <span className="icon">
      <i className="fas fa-cog" />
    </span>
  </div>
);

const EstimationTag = ({ estimate }) => {
  if (!estimate || estimate === 0) {
    return null;
  }

  return <span className="tag is-dark">{estimate}</span>;
};

const Tags = ({ storyType, estimate, labels }) => (
  <div className="tags has-addons is-marginless">
    {storyType === 'feature' && <FeatureIcon />}
    {storyType === 'bug' && <BugIcon />}
    {storyType === 'chore' && <ChoreIcon />}

    <EstimationTag estimate={estimate} />

    {labels.map(label => (
      <div key={label.id} className="tag">
        {label.name}
      </div>
    ))}
  </div>
);

export default Tags;
