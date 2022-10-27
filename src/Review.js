import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const colorForReview = status => {
  switch (status) {
    case 'revise':
      return 'Red';
    case 'in_review':
      return 'Orange';
    default:
      return 'White';
  }
};

const Review = ({ reviews }) => (
  <div className="tags has-addons is-marginless" data-testid="reviews">
    {reviews.map(review => (
      <div key={review.id}>
        <div className="tag" style={{ backgroundColor: 'Gray' }}>
          <span
            className="icon"
            style={{
              color: colorForReview(review.status)
            }}
          >
            <FontAwesomeIcon icon={faCircle} />
          </span>
        </div>
        <div className="tag">{review.reviewType.name}</div>
      </div>
    ))}
    {reviews.length === 0 && <div className="tag">Requester</div>}
  </div>
);

export { Review };
