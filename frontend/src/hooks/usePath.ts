import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @description Custom hook for getting the current pathname.
 * @returns {string} The current pathname.
 */
export function usePath() {
  const location = useLocation();
  return useMemo(() => {
    return location.pathname;
  }, [location.pathname]);
}
