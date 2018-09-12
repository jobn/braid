import React from 'react';
import Tags from './Tags';

const Story = ({ name, labels, story_type, estimate, url }) => (
  <div className="card">
    <div className="card-content">
      <div className="subtitle is-4">{name}</div>

      <Tags storyType={story_type} estimate={estimate} labels={labels} />
    </div>
  </div>
);

export default Story;
