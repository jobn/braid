import React, { createContext, useReducer, useMemo } from 'react';

const FooterContext = createContext();

function reducer(_, action) {
  return action;
}

const Footer = ({ children }) => {
  const [openTray, dispatch] = useReducer(reducer, '');
  const value = useMemo(() => ({ openTray, dispatch }), [openTray, dispatch]);

  return (
    <FooterContext.Provider value={value}>
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100vw',
          display: 'flex',
          zIndex: '50'
        }}
      >
        {children}
      </div>
    </FooterContext.Provider>
  );
};

export { Footer, FooterContext };
