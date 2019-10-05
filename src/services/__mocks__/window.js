let locationSearch = '';

const mockWindow = {
  cleanup: () => {
    locationSearch = '';
  },

  location: {
    get search() {
      return locationSearch;
    },

    set search(value) {
      locationSearch = value;
    }
  },

  history: {
    pushState: (_state, _title, url) => {
      locationSearch = url.split('?')[1];
    }
  },

  addEventListener: () => {},
  removeEventListener: () => {},

  localStorage: (function() {
    let store = {};
    return {
      getItem: jest.fn(key => {
        return store[key] || null;
      }),
      setItem: jest.fn((key, value) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn(key => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      })
    };
  })()
};

export default mockWindow;
