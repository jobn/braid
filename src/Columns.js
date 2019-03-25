import React, { useContext } from 'react';
import { Story } from './Story';
import { FilterContext } from './FilterContainer';

const Column = ({ title, stories, storyStates }) => {
  const { filter } = useContext(FilterContext);

  return (
    <div className="column">
      <h4 className="title is-4 has-text-centered">{title}</h4>
      {filter(stories, storyStates).map(story => (
        <Story key={story.id} {...story} />
      ))}
    </div>
  );
};

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
