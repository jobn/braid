import React from 'react';
import Tags from './Tags';
import Owners from './Owners';

const Story = ({ name, labels, story_type, estimate, owner_ids }) => (
  <div className="card">
    <div className="card-content">
      <div className="subtitle is-4">{name}</div>

      <div className="media">
        <div className="media-content">
          <Tags storyType={story_type} estimate={estimate} labels={labels} />
        </div>

        <div className="media-right">
          <Owners ownerIds={owner_ids} />
        </div>
      </div>
    </div>
  </div>
);

export default Story;
