import { useState, useEffect } from 'react';
import { localStorage } from './services';

const FALLBACK_STATE = 'null';

function useLocalStorage(key) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key) || FALLBACK_STATE)
  );

  useEffect(() => {
    const handler = nextState => {
      setState(JSON.parse(nextState || FALLBACK_STATE));
    };

    localStorage.addEventListener(key, handler);

    return () => {
      localStorage.removeEventListener(key, handler);
    };
  }, [key]);

  const setStorage = (nextState = FALLBACK_STATE) => {
    localStorage.setItem(key, JSON.stringify(nextState));
  };

  return [state, setStorage];
}

export { useLocalStorage };
