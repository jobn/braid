import React, { useContext } from 'react';
import { Story } from './Story';
import { FilterContext } from './FilterContainer';
import { ColumnContext } from './ColumnContainer';

const activeTargetStyle = {
  border: '2px dashed hsl(0, 0%, 48%)',
  borderRadius: '5px',
  margin: '-2px',
  background: 'hsl(0, 0%, 96%)'
};

const Column = ({ title, storyIds, stories, storyStates, dropState }) => {
  const { filter } = useContext(FilterContext);
  const {
    handleDragStart,
    handleDrop,
    handleDragEnter,
    handleDragEnd,
    target,
    origin
  } = useContext(ColumnContext);

  const handleDragOver = e => {
    e.preventDefault();
  };

  const onDragEnter = () => {
    handleDragEnter(dropState);
  };

  const isActiveTarget = target === dropState && origin !== dropState;

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDragEnter={onDragEnter}
      onDrop={handleDrop}
      style={{
        minHeight: '70vh',
        ...(isActiveTarget ? activeTargetStyle : {})
      }}
    >
      <h4 className="title is-4 has-text-centered">{title}</h4>

      {filter(storyIds, stories, storyStates).map(story => (
        <Story
          key={story.id}
          {...story}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

export { Column };
