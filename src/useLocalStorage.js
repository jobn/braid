import { useState, useEffect } from 'react';
import { localStorage } from './services';

function useLocalStorage(key) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key) || 'null')
  );

  useEffect(() => {
    const handler = nextState => {
      setState(JSON.parse(nextState || 'null'));
    };

    localStorage.addEventListener(key, handler);

    return () => {
      localStorage.removeEventListener(key, handler);
    };
  }, [key]);

  const setStorage = (nextState = {}) => {
    localStorage.setItem(key, JSON.stringify(nextState));
  };

  return [state, setStorage];
}

export { useLocalStorage };
