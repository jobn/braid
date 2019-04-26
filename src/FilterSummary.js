import React, { useContext } from 'react';
import { Initials } from './Initials';
import { FilterContext } from './FilterContainer';
import { storyTypes } from './storyTypes';

function FilterSummary() {
  const { selectedTypes, selectedOwners } = useContext(FilterContext);

  return (
    <div className="tags">
      {selectedOwners.map(id => (
        <span className="tag is-primary" key={id}>
          <Initials id={id} />
        </span>
      ))}

      {storyTypes
        .filter(type => selectedTypes.includes(type.key))
        .map(type => (
          <span
            className={`tag is-uppercase ${type.activeClass}`}
            key={type.key}
          >
            {type.key}
          </span>
        ))}
    </div>
  );
}

export { FilterSummary };
