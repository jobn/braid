import React from 'react';
import Owners from './Owners';
import { FeatureTag, BugTag, ChoreTag, LabelTag, EstimateTag } from './Tags';

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

const Story = ({ name, labels, story_type, estimate, owner_ids }) => (
  <div className="card">
    <div className="card-content">
      <div className="subtitle is-4">{name}</div>

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
  </div>
);

export default Story;
