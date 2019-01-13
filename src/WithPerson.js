import React from 'react';
import { number, func } from 'prop-types';
import { PeopleConsumer } from './PeopleContext';

const WithPerson = ({ id, children }) => (
  <PeopleConsumer>{people => children(people[id])}</PeopleConsumer>
);

WithPerson.propTypes = {
  id: number.isRequired,
  children: func.isRequired
};

export default WithPerson;
