import React, { useContext, useEffect, Fragment } from 'react';
import { FilterContext } from './FilterContainer';
import { hideModal } from './FilterContainer/reducer';
import { Name } from './Name';

function FilterModal() {
  const { selectedOwners, displayModal, dispatch } = useContext(FilterContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: hideModal });
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  });

  if (!displayModal) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        style={{ background: 'none' }}
        onClick={() => dispatch({ type: hideModal })}
      />
      <div className="modal-content box has-background-grey-dark subtitle is-1 has-text-white-ter has-text-centered">
        {selectedOwners.map((id, index) => (
          <Fragment key={id}>
            {index > 0 ? <br /> : null}
            <Name id={id} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export { FilterModal };
