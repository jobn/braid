import window from './window';

const localStorage = (function() {
  let listeners = [];

  const triggerListeners = key => {
    listeners
      .filter(listener => !key || key === listener.key)
      .forEach(listener => {
        listener.callBack(window.localStorage.getItem(listener.key));
      });
  };

  window.addEventListener('storage', e => {
    triggerListeners(e.key);
  });

  return {
    addEventListener: (key, callBack) => {
      listeners.push({ key, callBack });
    },

    removeEventListener: (key, callBack) => {
      listeners = listeners.filter(
        listener => !(listener.key === key && listener.callBack === callBack)
      );
    },

    getItem: key => window.localStorage.getItem(key),

    setItem: (key, value) => {
      window.localStorage.setItem(key, value);
      triggerListeners(key);
    },

    removeItem: key => {
      window.localStorage.removeItem(key);
      triggerListeners(key);
    },

    clear: () => {
      window.localStorage.clear();
      triggerListeners(undefined);
    }
  };
})();

export { localStorage };
