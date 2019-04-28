import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const trayStyle = {
  position: 'absolute',
  width: '100vw',
  backgroundColor: 'white',
  transition: 'transform 0.3s cubic-bezier(.65,.69,.77,1.25)',
  padding: '1rem',
  boxShadow: '0 -2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)'
};

const Tray = ({ title, children, renderLabel }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ flex: '1 1 0%' }}>
      <div
        data-testid="tray"
        style={{
          ...trayStyle,
          transform: open ? 'translateY(-100%)' : 'translateY(0)'
        }}
      >
        {children}
      </div>

      <button
        style={{ justifyContent: 'flex-start' }}
        className="button is-fullwidth is-dark is-medium is-radiusless"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>

        <span className="icon is-small" style={{ margin: '0' }}>
          <FontAwesomeIcon icon={open ? faAngleDown : faAngleUp} />
        </span>

        {!open && <div style={{ marginLeft: '.5rem' }}>{renderLabel()}</div>}
      </button>
    </div>
  );
};

Tray.defaultProps = {
  renderLabel: () => {}
};

export { Tray };
