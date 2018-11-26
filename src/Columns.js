import React from 'react';
import Story from './Story';

const filterByStoryStates = ({ stories, storyStates }) =>
  stories.filter(story => storyStates.includes(story.current_state));

const Column = ({ title, stories, storyStates }) => (
  <div className="column">
    <h4 className="title is-4 has-text-centered">{title}</h4>
    {filterByStoryStates({ stories, storyStates }).map(story => (
      <Story key={story.id} {...story} />
    ))}
  </div>
);

const PendingColumn = ({ stories }) => (
  <Column
    title="Pending"
    stories={stories}
    storyStates={['planned', 'unstarted']}
  />
);

const StartedColumn = ({ stories }) => (
  <Column title="Started" stories={stories} storyStates={['started']} />
);

const ReviewColumn = ({ stories }) => (
  <Column title="Review" stories={stories} storyStates={['finished']} />
);

const DoneColumn = ({ stories }) => (
  <Column
    title="Accepted | Done"
    stories={stories}
    storyStates={['delivered', 'accepted']}
  />
);

export { PendingColumn, StartedColumn, ReviewColumn, DoneColumn };
