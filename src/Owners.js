import React from 'react';
import { Initials } from './Initials';

const Owners = ({ ownerIds }) => (
  <div className="tags is-marginless" data-testid="owners">
    {ownerIds.map(ownerId => (
      <div className="tag is-rounded" key={ownerId}>
        <Initials id={ownerId} />
      </div>
    ))}
  </div>
);

export { Owners };
