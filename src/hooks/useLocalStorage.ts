'use client'

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Set value to local storage
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setStoredValue(initialValue);
  }, [initialValue]);

  return [storedValue, setValue] as const;
}

export const ACCESS_TOKEN_KEY = 'access_token';

export default useLocalStorage;
