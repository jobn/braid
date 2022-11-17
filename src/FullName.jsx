import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PeopleContext } from './PeopleContext';

const FullName = ({ id }) => {
  const people = useContext(PeopleContext);

  const person = people[id];

  if (!person) {
    return <span />;
  }

  return (
    <span className="is-uppercase has-text-weight-semibold" title={person.name}>
      {person.name}
    </span>
  );
};

FullName.propTypes = {
  id: PropTypes.number.isRequired
};

export { FullName };
