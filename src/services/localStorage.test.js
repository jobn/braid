import window from './window';
import { localStorage } from './localStorage';

jest.mock('./window');

describe('localStorage', () => {
  describe('getItem', () => {
    it('gets item from window.localStorage', () => {
      localStorage.getItem('keyName');

      expect(window.localStorage.getItem).toHaveBeenCalledWith('keyName');
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('setItem', () => {
    it('sets item in window.localStorage', () => {
      localStorage.setItem('keyName', 'value');

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'keyName',
        'value'
      );
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it('triggers any eventListeners attached with same key', () => {
      const handlerA = jest.fn();
      const handlerB = jest.fn();

      localStorage.addEventListener('keyName', handlerA);
      localStorage.addEventListener('otherKeyName', handlerB);

      localStorage.setItem('keyName', 'value');

      expect(handlerA).toHaveBeenCalledWith('value');
      expect(handlerA).toHaveBeenCalledTimes(1);

      expect(handlerB).not.toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    it('removes item in window.localStorage', () => {
      localStorage.removeItem('keyName');

      expect(window.localStorage.removeItem).toHaveBeenCalledWith('keyName');
      expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
    });

    it('triggers any eventListeners attached with same key', () => {
      localStorage.setItem('keyName', 'value');

      const handlerA = jest.fn();
      const handlerB = jest.fn();

      localStorage.addEventListener('keyName', handlerA);
      localStorage.addEventListener('otherKeyName', handlerB);

      localStorage.removeItem('keyName');

      expect(handlerA).toHaveBeenCalledWith(null);
      expect(handlerA).toHaveBeenCalledTimes(1);

      expect(handlerB).not.toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('removes all items in window.localStorage', () => {
      localStorage.clear();

      expect(window.localStorage.clear).toHaveBeenCalledTimes(1);
    });

    it('triggers all eventListeners', () => {
      const handlerA = jest.fn();
      const handlerB = jest.fn();

      localStorage.addEventListener('keyName', handlerA);
      localStorage.addEventListener('otherKeyName', handlerB);

      localStorage.clear();

      expect(handlerA).toHaveBeenCalledWith(null);
      expect(handlerA).toHaveBeenCalledTimes(1);
      expect(handlerB).toHaveBeenCalledWith(null);
      expect(handlerB).toHaveBeenCalledTimes(1);
    });

    describe('removeEventListener', () => {
      it('removes eventListener by name and callback', () => {
        const handlerA = jest.fn();
        const handlerB = jest.fn();

        localStorage.addEventListener('keyName', handlerA);
        localStorage.addEventListener('keyName', handlerB);

        localStorage.setItem('keyName', 'value');

        localStorage.removeEventListener('keyName', handlerB);

        localStorage.setItem('keyName', 'otherValue');

        expect(handlerA).toHaveBeenCalledTimes(2);
        expect(handlerA).toHaveBeenCalledWith('value');
        expect(handlerA).toHaveBeenCalledWith('otherValue');

        expect(handlerB).toHaveBeenCalledTimes(1);
        expect(handlerB).toHaveBeenCalledWith('value');
        expect(handlerB).not.toHaveBeenCalledWith('otherValue');
      });
    });
  });
});
