import React from 'react';

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
    <i className="fas fa-spinner fa-pulse fa-3x" />
  </span>
);

export default Spinner;
