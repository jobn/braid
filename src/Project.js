import React, { useMemo } from 'react';
import { arrayOf, object, number } from 'prop-types';
import { Column } from './Column';
import { Footer } from './Footer';
import { Tray } from './Tray';
import { Filters } from './Filters';
import { FilterContainer } from './FilterContainer';
import { PeopleContext } from './PeopleContext';
import { EpicsContext } from './EpicsContext';
import { FilterSummary } from './FilterSummary';
import { ColumnContainer } from './ColumnContainer';
import { FilterModal } from './FilterModal';
import { FilterEpicsModal } from './FilterEpicsModal';
import { useLocalStorage } from './useLocalStorage';
import { Settings } from './Settings';
import { useKeyup } from './useKeyup';

const Project = ({
  uniqueOwnerIds,
  people,
  storyIds,
  stories,
  uniqueEpicIds,
  epics,
  dispatch
}) => {
  const [splitFinalColumns] = useLocalStorage('splitColumns');
  const [slim, setSlim] = useLocalStorage('slim');
  const [useFullNames] = useLocalStorage('useFullNames');
  const [splitFinishedAndDelivered] = useLocalStorage(
    'splitFinishedAndDelivered'
  );
  const [showLabels] = useLocalStorage('labels');

  const keyMap = useMemo(
    () => ({
      s: () => setSlim(!slim)
    }),
    [slim, setSlim]
  );

  const statesForDeliveredColumn = ['delivered'];
  let titleForDeliveredColumn = 'Delivered';
  if (!splitFinalColumns) {
    statesForDeliveredColumn.push('accepted');
    titleForDeliveredColumn += ' | Accepted';
  }
  if (!splitFinishedAndDelivered) {
    statesForDeliveredColumn.push('finished');
    titleForDeliveredColumn += ' | Finished';
  }

  useKeyup(keyMap);

  return (
    <PeopleContext.Provider value={people}>
      <EpicsContext.Provider value={epics}>
        <FilterContainer
          uniqueOwnerIds={uniqueOwnerIds}
          uniqueEpicIds={uniqueEpicIds}
          useFullNames={useFullNames}
        >
          <section className="section" style={{ paddingBottom: '12rem' }}>
            <ColumnContainer dispatch={dispatch}>
              <div className="columns">
                <Column
                  title="Pending"
                  storyIds={storyIds}
                  stories={stories}
                  storyStates={['planned', 'unstarted', 'rejected']}
                  featureDropState="unstarted"
                  bugDropState="unstarted"
                  choreDropState="unstarted"
                  slim={slim}
                  showLabels={showLabels}
                  role="owner"
                />

                <Column
                  title="Started"
                  storyIds={storyIds}
                  stories={stories}
                  storyStates={['started']}
                  featureDropState="started"
                  bugDropState="started"
                  choreDropState="started"
                  slim={slim}
                  showLabels={showLabels}
                  role="owner"
                />
                {splitFinishedAndDelivered ? (
                  <Column
                    title="Finished"
                    storyIds={storyIds}
                    stories={stories}
                    storyStates={['finished']}
                    featureDropState="finished"
                    bugDropState="finished"
                    choreDropState={null}
                    slim={slim}
                    showLabels={showLabels}
                    role="owner"
                  />
                ) : null}
                <Column
                  title={titleForDeliveredColumn}
                  storyIds={storyIds}
                  stories={stories}
                  storyStates={statesForDeliveredColumn}
                  featureDropState="delivered"
                  bugDropState="delivered"
                  choreDropState={null}
                  slim={slim}
                  showLabels={showLabels}
                  role="owner"
                />

                {splitFinalColumns ? (
                  <Column
                    title="Accepted"
                    storyIds={storyIds}
                    stories={stories}
                    storyStates={['accepted']}
                    featureDropState="accepted"
                    bugDropState="accepted"
                    choreDropState="accepted"
                    slim={slim}
                    showLabels={showLabels}
                    role="owner"
                  />
                ) : null}
                <Column
                  title="To Review"
                  storyIds={storyIds}
                  stories={stories}
                  storyStates={['delivered', 'finished']}
                  featureDropState=""
                  bugDropState=""
                  choreDropState=""
                  slim={slim}
                  showLabels={showLabels}
                  role="reviewer"
                />
              </div>
            </ColumnContainer>
          </section>

          <Footer>
            <Tray
              title="Filters"
              fullWidth
              renderLabel={() => <FilterSummary useFullNames={useFullNames} />}
            >
              <Filters />
            </Tray>

            <Tray title="Settings" rightAlign>
              <Settings />
            </Tray>
          </Footer>

          <FilterModal />
          <FilterEpicsModal />
        </FilterContainer>
      </EpicsContext.Provider>
    </PeopleContext.Provider>
  );
};

Project.propTypes = {
  people: object,
  stories: object,
  storyIds: arrayOf(number),
  uniqueOwnerIds: arrayOf(number),
  uniqueEpicIds: arrayOf(number),
  epics: object
};

export { Project };
