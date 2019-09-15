import React from 'react';
import { Owners } from './Owners';
import {
  BlockedTag,
  BugTag,
  ChoreTag,
  EstimateTag,
  FeatureTag,
  LabelTag
} from './Tags';
import { hasUnresolvedBlockers } from './FilterContainer';

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
  onDragEnd
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
      </div>

      <BlockedTag visible={hasUnresolvedBlockers(blockers)} />
    </div>
  );
}

export { Story };
