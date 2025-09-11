import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * @description Custom hook for accessing URL query parameters.
 * @returns {Record<string, string>} An object containing the query parameters.
 */
export function useQuery() {
  const [searchParams] = useSearchParams();
  return useMemo(() => {
    return Object.fromEntries(Array.from(searchParams.entries()));
  }, [searchParams]);
}
