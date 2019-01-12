import React from 'react';
import Story from './Story';
import { FilterConsumer } from './FilterContext';

const Column = ({ title, stories, storyStates }) => (
  <FilterConsumer>
    {({ filter }) => (
      <div className="column">
        <h4 className="title is-4 has-text-centered">{title}</h4>
        {filter(stories, storyStates).map(story => (
          <Story key={story.id} {...story} />
        ))}
      </div>
    )}
  </FilterConsumer>
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
