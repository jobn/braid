import React from 'react';
import { Consumer } from './Project';

const Owners = ({ ownerIds }) => (
  <Consumer>
    {people => (
      <div className="tags is-marginless">
        {people.filter(person => ownerIds.includes(person.id)).map(owner => (
          <div className="tag is-rounded uppercase" key={owner.id}>
            {owner.initials}
          </div>
        ))}
      </div>
    )}
  </Consumer>
);

export default Owners;
