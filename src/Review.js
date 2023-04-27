import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Initials } from './Initials';

const colorForReview = status => {
  switch (status) {
    case 'revise':
      return 'Red';
    case 'in_review':
      return 'Orange';
    case 'pass':
      return 'LightGreen';
    default:
      return 'White';
  }
};

const Review = ({ reviews, slim, showReviewer, requester }) => (
  <div className="tags has-addons is-marginless" data-testid="reviews">
    {reviews.map(review => (
      <div key={review.id} style={{}}>
        <div
          className="tag"
          style={{
            backgroundColor: 'Gray',
            paddingLeft: slim ? '.25em' : '.75em',
            paddingRight: slim ? '.25em' : '.75em'
          }}
        >
          <span
            className="icon"
            style={{
              color: colorForReview(review.status),
              fontSize: slim ? '8px' : '12px',

              width: slim ? '1rem' : '1.5rem',
              height: slim ? '1rem' : '1.5rem'
            }}
          >
            <FontAwesomeIcon icon={faCircle} />
          </span>
        </div>
        <div className="tag" style={{
            paddingLeft: slim ? '.5em' : '.75em',
            paddingRight: slim ? '.5em' : '.75em'}}>
          {review.reviewType.name}
          {showReviewer && (
            <div style={{ marginLeft: '0.1rem' }}>
              (
              <Initials id={review.reviewerId} />)
            </div>
          )}
        </div>
      </div>
    ))}
    {reviews.length === 0 && (
      <div className="tag">
        Requester
        <div style={{ marginLeft: '0.1rem' }}>
          (
          <Initials id={requester} />)
        </div>
      </div>
    )}
  </div>
);

export { Review };
