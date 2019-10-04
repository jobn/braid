import React, { useContext, useEffect, Fragment } from 'react';
import { FilterContext } from './FilterContainer';
import { hideEpicsModal } from './FilterContainer/reducer';
import { EpicName } from './EpicName';

function FilterEpicsModal() {
  const { selectedEpics, displayEpicsModal, dispatch } = useContext(
    FilterContext
  );

  useEffect(() => {
    if (!displayEpicsModal) {
      return;
    }

    const timeout = setTimeout(() => {
      dispatch({ type: hideEpicsModal });
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  });

  if (!displayEpicsModal) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        style={{ background: 'none' }}
        onClick={() => dispatch({ type: hideEpicsModal })}
      />
      <div className="modal-content box has-background-grey-dark subtitle is-1 has-text-white-ter has-text-centered">
        {selectedEpics.map((id, index) => (
          <Fragment key={id}>
            {index > 0 ? <br /> : null}
            <EpicName id={id} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export { FilterEpicsModal };
