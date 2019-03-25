import React from 'react';

const Footer = ({ children }) => (
  <div
    style={{
      position: 'fixed',
      bottom: '0',
      width: '100vw',
      display: 'flex'
    }}
  >
    {children}
  </div>
);

export { Footer };
