import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PeopleContext } from './PeopleContext';

const Initials = ({ id, ifNotFound }) => {
  const people = useContext(PeopleContext);

  const person = people[id];

  if (!person) {
    if (ifNotFound)
      return ifNotFound();
    return <span />;
  }

  return (
    <span className="is-uppercase" title={person.name}>
      {person.initials}
    </span>
  );
};

Initials.propTypes = {
  id: PropTypes.number.isRequired,
  ifNotFound: PropTypes.func
};

export { Initials };
