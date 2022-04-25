import { useEffect, useRef } from 'react';

export const useLocalStorage = (key, value) => {
  const storedData = useRef(value);
  useEffect(() => {
    window.addEventListener('beforeunload', confirmExit);
    window.addEventListener('unload', handleSave);

    return () => {
      window.removeEventListener('beforeunload', confirmExit);
      window.removeEventListener('unload', handleSave);
    };
  }, []);

  useEffect(() => {
    storedData.current = value;
  }, [value]);

  const handleSave = () => {
    localStorage.setItem(key, storedData.current);
  };

  const confirmExit = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };
};
