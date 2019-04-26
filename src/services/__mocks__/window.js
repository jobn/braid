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
  removeEventListener: () => {}
};

export default mockWindow;
