import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => (
  <span
    className="icon is-large has-text-primary"
    style={{
      position: 'absolute',
      left: '50vw',
      top: '50vh',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <FontAwesomeIcon icon={faSpinner} pulse={true} size="3x" />
  </span>
);

export default Spinner;
