import { useEffect } from 'react';

export function useKeyup(keyMap) {
  useEffect(() => {
    const keyupHandler = e => {
      const action = keyMap[e.key];

      if (action) {
        action();
      }
    };

    window.addEventListener('keyup', keyupHandler);

    return () => {
      window.removeEventListener('keyup', keyupHandler);
    };
  }, [keyMap]);
}
