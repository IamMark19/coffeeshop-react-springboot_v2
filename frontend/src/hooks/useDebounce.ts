import { useEffect, useState } from 'react';

/**
 * @description Custom hook that debounces a value.
 * @template T The type of the value to be debounced.
 * @param {T} value The value to be debounced.
 * @param {number} [delay=500] The delay in milliseconds.
 * @returns {T} The debounced value.
 */
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
