import React from 'react';
import { arrayOf, object, number } from 'prop-types';
import {
  PendingColumn,
  StartedColumn,
  ReviewColumn,
  DoneColumn
} from './Columns';
import { Footer } from './Footer';
import { Tray } from './Tray';
import { Filters } from './Filters';
import { FilterContainer } from './FilterContainer';
import { PeopleContext } from './PeopleContext';
import { FilterSummary } from './FilterSummary';

const Project = ({ uniqueOwnerIds, people, stories }) => (
  <PeopleContext.Provider value={people}>
    <FilterContainer uniqueOwnerIds={uniqueOwnerIds}>
      <section className="section" style={{ paddingBottom: '4rem' }}>
        <div className="columns">
          <PendingColumn stories={stories} />
          <StartedColumn stories={stories} />
          <ReviewColumn stories={stories} />
          <DoneColumn stories={stories} />
        </div>
      </section>

      <Footer>
        <Tray rightAlign title="Filters" renderLabel={() => <FilterSummary />}>
          <Filters />
        </Tray>
      </Footer>
    </FilterContainer>
  </PeopleContext.Provider>
);

Project.propTypes = {
  people: object,
  stories: arrayOf(object),
  uniqueOwnerIds: arrayOf(number)
};

export { Project };
