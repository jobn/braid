import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FooterContext } from './Footer';

function getTrayStyle(fullWidth, open) {
  return {
    position: 'absolute',
    width: fullWidth ? '100vw' : '100%',
    backgroundColor: 'white',
    transition: 'transform 0.3s cubic-bezier(.65,.69,.77,1.25)',
    padding: '1rem',
    boxShadow: '0 -2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)',
    transform: open ? 'translateY(-100%)' : 'translateY(0)'
  };
}

const Tray = ({ title, rightAlign, fullWidth, children, renderLabel }) => {
  const { openTray, dispatch } = useContext(FooterContext);
  const open = openTray === title;

  return (
    <div className="is-relative" style={{ flex: '1 1 0%' }}>
      <div data-testid="tray" style={getTrayStyle(fullWidth, open)}>
        {children}
      </div>

      <button
        style={{ justifyContent: rightAlign ? 'flex-end' : 'flex-start' }}
        className="button is-fullwidth is-dark is-medium is-radiusless"
        onClick={() => dispatch(open ? '' : title)}
      >
        {!open && rightAlign && (
          <div style={{ marginLeft: '.5rem' }}>{renderLabel()}</div>
        )}

        <span>{title}</span>

        <span className="icon is-small" style={{ margin: '0' }}>
          <FontAwesomeIcon icon={open ? faAngleDown : faAngleUp} />
        </span>

        {!open && !rightAlign && (
          <div style={{ marginLeft: '.5rem' }}>{renderLabel()}</div>
        )}
      </button>
    </div>
  );
};

Tray.defaultProps = {
  rightAlign: false,
  fullWidth: false,
  renderLabel: () => {}
};

export { Tray };
