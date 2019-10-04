import { useContext } from 'react';
import PropTypes from 'prop-types';
import { EpicsContext } from './EpicsContext';

const EpicName = ({ id }) => {
  const epics = useContext(EpicsContext);

  const epic = epics[id];

  if (!epic) {
    return null;
  }

  return epic.name;
};

EpicName.propTypes = {
  id: PropTypes.number.isRequired
};

export { EpicName };
