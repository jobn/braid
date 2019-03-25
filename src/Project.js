import React from 'react';
import { arrayOf, object, number } from 'prop-types';
import {
  PendingColumn,
  StartedColumn,
  ReviewColumn,
  DoneColumn
} from './Columns';
import Footer from './Footer';
import Tray from './Tray';
import Filters from './Filters';
import FilterContext, { FilterConsumer } from './FilterContext';
import { PeopleContext } from './PeopleContext';

const Project = ({ uniqueOwnerIds, people, stories }) => (
  <PeopleContext.Provider value={people}>
    <FilterContext uniqueOwnerIds={uniqueOwnerIds}>
      <section className="section" style={{ paddingBottom: '4rem' }}>
        <div className="columns">
          <PendingColumn stories={stories} />
          <StartedColumn stories={stories} />
          <ReviewColumn stories={stories} />
          <DoneColumn stories={stories} />
        </div>
      </section>

      <Footer>
        <Tray title="Filters">
          <FilterConsumer>
            {consumerValue => (
              <Filters uniqueOwnerIds={uniqueOwnerIds} {...consumerValue} />
            )}
          </FilterConsumer>
        </Tray>
      </Footer>
    </FilterContext>
  </PeopleContext.Provider>
);

Project.propTypes = {
  people: object,
  stories: arrayOf(object),
  uniqueOwnerIds: arrayOf(number)
};

export default Project;
