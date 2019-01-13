import React from 'react';
import WithPerson from './WithPerson';

const Owners = ({ ownerIds }) => (
  <div className="tags is-marginless" data-testid="owners">
    {ownerIds.map(ownerId => (
      <div className="tag is-rounded is-uppercase" key={ownerId}>
        <WithPerson id={ownerId}>{person => person.initials}</WithPerson>
      </div>
    ))}
  </div>
);

export default Owners;
