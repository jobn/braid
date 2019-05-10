import React from 'react';
import { arrayOf, object, number } from 'prop-types';
import { Column } from './Column';
import { Footer } from './Footer';
import { Tray } from './Tray';
import { Filters } from './Filters';
import { FilterContainer } from './FilterContainer';
import { PeopleContext } from './PeopleContext';
import { FilterSummary } from './FilterSummary';
import { ColumnContainer } from './ColumnContainer';
import { FilterModal } from './FilterModal';

const Project = ({ uniqueOwnerIds, people, storyIds, stories, dispatch }) => (
  <PeopleContext.Provider value={people}>
    <FilterContainer uniqueOwnerIds={uniqueOwnerIds}>
      <section className="section" style={{ paddingBottom: '12rem' }}>
        <ColumnContainer dispatch={dispatch}>
          <div className="columns">
            <Column
              title="Pending"
              storyIds={storyIds}
              stories={stories}
              storyStates={['planned', 'unstarted']}
              dropState="unstarted"
            />

            <Column
              title="Started"
              storyIds={storyIds}
              stories={stories}
              storyStates={['started']}
              dropState="started"
            />

            <Column
              title="Review"
              storyIds={storyIds}
              stories={stories}
              storyStates={['finished']}
              dropState="finished"
            />

            <Column
              title="Accepted | Done"
              storyIds={storyIds}
              stories={stories}
              storyStates={['delivered', 'accepted']}
              dropState="delivered"
            />
          </div>
        </ColumnContainer>
      </section>

      <Footer>
        <Tray rightAlign title="Filters" renderLabel={() => <FilterSummary />}>
          <Filters />
        </Tray>
      </Footer>

      <FilterModal />
    </FilterContainer>
  </PeopleContext.Provider>
);

Project.propTypes = {
  people: object,
  stories: object,
  storyIds: arrayOf(number),
  uniqueOwnerIds: arrayOf(number)
};

export { Project };
