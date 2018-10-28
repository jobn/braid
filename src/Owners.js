import React from 'react';
import { Consumer } from './Project';

const Owners = ({ ownerIds }) => (
  <Consumer>
    {people => (
      <div className="tags is-marginless" data-testid="owners">
        {ownerIds.map(ownerId => (
          <div className="tag is-rounded is-uppercase" key={ownerId}>
            {people[ownerId].initials}
          </div>
        ))}
      </div>
    )}
  </Consumer>
);

export default Owners;
