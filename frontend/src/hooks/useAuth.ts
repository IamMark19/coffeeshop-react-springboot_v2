import { useContext } from 'react';
import AuthContext from './context/AuthContext';

/**
 * @description Custom hook for accessing authentication-related context.
 * It provides the authentication context value.
 * @returns The authentication context.
 * @throws Will throw an error if not used within an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth must be used within a AuthContext'
    );
  }
  return context;
};
