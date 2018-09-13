import React from 'react';
import Tags from './Tags';
import { Consumer } from './Project';

const Story = ({ name, labels, story_type, estimate, owner_ids }) => (
  <Consumer>
    {people => (
      <div className="card">
        <div className="card-content">
          <div className="subtitle is-4">{name}</div>

          <div className="media">
            <div className="media-content">
              <Tags
                storyType={story_type}
                estimate={estimate}
                labels={labels}
              />
            </div>
            <div className="media-right">
              <div className="tags is-marginless">
                {people
                  .filter(person => owner_ids.includes(person.id))
                  .map(owner => (
                    <div className="tag is-rounded" key={owner.id}>
                      {owner.initials}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </Consumer>
);

export default Story;
