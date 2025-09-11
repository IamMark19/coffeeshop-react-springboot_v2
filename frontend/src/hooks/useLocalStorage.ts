import { useState } from 'react';

/**
 * @description Custom hook for interacting with local storage.
 * It provides a stateful value and a function to update it.
 * @template T The type of the value to be stored.
 * @param {string} keyName The key for the local storage item.
 * @param {T | null} defaultValue The default value if the key is not found.
 * @returns {[T | null, (newValue: T | null) => void]} A tuple containing the stored value and a function to set the value.
 */
export const useLocalStorage = <T>(keyName: string, defaultValue: T | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T | null) => {
    try {
      if (newValue) {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      } else {
        window.localStorage.removeItem(keyName);
      }
    } catch (err) {
      //
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
};
