import React, { Component } from 'react';
import _ from 'lodash';
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

class Tray extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { title, children, rightAlign, selectedOwners, people, selectedTypes } = this.props;

    const selectedOwnersObjects = _.map(selectedOwners, (selectedOwner) => people[selectedOwner])
    const getSelectedOwnersInitials = _.map(selectedOwnersObjects, selectedOwner => selectedOwner.initials)

    const { open } = this.state;

    return (
      <div style={{ flex: '1 1 0%' }}>
        <div
          style={{
            ...trayStyle,
            transform: open ? 'translateY(-100%)' : 'translateY(0)'
          }}
        >
          {children}
        </div>

        <a
          style={{
            justifyContent: rightAlign ? 'flex-end' : 'space-between'
          }}
          className="button is-fullwidth is-dark is-medium is-radiusless"
          onClick={this.handleToggle}
        >
          <span>
            <span>{title}</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={open ? faAngleDown : faAngleUp} />
            </span>
          </span>

          { (!_.isEmpty(selectedOwners) || !_.isEmpty(selectedTypes)) &&
            <span>Applied Filters:&nbsp;
              <span>{!_.isEmpty(selectedOwners) ? `Owners: ${getSelectedOwnersInitials.join(', ').toUpperCase()} ` : ''}</span>
              <span>{!_.isEmpty(selectedTypes) ? `${!_.isEmpty(selectedOwners) ? ' - ' : ''} Types: ${selectedTypes.join(', ').toUpperCase()}` : ''}</span>
            </span>
          }
        </a>
      </div>
    );
  }
}

export default Tray;
