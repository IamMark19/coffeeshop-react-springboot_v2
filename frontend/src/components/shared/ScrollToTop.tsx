import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @description A component that scrolls the window to the top when the pathname changes.
 * @returns {null}
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
