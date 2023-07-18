import React from 'react';
import { Owners } from './Owners';
import {
  BlockedTag,
  BugTag,
  ChoreTag,
  EstimateTag,
  FeatureTag,
  LabelTag,
  ProgressTag,
  SlimTag
} from './Tags';
import { hasUnresolvedBlockers } from './FilterContainer';
import { Review } from './Review';

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

const columnsToShowReviews = ['Finished', 'Delivered', 'To Review'];
const showReviewsForColumn = columnTitle =>
  columnsToShowReviews.includes(columnTitle);

function Story({
  id,
  name,
  labels,
  storyType,
  estimate,
  ownerIds,
  blockers,
  tasks,
  url,
  currentState,
  onDragStart,
  onDragEnd,
  slim,
  showLabels,
  role,
  reviews,
  filteredReviews,
  selectedOwners,
  title,
  requestedById
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
          <>
            {selectedOwners.length === 1 && showReviewsForColumn(title) && (
              <div className="media" style={{ marginBottom: 0 }}>
                <div className="media-content">
                  <div style={{ maxWidth: '90%', marginTop: '8px' }}>
                    <Review
                      slim
                      reviews={filteredReviews}
                      showReviewer={role !== 'reviewer'}
                      requester={requestedById}
                    />
                  </div>
                </div>
              </div>
            )}
            <SlimTag
              storyType={storyType}
              estimate={estimate}
              blocked={hasUnresolvedBlockers(blockers)}
            />
          </>
        ) : (
          <div className="media">
            <div className="media-content">
              <div className="tags has-addons is-marginless">
                {renderTypeTag(storyType)}

                <EstimateTag estimate={estimate} />

                <ProgressTag tasks={tasks} />

                {showLabels &&
                  labels.map(label => (
                    <LabelTag name={label.name} key={label.id} />
                  ))}
              </div>
            </div>
            <div className="media-right" style={{ maxWidth: '90%' }}>
              {role === 'owner' && <Owners ownerIds={ownerIds} />}
              {role === 'reviewer' && selectedOwners.length === 1 && (
                <Review reviews={filteredReviews} />
              )}
            </div>
            <BlockedTag
              title="Blocked"
              visible={hasUnresolvedBlockers(blockers)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export { Story };
