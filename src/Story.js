import React from 'react';
import Owners from './Owners';
import {
  BlockedTag,
  BugTag,
  ChoreTag,
  EstimateTag,
  FeatureTag,
  LabelTag
} from './Tags';

const renderTypeTag = type => {
  switch (type) {
    case 'feature':
      return <FeatureTag />;
    case 'bug':
      return <BugTag />;
    case 'chore':
      return <ChoreTag />;
    default:
      return null;
  }
};

const hasUnresolvedBlockers = blockers =>
  blockers.some(blocker => !blocker.resolved);

const Story = ({
  name,
  labels,
  story_type,
  estimate,
  owner_ids,
  blockers,
  url
}) => (
  <div className="card">
    <div className="card-content">
      <div className="subtitle is-4">
        <a
          href={url}
          className="has-text-grey-dark has-hover-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </div>

      <div className="media">
        <div className="media-content">
          <div className="tags has-addons is-marginless">
            {renderTypeTag(story_type)}

            <EstimateTag estimate={estimate} />

            {labels.map(label => (
              <LabelTag name={label.name} key={label.id} />
            ))}
          </div>
        </div>

        <div className="media-right">
          <Owners ownerIds={owner_ids} />
        </div>
      </div>
    </div>

    <BlockedTag visible={hasUnresolvedBlockers(blockers)} />
  </div>
);

export default Story;
export { hasUnresolvedBlockers };
