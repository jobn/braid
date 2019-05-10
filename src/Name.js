import { useContext } from 'react';
import PropTypes from 'prop-types';
import { PeopleContext } from './PeopleContext';

const Name = ({ id }) => {
  const people = useContext(PeopleContext);

  const person = people[id];

  if (!person) {
    return null;
  }

  return person.name;
};

Name.propTypes = {
  id: PropTypes.number.isRequired
};

export { Name };
