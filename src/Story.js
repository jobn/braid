import React from 'react';
import { Owners } from './Owners';
import {
  BugTag,
  ChoreTag,
  EstimateTag,
  FeatureTag,
  LabelTag,
  SlimTag
} from './Tags';
import { hasUnresolvedBlockers } from './FilterContainer';
import { StoryBlockers } from './StoryBlockers';

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

function Story({
  id,
  name,
  labels,
  storyType,
  estimate,
  ownerIds,
  blockers,
  url,
  currentState,
  onDragStart,
  onDragEnd,
  slim
}) {
  return (
    <div
      className="card"
      draggable
      data-story-id={id}
      data-url={url}
      data-current-state={currentState}
      data-story-type={storyType}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="card-content" style={slim ? { padding: '1rem' } : {}}>
        <div className={`subtitle ${slim ? 'is-5 is-marginless' : 'is-4'}`}>
          <a
            href={url}
            className="has-text-grey-dark has-hover-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </div>

        {slim ? (
          <SlimTag
            storyType={storyType}
            estimate={estimate}
            blocked={hasUnresolvedBlockers(blockers)}
          />
        ) : (
          <div className="media">
            <div className="media-content">
              <div className="tags has-addons is-marginless">
                {renderTypeTag(storyType)}

                <EstimateTag estimate={estimate} />

                {labels.map(label => (
                  <LabelTag name={label.name} key={label.id} />
                ))}
              </div>
            </div>

            <div className="media-right">
              <Owners ownerIds={ownerIds} />
            </div>
          </div>
        )}
        <StoryBlockers blockers={blockers} />
      </div>
    </div>
  );
}

export { Story };
