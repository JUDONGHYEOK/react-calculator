import { useCallback, useEffect } from 'react';

export const useLocalStorage = (key, value) => {
  useEffect(() => {
    window.addEventListener('beforeunload', confirmExit);
    return () => {
      window.removeEventListener('beforeunload', confirmExit);
    };
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem(key, value);
  }, [value]);

  useEffect(() => {
    window.addEventListener('unload', handleSave);
    return () => {
      window.removeEventListener('unload', handleSave);
    };
  }, [handleSave]);

  const confirmExit = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };
};
