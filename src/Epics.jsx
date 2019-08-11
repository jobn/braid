import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EpicsContext } from './EpicsContext';

const Epics = ({ id }) => {
  const epics = useContext(EpicsContext);

  const epic = epics[id];

  if (!epic) {
    return <span />;
  }

  return (
    <span className="is-uppercase" title={epic.name}>
      {epic.name}
    </span>
  );
};

Epics.propTypes = {
  id: PropTypes.number.isRequired
};

export { Epics };
